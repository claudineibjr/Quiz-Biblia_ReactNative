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
import { View, TextInput, Keyboard } from 'react-native';
import LoadingComponent from '../LoadingComponent';

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
    name: string,
    password: string,
    loading: boolean
}

class RegisterComponent extends Component<IProps, IState> {
    constructor(props: IProps){
        super(props);

        this.state = {
            email: '',
            name: '',
            password: '',
            loading: false
        };
    }

    // Handlers
    handleChangeEmail = (newEmail) => this.setState({email: newEmail});
    handleChangeName = (newName) => this.setState({name: newName});
    handleChangePassword = (newPassword) => this.setState({password: newPassword});

    handleRegister = async () => {
        const filledFields = this.state.email.length > 0 && this.state.name.length > 0 && this.state.password.length > 0;
        if (filledFields){
            Keyboard.dismiss();
            this.setState({loading: true});

            try{
                const createdUser = await UserServices.createUser(this.state.email, this.state.name, this.state.password);
            } catch (error) {

            } finally {
                this.setState({loading: false});
            }
        }
    }

    render(){
        return(
            <Container style={style.mainContainer} pointerEvents = {this.state.loading ? 'none' : 'auto'}>
                <Item inlineLabel>
                    <Label>Nome</Label>
                    <Input
                        textContentType='name'
                        autoCapitalize='words'
                        value={this.state.name}
                        onChangeText = {(newText) => this.handleChangeName(newText) }
                        autoCompleteType='name'/>
                </Item>

                <Item inlineLabel>
                    <Label>E-mail</Label>
                    <Input
                        textContentType='emailAddress'
                        autoCapitalize='none'
                        keyboardType='email-address'
                        value={this.state.email}
                        onChangeText = {(newText) => this.handleChangeEmail(newText) }
                        autoCompleteType='email'/>
                </Item>

                <Item inlineLabel>
                    <Label>Senha</Label>
                    <Input
                        textContentType="password"
                        autoCapitalize='none'
                        secureTextEntry
                        value={this.state.password}
                        onChangeText = {(newText) => this.handleChangePassword(newText) }
                        autoCompleteType='password'/>
                </Item>

                <Button block style={style.registerButtons} onPress={this.handleRegister}>
                    <Text style={style.buttonText}>
                        Cadastrar
                    </Text>
                </Button>

                {this.state.loading && 
                    <LoadingComponent/>
                }

            </Container>
        );
    }
}

export default RegisterComponent;
//export default connect((state: IStore) => ({
//    }) ) (RegisterComponent)