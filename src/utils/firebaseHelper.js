import { initializeApp } from "firebase/app";



export const getFirebaseApp = () => {
  // Import the functions you need from the SDKs you need

  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: "AIzaSyB_5HSCnDhVWgjIlfzmpzgUrQbJlYEebgQ",
    authDomain: "whatsapp-8e81e.firebaseapp.com",
    projectId: "whatsapp-8e81e",
    storageBucket: "whatsapp-8e81e.appspot.com",
    messagingSenderId: "124852248636",
    appId: "1:124852248636:web:58b37540f91545389fe339",
    measurementId: "G-0N25C9NMKC",
  };

  // Initialize Firebase
  return initializeApp(firebaseConfig);
};
