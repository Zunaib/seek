import React, { Component } from "react";
import axios from "axios";
import ReactPlayer from "react-player";
import Spinner from "../components/Spinner";
import {NavLink} from "react-router-dom";

class SuspiciousVideo extends Component {
  state = {
    video: null,
    loading: true,
  };

  componentDidMount() {
    axios
      .post(
        "http://localhost:5000/getusersuspvideos?email=" +localStorage.getItem("useremail"),{
          suspvideoname:window.location.href.split('/')[5]
          }
      )
      .then((response) => {
        this.setState({ loading: false, video: response.data });
        console.log(response);
      })
      .catch((err) => {
        console.log(err);
        return err;
      });
  }

  render() {
    const videostyles = {
      playing: false,
      controls: true,
      volume: 1,
      width: "inherit",
      height: "inherit",
    };
    return (
        <div className="main">
        <div className=" container-fluid page">
        {this.state.loading ? <Spinner/> :
        <div className="Video">   
          <NavLink to="/main">
            <div className="cross">
              <h4>Close</h4>
              <i className="fas fa-times"></i>
            </div>
          </NavLink>
          <div className="Video_Top">
            <div className="VideoImage">
              <ReactPlayer url={"http://localhost:5000/" + this.state.video.suspPath} {...videostyles} />
              <h2>{this.state.video.suspName.split(".")[0]}</h2>
              <h4>  The suspicious activities detected are in order of most
                        to least occurences.</h4>
            </div>
          </div>
        </div>
        }
        </div>
        </div>
    );
  }
}

export default SuspiciousVideo;
