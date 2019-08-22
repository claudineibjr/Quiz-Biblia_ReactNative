// React
import React from 'react';

// React-Native components
import {View, Text, TouchableHighlight} from 'react-native';
import styles from './styles';

// PropTypes
import PropTypes from 'prop-types';

// Model
import Question from '../../Model/Question';

export default QuestionComponent = (props) => {
    const question = props.question;
    const onAlternativeSelected = props.onAlternativeSelected;
    
    return(
        <View>
            <View style = {styles.questionContainer}>
                <Text>
                    {question.getTextQuestion()}
                </Text>
            </View>

            <View style = {styles.alternativesContainer}>
                
                {question.alternatives.map((alternative, key) =>
                <TouchableHighlight onPress = {() => onAlternativeSelected(key)} style = {styles.alternative}>
                    <Text>{alternative}</Text>
                </TouchableHighlight>
                )}

            </View>

            <View style = {styles.helpersContainer} >

            </View>
        </View>
    );
};

QuestionComponent.propTypes = {
    question: PropTypes.instanceOf(Question)
};