import { pollsRef, authRef, userRef } from "../store";

export const addVote = (polls, pollId, answerIndex) => async dispatch => {
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
        const submittedForms = { ...snap.submittedForms };
        if (!(pollId in submittedForms)) {
          submittedForms[pollId] = answerIndex;
        }
        userRef
          .child(uid)
          .child("submittedForms")
          .set(submittedForms);
      } else {
        const list = {};
        list[pollId] = answerIndex;
        userRef
          .child(uid)
          .child("submittedForms")
          .set(list);
      }
    });
};

export const removeVote = (polls, pollId) => async dispatch => {
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
        const submittedForms = { ...snap.submittedForms };
        delete submittedForms[pollId];
        userRef
          .child(uid)
          .child("submittedForms")
          .set(submittedForms);
      }
    });
};

export const changeSelectedVote = (answers, pollId) => dispatch => {
  const uid = authRef.currentUser.uid;
  userRef
    .child(uid)
    .once("value")
    .then(function(snapshot) {
      const snap = snapshot.val();
      if (snap && snap.selectedVote) {
        const selectedVoteCopy = { ...snap.selectedVote };
        selectedVoteCopy[pollId] = { ...answers };
        userRef
          .child(uid)
          .child("selectedVote")
          .set(selectedVoteCopy);
      } else {
        const voteObj = {};
        voteObj[pollId] = { ...answers };
        userRef
          .child(uid)
          .child("selectedVote")
          .set(voteObj);
      }
    });
};

export const addPoll = polls => async dispatch => {
  pollsRef.set(polls);
  dispatch({ type: "RESET_POLL_FORM" });
};

export const setPoll = polls => async dispatch => {
  pollsRef.set(polls);
};

export const fetchPolls = (sortValue = "totalVoteLookup") => async dispatch => {
  pollsRef.orderByChild(sortValue).once("value", snapshot => {
    const newPolls = {};
    snapshot.forEach(function(child) {
      newPolls[child.key] = child.val();
    });
    dispatch({
      type: "HANDLE_POLL_LIST_SORT",
      sortValue
    });
    dispatch({
      type: "FETCH_POLLS",
      payload: newPolls
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
            type: "FETCH_USER_FORM_SUBMISSION",
            payload: snapshot.val()
          });
        });
      userRef
        .child(uid)
        .child("selectedVote")
        .on("value", snapshot => {
          dispatch({
            type: "FETCH_USER_VOTE_SELECTION",
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

export const signIn = provider => dispatch => {
  authRef
    .signInWithPopup(provider)
    .then(result => {})
    .catch(error => {
      console.log(error);
    });
};

export const signInWithForm = (email, password) => dispatch => {
  authRef.signInWithEmailAndPassword(email, password).catch(function(error) {
    console.log(error.code);
    console.log(error.message);
    document.querySelector(".error-message").innerText =
      "Email or password not found.";
  });
};

export const signUp = (email, password) => dispatch => {
  authRef
    .createUserWithEmailAndPassword(email, password)
    .catch(function(error) {
      console.error(error.message);
      console.error(error.code);
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

export const validateSignUpForm = validateObj => dispatch => {
  dispatch({
    type: "VALIDATE_SIGN_UP_FORM",
    payload: validateObj
  });
};
