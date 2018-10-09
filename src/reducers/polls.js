function polls(state = [], action) {
  const pollIndex = state.findIndex(poll => poll.pollId === action.pollId);
  const answerIndex = action.answerIndex;
  const stateCopy = [...state];
  switch (action.type) {
    case "ADD_VOTE":
      stateCopy[pollIndex].answers[answerIndex].votes =
        stateCopy[pollIndex].answers[answerIndex].votes + 1;
      return stateCopy;
    case "CHANGE_SELECTED_VOTE":
      stateCopy[pollIndex].answers.map((answer, index) => {
        return (answer.selected = false);
      });
      stateCopy[pollIndex].answers[answerIndex].selected = true;
      return stateCopy;
    default:
      return state;
  }
}

export default polls;
