import React, { Component } from "react";
import { Button } from "@material-ui/core";

export class Cctvipaddress extends Component {
  constructor() {
    super();
    this.state = {
      ipaddress: "",
    };
    this.onChange = this.onChange.bind(this);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    return (
      <>
        <div class="modal-main">
          <div class="modal-content">
            {/* <span class="close">&times;</span> */}
            <div className="close" onClick={this.props.onClose}>
              <i className="fas fa-times"></i>
            </div>
            <div className="form-group">
              <label htmlFor="ipaddress">CCTV IP Address</label>
              <input
                type="test"
                name="ipaddress"
                placeholder="Enter Camera IP Address"
                value={this.state.ipaddress}
                onChange={this.onChange}
              />
            </div>
            <div className="btn-wrapper">
              <Button  style={{backgroundColor:"#0068cf", color:"white"}} variant="contained" size="medium" onClick={this.onSubmit}>Add Camera</Button>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default Cctvipaddress;
