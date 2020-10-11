import React, { Component, useState } from "react";
import { Link, withRouter } from "react-router-dom";
import { Avatar, Menu, MenuItem } from "@material-ui/core";

const Navbar = () => {
  
  const logOut=(e)=> {
    e.preventDefault();
    localStorage.removeItem("usertoken");
    localStorage.removeItem("loggedIn");
    this.props.history.push("/login");
  }

  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

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
            onClick={logOut}
            className="nav-link"
          >
            Logout
          </a>
        </li>
      </>
    );

    return (
      <nav className="navbar navbar-expand-lg  ">
        <a className="Logo" href="/main">
          <img
            className="logo-icon"
            src={require("../assets/locked.png")}
            alt="Seek Logo"
          />
        </a>

        <ul className="nav-links">
          {localStorage.getItem("usertoken") ? userLink : loginRegLink}
        </ul>
        <Avatar className="orange" aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>N</Avatar>
        <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleClose}>Profile</MenuItem>
        <MenuItem onClick={handleClose}>My account</MenuItem>
        <MenuItem onClick={handleClose}>Logout</MenuItem>
      </Menu>
      </nav>
    );
}
export default withRouter(Navbar);
