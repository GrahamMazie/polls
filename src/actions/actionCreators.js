import { pollsRef } from "../store";

export const addVote = polls => async dispatch => {
  pollsRef.set(polls);
};

export const changeSelectedVote = polls => async dispatch => {
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
