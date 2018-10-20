import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import SignInForm from "./SignInForm";
import { fbProvider, googleProvider } from "../store";
import * as actions from "../actions/actionCreators";

class Login extends Component {
  componentWillMount() {
    if (this.props.authenticated && !this.props.authenticated.isLoading) {
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
        {!this.props.authenticated && (
          <div className="sign-in-wrapper">
            <h4 id="sign-in-header">Sign In to start</h4>
            <SignInForm />
            <button
              className="social-signin btn"
              onClick={() => this.props.signIn(fbProvider)}
            >
              Sign In With Facebook
            </button>
            <button
              className="social-signin btn"
              onClick={() => this.props.signIn(googleProvider)}
            >
              Sign In With Google
            </button>
            <div className="sign-up-button-wrapper">
              <h4 id="sign-in-header">No account? Sign up!</h4>
              <Link to="/sign-up" className="btn">
                Sign Up
              </Link>
            </div>
          </div>
        )}
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
