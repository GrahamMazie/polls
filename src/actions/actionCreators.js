export function addVote(pollId, answerIndex) {
  return {
    type: "ADD_VOTE",
    pollId,
    answerIndex
  };
}
