import { StyleSheet } from 'react-native';
import {colors, fonts} from '../../Styles';

const style = StyleSheet.create({
    mainComponent: {
        backgroundColor: colors.primary_s1,
    },
    
    footerTabText:{
        fontSize: fonts.small_1,
        color: colors.primary_w5
    },

    footerTab: {
        backgroundColor: colors.primary_s2
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
    }
});

export default style;