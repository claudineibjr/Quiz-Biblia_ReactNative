// React
import React, {Component} from 'react';

// StyleSheet
import style from './styles';

// React-Native components
import { View, Text, Alert } from 'react-native';

// NativeBase
import {Container, Header, Body, Left, Right, Content, Icon, Card, CardItem, ListItem, Button, List} from 'native-base';

// Awesome Alert
import AwesomeAlert from 'react-native-awesome-alerts';

// Model
import Question, {QuestionFilter, QuestionDificulty, Testament, BibleSection} from '../../Model/Question';
import User from '../../Model/User';
import Bonus from '../../Model/UserBonus';
import Timer from './Timer';

// Services
import QuestionDB from '../../base/Services/Firebase/CloudFirestore/QuestionDB';
import QuestionServices from '../../Services/QuestionServices';

// Components
import QuestionInfo from '../../Components/QuestionComponent/QuestionInfo';

// Utilities
//import { shuffleAlternatives } from '../../Utilities/Utilities';
import AlternativeItem from '../../Components/QuestionComponent/AlternativeItem';

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
    biblicalReference: AlertInfo,
    try?: number
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
            biblicalReference: new AlertInfo(),
            try: undefined
        }
    }

    loadQuestion = () => {
        const questionFilter = new QuestionFilter(undefined, undefined, undefined)
        QuestionDB.getQuestion(this.state.user, questionFilter).then(question => {
            this.state.timer.startTimer();
            this.setState({question: question});
        }).catch(error => {
            console.log(error);
        });

        // Only for debug
        /*this.setState({question: new Question('Complete a frase: O --- viverá pela fé. Nunca vi um --- mendigar o pão. Nem sua descendência perecer.', 0, ['justo', 'cristão que é chamado por Cristo para revelar as coisas de Jesus', 'Jesus', 'Diabo'], '\'O justo viverá pela fé\' Hc 2:4', QuestionDificulty.Easy, Testament.Velho, BibleSection.Profetas_Menores, 'Hc 2:4')},
            () => {
                this.state.timer.startTimer();
            });*/
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
        this.setState({try: answerIndex});

        // Pára com o timer
        this.state.timer.stopTimer();
        
        // Identifica se a resposta está correta ou não
        const correct = this.state.question!.getAnswer() === answerIndex;

        // Calcula e identifica as informações que serão exibidas no alerta
        const score = QuestionServices.getPointsForQuestion(this.state.question!, correct, this.state.timer.timeLeft);
        const alertTitle: string = correct ? 'Parabéns, você acertou!' : 'Que pena, você errou!';
        const messageScore = '  ' + (correct ? '+' : '') + score + ' pontos';

        // Espera alguns segundos e exibe o alerta com a resposta correta
        new Timer(this.timeToShowAnswer, () => this.displayAlert(alertTitle, correct, messageScore), () => {}, undefined, true);

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

    displayAlert = async (alertTitle: string, correct: boolean, messageScore: string) => {
        // Exibe o alerta com a resposta
        this.state.alertInfo.alertTitle = alertTitle;
        this.state.alertInfo.alertMessage = this.state.question!.getTextBiblical();
        this.state.alertInfo.alertType = correct ? 'success' : 'error';
        this.state.alertInfo.score = messageScore;
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
        const alreadyAnwered = !this.state.timer.isOn && this.state.timer.timeLeft !== this.state.timer.maxTime;

        return alternatives.map((alternativeText, index) =>
            <AlternativeItem
                style={this.getStyleForAlternative(alreadyAnwered, index)}
                onPress={() => this.try(index)} alternativeText={alternativeText}/>
        );
    }

    getStyleForAlternative = (alreadyAnwered: boolean, index: number) => {
        let styleForAlternative: any;
        
        const correctAlternative = {
            backgroundColor: 'green'
        };

        const incorrectAlternative = {
            backgroundColor: 'red'
        };

        const notAnsweredYet = {
            backgroundColor: '#efefef',
        };

        if (alreadyAnwered){
            const correctAnswer = index === this.state.question!.getAnswer();
            const tried = index === this.state.try;

            if (tried){
                if (correctAnswer){
                    styleForAlternative = correctAlternative;
                }else{
                    styleForAlternative = incorrectAlternative;
                }
            }else if (index === -1){
                styleForAlternative = incorrectAlternative;
            }else if (correctAnswer){
                styleForAlternative = correctAlternative;
            }else{
                styleForAlternative = notAnsweredYet;
            }
        }else{
            styleForAlternative = notAnsweredYet;
        }

        return styleForAlternative;
    }

    render(){
        const alternativesButtons = this.alternativesButtons();

        return(
            <Container>
                <Header>
                    <Left>
                        <Text style={style.timerText}>
                            {this.state.timer.timeLeft}
                        </Text>
                    </Left>
                        
                    <Right style={style.powerUPButtons}>
                        <Icon style={style.itemPowerUPButton} type='MaterialCommunityIcons' name='restore-clock' />
                        <Icon style={style.itemPowerUPButton} type='MaterialCommunityIcons' name='table-row-remove' />
                        <Icon style={style.itemPowerUPButton} type='Ionicons' name='ios-help-buoy' />
                    </Right>
                </Header>

                <Content>
                    {this.state.question !== undefined && 
                        <View style={style.containerQuestionInfo}>
                            <QuestionInfo question={this.state.question!}/>

                            <View style={style.containerAlternatives}>
                                {alternativesButtons}
                            </View>
                        </View>
                    }
                </Content>

                <AwesomeAlert
                    show={this.state.alertInfo.showAlert}
                    showProgress={false}
                    closeOnTouchOutside={true}
                    closeOnHardwareBackPress={false}
                    onDismiss={() => {
                        this.proceedNextQuestion()
                    }}
                    customView = {
                        <View>
                            {this.state.alertInfo.getIcon()}
                            <Text style={style.alertInfoTitle}>{this.state.alertInfo.alertTitle}
                                <Text style={{color: this.state.alertInfo.alertType === 'success' ? 'green' : 'red'}}>{this.state.alertInfo.score}</Text>
                            </Text>
                            
                            <Text style={style.alertInfoMessage}>{this.state.alertInfo.alertMessage}</Text>
                        </View>
                    }
                    />


            </Container>
        )
    }
}

class AlertInfo { 
    alertTitle: string = '';
    alertMessage: string = '';
    alertType: 'success' | 'error' | undefined = undefined;
    showAlert: boolean = false;
    score: string = '';

    constructor(){}

    getIcon(){
        return this.alertType === "success" ? (
            <Icon style={style.correctAnswerIcon} type='MaterialCommunityIcons' name='check-circle-outline' />
        ) : this.alertType === "error" ? (
            <Icon style={style.incorretAnswerIcon} type='MaterialCommunityIcons' name='close-circle-outline' />
        ) : undefined;
    }
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