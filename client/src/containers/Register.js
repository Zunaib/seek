import React, { Component } from "react";
import { register } from "../components/Userfunctions";
import  Button  from "@material-ui/core/Button";
import { withSnackbar } from "notistack";

class Register extends Component {
  constructor() {
    super();
    this.state = {
      first_name: "",
      last_name: "",
      email: "",
      password: "",
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();

    if (
      this.state.first_name === "" ||
      this.state.last_name === "" ||
      this.state.email === "" ||
      this.state.password === ""
    ) {
      this.props.enqueueSnackbar("Empty Fields", {
        variant: "error",
      });
    } else {
      const newUser = {
        first_name: this.state.first_name,
        last_name: this.state.last_name,
        email: this.state.email,
        password: this.state.password,
      };

      register(newUser).then((res) => {
        if (res === "Email already exists") {
          this.props.enqueueSnackbar("Email Already Exists", {
            variant: "error",
          });
        } else {
          this.props.history.push("/login");
          this.props.enqueueSnackbar("Successfully Registered", {
            variant: "success",
          });
        }
      });
    }
  }
  render() {
    return (
      <div className="Header">
        <div className="register-form container">
          <div className="row">
            <div className="col-md-4 mx-auto">
              <form noValidate>
                <h1 className="h3 mb-3 font-weight-normal">Register</h1>
                <div className="form-group">
                  <label htmlFor="first_name">First Name</label>
                  <input
                    type="text"
                    name="first_name"
                    placeholder="Enter first Name"
                    value={this.state.first_name}
                    onChange={this.onChange}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="last_name">Last Name</label>
                  <input
                    type="text"
                    name="last_name"
                    placeholder="Enter Last Name"
                    value={this.state.last_name}
                    onChange={this.onChange}
                  />
                </div>

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
                  <Button variant="contained" color="primary" size="medium"  onClick={this.onSubmit}>Register</Button>

                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withSnackbar(Register);
