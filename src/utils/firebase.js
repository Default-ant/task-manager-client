import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_FIREBASE_API_KEY,

  authDomain: "task-manager-d68db.firebaseapp.com",
  projectId: "task-manager-d68db",
  storageBucket: "task-manager-d68db.firebasestorage.app",
  messagingSenderId: "413160665038",
  appId: "1:413160665038:web:41d02ab4ece554ef8f859f",
  measurementId: "G-Q2VDSFKEM7"
};


export const app = initializeApp(firebaseConfig);
