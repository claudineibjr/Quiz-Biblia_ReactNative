// React
import React, {Component} from 'react';

// StyleSheet
import style from './styles';

// React-Native components
import { View, Text, Alert } from 'react-native';

// NativeBase
import {Container, Header, Body, Left, Right, Icon, Content, Card, CardItem, ListItem, Button, List} from 'native-base';

// Model
import Question, {QuestionFilter, QuestionDificulty, Testament} from '../../base/Model/Question';
import User from '../../base/Model/User';
import Bonus from '../../base/Model/UserBonus';
import Timer from './Timer';

// Services
import QuestionDB from '../../base/Services/Firebase/CloudFirestore/QuestionDB';
import QuestionServices from '../../base/Services/QuestionServices';

// Components
import QuestionComponent from '../../Components/QuestionComponent';

// Utilities
import { shuffleAlternatives } from "../../Utilities/Util";

// Enums
enum TypeBonus {
    MoreTime,
    LessAlternative,
    ShowBiblicalReference
}

// Interfaces
interface IProps {
    dispatch: any
}

interface IState {
    user: User,
    match: Match,
    question?: Question,
    timer: Timer,
    alertInfo: AlertInfo,
    biblicalReference: AlertInfo
}


export default class Play extends Component<IProps, IState>{
    timeToAnswerQuestion: number;
    timeToShowAnswer: number;
    
    constructor(props: IProps){
        super(props);
        this.timeToAnswerQuestion = 20;
        this.timeToShowAnswer = 2;

        this.state = this.initialState(true);
    }

    initialState = (begin: boolean): IState => {
        let user = new User('claudineibjr@hotmail.com', 'Claudinei B Jr');
        user.bonus = new Bonus(1, 1, 1);
        return {
            user: user,
            match: begin ? new Match() : this.state.match,
            question: undefined,
            timer: new Timer(this.timeToAnswerQuestion, this.timerEndTime, this.timerTimeTick, this, false),
            alertInfo: new AlertInfo(),
            biblicalReference: new AlertInfo()
        }
    }

    loadQuestion = () => {
        const questionFilter = new QuestionFilter(undefined, undefined, undefined)
        QuestionDB.getQuestion(this.state.user, questionFilter).then(question => {
            console.log(question);
            this.state.timer.startTimer();
            this.setState({question: question});
        }).catch(error => {
            console.log(error);
        });
    }

    // #region Component LifeCycle
    componentWillMount = () => {
        this.loadQuestion();
    }
    // #endregion

    // #region Timer
    timerTimeTick = () => {
        
    }

    timerEndTime = () => {
        this.try(-1);
    }
    // #endregion

    // #region Component Handlers
    try = async (answerIndex: number) => {
        // Pára com o timer
        this.state.timer.stopTimer();
        
        // Identifica se a resposta está correta ou não
        const correct = this.state.question!.getAnswer() === answerIndex;

        // Calcula e identifica as informações que serão exibidas no alerta
        const score = QuestionServices.getPointsForQuestion(this.state.question!, correct, this.state.timer.timeLeft);
        let alertTitle: string = correct ? 'Parabéns, você acertou!' : 'Que pena, você errou!';
        alertTitle = alertTitle + ' ' + (correct ? '+' : '') + score + ' pontos';

        // Espera alguns segundos e exibe o alerta com a resposta correta
        new Timer(this.timeToShowAnswer, () => this.displayAlert(alertTitle, correct), () => {}, undefined, true);

        this.matchTreatment(correct);
    }

    matchTreatment = (correct: boolean) => {
        // Insere a resosta nas informaçõs da partida
        this.state.match.answers.push(new Answer(this.state.question!.getDificulty(), correct));
        
        // Verifica se acertou as últimas 5
        if (this.state.match.hitTheLastXQuestions(5)){

        }

        // Verifica se acertou as últimas 3 difíceis
        if (this.state.match.hitTheLastXQuestions(3, true)){
            
        }
    }

    displayAlert = async (alertTitle: string, correct: boolean) => {
        // Exibe o alerta com a resposta
        this.state.alertInfo.alertTitle = alertTitle;
        this.state.alertInfo.alertMessage = this.state.question!.getTextBiblical();
        this.state.alertInfo.alertType = correct ? 'success' : 'error';
        this.state.alertInfo.showAlert = true;
        this.forceUpdate();
    }

    proceedNextQuestion = () => {
        this.setState(this.initialState(false));
        this.loadQuestion();
    }

