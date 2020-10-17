import React, { Component } from "react";
import axios from "axios";
import ReactPlayer from "react-player";
import Spinner from "../components/Spinner";

class StaticVideo extends Component {
  state = {
    video: null,
    loading: true,
  };

  componentDidMount() {
    axios
      .post(
        "http://localhost:5000/getusersttvideo?email=" +
          localStorage.getItem("useremail"),
          {
            sttvideoname:window.location.href.split('/')[5]

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
      width: "100%",
      // height: "auto",
    };
    return (
      <div className="Main">
          {this.state.loading ? (
            <div className="loading">
              <Spinner />
            </div>
          ) : (
                  <div>
                    <ReactPlayer
                      url={"http://localhost:5000/" + this.state.video.sttPath}
                      {...videostyles}
                    />
                    <div className="cardText">
                      <h4>
                        <b>{this.state.video.sttName.split(".")[0]}</b>
                      </h4>
                      <div className="desc">
                        The suspicious activities detected are in order of most
                        to least occurences.
                      </div>
                    </div>
                  </div>
          )}
        </div>
    );
  }
}

export default StaticVideo;
