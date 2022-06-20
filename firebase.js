

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAy4_7t6_9oaNaFemOYHXRozx-aRSi9vpM",
    authDomain: "todo-application-e6dec.firebaseapp.com",
    projectId: "todo-application-e6dec",
    storageBucket: "todo-application-e6dec.appspot.com",
    messagingSenderId: "1097417556449",
    appId: "1:1097417556449:web:07e7955e40c12c37ae52a0"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
const db = firebase.firestore();
