export default (state = {}, action) => {
  const stateCopy = { ...state };
  switch (action.type) {
    case "ADD_POLL_OPTION":
      if (stateCopy.inputId.length <= 4) {
        stateCopy.inputId.push(`pollOption${stateCopy.inputId.length + 1}`);
      }
      return stateCopy;
    case "REMOVE_POLL_OPTION":
      stateCopy.inputId.pop();
      return stateCopy;
    default:
      return state;
  }
};
