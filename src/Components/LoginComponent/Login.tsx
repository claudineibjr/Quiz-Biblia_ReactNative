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
import UserServices from '../../Services/UserServices';

// Icons

// Enums

// Interfaces
interface IProps {
    dispatch?: any
}

interface IState {
    email: string,
    password: string
}

class LoginRegister extends Component<IProps, IState> {
    constructor(props: IProps){
        super(props);

        this.state = {
            email: '',
            password: ''
        };
    }

    // Handlers
    handleChangeEmail = (newEmail) => this.setState({email: newEmail});
    handleChangePassword = (newPassword) => this.setState({password: newPassword});

    handleLogin = async () => {
        const filledFields = this.state.email.length > 0 && this.state.password.length > 0;
        if (filledFields){
            try{
                const createdUser = await UserServices.loginUser(this.state.email, this.state.password);
            } catch (error) {

            }
        }
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
                        onChangeText = {(newText) => this.handleChangeEmail(newText) }
                        autoCompleteType="email"/>
                </Item>

                <Item inlineLabel>
                    <Label>Senha</Label>
                    <Input
                        textContentType="password"
                        autoCapitalize='none'
                        secureTextEntry
                        onChangeText = {(newText) => this.handleChangePassword(newText) }
                        autoCompleteType="password"/>
                </Item>

                <Button transparent block style={style.forgetPasswordButton}>
                    <Text style={style.forgetPasswordButtonText}>
                        Esqueceu sua senha?
                    </Text>
                </Button>
                

                <Button block style={style.registerButtons} onPress={this.handleLogin}>
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