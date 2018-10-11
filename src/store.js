import { FirebaseConfig as firebaseConfig } from "./config/keys";

import { createStore, compose } from "redux";
import createHistory from "history/createBrowserHistory";
import { reactReduxFirebase } from "react-redux-firebase";
import firebase from "firebase";

export const history = createHistory();

// react-redux-firebase config
const rrfConfig = {
  userProfile: "users"
};

// Initialize firebase instance
firebase.initializeApp(firebaseConfig);

const databaseRef = firebase.database().ref();
export const pollsRef = databaseRef.child("polls");

// Add reactReduxFirebase enhancer when making store creator
export const createStoreWithFirebase = compose(
  reactReduxFirebase(firebase, rrfConfig) // firebase instance as first argument
)(createStore);
