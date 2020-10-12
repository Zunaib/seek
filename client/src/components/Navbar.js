import React, {  useState } from "react";
import { NavLink,Link, withRouter } from "react-router-dom";
import { Avatar, Menu, MenuItem } from "@material-ui/core";
import  PersonIcon from '@material-ui/icons/Person';
import VideoLibraryIcon from '@material-ui/icons/VideoLibrary';
import CameraAltIcon from '@material-ui/icons/CameraAlt';
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

const Navbar = () => {
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
        <NavLink to="/profile">
          <MenuItem onClick={handleClose}><PersonIcon style={{margin:"0px 5px"}}/>Profile</MenuItem>
        </NavLink>

        <NavLink to="/videos">
        <MenuItem onClick={handleClose}><VideoLibraryIcon style={{margin:"0px 5px"}}/>My Videos</MenuItem>
        </NavLink>
        
        <NavLink to="/cameras">
        <MenuItem onClick={handleClose}><CameraAltIcon style={{margin:"0px 5px"}}/>My Cameras</MenuItem>
        </NavLink>
        
        <NavLink to="/admin-access">
        <MenuItem onClick={handleClose}><SupervisorAccountIcon style={{margin:"0px 5px"}}/>Admin Access</MenuItem>
        </NavLink>
        
        <NavLink to="/logout">
        <MenuItem onClick={handleClose}><ExitToAppIcon style={{margin:"0px 5px"}}/>Logout</MenuItem>
        </NavLink>

      </Menu>
      </nav>
    );
}
export default withRouter(Navbar);
