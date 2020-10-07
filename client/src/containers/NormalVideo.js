import React, { Component } from "react";
import axios from "axios";
import ReactPlayer from "react-player";
import Spinner from "../components/Spinner";

class NormalVideo extends Component {
  state = {
    video: null,
    loading: true,
  };

  componentDidMount() {
    axios
      .get(
        "http://localhost:5000/getusernorvideos?email=" +
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
              
                  <div className="vlogCard">
                    <ReactPlayer
                      url={"http://localhost:5000/" + "vid.norPath"}
                      {...videostyles}
                    />
                    <div className="cardText">
                      <h4>
                        {/* <b>{vid.norName.split(".")[0]}</b> */}
                      </h4>
                      <div className="desc">
                        The suspicious activities detected are in order of most
                        to least occurences.
                      </div>
                    </div>
                  </div>
                
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default NormalVideo;
