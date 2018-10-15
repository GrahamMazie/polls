import React, { Component } from "react";
import { Switch, Route } from "react-router";
import { ConnectedRouter } from "connected-react-router";
import { history } from "../store";
import Header from "./Header";
import PollList from "./PollList";
import Single from "./Single";
import NotFound from "./NotFound";
import Login from "./Login";
import FormCreator from "./FormCreator";
import { connect } from "react-redux";
import * as actions from "../actions/actionCreators";

class Main extends Component {
  componentWillMount() {
    this.props.fetchUser();
  }

  renderPollList = state => {
    return <PollList id={state.match.params} {...this.props} />;
  };
  renderSingle = state => {
    return <Single id={state.match.params} {...this.props} />;
  };
  render() {
    return (
      <ConnectedRouter history={history}>
        <div className="page-wrapper">
          <Header />
          <Switch>
            <Route path="/" exact render={this.renderPollList} />
            <Route path="/poll/:pollId" render={this.renderSingle} />
            <Route path="/login" component={Login} />
            <Route path="/form-creator" component={FormCreator} />
            <Route component={NotFound} />
          </Switch>
        </div>
      </ConnectedRouter>
    );
  }
}

const mapStateToProps = state => {
  return {
    authenticated: state.auth,
    data: state.polls
  };
};

export default connect(
  mapStateToProps,
  actions
)(Main);
