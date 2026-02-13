import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Replace with your actual Firebase config
// These should be set in .env file for production
const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "your-api-key",
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "your-project.firebaseapp.com",
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "your-project-id",
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "your-project.appspot.com",
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "your-id",
    appId: import.meta.env.VITE_FIREBASE_APP_ID || "your-app-id"
};

let app;
try {
    console.log("Firebase: Initializing...");
    app = initializeApp(firebaseConfig);
} catch (error) {
    console.error("Firebase: Initialization failed!", error);
}

export const auth = app ? getAuth(app) : {};
export const db = app ? getFirestore(app) : {};
export const storage = app ? getStorage(app) : {};
export default app;
