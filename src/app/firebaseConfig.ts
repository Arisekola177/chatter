
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBVlk7KPEIW4iqHh95vhc-uepcj_8jLxAA",
  authDomain: "chatter-fc517.firebaseapp.com",
  projectId: "chatter-fc517",
  storageBucket: "chatter-fc517.appspot.com",
  messagingSenderId: "845528325415",
  appId: "1:845528325415:web:95c0ce508b78e14ba39d02"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
export {storage}