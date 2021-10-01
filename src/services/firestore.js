import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
    apiKey: process.env.REACT_APP_APIKEY,
    authDomain: process.env.REACT_APP_AUTHDOMAIN,
    projectId: process.env.REACT_APP_PROJECTID,
    storageBucket: process.env.REACT_APP_STORAGEBUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGINGSENDERID,
    appId: process.env.REACT_APP_APPID,
    measurementId: process.env.REACT_APP_MEASUREMENTID
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();


export const getRankingList = company => {
    const list = [];
    db.collection("rank").orderBy("group ", "asc").get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            list.push(doc.data());
        });
        
    });
    return list;
};




export const addResultToRankingList = (userNameArray, company, result) => {
    return db.collection('rankingList')
        .doc(company)
        .update({
            //TODO

            // BSZ WIN 
        });
};

