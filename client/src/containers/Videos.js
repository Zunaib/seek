import React, { Component } from "react";
import axios from "axios";
import ReactPlayer from "react-player";
import Spinner from "../components/Spinner";
import { Link } from 'react-router-dom';
import { PageHeader, Divider, Button } from "antd";

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
    };
    return (
      <div className="Main">

        <PageHeader
          className="site-page-header"
          title="My Videos"
          subTitle="My Videos Information and Actions"
        />
        <Divider>My Videos</Divider>
        <div className=" container-fluid page">
          {this.state.loading ? (
            <div className="loading">
              <Spinner />
            </div>
          ) : (
            this.state.video.length >=1 ?
              <div className="row">
                {this.state.video.length > 0 ?
                  this.state.video.map((vid,index) => (
                    <div className="vlogCard" key={index}>
                      <ReactPlayer
                        url={ vid.blocked ? "http://localhost:5000/" : "http://localhost:5000/" + vid.filePath}
                        {...videostyles}
                      />
                      <div className="cardText">
                        <h4>
                          <b>{vid.videoName.split(".")[0]}</b>
                          <b>{vid.blocked && "(Blocked By Admin)"}</b>
                        </h4>
                        <div className="desc">
                          The specific parts of the video can be seen through below:
                      </div>
                      </div>
                      <div className="cardInfo">
                        <div className="activities">
                          <Link to={"/videos/suspicious/" + vid.suspName}>
                            <Button type="primary"  size="small" style={{ margin: "0px 4px 0px 4px" }}>Suspicious Part</Button>
                          </Link>
                          <Link to={"/videos/normal/" + vid.norName}>
                            <Button type="primary"  size="small" style={{ margin: "0px 4px 0px 4px" }}>Normal Part</Button>
                          </Link>
                          <Link to={"/videos/static/" + vid.sttName}>
                            <Button type="primary"  size="small" style={{ margin: "0px 4px 0px 4px" }}>Static Part</Button>
                          </Link>
                        </div>
                      </div>
                    </div>
                  )) :
                  <div >
                    <h2>No Videos Exist</h2>
                  </div>
                }
              </div>
              :<h3>No Videos Found</h3>
            )}
        </div>
      </div>
    );
  }
}

export default Videos;
