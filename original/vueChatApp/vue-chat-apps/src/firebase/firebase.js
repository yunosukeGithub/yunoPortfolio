// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBlNvQX8nUbiP5i-sMFMMSok-ixty8ojHA",
  authDomain: "vue-chat-apps-fb4fd.firebaseapp.com",
  projectId: "vue-chat-apps-fb4fd",
  storageBucket: "vue-chat-apps-fb4fd.appspot.com",
  messagingSenderId: "652722160767",
  appId: "1:652722160767:web:7f61fdcf5884b19fd1eb4a",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);

// Initialize Cloud Storage and get a reference to the service
const storage = getStorage(app);

export { db, auth, storage };
