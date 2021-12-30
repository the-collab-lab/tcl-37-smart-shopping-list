// NOTE: import only the Firebase modules that you need in your app.
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// Initialize Firebase.
// These details will need to be replaced with the project specific env vars at the start of each new cohort.
const firebaseConfig = {
  apiKey: "AIzaSyB6NocfmcypQr5nceZYwdRt6zTLcUN8FjU",
  authDomain: "tcl-37-smart-shopping-list.firebaseapp.com",
  projectId: "tcl-37-smart-shopping-list",
  storageBucket: "tcl-37-smart-shopping-list.appspot.com",
  messagingSenderId: "867331867909",
  appId: "1:867331867909:web:c5268888f54fa923ec236c"
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore();
