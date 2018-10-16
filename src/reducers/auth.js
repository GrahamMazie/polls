export default (state = false, action) => {
  switch (action.type) {
    case "FETCH_AUTH":
      return action.payload || null;
    default:
      return state;
  }
};
