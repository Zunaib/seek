import React, { Component } from "react";
import { register } from "../components/Userfunctions";
import { Button } from "antd";
import { withSnackbar } from "notistack";

class Register extends Component {
  constructor() {
    super();
    this.state = {
      firstname: "",
      lastname: "",
      email: "",
      password: "",
      errors: {
        firstname: "",
        lastname: "",
        email: "",
        password: "",
      },
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.validateForm = this.validateForm.bind(this);
  }
  onChange(event) {
    const { name, value } = event.target;
    let errors = this.state.errors;

    const validEmailRegex = RegExp(
      //eslint-disable-next-line
      /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
    );

    switch (name) {
      case "firstname":
        errors.firstname =
          value.length < 3 ? "First Name must be 3 characters long!" : "";
        break;
      case "lastname":
        errors.lastname =
          value.length < 3 ? "Last Name must be 3 characters long!" : "";
        break;
      case "email":
        errors.email = validEmailRegex.test(value) ? "" : "Email is not valid!";
        break;
      case "password":
        errors.password =
          value.length < 8 ? "Password must be 8 characters long!" : "";
        break;
      default:
        break;
    }

    this.setState({ errors, [name]: value });
  }

  validateForm = (errors) => {
    let valid = true;
    Object.values(errors).forEach((val) => val.length > 0 && (valid = false));
    return valid;
  };

  onSubmit(e) {
    e.preventDefault();
    let errors = this.state.errors;

    if (
      this.validateForm(errors) &&
      this.state.firstname !== "" &&
      this.state.lastname !== "" &&
      this.state.email !== "" &&
      this.state.password !== ""
    ) {
      const newUser = {
        first_name: this.state.firstname,
        last_name: this.state.lastname,
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
    } else {
      this.props.enqueueSnackbar("Invalid Form", {
        variant: "error",
      });
    }
  }

  render() {
    const { errors } = this.state;

    return (
      <div className="Header">
        <div className="register-form container">
          <div className="row">
            <div className="col-md-4 mx-auto">
              <form noValidate>
                <h1
                  className="h3 mb-3 font-weight-normal"
                  style={{ color: "White" }}
                >
                  Register
                </h1>
                <div className="form-group">
                  <label htmlFor="first_name">First Name</label>
                  <input
                    className={errors.firstname.length > 0 && "error"}
                    type="text"
                    name="firstname"
                    placeholder="Enter First Name"
                    value={this.state.firstname}
                    onChange={this.onChange}
                  />
                  {errors.firstname.length > 0 && (
                    <span className="error-text">
                      <em> {errors.firstname}</em>
                    </span>
                  )}
                </div>

                <div className="form-group">
                  <label htmlFor="last_name">Last Name</label>
                  <input
                    className={errors.lastname.length > 0 && "error"}
                    type="text"
                    name="lastname"
                    placeholder="Enter Last Name"
                    value={this.state.lastname}
                    onChange={this.onChange}
                  />
                  {errors.lastname.length > 0 && (
                    <span className="error-text">
                      <em>{errors.lastname}</em>
                    </span>
                  )}
                </div>

                <div className="form-group">
                  <label htmlFor="email">Email Address</label>
                  <input
                    className={errors.email.length > 0 && "error"}
                    type="email"
                    name="email"
                    placeholder="Enter Email"
                    value={this.state.email}
                    onChange={this.onChange}
                  />
                  {errors.email.length > 0 && (
                    <span className="error-text">
                      <em>{errors.email}</em>
                    </span>
                  )}
                </div>

                <div className="form-group">
                  <label htmlFor="password">Password</label>
                  <input
                    className={errors.password.length > 0 && "error"}
                    type="password"
                    name="password"
                    placeholder="Enter Password"
                    value={this.state.password}
                    onChange={this.onChange}
                  />
                  {errors.password.length > 0 && (
                    <span className="error-text">
                      <em>{errors.password}</em>
                    </span>
                  )}
                </div>

                <div className="btn-wrapper">
                  <Button type="primary" size="medium" onClick={this.onSubmit}>
                    Register
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

export default withSnackbar(Register);
