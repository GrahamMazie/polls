import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../actions/actionCreators";

class SignInForm extends Component {
  handleSubmit(e) {
    e.preventDefault();
    this.props.signInWithForm(this.refs.email.value, this.refs.pass.value);
  }
  render() {
    return (
      <div className="sign-in-form">
        <form onSubmit={this.handleSubmit.bind(this)}>
          <input type="email" placeholder="Email" ref="email" required />
          <input type="password" placeholder="Password" ref="pass" required />
          <span className="error-message" />
          <div className="submit-field">
            <input type="submit" className="btn" value="Sign In" />
          </div>
        </form>
      </div>
    );
  }
}

export default connect(
  null,
  actions
)(SignInForm);
