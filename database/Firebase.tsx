import * as firebase from 'firebase';
import 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyCqIY5R_g5kw5t9-6lr_78GZCkKBk3nnNk",
    authDomain: "foodtime-7a19f.firebaseapp.com",
    databaseURL: "https://foodtime-7a19f.firebaseio.com",
    projectId: "foodtime-7a19f",
    storageBucket: "foodtime-7a19f.appspot.com",
    messagingSenderId: "907444219415",
    appId: "1:907444219415:web:15cbdc455be6216dc27652",
    measurementId: "G-LXS8VBC5BT"
};

firebase.initializeApp(firebaseConfig);

export const dbh = firebase.firestore();
