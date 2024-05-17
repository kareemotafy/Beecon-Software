// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCIB8GeCh0hNUihhEy3AKFxrFbvK3YAcYk",
  authDomain: "iotbeehive-9e6e7.firebaseapp.com",
  databaseURL:
    "https://iotbeehive-9e6e7-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "iotbeehive-9e6e7",
  storageBucket: "iotbeehive-9e6e7.appspot.com",
  messagingSenderId: "619297618857",
  appId: "1:619297618857:web:bc8daeb694db88e42f62b8",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

export const rtdbClient = getDatabase(app);
export const db = getFirestore(app);
export default { rtdbClient, db };
