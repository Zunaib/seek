import React, { Component } from "react";
import { login } from "../components/Userfunctions";
import { Button } from "antd";
import { withSnackbar } from "notistack";

class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      loggedIn: false,
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit() {
    if (this.state.password === "" || this.state.email === "") {
      this.props.enqueueSnackbar("Empty Fields", {
        variant: "error",
      });
    } else {
      const user = {
        email: this.state.email,
        password: this.state.password,
      };

      login(user).then((res) => {
        if (res === true) {
          this.props.enqueueSnackbar("Blocked By Admin", {
            variant: "error",
          });
        } else if (res === "No account found") {
          this.props.enqueueSnackbar("Account Dosent Exist", {
            variant: "error",
          });
        } else if (res === "Invalid username and password") {
          this.props.enqueueSnackbar("Invalid Credentials", {
            variant: "error",
          });
        } else {
          if (localStorage.getItem("welcomed") === "true") {
            if (localStorage.getItem("admin") === "true") {
              this.props.history.push("/dashboard");
            } else {
              this.props.history.push("/main");
            }
          } else {
            this.props.history.push("/welcomesettings");
          }
        }
      });
    }
  }
  render() {
    return (
      <div className="Header">
        <div className="login-form container">
          <div className="row">
            <div className="col-md-4 mx-auto">
              <form noValidate>
                <h1
                  className="h3 mb-3 font-weight-normal"
                  style={{ color: "White" }}
                >
                  Log In
                </h1>
                <div className="form-group">
                  <label htmlFor="email">Email Address</label>
                  <input
                    type="email"
                    name="email"
                    placeholder="Enter Email"
                    value={this.state.email}
                    onChange={this.onChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="password">Password</label>
                  <input
                    type="password"
                    name="password"
                    placeholder="Enter password"
                    value={this.state.password}
                    onChange={this.onChange}
                  />
                </div>
                <div className="btn-wrapper">
                  <Button type="primary" size="medium" onClick={this.onSubmit}>
                    Log In
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withSnackbar(Login);
