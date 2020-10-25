import { Component } from 'react'

class Logout extends Component {

    componentDidMount() {
      localStorage.removeItem("usertoken");
      localStorage.removeItem("loggedIn");
      this.props.history.push("/login");
    }
    render() {
        return null;
    }
}


export default Logout;
