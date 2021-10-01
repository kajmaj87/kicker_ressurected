import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyCejCxyBSOJ7WMboCu8GDkkPyXzbUASuew",
    authDomain: "kicker-olama.firebaseapp.com",
    projectId: "kicker-olama",
    storageBucket: "kicker-olama.appspot.com",
    messagingSenderId: "489009171392",
    appId: "1:489009171392:web:72936f3d219a77d2701625"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();


export const getRankingList = company => {
    return db.collection("user").orderBy("name", "asc").where("group", "==", company).get();
};


export const getGroupList = company => {
    return db.collection("group").orderBy("name", "asc").get();
};


export const addResultToRankingList = (userNameArray, company, result) => {
    return db.collection('rankingList')
        .doc(company)
        .update({
            //TODO

            // BSZ WIN 
        });
};

