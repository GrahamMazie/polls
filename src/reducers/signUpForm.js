export default (state = {}, action) => {
  switch (action.type) {
    case "VALIDATE_SIGN_UP_FORM":
      return action.payload;
    default:
      return state;
  }
};
