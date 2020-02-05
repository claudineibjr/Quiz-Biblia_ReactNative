import { StyleSheet } from 'react-native';
import {colors, metrics, fonts} from '../../Styles';

const style = StyleSheet.create({
    mainContainer: {
        padding: 20,
        backgroundColor: colors.white,
        maxHeight: metrics.screenHeight * 0.3,
        maxWidth: metrics.screenWidth * 0.95,
        display: 'flex',
        flex: 1,
        borderRadius: metrics.baseRadius
    },

    registerButtons: {
        marginTop: 16,
        backgroundColor: colors.secondary
    },

    forgetPasswordButton: {
        marginTop: 4
    },

    forgetPasswordButtonText: {
        flex: 1,
        textAlign: 'right',
        color: colors.primary_s1
    },
    
    buttonText: {
        fontSize: fonts.big_1
    },

    label: {
        color: colors.secondary_w1,
        fontSize: fonts.big_2,
        fontWeight: 'bold'
    },

    input: {
        color: colors.primary_s1,
        fontSize: fonts.big_1
    }

});

export default style;