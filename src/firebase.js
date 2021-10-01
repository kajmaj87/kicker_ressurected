// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCzO1tFIPeqvvUhb_wz7xydzjXQIM6Ck2o",
  authDomain: "kicker-app-9cd86.firebaseapp.com",
  projectId: "kicker-app-9cd86",
  storageBucket: "kicker-app-9cd86.appspot.com",
  messagingSenderId: "269451121959",
  appId: "1:269451121959:web:cc44393a0239a532bd4502",
  measurementId: "G-ELFGF2JKB9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);



/// CREATE AND ADD .env.development file 
///  apiKey: `${process.env.APIKEY}` ... 