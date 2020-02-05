// React Imports
import React, { Component } from 'react';

// React Native components
import { View, Image } from 'react-native';
import { Actions } from 'react-native-router-flux';

// Redux
//import { connect } from 'react-redux';
//import store, { IStore } from '../../Store/index';
//import * as Actions from '../../Store/actions';

// Styles
//import './styles.css';
import style from './styles';

// Native-Base Components
import {    Container, Header, Body, Left, Right, 
            Content, Icon, Card, CardItem, ListItem,
            Button, List, Footer, FooterTab, Text} from 'native-base';

// Components
import LoginComponent from '../../Components/LoginComponent/Login';
import RegisterComponent from '../../Components/LoginComponent/Register';

// Model

// Services

// Icons

// Enums
enum Tab{
    LOGIN,
    REGISTER
}

// Interfaces
interface IProps {
    dispatch: any
}

interface IState {
    selectedTab: Tab
}

class MainLogin extends Component<IProps, IState> {
    constructor(props: IProps){
        super(props);

        this.state = {
            selectedTab: Tab.LOGIN
        };
    }

    renderComponent = () => {
        switch(this.state.selectedTab){
            case Tab.LOGIN:
                return (
                    <View style={style.childComponent}>
                        <LoginComponent/>
                    </View>
                );
            case Tab.REGISTER:
                return (
                    <View style={style.childComponent}>
                        <RegisterComponent/>
                    </View>
                );
        }
    }

    switchTab = (tab: Tab) => {
        if (tab !== this.state.selectedTab)
            this.setState({selectedTab: tab});
    }

    render(){
        return(
            <Container style={style.mainComponent}>
                <Body>
                    {this.renderComponent()}
                </Body>
                <Footer>
                    <FooterTab style={style.footerTab}>
                        <Button onPress={() => this.switchTab(Tab.LOGIN)}>
                            <Text style={this.state.selectedTab === Tab.LOGIN ? style.selectedTab : style.footerTabText}>
                                Entrar
                            </Text>
                        </Button>
                        <Button onPress={() => this.switchTab(Tab.REGISTER)}>
                            <Text style={this.state.selectedTab === Tab.REGISTER ? style.selectedTab : style.footerTabText}>
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
//    }) ) (MainLogin)