import React, { Component } from "react";
import { connect } from "react-redux";
import Poll from "./Poll";
import * as actions from "../actions/actionCreators";

class PollList extends Component {
  renderPolls() {
    const props = this.props;
    const obj = Object.keys(props.data);
    return obj.map(key => {
      return <Poll key={key} pollId={key} poll={props.data[key]} {...props} />;
    });
  }

  componentWillMount() {
    this.props.fetchPolls();
  }

  render() {
    return (
      <div className="poll-list">
        <div className="contain">{this.renderPolls()}</div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { data: state.polls };
}

export default connect(
  mapStateToProps,
  actions
)(PollList);
