import { Component } from "react";

class Logout extends Component {
  componentDidMount() {
    localStorage.removeItem("usertoken");
    localStorage.removeItem("loggedIn");
    localStorage.removeItem("welcomed");
    localStorage.removeItem("admin");
    localStorage.removeItem("useremail");
    localStorage.removeItem("profile");
    this.props.history.push("/login");
  }
  render() {
    return null;
  }
}

export default Logout;
