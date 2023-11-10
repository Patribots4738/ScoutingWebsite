import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';


// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyADPvITfvuVYqQA5NWhdZeyw_fcA62rii4",
    authDomain: "scouting-website-ee380.firebaseapp.com",
    databaseURL: "https://scouting-website-ee380-default-rtdb.firebaseio.com",
    projectId: "scouting-website-ee380",
    storageBucket: "scouting-website-ee380.appspot.com",
    messagingSenderId: "415208050900",
    appId: "1:415208050900:web:674769095c12e3eaab6b41",
    measurementId: "G-NR2HGV6G2G"
  };
  
    // Initialize Firebase
    const app = initializeApp(firebaseConfig);

    export const db = getDatabase(app);