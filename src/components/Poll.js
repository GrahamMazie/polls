import React, { Component } from "react";
import ResultsDisplay from "./ResultsDisplay";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "../actions/actionCreators";
import NotFound from "./NotFound";

class Poll extends Component {
  handleRemoveVote() {
    const dataCopy = { ...this.props.data };
    const pollId = this.props.pollId ? this.props.pollId : this.props.id.pollId;
    let answerIndex;
    if (pollId in this.props.user.selectedVote) {
      answerIndex = this.props.user.selectedVote[pollId].findIndex(
        answer => answer.selected
      );
    } else {
      answerIndex = 0;
    }

    dataCopy[pollId].answers[answerIndex].votes =
      dataCopy[pollId].answers[answerIndex].votes - 1;
    dataCopy[pollId].totalVoteLookup = dataCopy[pollId].totalVoteLookup + 1;
    this.props.removeVote(dataCopy, pollId);
    return;
  }
  render() {
    const pollData = this.props.poll;
    const pollId = this.props.pollId ? this.props.pollId : this.props.id.pollId;
    if (pollData !== undefined) {
      const totalVotes = pollData.answers.reduce((a, b) => ({
        votes: a.votes + b.votes
      })).votes;
      return (
        <div className="poll-container">
          {this.props.authenticated &&
            this.props.user.submittedForms.hasOwnProperty(pollId) && (
              <button
                onClick={this.handleRemoveVote.bind(this)}
                className="btn"
              >
                Remove Vote
              </button>
            )}
          {Object.keys(this.props.id).length === 0 ? (
            <Link to={`/poll/${this.props.pollId}`} className="poll-item">
              <ResultsDisplay {...this.props} totalVotes={totalVotes} />
            </Link>
          ) : (
            <div className="poll-item">
              <ResultsDisplay {...this.props} totalVotes={totalVotes} />
            </div>
          )}
        </div>
      );
    } else {
      return <NotFound />;
    }
  }
}

const mapStateToProps = state => {
  return {
    authenticated: state.auth,
    data: state.polls,
    user: state.user
  };
};

export default connect(
  mapStateToProps,
  actions
)(Poll);
