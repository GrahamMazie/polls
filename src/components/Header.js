import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "../actions/actionCreators";

class Header extends Component {
  componentWillMount() {
    // if (this.props.authenticated) {
    //   this.props.history.push("/");
    // }
  }
  render() {
    return (
      <div className="contain header-container">
        <h1 className="masthead">
          <Link to="/">Polls!</Link>
        </h1>
        {this.props.authenticated ? (
          <button onClick={this.props.signOut} className="btn">
            Log Out
          </button>
        ) : (
          <Link to="/login" className="btn">
            Login
          </Link>
        )}
      </div>
    );
  }
}

const mapStateToProps = ({ auth }) => {
  return {
    authenticated: auth
  };
};

export default connect(
  mapStateToProps,
  actions
)(Header);
