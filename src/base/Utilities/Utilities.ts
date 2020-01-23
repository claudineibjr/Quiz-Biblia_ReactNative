export default class Utilities {
    static shuffleArray(array: Array<any>) {
        return array.sort(() => Math.random() - 0.5);
    }
}