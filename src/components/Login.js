import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../actions/actionCreators";

class Login extends Component {
  componentWillMount() {
    if (this.props.authenticated) {
      this.props.history.push("/");
    }
  }
  componentWillUpdate(nextProps) {
    if (nextProps.authenticated) {
      this.props.history.push("/");
    }
  }

  render() {
    return (
      <div className="contain">
        <h4 id="sign-in-header">Sign In to start</h4>
        <button className="social-signin btn" onClick={this.props.signIn}>
          Sign In With Facebook
        </button>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { authenticated: state.auth };
}

export default connect(
  mapStateToProps,
  actions
)(Login);
