import React, { Component } from "react";
import Poll from "./Poll";
import { connect } from "react-redux";
import * as actions from "../actions/actionCreators";

class Single extends Component {
  componentWillMount() {
    this.props.fetchPolls(this.props.pollListSort);
  }
  findPoll = () => {
    const obj = { ...this.props.data };
    const id = this.props.id.pollId;
    return obj[id];
  };
  render() {
    if (Object.keys(this.props.data).length !== 0) {
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

function mapStateToProps(state) {
  return {
    data: state.polls,
    pollListSort: state.pollListSort
  };
}
export default connect(
  mapStateToProps,
  actions
)(Single);
