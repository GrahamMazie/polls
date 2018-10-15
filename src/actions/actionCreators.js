import { pollsRef, authRef, fbProvider } from "../store";

export const addVote = polls => async dispatch => {
  pollsRef.set(polls);
};

export const changeSelectedVote = polls => async dispatch => {
  pollsRef.set(polls);
};

export const addPoll = polls => async dispatch => {
  pollsRef.set(polls);
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
