// React Imports
import React, { Component } from 'react';

// React Native components
import { View, Image, Keyboard } from 'react-native';

// Redux
//import { connect } from 'react-redux';
//import store, { IStore } from '../../Store/index';
//import * as Actions from '../../Store/actions';

// Styles
//import './styles.css';
import style from './styles';
import {colors, fonts} from '../../Styles';

// Native-Base Components
import {    Container, Body, Button, Footer, FooterTab, Text} from 'native-base';

// Components
import LoginComponent from '../../Components/LoginComponent/Login';
import RegisterComponent from '../../Components/LoginComponent/Register';
import { Actions as RouterActions } from 'react-native-router-flux';

// Model
import User from '../../Model/User';
import UserServices from '../../Services/UserServices';
import LoadingComponent from '../../Components/LoadingComponent';

// Services

// Icons

// Enums
export enum TypeRegister {
    LOGIN,
    REGISTER
}

// Interfaces
interface IProps {
    dispatch: any,
    userAuthenticated?: User
}

interface IState {
    selectedTab: TypeRegister,
    loading: boolean
}

class MainLogin extends Component<IProps, IState> {
    constructor(props: IProps){
        super(props);

        this.state = {
            selectedTab: TypeRegister.LOGIN,
            loading: false
        };
    }

    // Components handlers
    switchTab = (tab: TypeRegister) => {
        if (tab !== this.state.selectedTab)
            this.setState({selectedTab: tab});
    }

    handleLogin = async (typeRegister: TypeRegister, userInfo: {email: string, password: string, name?: string}) => {
        let filledFields = false;
        if (typeRegister === TypeRegister.LOGIN)
            filledFields = userInfo.email.length > 0 && userInfo.password.length > 0;
        else if (typeRegister === TypeRegister.REGISTER)
            filledFields = userInfo.email.length > 0 && userInfo.name.length > 0 && userInfo.password.length > 0;
        
        if (filledFields){
            Keyboard.dismiss();
            this.setState({loading: true});
             
            try{
                let user: User;
                if (typeRegister === TypeRegister.LOGIN)
                    user = await UserServices.loginUser(userInfo.email, userInfo.password);
                else if (typeRegister === TypeRegister.REGISTER)
                    user = await UserServices.createUser(userInfo.email, userInfo.name, userInfo.password);
                
                RouterActions.Play();
            } catch (error) {
                 
            } finally {
                this.setState({loading: false});
            }
        }
    }

    // Rendering
    renderComponent = () => {
        return (
            <>
                <View style={style.childComponent}>
                    {this.state.selectedTab === TypeRegister.LOGIN && 
                        <LoginComponent handleMainButton={this.handleLogin}/>
                    }

                    {this.state.selectedTab === TypeRegister.REGISTER && 
                        <RegisterComponent handleMainButton={this.handleLogin}/>
                    }
                </View>
                
                {this.state.loading &&
                    <LoadingComponent
                        spinnerColor = {colors.white}
                        textColor = {colors.white}
                        textSize = {fonts.big_2}/>
                }
            </>
        )
    }

    render(){
        return(
            <Container style={style.mainComponent} pointerEvents = {this.state.loading ? 'none' : 'auto'}>
                <Body>
                    {this.renderComponent()}
                </Body>
                <Footer>
                    <FooterTab style={style.footerTab}>
                        <Button onPress={() => this.switchTab(TypeRegister.LOGIN)}>
                            <Text style={this.state.selectedTab === TypeRegister.LOGIN ? style.selectedTab : style.footerTabText}>
                                Entrar
                            </Text>
                        </Button>
                        <Button onPress={() => this.switchTab(TypeRegister.REGISTER)}>
                            <Text style={this.state.selectedTab === TypeRegister.REGISTER ? style.selectedTab : style.footerTabText}>
                                Criar conta
                            </Text>
                        </Button>
                    </FooterTab>
                </Footer>
            </Container>
        );
    }
}

export default MainLogin;
//export default connect((state: IStore) => ({
//    userAuthenticated: state.userAuthenticated}) ) (MainLogin)