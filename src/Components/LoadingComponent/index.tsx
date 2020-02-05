// React
import React, { Component } from "react";

import {View, Text} from 'react-native';

// Native-Base
import { Spinner } from 'native-base';

// Stylesheet
import styles from './styles';

export interface Props {
    
}

const LoadingComponent = (props: Props) => (
    <View style={styles.container}>
        <Text>Carregando...</Text>
        <Spinner
            color='#303F9F'
            size = 'large'/>
    </View>    
);

export default LoadingComponent;