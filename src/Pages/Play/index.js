// React
import React from 'react';

// StyleSheet
import styles from './styles';

// React-Native components
import { View, Text, Alert } from 'react-native';

// Models
import Question from "../../Model/Question";

// Components
import QuestionComponent from '../../Components/QuestionComponent';

// Utilities
import { shuffleAlternatives } from "../../Utilities/Util";

export default class Play extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            question: new Question(
                0, 'O que aconteceu com o copeiro-mor do Faraó?',
                0, ['Foi reintegrado no seu cargo', 'Voltou para a sua terra', 'Perdeu o emprego', 'Foi enforcado'],
                '\"restaurou à sua posição o chefe dos copeiros, de modo que ele voltou a ser aquele que servia a taça do faraó, \" Gênesis 40:21',
                3, 'Antigo', 'pentateuco', 'Gênesis 40:21')
        }
    }
    
    handleAlternativeSelected = (alternativeTried) => {
        if (alternativeTried === this.state.question.answer){
            Alert.alert('Acertou', this.state.question.textBiblical);
        }else{
            Alert.alert('Errou', this.state.question.textBiblical);
        }
    }

    render(){
        this.setState({question: shuffleAlternatives(this.state.question)});
        
        return(
            <View style={styles.container}>
                <QuestionComponent
                    question = {this.state.question}
                    onAlternativeSelected = {alternative => this.handleAlternativeSelected(alternative)}
                    />
            </View>
        )
    }
}