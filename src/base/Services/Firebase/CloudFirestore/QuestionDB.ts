import {cloudFirestore, initializeFirebase} from '../Firebase';

import Question, { QuestionFilter, QuestionDificulty, Testament, BibleSection } from '../../../Model/Question';
import User from '../../../Model/User';

import Utilities from '../../../Utilities/Utilities';

export default class QuestionDB{
    private static questionsRef(){
        return cloudFirestore().collection('questions');
    }

    static createQuestion(question: Question): Promise<void> {
        initializeFirebase();

        return new Promise<void>((resolve, reject) => {
            this.questionsRef().doc(question.getIdQuestion().toString()).set(question.getObjectFromClass()).then((document) => {
                resolve();
            }).catch((error) => {
                reject(error);
            });
        });
    }

    static getQuestion(user: User, questionFilter: QuestionFilter): Promise<Question> {
        initializeFirebase();

        return new Promise<Question>((resolve, reject) => {
            // Constrói a query para buscar a questão no BD
            let questionQuery: firebase.firestore.Query = this.questionsRef();
            if (questionFilter.dificulty !== undefined)
                questionQuery = questionQuery.where('dificulty', '==', questionFilter.dificulty);
            if (questionFilter.testament !== undefined)
                questionQuery = questionQuery.where('testament', '==', questionFilter.testament);
            if (questionFilter.bibleSection !== undefined)
                questionQuery = questionQuery.where('bibleSection', '==', questionFilter.bibleSection);
            
            questionQuery.get().then((document) => {
                // Mantém apenas as questões que o usuário ainda não respondeu
                const documents = Utilities.shuffleArray(document.docs.filter(data => !user.answered.includes(data.data().idQuestion)));

                // Retorna a questão buscada
                if (documents.length > 0){
                    //documents.forEach(xxx => console.log(xxx.data()))
                    resolve(Question.getClassFromObject(documents[0].data()));
                }else{
                    // Ainda não existe uma questão com os parâmetros solicitados
                    throw new Error('Nenhum registro encontrado')
                }
            }).catch((error) => {
                console.log(error);
                reject(error);
            })
        });
    }

    
}