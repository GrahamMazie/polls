import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../actions/actionCreators";

class SignUp extends Component {
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

  componentWillUnmount() {
    this.validate(null, {
      emailValidated: false,
      passwordValidated: false
    });
  }

  validate(e, validationObj = {}) {
    if (Object.getOwnPropertyNames(validationObj).length <= 0) {
      validationObj = {
        passwordValidated: this.validatePassword(),
        emailValidated: this.validateEmail()
      };
    }
    this.props.validateSignUpForm(validationObj);
  }

  validateEmail() {
    var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@(([[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (re.test(String(this.refs.email.value).toLowerCase())) {
      return true;
    } else {
      document.querySelector(".error-message").innerText =
        "Please enter a valid email address.";
    }
  }

  validatePassword() {
    if (
      this.refs.pass.value === this.refs.passValidator.value &&
      this.refs.pass.value.trim() !== ""
    ) {
      return true;
    } else {
      document.querySelector(".error-message").innerText =
        "Your password must be greater than six characters!";
      return false;
    }
  }

  handleSubmit(e) {
    e.preventDefault();
    const form = this.props.signUpForm;
    if (form.emailValidated && form.passwordValidated) {
      this.props.signUp(this.refs.email.value, this.refs.pass.value);
    }
  }

  render() {
    return (
      <div className="contain">
        {!this.props.authenticated && (
          <div className="sign-up-wrapper">
            <form onSubmit={this.handleSubmit.bind(this)}>
              <input
                type="email"
                onChange={this.validate.bind(this)}
                placeholder="Email"
                ref="email"
                required
              />
              <input
                type="password"
                onChange={this.validate.bind(this)}
                placeholder="Password"
                ref="pass"
                required
              />
              <input
                type="password"
                onChange={this.validate.bind(this)}
                placeholder="Re-enter password"
                ref="passValidator"
                required
              />
              <span className="error-message" />
              <div className="submit-field">
                <input type="submit" className="btn" value="Sign Up" />
              </div>
            </form>
          </div>
        )}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    authenticated: state.auth,
    signUpForm: state.signUpForm
  };
}

export default connect(
  mapStateToProps,
  actions
)(SignUp);
