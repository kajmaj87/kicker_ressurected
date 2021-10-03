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
    return db.collection("user").where("group", "==", company).get();
};


export const getGroupList = company => {
    return db.collection("group").orderBy("name", "asc").get();
};


export const addMatch = (userNameArrayLosers, userNameArrayWinners, group) => {
    userNameArrayLosers = userNameArrayLosers.split(',');
    userNameArrayWinners = userNameArrayWinners.split(',');
    return db.collection('match')
        .add({
            "data": new Date(),
            "losers": userNameArrayLosers,
            "winners": userNameArrayWinners,
            "group": group
        });
};

export const createGroup = (groupName, groupSecret) => {
    return db.collection('group')
        .add({
            "name": groupName,
            "password": groupSecret
        });
};


export const getMatchList = company => {
    return db.collection("match")
        .where("group", "==", company).get();
};

export const getGroupPass = (groupName) => {
    return db.collection('group').where("name", "==", groupName).get();
};

