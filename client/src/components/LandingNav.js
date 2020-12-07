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
      <>
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
        <li className="nav-item">
          <Link to="/register" className="nav-link">
            Basic Settings
          </Link>
        </li>

      </>
    );

    const userLink = (
      <>
        <li className="nav-item">
          <Link to="/videos" className="nav-link">
            My Videos
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/main" className="nav-link">
            Main
          </Link>
        </li>

        <li className="nav-item">
          <a
            href="#logout"
            onClick={this.logOut.bind(this)}
            className="nav-link"
          >
            Logout
          </a>
        </li>
      </>
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

        <ul className="nav-links">
          {localStorage.getItem("usertoken") ? userLink : loginRegLink}
        </ul>
      </nav>
    );
  }
}
export default withRouter(LandingNavbar);
