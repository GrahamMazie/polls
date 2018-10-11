import React, { Component } from "react";
import { connect } from "react-redux";
import Poll from "./Poll";
import * as actions from "../actions/actionCreators";

class PollList extends Component {
  renderPolls = (poll, index) => {
    return <Poll key={index} poll={poll} {...this.props} />;
  };

  componentWillMount() {
    this.props.fetchPolls();
  }

  render() {
    return (
      <div className="poll-list">
        <div className="contain">{this.props.data.map(this.renderPolls)}</div>
      </div>
    );
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
)(PollList);
