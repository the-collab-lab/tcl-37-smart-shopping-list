import { initializeApp } from 'firebase/app';

const firebaseConfig = {
  apiKey: process.env.API_KEY,
  authDomain: 'tcl-37-smart-shopping-list.firebaseapp.com',
  projectId: 'tcl-37-smart-shopping-list',
  storageBucket: 'tcl-37-smart-shopping-list.appspot.com',
  messagingSenderId: '867331867909',
  appId: '1:867331867909:web:c5268888f54fa923ec236c',
};

const app = initializeApp(firebaseConfig);
