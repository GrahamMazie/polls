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
    this.props.fetchPolls(this.props.pollListSort);
  }

  handleSort() {
    this.props.fetchPolls(this.refs.pollSort.value);
  }

  render() {
    return (
      <div className="poll-list">
        <div className="contain">
          <div className="poll-sort">
            <label htmlFor="pollSort">Sort by:</label>
            <select
              name="pollSort"
              id="pollSort"
              onChange={this.handleSort.bind(this)}
              ref="pollSort"
              defaultValue={this.props.pollListSort}
            >
              <option value="totalVoteLookup">Total Votes</option>
              <option value="reverseDateLookUp">Most Recent Polls</option>
            </select>
          </div>
          {this.renderPolls()}
        </div>
      </div>
    );
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
)(PollList);
