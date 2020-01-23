import UserBonus from "./UserBonus";
import UserPreferences from "./UserPreferences";

export default class User {
    uid: string;
    email: string;
    name: string;
    answered: Array<number>;
    score: number;
    lastPlay: Date;
    firstAccess: Date;
    bonus: UserBonus;
    preferences: UserPreferences;

    constructor(email: string, name: string) {
        this.email = email;
        this.name = name;

        this.answered = new Array<number>();
        this.score = 0;
        this.lastPlay = new Date();
        this.firstAccess = new Date();
        this.bonus = new UserBonus();
        this.preferences = new UserPreferences();
        this.uid = '';
    }

    addAnswered(questionNumber: number): void {
        this.answered.push(questionNumber);
    }


}