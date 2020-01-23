export default class Timer {
    reactComponent?: React.Component;
    isOn: boolean;
    maxTime: number;
    timeLeft: number;
    private endTimerCallBack: () => void;
    private timerTickCallBack: () => void;

    constructor(maxTime: number, endTimerCallBack: () => void, timerTickCallBack: () => void, reactComponent?: React.Component, isOn?: boolean){
        this.reactComponent = reactComponent;
        this.isOn = (isOn === undefined) ? false : isOn!;
        this.maxTime = maxTime;
        this.timeLeft = maxTime;
        this.endTimerCallBack = endTimerCallBack;
        this.timerTickCallBack = timerTickCallBack;

        if (isOn)
            this.startTimer();
    }

    startTimer = () => {
        this.isOn = true;
        this.countDownTimer();
    }
    
    stopTimer = async (endTimer: boolean = false) => {
        clearInterval(this.countDownTimer());
        this.isOn = false;
        
        if (endTimer)
            this.endTimerCallBack();

        //await Timer.sleep(1000);
        if (this.reactComponent)
            this.reactComponent!.forceUpdate();
    }

    resetTimer = () => {
        this.stopTimer();
        this.timeLeft = this.maxTime;
    }

    countDownTimer = () => {
        let timerTick = setInterval(() => {
            if (this.isOn){
                if (this.timeLeft === 0){
                    this.stopTimer(true);
                }else{
                    this.timeLeft -= 1;
                    this.timerTickCallBack();
                    if (this.reactComponent)
                        this.reactComponent!.forceUpdate();
                    
                }
            }
        }, 1000);

        return timerTick;
    }
    
    static sleep = (milliseconds: number) => {
        return new Promise((resolve) => {
            setTimeout(() => resolve(), 1000);
        });
    }
}