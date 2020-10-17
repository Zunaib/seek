import React, { Component } from "react";
import axios from "axios";
import ReactPlayer from "react-player";
import Spinner from "../components/Spinner";
import {PageHeader, Divider} from "antd";

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
        <div className="Main">
        {this.state.loading ? <Spinner/> :
        <>
              <PageHeader
        className="site-page-header"
        title="Suspicious Video"
        subTitle={`This is suspicious part of ` + this.state.video.suspName.split(".")[0] }
      />
      <Divider>Suspicious Part</Divider>
            <div className="prvideo">
              <ReactPlayer url={"http://localhost:5000/" + this.state.video.suspPath} {...videostyles} />
              <h2>{this.state.video.suspName.split(".")[0]}</h2>
            </div>
            </>
        }
        </div>
    );
  }
}

export default SuspiciousVideo;
