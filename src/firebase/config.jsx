import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore} from "firebase/firestore";
import { Firestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAgelEsqJOCopKHOn6XrvvDqdpjeb7O2d8",
  authDomain: "facebook-clone-ffe18.firebaseapp.com",
  projectId: "facebook-clone-ffe18",
  storageBucket: "facebook-clone-ffe18.appspot.com",
  messagingSenderId: "768137920187",
  appId: "1:768137920187:web:c5e739365f7247c6e2b39e",
  measurementId: "G-4MS4FPMFVX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore(app)
export const auth = getAuth()
