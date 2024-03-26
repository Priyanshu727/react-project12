// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBuZ7N8wxc70X5-Hk2yMpvKEMO5SwyFBas",
    authDomain: "pr12-6bb66.firebaseapp.com",
    databaseURL: "https://pr12-6bb66-default-rtdb.firebaseio.com",
    projectId: "pr12-6bb66",
    storageBucket: "pr12-6bb66.appspot.com",
    messagingSenderId: "956236233660",
    appId: "1:956236233660:web:ef41838d07a70bf5af89b9",
    measurementId: "G-D8437H25WE"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const database = getFirestore(app);