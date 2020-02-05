import { StyleSheet } from 'react-native';
import {colors, fonts} from '../../Styles';

const style = StyleSheet.create({
    mainComponent: {
        backgroundColor: colors.primary_s1,
    },
    
    footerTab: {
        backgroundColor: colors.primary_s2,
    },

    footerTabText:{
        fontSize: fonts.small_1,
        color: colors.primary_w5
    },

    selectedTab: {
        fontSize: fonts.big,
        color: colors.white_2
    },

    childComponent: {
        display: 'flex',
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },

    alertInfoIcon: {
        fontSize: 60,
        textAlign: 'center',
        color: colors.terciary_s1
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