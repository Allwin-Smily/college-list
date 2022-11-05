import { initializeApp } from "firebase/app";
// import {getAuth} from 'firebase/auth'

const firebaseConfig = {
    apiKey: "AIzaSyCxHIqFw8yMopvsNaonBP-PYaNpvMoSNvI",
    authDomain: "college-list-cb792.firebaseapp.com",
    projectId: "college-list-cb792",
    storageBucket: "college-list-cb792.appspot.com",
    messagingSenderId: "1016154406202",
    appId: "",
    measurementId: ""
};

export const app = initializeApp(firebaseConfig);

// export const auth = getAuth(app)