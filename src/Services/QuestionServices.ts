import Question, {QuestionDificulty} from "../Model/Question";

import GraphQLQuestion, { QuestionQueries } from "./Backend/GraphQLQueries/Questions";

enum QuestionDificultyPoints {
    Right_Hard = 15,
    Right_Medium = 10,
    Right_Easy = 5,
    Wrong_Hard = -1,
    Wrong_Medium = -2,
    Wrong_Easy = -3
}

enum QuestionLeftTimePoints {
    More15 = 4,
    More10 = 3,
    More5 = 2
}

export default class QuestionServices{
    public static getPointsForQuestion(question: Question, correct: boolean, timeLeft: number): number{
        /*  A pontuação funcionará da seguinte maneira:

            Quanto ao tempo
                Acertou a questão entre 19 e 15 segundos restantes:     + 3 pontos
                Acertou a questão entre 14 e 10 segundos restantes:     + 2 pontos
                Acertou a questão entre 9 e 5 segundos restantes:       + 1 pontos

            Quanto à dificuldade
                Acertou difícil:    + 15 pontos
                Acertou médio:      + 10 pontos
                Acertou fácil:      + 5 pontos

                Errou difícil:      - 1 pontos
                Errou médio:        - 2 ponto
                Errou fácil:        - 3 pontos
        */
        let score = 0;

        switch(question.getDificulty()){
            case QuestionDificulty.Easy:
                score += correct ? QuestionDificultyPoints.Right_Easy : QuestionDificultyPoints.Wrong_Easy;
                break;
            
            case QuestionDificulty.Medium:
                score += correct ? QuestionDificultyPoints.Right_Medium : QuestionDificultyPoints.Wrong_Medium;
                break;
            
            case QuestionDificulty.Hard:
                score += correct ? QuestionDificultyPoints.Right_Hard : QuestionDificultyPoints.Wrong_Hard;
                break;
        }

        if (correct){
            if (timeLeft >= 15)
                score += QuestionLeftTimePoints.More15;
            else if (timeLeft >= 10)
                score += QuestionLeftTimePoints.More10;
            else if (timeLeft >= 5)
                score += QuestionLeftTimePoints.More5;
        }

        return score;
    }

    public static getQuestion(){
        const parameters = {userAnswered: '[]'};
        return new Promise<any>((resolve, reject) => {
            GraphQLQuestion.executeQuery(QuestionQueries.getQuestion , [], parameters).then((questionData) => {
                const question = Question.getClassFromObject(questionData.getQuestion);
                resolve(question);
            }).catch((error) => {
                console.log(error);
                reject(error);
            });
        })

    }

}