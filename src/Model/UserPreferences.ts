export default class UserPreferences{
    sounds: boolean;
    vibration: boolean;

    constructor (sounds?: boolean, vibration?: boolean){
        this.sounds = sounds === undefined ? true : sounds!;
        this.vibration = vibration === undefined ? true : vibration!;
    }
}