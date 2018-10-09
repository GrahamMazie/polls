import React, { Component } from "react";
import ResultsDisplay from "./ResultsDisplay";
import { Link } from "react-router-dom";

class Poll extends Component {
  inputRender = (answer, index) => {
    return (
      <div className="radio" key={index}>
        <label>
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
          {answer.text}
        </label>
      </div>
    );
  };
  handleSubmit(e) {
    e.preventDefault();
    const index = this.props.poll.answers.findIndex(answer => answer.selected);
    this.props.addVote(this.props.poll.pollId, index);
    return;
  }
  handleRadioSelect(pollId, i) {
    this.props.changeSelectedVote(pollId, i);
    return;
  }
  render() {
    const pollData = this.props.poll;
    const totalVotes = pollData.answers.reduce((a, b) => ({
      votes: a.votes + b.votes
    })).votes;
    return (
      <div className="poll-container">
        {this.props.pathname === "/" ? (
          <Link to={`/poll/${this.props.poll.pollId}`} className="poll-link">
            <ResultsDisplay {...this.props} totalVotes={totalVotes} />
          </Link>
        ) : (
          <ResultsDisplay {...this.props} totalVotes={totalVotes} />
        )}
        <form onSubmit={e => this.handleSubmit(e)}>
          {pollData.answers.map(this.inputRender)}
          <input type="submit" value="Submit" />
        </form>
      </div>
    );
  }
}

export default Poll;
