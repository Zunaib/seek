import React, { Component } from "react";
import { Button } from "antd";
import axios from "axios";
import { withSnackbar } from "notistack";

export class Videoupload extends Component {
  constructor() {
    super();
    this.state = {
      selectedFile: null,
    };
  }

  onFileChange = (event) => {
    this.setState({ selectedFile: event.target.files[0] });
  };

  onFileUpload = () => {
    if (this.state.selectedFile) {
      const formData = new FormData();

      formData.append("email", "test");
      formData.append("video", this.state.selectedFile);

      axios
        .post(
          "http://localhost:5000/getSuspiciousActivity?email=" +
            localStorage.getItem("useremail"),
          formData
        )
        .then((res) => {
          console.log(res);
          if (res.data.video === "Video has been saved") {
            this.props.onClose();
            this.props.enqueueSnackbar(res.data.video, {
              variant: "success",
            });
          } else if (res.data.error === "Video Name Against Account Exists") {
            this.props.enqueueSnackbar(res.data.error, {
              variant: "error",
            });
          }
        });
    } else {
      this.props.enqueueSnackbar("No Video Selected", {
        variant: "error",
      });
    }
  };

  fileData = () => {
    if (this.state.selectedFile) {
      return (
        <div>
          <h2>File Details:</h2>
          <p>File Name: {this.state.selectedFile.name}</p>
          <p>File Type: {this.state.selectedFile.type}</p>
          <p>
            Last Modified:{" "}
            {this.state.selectedFile.lastModifiedDate.toDateString()}
          </p>
        </div>
      );
    } else {
      return (
        <div>
          <br />
          <h6>Choose before Pressing the Upload button</h6>
        </div>
      );
    }
  };

  render() {
    return (
      <>
        <div class="modal-main">
          <div class="modal-content">
            <div className="close" onClick={this.props.onClose}>
              <i className="fas fa-times"></i>
            </div>

            <div className="file">
              <div className="inputfile">
                <label htmlFor="videofile">Select a Video</label>
                <input
                  name="videofile"
                  type="file"
                  onChange={this.onFileChange}
                />
                <Button
                  onClick={this.onFileUpload}
                >
                  Upload
                </Button>
              </div>
              {this.fileData()}
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default withSnackbar(Videoupload);
