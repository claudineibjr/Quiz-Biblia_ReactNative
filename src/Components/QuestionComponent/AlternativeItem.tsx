// React Imports
import React, { Component, ReactPropTypes } from 'react';
import {View, Text, TouchableHighlight} from 'react-native';

// Redux
//import { connect } from 'react-redux';
//import store, { IStore } from '../../Store/index';
//import * as Actions from '../../Store/actions';

// Styles
import style from './styles';

// Material-UI Components

// NativeBase Components
import {Container, Button} from 'native-base';

// Components

// Model
import Question from '../../base/Model/Question';

// Services

// Icons

// Enums

// Interfaces
interface IProps {
    dispatch?: any,
    alternativeText: string,
    onPress: () => void,
    style: any
}

const AlternativeItem: React.StatelessComponent<IProps> = (props) => {
    return (
        <TouchableHighlight onPress={props.onPress}
            style={[style.alternativeItem.rectMainInfo, props.style]}>
            <Text style={style.alternativeItem.textAlternative}>
                {props.alternativeText}
            </Text>
        </TouchableHighlight>
    )
}

export default AlternativeItem;