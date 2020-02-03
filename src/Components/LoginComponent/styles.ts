import { StyleSheet } from 'react-native';

const style = StyleSheet.create({
    mainContainer: {
        padding: 20,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },

    registerButtons: {
        marginTop: 16,
        backgroundColor: '#303F9F'
    },

    forgetPasswordButton: {
        marginTop: 4
    },

    forgetPasswordButtonText: {
        flex: 1,
        textAlign: 'right'
    },
    
    buttonText: {
        fontSize: 18
    }

});

export default style;