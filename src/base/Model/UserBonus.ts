export default class UserBonus{
    moreTime: number;
    lessAlternatives: number;
    showBiblicalReference: number;
    lastBonusReceived: Date;

    constructor(moreTime?: number, lessAlternatives?: number, showBiblicalReference?: number, lastBonusReceived?: Date){
        this.moreTime = moreTime === undefined ? 0 : moreTime;
        this.lessAlternatives = lessAlternatives === undefined ? 0 : lessAlternatives;
        this.showBiblicalReference = showBiblicalReference === undefined ? 0 : showBiblicalReference;
        this.lastBonusReceived = lastBonusReceived === undefined ? new Date() : lastBonusReceived;
    }
}