import { pollsRef, authRef, userRef, fbProvider } from "../store";

export const addVote = (polls, pollIndex) => async dispatch => {
  // Add vote to poll in database. Will trigger fetchPolls action creator
  // due to listening for database poll changes.
  pollsRef.set(polls);

  // Write Poll Id to list of user poll submissions in database. Will trigger
  // fetchUser due to listening for database user changes.
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

export const removeVote = (polls, pollIndex) => async dispatch => {
  // Add vote to poll in database. Will trigger fetchPolls action creator
  // due to listening for database poll changes.
  pollsRef.set(polls);

  // Write Poll Id to list of user poll submissions in database. Will trigger
  // fetchUser due to listening for database user changes.
  const uid = authRef.currentUser.uid;
  userRef
    .child(uid)
    .once("value")
    .then(function(snapshot) {
      const submittedForms = snapshot.val().submittedForms;
      const pollIdIndex = submittedForms.indexOf(polls[pollIndex].pollId);
      if (pollIdIndex > -1) {
        submittedForms.splice(pollIdIndex, 1);
      }
      userRef
        .child(uid)
        .child("submittedForms")
        .set(submittedForms);
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

export const fetchAuth = () => dispatch => {
  authRef.onAuthStateChanged(user => {
    if (user) {
      // Fetch authentication data if signed in
      dispatch({
        type: "FETCH_AUTH",
        payload: user
      });

      // Fetch user data if signed in (and listen for changes to bring to app state)
      const uid = authRef.currentUser.uid;
      userRef
        .child(uid)
        .child("submittedForms")
        .on("value", snapshot => {
          dispatch({
            type: "FETCH_USER",
            payload: snapshot.val()
          });
        });
    } else {
      dispatch({
        type: "FETCH_AUTH",
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
