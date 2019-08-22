/*import React, { Component } from 'react';

import {createStackNavigator, createAppContainer} from 'react-navigation';

import HomeScreen from './Routes_example/HomeScreen';
import ProfileScreen from './Routes_example/ProfileScreen';

import LoginMain from "./Pages/LoginMain";
import Main from "./Pages/Main";

const MainNavigator = createStackNavigator({
  LoginMain: {screen: LoginMain},
  Main: {screen: Main},
});

const Routes = createAppContainer(MainNavigator);

export default Routes;*/

import React, { Component } from 'react';
import {View, Text} from 'react-native';

import Play from './Pages/Play';

export default class Routes extends Component{
    render(){
        return <Play/>
    }
}