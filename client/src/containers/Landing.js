import React, { Component } from "react";
import Header from "../components/landing/Header";
import AboutUs from "../components/landing/AboutUs";
import Services from "../components/landing/Services";
import Mission from "../components/landing/Mission";
import Footer from "../components/landing/Footer";
import ContactUs from "../components/landing/ContactUs";

class Landing extends Component {
  render() {
    return (
      <>
        <Header scrollToContactUs={this.props.scrollToContactUs} />
        <AboutUs />
        <Services />
        <Mission />
        <ContactUs contactUsRef={this.props.contactUsRefProp} />
        <Footer />
      </>
    );
  }
}
export default Landing;
