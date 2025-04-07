import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { toast } from "react-toastify";

const firebaseConfig = {
  apiKey: "AIzaSyA2JOugUE5piQIGUyLE_F1-mVxKi6_H4KY",
  authDomain: "nextfix-fake.firebaseapp.com",
  projectId: "nextfix-fake",
  storageBucket: "nextfix-fake.firebasestorage.app",
  messagingSenderId: "1027370964280",
  appId: "1:1027370964280:web:6a628d21b481251b0d5dcd",
  measurementId: "G-KEE4VJ94S1",
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);

const signup = async (name, email, password) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;
    await addDoc(collection(db, "users"), {
      uid: user.uid,
      name,
      authProvider: "local",
      email,
    });
  } catch (error) {
    console.log(error);
    toast.error(error.code);
  }
};
const login = async (email, password) => {
  try {
    const res = await signInWithEmailAndPassword(auth, email, password);
    const user = res.user;
    return user;
  } catch (error) {
    console.log(error);
    toast.error(error.code.split("/")[1].split("-").join(" "));
  }
};
const logout = () => {
  signOut(auth)
    .then(() => {
      console.log("User signed out successfully");
    })
    .catch((error) => {
      toast.error(error.code);
    });
};
export { auth, db, login, signup, logout };
