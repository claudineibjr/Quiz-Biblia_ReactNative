import {StyleSheet} from 'react-native';

const questionInfoBoxHeight = 160;
const questionAlternativeBoxHeight = 55;

const style = {
    questionInfo: StyleSheet.create({
        rectMainInfo: {
            height: questionInfoBoxHeight,
            backgroundColor: '#efefef',
            borderRadius: 10,
            padding: 4,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between'
        },
    
        textQuestion: {
            fontSize: 22,
            textAlign: 'center',
            padding: 6
        },
    
        questionDetails: {
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            margin: 4
        },
    }),

    alternativeItem: StyleSheet.create({
        rectMainInfo: {
            marginTop: 10,
            padding: 6,
            height: questionAlternativeBoxHeight,
            borderRadius: 6,
            justifyContent: 'center'
        },

        textAlternative: {
            fontSize: 16,
            textAlign: 'center',
            padding: 6
        },
    })
};

export default style;