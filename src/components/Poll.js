import React, { Component } from "react";
import ResultsDisplay from "./ResultsDisplay";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "../actions/actionCreators";
import NotFound from "./NotFound";

class Poll extends Component {
  inputRender = (answer, index) => {
    return (
      <div className="radio" key={index}>
        <label>
          <span>{answer.text}</span>
          <input
            type="radio"
            name="pollRadioBtn"
            value={answer.text}
            onChange={this.handleRadioSelect.bind(this, index)}
            checked={this.handleSelected(index)}
          />
        </label>
      </div>
    );
  };

  handleSubmit(e) {
    e.preventDefault();
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
      dataCopy[pollId].answers[answerIndex].votes + 1;
    this.props.addVote(dataCopy, pollId, answerIndex);
    return;
  }

  handleRadioSelect(selectedAnswerIndex) {
    const pollId = this.props.pollId ? this.props.pollId : this.props.id.pollId;
    const dataCopy = { ...this.props.data };
    dataCopy[pollId].answers.map((answer, index) => {
      return (answer.selected = false);
    });
    dataCopy[pollId].answers[selectedAnswerIndex].selected = true;
    this.props.changeSelectedVote(dataCopy[pollId].answers, pollId);
    return;
  }

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
    this.props.removeVote(dataCopy, pollId);
    return;
  }

  handleSelected(answerIndex) {
    const pollId = this.props.pollId ? this.props.pollId : this.props.id.pollId;
    if (this.props.user && this.props.user.selectedVote) {
      if (pollId in this.props.user.selectedVote) {
        const selected = this.props.user.selectedVote[pollId][answerIndex]
          .selected;
        return selected;
      } else {
        if (answerIndex === 0) {
          return true;
        } else {
          return false;
        }
      }
    } else {
      if (answerIndex === 0) {
        return true;
      } else {
        return false;
      }
    }
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
              <button onClick={this.handleRemoveVote.bind(this)}>
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
          {this.props.authenticated &&
            !this.props.user.submittedForms.hasOwnProperty(pollId) && (
              <form onSubmit={e => this.handleSubmit(e)}>
                <div className="radio-buttons">
                  {pollData.answers.map(this.inputRender)}
                </div>
                <input type="submit" value="Submit" />
              </form>
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
