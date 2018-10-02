function polls(state = [], action) {
  switch (action.type) {
    case "ADD_VOTE":
      const pollIndex = state.findIndex(poll => poll.pollId === action.pollId);
      const answerIndex = action.answerIndex;
      const stateCopy = [...state];
      stateCopy[pollIndex].answers[answerIndex].votes =
        stateCopy[pollIndex].answers[answerIndex].votes + 1;
      return stateCopy;
    default:
      return state;
  }
}

export default polls;
