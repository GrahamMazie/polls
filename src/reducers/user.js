export default (state = { submittedForms: [] }, action) => {
  switch (action.type) {
    case "FETCH_USER":
      if (action.payload) {
        return { ...state, submittedForms: [...action.payload] };
      } else {
        return { ...state, submittedForms: [] };
      }
    default:
      return state;
  }
};
