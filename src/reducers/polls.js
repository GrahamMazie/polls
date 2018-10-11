function polls(state = [], action) {
  switch (action.type) {
    case "FETCH_POLLS":
      return action.payload;
    default:
      return state;
  }
}

export default polls;
