import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyCBUUwb5U63LvPqmgIdAVtl0dBxkJqdUMY",
    authDomain: "flappybird-d5247.firebaseapp.com",
    projectId: "flappybird-d5247",
    storageBucket: "flappybird-d5247.firebasestorage.app",
    messagingSenderId: "749871988309",
    appId: "1:749871988309:web:b7b84a6560e5d8e3241edc",
    measurementId: "G-GNL0PKNQX1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
