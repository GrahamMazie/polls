import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import { ConnectedRouter } from "connected-react-router";
import { history } from "../store";
import Header from "./Header";
import PollList from "./PollList";
import Single from "./Single";
import NotFound from "./NotFound";

class Main extends Component {
  renderPollList = () => {
    return <PollList {...this.props} />;
  };
  renderSingle = props => {
    return <Single id={props.match.params} {...this.props} />;
  };
  render() {
    return (
      <div className="page-wrapper">
        <ConnectedRouter history={history}>
          <Header>
            <Switch>
              <Route path="/" exact render={this.renderPollList} />
              <Route path="/poll/:pollId" render={this.renderSingle} />
              <Route component={NotFound} />
            </Switch>
          </Header>
        </ConnectedRouter>
      </div>
    );
  }
}

export default Main;
