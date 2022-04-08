import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyAmwTC9F4VRREPOvulD6ayNXViC70hBeUs",
  authDomain: "chat-app-5a411.firebaseapp.com",
  projectId: "chat-app-5a411",
  storageBucket: "chat-app-5a411.appspot.com",
  messagingSenderId: "662802534060",
  appId: "1:662802534060:web:4a964967068de86bfb1909",
  measurementId: "G-EQ08C3QGWE",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getDatabase(app);
