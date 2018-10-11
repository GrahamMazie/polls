import React, { Component } from "react";
import ResultsDisplay from "./ResultsDisplay";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "../actions/actionCreators";

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
            onChange={this.handleRadioSelect.bind(
              this,
              this.props.poll.pollId,
              index
            )}
            checked={answer.selected}
          />
        </label>
      </div>
    );
  };
  handleSubmit(e) {
    e.preventDefault();
    const pollIndex = this.props.data.findIndex(
      poll => JSON.stringify(poll) === JSON.stringify(this.props.poll)
    );
    const index = this.props.poll.answers.findIndex(answer => answer.selected);
    const dataCopy = { ...this.props.data };
    dataCopy[pollIndex].answers[index].votes =
      dataCopy[pollIndex].answers[index].votes + 1;
    this.props.addVote(dataCopy);
    return;
  }
  handleRadioSelect(pollId, i) {
    const pollIndex = this.props.data.findIndex(
      poll => JSON.stringify(poll) === JSON.stringify(this.props.poll)
    );
    const dataCopy = { ...this.props.data };
    dataCopy[pollIndex].answers.map((answer, index) => {
      return (answer.selected = false);
    });
    dataCopy[pollIndex].answers[i].selected = true;
    this.props.changeSelectedVote(dataCopy);
    return;
  }
  render() {
    const pollData = this.props.poll;
    const totalVotes = pollData.answers.reduce((a, b) => ({
      votes: a.votes + b.votes
    })).votes;
    if (pollData !== undefined) {
      return (
        <div className="poll-container">
          {this.props.pathname === "/" ? (
            <Link to={`/poll/${this.props.poll.pollId}`} className="poll-item">
              <ResultsDisplay {...this.props} totalVotes={totalVotes} />
            </Link>
          ) : (
            <div className="poll-item">
              <ResultsDisplay {...this.props} totalVotes={totalVotes} />
            </div>
          )}
          <form onSubmit={e => this.handleSubmit(e)}>
            <div className="radio-buttons">
              {pollData.answers.map(this.inputRender)}
            </div>
            <input type="submit" value="Submit" />
          </form>
        </div>
      );
    } else {
      return null;
    }
  }
}

const mapStateToProps = ({ data }) => {
  return {
    data
  };
};

export default connect(
  mapStateToProps,
  actions
)(Poll);
