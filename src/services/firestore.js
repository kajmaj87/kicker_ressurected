import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyCzO1tFIPeqvvUhb_wz7xydzjXQIM6Ck2o",
    authDomain: "kicker-app-9cd86.firebaseapp.com",
    projectId:  "kicker-app-9cd86",
    storageBucket: "kicker-app-9cd86.appspot.com",
    messagingSenderId: "269451121959",
    appId:"1:269451121959:web:cc44393a0239a532bd4502",
    measurementId: "G-ELFGF2JKB9"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();


export const getRankingList = company => {
    return db.collection("rank").orderBy("group ", "asc").get();
};


export const getGroupList = () => {
    return db.collection("group").orderBy("name ", "asc").get();
};


export const addResultToRankingList = (userNameArray, company, result) => {
    return db.collection('rankingList')
        .doc(company)
        .update({
            //TODO

            // BSZ WIN 
        });
};

