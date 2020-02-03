// React Imports
import React, { Component } from 'react';

// Redux
//import { connect } from 'react-redux';
//import store, { IStore } from '../../Store/index';
//import * as Actions from '../../Store/actions';

// Styles
//import './styles.css';
import style from './styles';

// Native-Base Components
import {    Container, Text, Item, Input, Label,
            Button, Content } from 'native-base';

// Components
import { View, TextInput } from 'react-native';

// Model

// Services

// Icons

// Enums

// Interfaces
interface IProps {
    dispatch?: any
}

interface IState {
    
}

class LoginRegister extends Component<IProps, IState> {
    constructor(props: IProps){
        super(props);

        this.state = {
            
        };
    }

    render(){
        return(
            <Container style={style.mainContainer}>
                <Item inlineLabel>
                    <Label>E-mail</Label>
                    <Input
                        textContentType="emailAddress"
                        autoCapitalize='none'
                        keyboardType='email-address'
                        autoCompleteType="email"/>
                </Item>

                <Item inlineLabel>
                    <Label>Senha</Label>
                    <Input
                        textContentType="password"
                        autoCapitalize='none'
                        secureTextEntry
                        autoCompleteType="password"/>
                </Item>

                <Button transparent block style={style.forgetPasswordButton}>
                    <Text style={style.forgetPasswordButtonText}>
                        Esqueceu sua senha?
                    </Text>
                </Button>
                

                <Button block style={style.registerButtons}>
                    <Text style={style.buttonText}>
                        Entrar
                    </Text>
                </Button>

            </Container>
        );
    }
}

export default LoginRegister;
//export default connect((state: IStore) => ({
//    }) ) (LoginRegister)