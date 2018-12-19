import firebase from 'firebase';
import 'firebase/firestore';
const firebaseConfig = {
    apiKey: "AIzaSyDdo6_iyMusWAjxvvEwjry18_F6vrjxSXM",
    authDomain: "chenrevents.firebaseapp.com",
    databaseURL: "https://chenrevents.firebaseio.com",
    projectId: "chenrevents",
    storageBucket: "chenrevents.appspot.com",
    messagingSenderId: "604331651589"
}

firebase.initializeApp(firebaseConfig);

const firestore = firebase.firestore();
const settings = {
    timestampsInSnapshots: true
}

firestore.settings(settings);

export default firebase;