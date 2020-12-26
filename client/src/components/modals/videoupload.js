import React, { useState } from "react";
import { Button } from "antd";
import axios from "axios";
import { withSnackbar } from "notistack";

const Videoupload = (props) => {
  const [selectedFile, setselectedFile] = useState(null);

  const onFileUpload = () => {
    if (selectedFile) {
      const formData = new FormData();

      formData.append("email", "test");
      formData.append("video", selectedFile);

      axios
        .post(
          "http://localhost:5000/getSuspiciousActivity?email=" +
            localStorage.getItem("useremail"),
          formData
        )
        .then((res) => {
          console.log(res);
          if (res.data.video === "Video has been saved") {
            props.onClose();
            props.enqueueSnackbar(res.data.video, {
              variant: "success",
            });
          } else if (res.data.error === "Video Name Against Account Exists") {
            props.enqueueSnackbar(res.data.error, {
              variant: "error",
            });
          }
        });
    } else {
      props.enqueueSnackbar("No Video Selected", {
        variant: "error",
      });
    }
  };

  const fileData = () => {
    if (this.state.selectedFile) {
      return (
        <div>
          <h2>File Details:</h2>
          <p>File Name: {selectedFile.name}</p>
          <p>File Type: {selectedFile.type}</p>
          <p>
            Last Modified:
            {selectedFile.lastModifiedDate.toDateString()}
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

  return (
    <>
      <div class="modal-main">
        <div class="modal-content">
          <div className="close" onClick={props.onClose}>
            <i className="fas fa-times"></i>
          </div>

          <div className="file">
            <div className="inputfile">
              <label htmlFor="videofile">Select a Video</label>
              <input
                name="videofile"
                type="file"
                value={selectedFile?.name}
                onChange={(e) => {
                  if (e.target.files[0].size > 100000000) {
                    props.enqueueSnackbar("Video Size Too Big", {
                      variant: "error",
                    });
                    setselectedFile(null);
                  } else {
                    setselectedFile(e.target.files[0]);
                  }
                }}
                accept="video/mp4"
                max
              />
              <Button
                type="primary"
                size="middle"
                onClick={() => onFileUpload()}
              >
                Upload
              </Button>
            </div>
            {() => fileData()}
          </div>
        </div>
      </div>
    </>
  );
};

export default withSnackbar(Videoupload);
