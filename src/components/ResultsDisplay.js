import React, { Component } from "react";
import ReactTooltip from "react-tooltip";
import { connect } from "react-redux";
import * as actions from "../actions/actionCreators";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinusCircle } from "@fortawesome/free-solid-svg-icons";

class ResultsDisplay extends Component {
  inputRender = (answer, index) => {
    return (
      <div className="radio" key={index}>
        <label onClick={e => e.stopPropagation()}>
          <span>{answer.text}</span>
          <span>Votes: {answer.votes}</span>
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
    e.stopPropagation();
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
    dataCopy[pollId].totalVoteLookup = dataCopy[pollId].totalVoteLookup - 1;
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

  increase_brightness(hex, percent) {
    hex = hex.replace(/^\s*#|\s*$/g, "");

    if (hex.length === 3) {
      hex = hex.replace(/(.)/g, "$1$1");
    }

    var r = parseInt(hex.substr(0, 2), 16),
      g = parseInt(hex.substr(2, 2), 16),
      b = parseInt(hex.substr(4, 2), 16);

    return (
      "#" +
      (0 | ((1 << 8) + r + ((256 - r) * percent) / 100))
        .toString(16)
        .substr(1) +
      (0 | ((1 << 8) + g + ((256 - g) * percent) / 100))
        .toString(16)
        .substr(1) +
      (0 | ((1 << 8) + b + ((256 - b) * percent) / 100)).toString(16).substr(1)
    );
  }
  round(value, decimals) {
    return Number(Math.round(value + "e" + decimals) + "e-" + decimals);
  }

  renderBars = (barData, index) => {
    const widthPercent = this.round(
      (barData.votes / this.props.totalVotes) * 100,
      2
    );
    const bgColor = this.increase_brightness("#84b0ca", index * 20);
    return (
      <span
        data-tip
        data-for={`renderBar${index}Poll${this.props.pollId}`}
        style={{ width: `${widthPercent}%`, background: bgColor }}
        key={index}
      >
        <ReactTooltip id={`renderBar${index}Poll${this.props.pollId}`}>
          <span className="tooltip-answer-text">{barData.text}</span>
          <span>{`${widthPercent}%`}</span>
          <span>{`Votes: ${barData.votes}`}</span>
        </ReactTooltip>
      </span>
    );
  };

  answerRender = (answer, index) => {
    return (
      <div className="answer" key={index}>
        <span>{answer.text}</span>
        <span>Votes: {answer.votes}</span>
      </div>
    );
  };

  deletePoll(e) {
    e.stopPropagation();
    e.preventDefault();
    const pollId = this.props.pollId ? this.props.pollId : this.props.id.pollId;
    const polls = { ...this.props.data };
    delete polls[pollId];
    this.props.setPoll(polls);
    this.props.fetchPolls(this.props.pollListSort);
    this.props.history.push("/");
  }

  render() {
    const pollData = this.props.poll;
    const pollId = this.props.pollId ? this.props.pollId : this.props.id.pollId;
    return (
      <div className="poll-results">
        {this.props.authenticated &&
          this.props.authenticated.uid === this.props.poll.author && (
            <button
              className="delete-poll-link"
              onClick={e => this.deletePoll(e)}
            >
              <FontAwesomeIcon icon={faMinusCircle} />
              Delete Poll
            </button>
          )}
        <h3 className="poll-title">{this.props.poll.text}</h3>
        <div className="result-container">
          {this.props.poll.answers.map(this.renderBars)}
        </div>
        <div className="votes-container">
          {this.props.authenticated &&
          !this.props.user.submittedForms.hasOwnProperty(pollId) ? (
            <form onSubmit={e => this.handleSubmit(e)}>
              <div className="radio-buttons">
                {pollData.answers.map(this.inputRender)}
              </div>
              <input
                type="submit"
                value="Submit"
                className="btn"
                onClick={e => e.stopPropagation()}
              />
            </form>
          ) : (
            this.props.poll.answers.map(this.answerRender)
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    authenticated: state.auth,
    user: state.user,
    pollListSort: state.pollListSort
  };
};

export default connect(
  mapStateToProps,
  actions
)(ResultsDisplay);
