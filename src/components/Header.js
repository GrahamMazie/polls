import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "../actions/actionCreators";

class Header extends Component {
  renderLogoutButtons() {
    if (this.props.router.location.pathname === "/form-creator") {
      return (
        <div className="header-link-wrapper">
          <button onClick={this.props.signOut} className="btn">
            Log Out
          </button>
        </div>
      );
    } else {
      return (
        <div className="header-link-wrapper">
          <button onClick={this.props.signOut} className="btn">
            Log Out
          </button>
          <Link to="/form-creator" className="">
            Create Form
          </Link>
        </div>
      );
    }
  }
  render() {
    return (
      <div className="contain header-container">
        <h1 className="masthead">
          <Link to="/">Polls!</Link>
        </h1>
        {this.props.authenticated ? (
          this.renderLogoutButtons()
        ) : (
          <Link to="/login" className="btn">
            Login
          </Link>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    authenticated: state.auth,
    router: state.router
  };
};

export default connect(
  mapStateToProps,
  actions
)(Header);
