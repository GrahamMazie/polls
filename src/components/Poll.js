import React, { Component } from "react";
import ResultsDisplay from "./ResultsDisplay";
import { Link } from "react-router-dom";

class Poll extends Component {
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
    console.log(this.props);
    return (
      <div className="poll-container">
        {this.props.pathname === "/" ? (
          <Link to={`/poll/${this.props.poll.pollId}`}>
            <ResultsDisplay {...this.props} totalVotes={totalVotes} />
          </Link>
        ) : (
          <ResultsDisplay {...this.props} totalVotes={totalVotes} />
        )}

        <div className="button-container">
          {pollData.answers.map(this.buttonRender)}
        </div>
      </div>
    );
  }
}

export default Poll;
