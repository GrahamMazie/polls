import React, { Component } from "react";
import Poll from "./Poll";
import { connect } from "react-redux";
import * as actions from "../actions/actionCreators";

class Single extends Component {
  componentWillMount() {
    this.props.fetchPolls();
  }
  findPoll = () => {
    const polls = this.props.data;
    const index = polls.findIndex(poll => poll.pollId === this.props.id.pollId);
    return { ...polls[index] };
  };
  render() {
    if (this.props.data.length !== 0) {
      return (
        <div className="poll-list">
          <div className="contain">
            <Poll poll={this.findPoll()} {...this.props} />
          </div>
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
)(Single);
