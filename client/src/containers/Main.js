import React, { Component } from "react";
import Videoupload from "../components/modals/videoupload";
import Cctvipaddress from "../components/modals/cctvipaddress";
import  Button  from "@material-ui/core/Button";
import axios from "axios";
import { withSnackbar } from "notistack";

class Main extends Component {
  constructor() {
    super();
    this.state = {
      videoModal: null,
      cctvModal: null,
    };
    this.onWebCam = this.onWebCam.bind(this);
  }

  onWebCam() {
    axios
      .post("http://localhost:5000/getSuspiciousActivityWebcam")
      .then((res) => {
        console.log(res);
        if (res.data.webcam === "Webcam Successfull") {
          this.props.enqueueSnackbar(res.data.webcam, {
            variant: "success",
          });
        }
      });
  }

  render() {
    return (
      <div className="main-app">
        <div className="homepage">
          {this.state.videoModal ? (
            <Videoupload onClose={() => this.setState({ videoModal: false })} />
          ) : null}
          {this.state.cctvModal ? (
            <Cctvipaddress
              onClose={() => this.setState({ cctvModal: false })}
            />
          ) : null}
          <div className="">
            <h1 className="title">The Seek</h1>
          </div>
          <div className="seek-description">
            <p>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book. It has
              survived not only five centuries, but also the leap into
              electronic typesetting, remaining essentially unchanged. It was
              popularised in the 1960s with the release of Letraset sheets
              containing Lorem Ipsum passages, and more recently with desktop
              publishing software like Aldus PageMaker including versions of
              Lorem Ipsum.
            </p>
          </div>
          <section className="functions">
            <div className="act-tile">
              <p className="functitle">Webcam</p>
              <p>
                For the simplest of starters, We provide a webcam to test
                Suspicious activity and object detection. Accessing your webcam
                to perform a series of computations for detection.
              </p>
              <p className="funcicon"></p>
              <Button style={{backgroundColor:"#0068cf", color:"white"}} variant="contained" size="medium" onClick={() => this.onWebCam()}>
                Open Webcam
              </Button>
            </div>
            <div className="act-tile">
              <p className="functitle">Video</p>
              <p>
                Incase of manual detection in a desired video, We provide an
                option to upload video and detect Suspicious activity and
                object. For that we provide a frame by frame activity detected
                and its original frame.
              </p>
              <p className="funcicon"></p>
              <Button style={{backgroundColor:"#0068cf", color:"white"}} variant="contained" size="medium"  onClick={() => this.setState({ videoModal: true })}>Upload Video</Button>
            </div>
            <div className="act-tile">
              <p className="functitle">CCTV</p>
              <p>
                Our main module is CCTV. CCTV is the way to detect Suspicious
                activity and objects over Cams. You can access cams with their
                IP address and we will computate over those Cam feeds to provide
                you with results.
              </p>

              <p className="funcicon"></p>
              <Button
                style={{backgroundColor:"#0068cf", color:"white"}} variant="contained" size="medium"
                onClick={() => this.setState({ cctvModal: true })}
              >
                Add CCTV CAM
              </Button>
            </div>
          </section>
        </div>
      </div>
    );
  }
}

export default withSnackbar(Main);
