import React, { Component } from "react";
import axios from "axios";
import ReactPlayer from "react-player";
import Spinner from "../components/Spinner";
import { withSnackbar } from "notistack";
import { PageHeader, Divider, Card, Tag, Row, Col } from "antd";
import { Redirect } from "react-router-dom";

class SuspiciousVideo extends Component {
  state = {
    video: null,
    loading: true,
    objects: [],
    activities: [],
    redirect: false,
  };

  componentDidMount() {
    axios
      .post(
        "http://localhost:5000/getusersuspvideo?email=" +
          localStorage.getItem("useremail"),
        {
          suspvideoname: window.location.href.split("/")[5],
        }
      )
      .then((response) => {
        if (response.data.Error) {
          this.props.enqueueSnackbar("Suspicious Part Not Against this Video", {
            variant: "error",
          });
          this.setState({ loading: false, redirect: true });
        } else if (response.data.suspblocked) {
          this.props.enqueueSnackbar("Suspicious Part Blocked", {
            variant: "error",
          });
          this.setState({ loading: false, redirect: true });
        } else if (response.data.suspdeleted) {
          this.props.enqueueSnackbar("Suspicious Part Deleted", {
            variant: "error",
          });
          this.setState({ loading: false, redirect: true });
        } else {
          console.log(response);
          this.setState({
            loading: false,
            video: response.data,
            activities: [
              { count: response.data.firing, name: "Firing" },
              { count: response.data.fighting, name: "Fighting" },
              { count: response.data.vandalism, name: "Vandalism" },
              { count: response.data.stabbing, name: "Stabbing" },
              { count: response.data.explosion, name: "Explosion" },
              { count: response.data.burglary, name: "Burglary" },
            ],
            objects: [
              { count: response.data.smallgun, name: "Small Gun" },
              { count: response.data.longgun, name: "Long Gun" },
              { count: response.data.knife, name: "Knife" },
            ],
          });
          console.log(response);
        }
      })
      .catch((err) => {
        console.log(err);
        return err;
      });
  }

  render() {
    const activities = this.state.activities.sort((a, b) => b.count - a.count);
    const objects = this.state.objects.sort((a, b) => b.count - a.count);
    const videostyles = {
      playing: false,
      controls: true,
      volume: 1,
      width: "inherit",
      height: "inherit",
    };
    return (
      <div className="Main">
        {this.state.redirect ? (
          <Redirect to="/videos" />
        ) : this.state.loading ? (
          <Row justify="center">
            <Col>
              <div className="loading-spinner">
                <Spinner />
              </div>
            </Col>
          </Row>
        ) : (
          <>
            <PageHeader
              className="site-page-header"
              title="Suspicious Video"
              subTitle={
                `This is suspicious part of ` +
                this.state.video.suspName.split(".")[0]
              }
            />
            <Divider>Suspicious Part</Divider>
            <div className="managevideo">
              <div className="prvideo">
                <ReactPlayer
                  url={"http://localhost:5000/" + this.state.video.suspPath}
                  {...videostyles}
                />
                <h2>{this.state.video.suspName.split(".")[0]}</h2>
              </div>
              <div className="prvideostat">
                <h4>Detected in order of most to least :</h4>
                <Row>
                  <Col span={12}>
                    <Card
                      title="Activity"
                      style={{
                        minHeight: "34vh",
                      }}
                    >
                      {activities.map((act, index) => (
                        <Tag
                          style={{
                            display: "block",
                            fontSize: index === 0 ? "25px" : "15px",
                            padding: index === 0 ? "10px" : "5px",
                            // margin: "5px",
                            margin: index === 0 ? "10px auto" : "5px auto",
                            width: "50%",
                          }}
                          color={index === 0 ? "#f50" : "#87d068"}
                        >
                          {act.name}
                        </Tag>
                      ))}
                    </Card>
                  </Col>
                  <Col span={12}>
                    <Card
                      title="Object"
                      style={{
                        minHeight: "34vh",
                      }}
                    >
                      {objects.map((obj, index) => (
                        <Tag
                          style={{
                            display: "block",
                            fontSize: index === 0 ? "25px" : "15px",
                            padding: index === 0 ? "10px" : "5px",
                            // margin: "5px",
                            margin: index === 0 ? "10px auto" : "5px auto",
                            width: "50%",
                          }}
                          color={index === 0 ? "#f50" : "#87d068"}
                        >
                          {obj.name}
                        </Tag>
                      ))}
                    </Card>
                  </Col>
                </Row>
              </div>
            </div>
          </>
        )}
      </div>
    );
  }
}

export default withSnackbar(SuspiciousVideo);
