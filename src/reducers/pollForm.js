export default (state = {}, action) => {
  switch (action.type) {
    case "ADD_POLL_OPTION":
      const stateCopy = { ...state };
      if (stateCopy.inputId.length <= 4) {
        stateCopy.inputId.push(`pollOption${stateCopy.inputId.length + 1}`);
      }
      return stateCopy;
    default:
      return state;
  }
};
