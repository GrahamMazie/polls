export default (state = "", action) => {
  switch (action.type) {
    case "HANDLE_POLL_LIST_SORT":
      return action.sortValue;
    default:
      return state;
  }
};
