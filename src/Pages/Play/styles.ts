import { StyleSheet } from 'react-native';

const style = StyleSheet.create({
    questionTextContainer:{
        
    },

    questionText: {
        fontSize: 18,
        textAlign: 'center'
    },

    buttonAlternative:{
        width: '100%',
        margin: 4,
        padding: 2
    },

    buttonAlternativeText:{
        fontSize: 14,
        textAlign: 'center',
        color: '#ffffff'
    },

    containerQuestionInfo: {
        display: 'flex',
        flexDirection: 'column',
        margin: 10
    },

    containerAlternatives: {
        marginTop: 10
    },

    timerText: {
        fontSize: 18,
        color: '#efefef'
    },

    powerUPButtons:{

    },

    itemPowerUPButton: {
        color: '#efefef',
        fontSize: 32,
        paddingLeft: 6
    },

    correctAnswerIcon: {
        fontSize: 60,
        textAlign: 'center',
        color: 'green',
    },

    incorretAnswerIcon: {
        fontSize: 60,
        textAlign: 'center',
        color: 'red',
    },

    alertInfoTitle: {
        fontSize: 22,
        textAlign: 'center'
    },

    alertInfoMessage: {
        marginTop: 4,
        fontSize: 16
    }
});

export default style;