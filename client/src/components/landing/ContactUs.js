import React, { Component } from "react";
import { Button } from "antd";
import axios from "axios";
import { withSnackbar } from "notistack";

class ContactUs extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      message: "",
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit() {
    if (this.state.message === "" || this.state.email === "") {
      this.props.enqueueSnackbar("Empty Fields", {
        variant: "error",
      });
    } else {
      const contact = {
        email: this.state.email,
        message: this.state.message,
      };

      axios
        .post("http://localhost:5000/contactus", {
          email: contact.email,
          message: contact.message,
        })
        .then((response) => {
          console.log(response);
          if (response.data.email) {
            this.props.enqueueSnackbar("Query Submitted", {
              variant: "success",
            });
            this.setState({ message: "", email: "" });
          } else {
            this.props.enqueueSnackbar("Email Already Used", {
              variant: "error",
            });
          }
        });
    }
  }

  render() {
    return (
      <section className="Misc" ref={this.props.contactUsRef}>
        <h2>Contact Us</h2>
        <form className="contact-form">
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              placeholder="Enter Email"
              value={this.state.email}
              onChange={this.onChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Message</label>
            <input
              type="text"
              name="message"
              placeholder="Enter your message"
              value={this.state.message}
              onChange={this.onChange}
            />
          </div>
          <Button type="primary" size="medium" onClick={this.onSubmit}>
            Send
          </Button>
        </form>
      </section>
    );
  }
}

export default withSnackbar(ContactUs);
