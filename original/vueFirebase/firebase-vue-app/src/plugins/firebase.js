// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDVe9vldMOBTKSW-VPmiOYcFS_pGMgVnRA",
  authDomain: "fir-vue-app-34035.firebaseapp.com",
  projectId: "fir-vue-app-34035",
  storageBucket: "fir-vue-app-34035.appspot.com",
  messagingSenderId: "503114708361",
  appId: "1:503114708361:web:dba7a40b49c9a216945d58",
  measurementId: "G-27Y1EWTK0V"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
getAnalytics(app);