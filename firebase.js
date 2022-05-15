import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyAu60T-ZRyLvFoseYpY8-gpz8zVfvyLalE",
    authDomain: "whatsapp2-408c9.firebaseapp.com",
    projectId: "whatsapp2-408c9",
    storageBucket: "whatsapp2-408c9.appspot.com",
    messagingSenderId: "902256579175",
    appId: "1:902256579175:web:f516a97f396f0657d8bac2"
  };

const app = !firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app();

const db = app.firestore();
const auth = app.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { db, auth, provider };