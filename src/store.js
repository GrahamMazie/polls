import { FirebaseConfig as firebaseConfig } from "./config/keys";
import { createBrowserHistory } from "history";
import firebase from "firebase";

export const history = createBrowserHistory();

// Initialize firebase instance
firebase.initializeApp(firebaseConfig);

const databaseRef = firebase.database().ref();
export const pollsRef = databaseRef.child("polls");
export const userRef = databaseRef.child("users");
export const authRef = firebase.auth();
export const fbProvider = new firebase.auth.FacebookAuthProvider();
export const googleProvider = new firebase.auth.GoogleAuthProvider();
