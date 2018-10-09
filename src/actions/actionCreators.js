export function addVote(pollId, answerIndex) {
  return {
    type: "ADD_VOTE",
    pollId,
    answerIndex
  };
}

export function changeSelectedVote(pollId, answerIndex) {
  return {
    type: "CHANGE_SELECTED_VOTE",
    pollId,
    answerIndex
  };
}