    useBonus = (typeBonus: TypeBonus) => {
        let refresh: boolean = false;
        
        switch(typeBonus){
            case TypeBonus.MoreTime:
                if (this.state.user.bonus.moreTime > 0){
                    // Incrementa 5 segundos no tempo para responder a pergunta
                    this.state.timer.timeLeft += 5;

                    this.state.user.bonus.moreTime -= 1;
                    refresh = true;
                }
                break;

            case TypeBonus.LessAlternative:
                if (this.state.user.bonus.lessAlternatives > 0){
                    // Exclui uma alternativa

                    this.state.user.bonus.lessAlternatives -= 1;
                    refresh = true;
                }
                break;

            case TypeBonus.ShowBiblicalReference:
                if (this.state.user.bonus.showBiblicalReference > 0){
                    // Exibe a referência bíblia
                    this.state.biblicalReference.alertTitle = 'Referência bíblica';
                    this.state.biblicalReference.alertMessage = this.state.question!.getBiblicalReference();
                    this.state.biblicalReference.showAlert = true;
                    
                    this.state.user.bonus.showBiblicalReference -= 1;
                    refresh = true;
                }
                break;
        }

        if (refresh)
            this.forceUpdate();

    }

    closeBiblicalReferenceAlert = () => {
        this.state.biblicalReference.alertTitle = '';
        this.state.biblicalReference.alertMessage = '';
        this.state.biblicalReference.showAlert = false;
        this.forceUpdate();
    }
    // #endregion

    alternativesButtons = () => {
        const alternatives: Array<string> = this.state.question === undefined ? ['', '', '', ''] : this.state.question!.getAlternatives() as Array<string>;
        const disabled = !this.state.timer.isOn;

        return alternatives.map((alternativeText, index) =>
            <ListItem>
                <Button style={style.buttonAlternative}>
                    <Text style={style.buttonAlternativeText}>
                        {alternativeText}
                    </Text>
                </Button>
            </ListItem>
        );
    }

    render(){
        return(
            <Container>
                <Header>
                    <Left>
                        <Text>
                            {this.state.timer.timeLeft}
                        </Text>
                    </Left>
                        
                    <Right>
                        <Icon type='FontAwesome' name='plus-circle'/>
                        <Icon type='MaterialCommunityIcons' name='table-row-remove'/>
                        <Icon type='Ionicons' name='ios-help-buoy'/>
                    </Right>
                </Header>

                <Content>
                    <Card>
                        <CardItem>
                            <Card style={style.questionTextContainer}>
                                <CardItem header>
                                    <Left>
                                        <Text>
                                            {this.state.question === undefined ? "" : 
                                                this.state.question!.getBibleSectionTestament()}
                                        </Text>
                                    </Left>
                                    
                                    <Right>
                                        <Text>
                                            {this.state.question === undefined ? "" : 
                                                this.state.question!.getDificulty_string()}
                                        </Text>
                                    </Right>
                                </CardItem>

                                <CardItem>
                                    <Text style={style.questionText}>
                                        {this.state.question === undefined ? "" : 
                                            this.state.question!.getTextQuestion()}
                                    </Text>
                                </CardItem>

                            </Card>
                        </CardItem>

                        <CardItem>
                            <List>
                                {this.alternativesButtons()}
                            </List>
                        </CardItem>
                    </Card>
                </Content>
            </Container>
        )
    }
}

class AlertInfo { 
    alertTitle: string = '';
    alertMessage: string = '';
    alertType: 'success' | 'error' | undefined = undefined;
    showAlert: boolean = false;

    constructor(){}
}

class Match {
    score: number;
    matchTimer?: Timer;
    answers: Array<Answer>;
    alreadyReceivedBonus5Q: boolean;
    alreadyReceivedBonus3HQ: boolean;

    constructor(){
        this.score = 0;
        this.matchTimer = undefined;
        this.answers = new Array<Answer>();

        this.alreadyReceivedBonus5Q = false;
        this.alreadyReceivedBonus3HQ = false;
    }

    hitTheLastXQuestions(lastX: number, findOnlyHard: boolean = false): boolean {
        let hit: boolean = false;
        
        // Verifica se tem pelo menos 5 questões
        if (this.answers.length >= lastX){
            const numAnswersToBeDeleted: number = this.answers.length - lastX;
            for (let iCount = 0; iCount < numAnswersToBeDeleted; iCount++)
                this.answers.shift();

            const onlyCorrespondingAnswers = this.answers.filter(
                answer => 
                    answer.correct && 
                    findOnlyHard ? answer.dificulty === QuestionDificulty.Hard : 1 === 1);
            if (onlyCorrespondingAnswers.length === lastX)
                hit = true;
        }

        return hit;
    }

}

class Answer {
    dificulty: QuestionDificulty;
    correct: boolean;

    constructor(dificulty: QuestionDificulty, correct: boolean){
        this.dificulty = dificulty;
        this.correct = correct;
    }
}