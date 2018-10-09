import React, { Component } from "react";
import { Link } from "react-router-dom";

class Header extends Component {
  render() {
    return (
      <div className="contain">
        <h1 className="masthead">
          <Link to="/">Polls!</Link>
        </h1>
        {this.props.children}
      </div>
    );
  }
}

export default Header;
