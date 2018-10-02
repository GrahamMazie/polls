import React, { Component } from "react";
import Poll from "./Poll";

class PollList extends Component {
  renderPolls = (poll, index) => {
    return <Poll key={index} poll={poll} {...this.props} />;
  };

  render() {
    return (
      <div className="poll-list">
        <div className="contain">{this.props.polls.map(this.renderPolls)}</div>
      </div>
    );
  }
}

export default PollList;
