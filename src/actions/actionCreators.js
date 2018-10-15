import { pollsRef, authRef, userRef, fbProvider } from "../store";

export const addVote = (polls, pollIndex) => async dispatch => {
  pollsRef.set(polls);
  const uid = authRef.currentUser.uid;
  userRef
    .child(uid)
    .once("value")
    .then(function(snapshot) {
      const snap = snapshot.val();
      if (snap && snap.submittedForms) {
        const submittedForms = snap.submittedForms;
        submittedForms.push(polls[pollIndex].pollId);
        userRef
          .child(uid)
          .child("submittedForms")
          .set(submittedForms);
      } else {
        const list = [];
        list.push(polls[pollIndex].pollId);
        userRef
          .child(uid)
          .child("submittedForms")
          .set(list);
      }
    });
};

export const changeSelectedVote = polls => async dispatch => {
  pollsRef.set(polls);
};

export const addPoll = polls => async dispatch => {
  pollsRef.set(polls);
  dispatch({ type: "RESET_POLL_FORM" });
};

export const fetchPolls = () => async dispatch => {
  pollsRef.on("value", snapshot => {
    dispatch({
      type: "FETCH_POLLS",
      payload: snapshot.val()
    });
  });
};

export const fetchUser = () => dispatch => {
  authRef.onAuthStateChanged(user => {
    if (user) {
      dispatch({
        type: "FETCH_USER",
        payload: user
      });
    } else {
      dispatch({
        type: "FETCH_USER",
        payload: null
      });
    }
  });
};

export const signIn = () => dispatch => {
  authRef
    .signInWithPopup(fbProvider)
    .then(result => {})
    .catch(error => {
      console.log(error);
    });
};

export const signOut = () => dispatch => {
  authRef
    .signOut()
    .then(() => {
      // Sign-out successful.
    })
    .catch(error => {
      console.log(error);
    });
};

export const addPollOption = () => dispatch => {
  dispatch({ type: "ADD_POLL_OPTION" });
};

export const removePollOption = () => dispatch => {
  dispatch({ type: "REMOVE_POLL_OPTION" });
};

// function writeUserData(userId, name, email, imageUrl) {
//   firebase
//     .database()
//     .ref("users/" + userId)
//     .set({
//       username: name,
//       email: email
//       //some more user data
//     });
// }
