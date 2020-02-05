// React
import React, { Component } from "react";

import {View, Text} from 'react-native';

// Native-Base
import { Spinner } from 'native-base';

// Stylesheet
import styles from './styles';

export interface Props {
    textColor: string,
    spinnerColor: string,
    textSize: number
}

const LoadingComponent = (props: Props) => (
    <View style={styles.container}>
        <Text style={{color: props.textColor, fontSize: props.textSize}}>Carregando...</Text>
        <Spinner
            color={props.spinnerColor}
            size = 'large'/>
    </View>
);

export default LoadingComponent;