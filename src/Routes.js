import React, {Component} from 'react';

import { Router, Scene, Stack } from 'react-native-router-flux';

import MainLogin from './Pages/MainLogin';
import Play from './Pages/Play';

const Routes = () => (
    <Router>
        <Stack key = "root">
            <Scene key = "MainLogin" hideNavBar component = {MainLogin} title = "Login" initial = {true} />
            <Scene key = "Play" hideNavBar component = {Play} title = "Play"/>
        </Stack>
    </Router>
);

export default Routes;