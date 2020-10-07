import React from "react";

const Header = (props) => (
  <section className="Header">
    <div className="back">
      <div className="head">
        <h1>The Seek</h1>
        <div>
          <p>Suspicious Activity Under Surveillance Here</p>
          <div>
            <a
              className="Contact"
              href="#contact"
              onClick={props.scrollToContactUs}
            >
              Contact Us
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default Header;
