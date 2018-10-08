import React, { Component } from "react";
import Poll from "./Poll";

class Single extends Component {
  findPoll() {
    const polls = this.props.polls;
    const index = polls.findIndex(poll => poll.pollId === this.props.id.pollId);
    return { ...polls[index] };
  }
  render() {
    return (
      <div className="poll-list">
        <div className="contain">
          <Poll poll={this.findPoll()} {...this.props} />
        </div>
      </div>
    );
  }
}

export default Single;
