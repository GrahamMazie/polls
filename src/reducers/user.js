export default (state = { submittedForms: {}, selectedVote: {} }, action) => {
  switch (action.type) {
    case "FETCH_USER_FORM_SUBMISSION":
      if (action.payload) {
        return { ...state, submittedForms: { ...action.payload } };
      } else {
        return { ...state, submittedForms: {} };
      }
    case "FETCH_USER_VOTE_SELECTION":
      return { ...state, selectedVote: { ...action.payload } };
    default:
      return state;
  }
};
