import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBiqCL_Zx8AmN9FwijvwXJpwneC_3msfgY",
  authDomain: "chat-app-5d336.firebaseapp.com",
  projectId: "chat-app-5d336",
  storageBucket: "chat-app-5d336.appspot.com",
  messagingSenderId: "975675339002",
  appId: "1:975675339002:web:188aa566531b40d20b9943",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);

// Initialize Cloud Storage and get a reference to the service
const storage = getStorage(app);

export { app, auth, storage, db };
