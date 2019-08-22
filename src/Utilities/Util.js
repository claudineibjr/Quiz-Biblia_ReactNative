import Question from '../Model/Question';

/*export function getPixelSize(pixels) {
    return Platform.select({
        ios: pixels,
        android: PixelRatio.getPixelSizeForLayoutSize(pixels)
    });
}*/

/**
 * @param {Array<String>} alternatives
 * @param {Number} correctAnswer
 */
export function shuffle(alternatives, correctAnswer){
    let numbers = [0, 1, 2, 3];
    for(let j, x, i = numbers.length; i; j = parseInt(Math.random() * i), x = numbers[--i], numbers[i] = numbers[j], numbers[j] = x);

    let newCorrectAnswer = numbers.findIndex(num => num === correctAnswer);

    let newAlternatives = new Array();
    for (let iCount = 0; iCount <= 3; iCount++)
        newAlternatives.push(alternatives[iCount]);

    return {alternatives: newAlternatives, correctAnswer: newCorrectAnswer}
}

/**
 * @param {Question} question
 * @returns {Question}
 */
export function shuffleAlternatives(question){
    const { alternatives, correctAnswer } = shuffle(question.alternatives, question.answer);

    question.alternatives = alternatives;
    question.answer = correctAnswer;

    return question;
}