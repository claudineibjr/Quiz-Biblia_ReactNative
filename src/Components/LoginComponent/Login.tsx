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
            Button } from 'native-base';

// Components
import { TypeRegister } from '../../Pages/MainLogin';

// Model

// Services

// Icons

// Enums

// Interfaces
interface IProps {
    dispatch?: any,
    handleMainButton: (typeRegister: TypeRegister, userInfo: {email: string, password: string, name?: string}) => void
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

    // Components LifeCycle
    componentDidMount = () => {
        
    }

    // Handlers
    handleChangeEmail = (newEmail) => this.setState({email: newEmail});
    handleChangePassword = (newPassword) => this.setState({password: newPassword});

    handleLogin = async () => {
        const {handleMainButton} = this.props;
        await handleMainButton(TypeRegister.LOGIN, {email: this.state.email, password: this.state.password});
    }

    render(){
        return(
            <Container style={style.mainContainer}>
                <Item inlineLabel>
                    <Label style={style.label}>E-mail</Label>
                    <Input
                        textContentType="emailAddress"
                        autoCapitalize='none'
                        keyboardType='email-address'
                        style={style.input}
                        onChangeText = {(newText) => this.handleChangeEmail(newText) }
                        autoCompleteType="email"/>
                </Item>

                <Item inlineLabel>
                    <Label style={style.label}>Senha</Label>
                    <Input
                        textContentType="password"
                        autoCapitalize='none'
                        secureTextEntry
                        style={style.input}
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