import React, { Component } from "react";
import axios from "axios";
import ReactPlayer from "react-player";
import Spinner from "../components/Spinner";
import {Link} from 'react-router-dom';

class Videos extends Component {
  state = {
    video: [],
    loading: true,
  };

  componentDidMount() {
    axios
      .get(
        "http://localhost:5000/getuservideos?email=" +
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
              {this.state.video.length > 0 ?
                this.state.video.map((vid) => (
                  <div className="vlogCard">
                    <ReactPlayer
                      url={"http://localhost:5000/" + vid.filePath}
                      {...videostyles}
                    />
                    <div className="cardText">
                      <h4>
                        <b>{vid.videoName.split(".")[0]}</b>
                      </h4>
                      <div className="desc">
                        The suspicious activities detected are in order of most
                        to least occurences.
                      </div>
                    </div>
                    <div className="cardInfo">
                      <div className="active-activity">
                        Main Activity:
                        {vid.burglary > vid.fighting && vid.firing
                          ? " Burglary"
                          : vid.fighting > vid.firing
                          ? " Fighting"
                          : " Firing"}
                      </div>
                      <div className="activities">
                        <div className="activity">Burglary:{vid.burglary}</div>
                        <div className="activity">Fighting:{vid.fighting}</div>
                        <div className="activity">Firing:{vid.firing}</div>
                      </div>
                      <div className="activities">
                        <Link to={"/videos/suspicious/"+vid.suspName}>
                          
                        <button>Susp</button>
                        </Link>
                        <Link to={"/videos/normal/"+vid.norName}>
                          
                          <button>Normal</button>
                          </Link>
                          <Link to={"/videos/static/"+vid.sttName}>
                          
                          <button>Static</button>
                          </Link>
                      </div>
                    </div>
                  </div>
                )):
              <div >
                <h2>No Videos Exist</h2>
              </div>
                }
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default Videos;
