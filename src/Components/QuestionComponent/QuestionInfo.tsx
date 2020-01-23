// React Imports
import React, { Component } from 'react';
import {View, Text} from 'react-native';

// Redux
//import { connect } from 'react-redux';
//import store, { IStore } from '../../Store/index';
//import * as Actions from '../../Store/actions';

// Styles
import style from './styles';

// Material-UI Components

// NativeBase Components
import {Container} from 'native-base';

// Components

// Model
import Question from '../../base/Model/Question';

// Services

// Icons

// Enums

// Interfaces
interface IProps {
    dispatch?: any,
    question: Question
}

const QuestionInfo: React.StatelessComponent<IProps> = (props) => {
    return (
        <View style={style.questionInfo.rectMainInfo}>
            <Text style={style.questionInfo.textQuestion}>
                {props.question.getTextQuestion()}
            </Text>

            <View style={style.questionInfo.questionDetails}>
                <Text>
                    {props.question.getBibleSectionTestament()}
                </Text>

                <Text>
                    {props.question.getDificulty_string()}
                </Text>
            </View>
        </View>
    )
}

export default QuestionInfo;