import React, { Component } from "react";
import ReactTooltip from "react-tooltip";
import { connect } from "react-redux";
import * as actions from "../actions/actionCreators";

class ResultsDisplay extends Component {
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
    e.preventDefault();
    const pollId = this.props.pollId ? this.props.pollId : this.props.id.pollId;
    const polls = { ...this.props.data };
    delete polls[pollId];
    this.props.setPoll(polls);
    this.props.fetchPolls(this.props.pollListSort);
    this.props.history.push("/");
  }

  render() {
    return (
      <div className="poll-results">
        {this.props.authenticated &&
          this.props.authenticated.uid === this.props.poll.author && (
            <button onClick={e => this.deletePoll(e)}>Delete Poll</button>
          )}
        <h3 className="poll-title">{this.props.poll.text}</h3>
        <div className="result-container">
          {this.props.poll.answers.map(this.renderBars)}
        </div>
        <div className="votes-container">
          {this.props.poll.answers.map(this.answerRender)}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    pollListSort: state.pollListSort
  };
};

export default connect(
  mapStateToProps,
  actions
)(ResultsDisplay);
