import React, { Component } from "react";

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
        style={{ width: `${widthPercent}%`, background: bgColor }}
        key={index}
      />
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
  render() {
    return (
      <div className="poll-results">
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

export default ResultsDisplay;
