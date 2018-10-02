import React, { Component } from "react";
import ResultsDisplay from "./ResultsDisplay";

class Poll extends Component {
  answerRender = (answer, index) => {
    return (
      <div className="answer" key={index}>
        <span>{answer.text}</span>
        <span>Votes: {answer.votes}</span>
      </div>
    );
  };

  buttonRender = (answer, index) => {
    return (
      <button
        key={index}
        onClick={this.props.addVote.bind(null, this.props.poll.pollId, index)}
      >
        {answer.text}
      </button>
    );
  };

  render() {
    const pollData = this.props.poll;
    const totalVotes = pollData.answers.reduce((a, b) => ({
      votes: a.votes + b.votes
    })).votes;
    return (
      <div className="poll-container">
        <h3 className="poll-title">{pollData.text}</h3>
        <ResultsDisplay {...this.props} totalVotes={totalVotes} />
        <div className="votes-container">
          {pollData.answers.map(this.answerRender)}
        </div>
        <div className="button-container">
          {pollData.answers.map(this.buttonRender)}
        </div>
      </div>
    );
  }
}

export default Poll;
