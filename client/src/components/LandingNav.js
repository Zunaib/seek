import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";

class LandingNavbar extends Component {
  logOut(e) {
    e.preventDefault();
    localStorage.removeItem("usertoken");
    localStorage.removeItem("loggedIn");
    this.props.history.push("/login");
  }
  render() {
    const loginRegLink = (
      <ul className="nav-links">
        <li className="nav-item">
          <Link to="/main" className="nav-link">
            Home
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/login" className="nav-link">
            Login
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/register" className="nav-link">
            Register
          </Link>
        </li>
      </ul>
    );

    const userLink = (
      <Link
        to="/logout"
        style={{
          color: "white",
        }}
      >
        Logout
      </Link>
    );

    return (
      <nav className="landing-navbar navbar-expand-lg  ">
        <a className="Logo" href="/">
          <img
            className="logo-icon"
            src={require("../assets/locked-white.png")}
            alt="Seek Logo"
          />
        </a>
        {localStorage.getItem("usertoken") ? userLink : loginRegLink}
      </nav>
    );
  }
}
export default withRouter(LandingNavbar);
