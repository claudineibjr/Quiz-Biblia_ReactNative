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

// Model

// Services
import { TypeRegister } from '../../Pages/MainLogin';

// Icons

// Enums

// Interfaces
interface IProps {
    dispatch?: any,
    handleMainButton: (typeRegister: TypeRegister, userInfo: {email: string, password: string, name?: string}) => void
}

interface IState {
    email: string,
    name: string,
    password: string
}

class RegisterComponent extends Component<IProps, IState> {
    constructor(props: IProps){
        super(props);

        this.state = {
            email: '',
            name: '',
            password: ''
        };
    }

    // Handlers
    handleChangeEmail = (newEmail) => this.setState({email: newEmail});
    handleChangeName = (newName) => this.setState({name: newName});
    handleChangePassword = (newPassword) => this.setState({password: newPassword});

    handleRegister = () => {
        const{handleMainButton} = this.props;
        handleMainButton(TypeRegister.REGISTER, {email: this.state.email, password: this.state.password, name: this.state.name});
    }

    render(){
        return(
            <Container style={style.mainContainer}>
                <Item inlineLabel>
                    <Label style={style.label}>Nome</Label>
                    <Input
                        textContentType='name'
                        autoCapitalize='words'
                        value={this.state.name}
                        style={style.input}
                        onChangeText = {(newText) => this.handleChangeName(newText) }
                        autoCompleteType='name'/>
                </Item>

                <Item inlineLabel>
                    <Label style={style.label}>E-mail</Label>
                    <Input
                        textContentType='emailAddress'
                        autoCapitalize='none'
                        keyboardType='email-address'
                        value={this.state.email}
                        style={style.input}
                        onChangeText = {(newText) => this.handleChangeEmail(newText) }
                        autoCompleteType='email'/>
                </Item>

                <Item inlineLabel>
                    <Label style={style.label}>Senha</Label>
                    <Input
                        textContentType="password"
                        autoCapitalize='none'
                        secureTextEntry
                        value={this.state.password}
                        style={style.input}
                        onChangeText = {(newText) => this.handleChangePassword(newText) }
                        autoCompleteType='password'/>
                </Item>

                <Button block style={style.registerButtons} onPress={this.handleRegister}>
                    <Text style={style.buttonText}>
                        Cadastrar
                    </Text>
                </Button>

            </Container>
        );
    }
}

export default RegisterComponent;
//export default connect((state: IStore) => ({
//    }) ) (RegisterComponent)