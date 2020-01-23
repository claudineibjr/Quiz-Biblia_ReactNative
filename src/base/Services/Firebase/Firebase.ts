import * as firebase from 'firebase';
import 'firebase/firestore';
import ConfidentialInfo from './ConfidentialInfo';

export function initializeFirebase(): void{
    for (const _firebaseApp of firebase.apps) {
        if (_firebaseApp.name === '[DEFAULT]')
            return;
    }
    firebase.initializeApp(ConfidentialInfo.firebaseConfig);
}

export function cloudFirestore(): firebase.firestore.Firestore {
    return firebase.firestore();
}

export const firebaseApp = firebase;