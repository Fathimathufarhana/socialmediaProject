// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAuth } from "firebase/auth";
import { getAuth, GoogleAuthProvider} from "firebase/auth";
// import 'firebase/compat/firestore'
// import {firebase} from "firebase/app"
// import 'firebase/firestore'
// import 'firebase/auth'

// import { useAuthState } from "react-firebase-hooks/auth"
// import { useCollectionData } from 'react-firebase-hooks/firestore'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCz59T86TWv3_PL81kN12GYJku_xQnlkNM",
  authDomain: "otp-project-e88c3.firebaseapp.com",
  projectId: "otp-project-e88c3",
  storageBucket: "otp-project-e88c3.appspot.com",
  messagingSenderId: "474988040403",
  appId: "1:474988040403:web:d7a49312083c43a5838426",
  measurementId: "G-7F1SSMRSFQ"
};

// Initialize Firebase
// const app = initializeApp(firebaseConfig);

// // export const auth = getAuth(app);
// const auth = getAuth(app)
// const provider = new GoogleAuthProvider()
// const firestore = app.firestore()

// export {auth, provider}
// export default {firestore}


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
// const firestore = app.firestore(); // Use app.firestore() instead of firebase.firestore()

export { app, auth, provider};
// export default firestore