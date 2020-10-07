import React, { Component } from "react";
import axios from "axios";
import ReactPlayer from "react-player";
import Spinner from "../components/Spinner";

class ProcessedVideos extends Component {
  state = {
    video: null,
    loading: true,
  };

  componentDidMount() {
    axios
      .get(
        "http://localhost:5000/getUserVideos?email=" +
          localStorage.getItem("useremail")
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
      <div className="main-app">
        <div className=" container-fluid page">
          {this.state.loading ? (
            <div className="loading">
              <Spinner />
            </div>
          ) : (
            <div className="row">
              {this.state.video &&
                this.state.video.map((vid) => (
                  <div className="vlogCard">
                    
                    <div className="cardText">
                      <h4>
                        <b>{vid.videoName.split(".")[0]}</b>
                      </h4>
                     
                    </div>
                    <div className="cardInfo">
                    <Button onClick={this.onSubmit}>open suspicious part</Button>
                    <Button onClick={this.onSubmit}>open normal part</Button>
                    <Button onClick={this.onSubmit}>open static part</Button>
                    </div>
                  </div>
                ))}
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default ProcessedVideos;