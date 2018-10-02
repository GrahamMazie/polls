import React, { Component } from "react";
import PollList from "./PollList";

class Main extends Component {
  render() {
    return <PollList {...this.props} />;
  }
}

export default Main;
