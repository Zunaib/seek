import React, { Component } from "react";
import axios from "axios";
import ReactPlayer from "react-player";
import { withSnackbar } from "notistack";
import Spinner from "../components/Spinner";
import { PageHeader, Divider, Card, Tag, Row, Col } from "antd";
import { Redirect } from "react-router-dom";

class NormalVideo extends Component {
  state = {
    video: null,
    loading: true,
    redirect: false,
  };

  componentDidMount() {
    console.log(window.location.href.split("/")[5]);

    axios
      .post(
        "http://localhost:5000/getusernorvideo?email=" +
          localStorage.getItem("useremail"),
        {
          norvideoname: window.location.href.split("/")[5],
        }
      )
      .then((response) => {
        if (response.data.Error) {
          this.props.enqueueSnackbar("Normal Part Not Against this Video", {
            variant: "error",
          });
          this.setState({ loading: false, redirect: true });
        } else if (response.data.norblocked) {
          this.props.enqueueSnackbar("Normal Part Blocked", {
            variant: "error",
          });
          this.setState({ loading: false, redirect: true });
        } else if (response.data.nordeleted) {
          this.props.enqueueSnackbar("Normal Part Deleted", {
            variant: "error",
          });
          this.setState({ loading: false, redirect: true });
        } else {
          this.setState({ loading: false, video: response.data });
          console.log(response);
        }
      })
      .catch((err) => {
        console.log(err);
        return err;
      });
  }

  render() {
    const activities = [
      { name: "Talking" },
      { name: "Smiling" },
      { name: "Walking" },
      { name: "Driving" },
      { name: "Lunch" },
      { name: "Daily Life Activities" },
    ];
    const videostyles = {
      playing: false,
      controls: true,
      volume: 1,
      width: "100%",
      // height: "auto",
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
              title="Normal Video"
              subTitle={
                `This is normal part of ` +
                this.state.video.norName.split(".")[0]
              }
            />
            <Divider>Normal Part</Divider>
            <div className="managevideo">
              <div className="prvideo">
                <ReactPlayer
                  url={"http://localhost:5000/" + this.state.video.norPath}
                  {...videostyles}
                />
                <h2>{this.state.video.norName.split(".")[0]}</h2>
              </div>
              <div className="prvideostat">
                <h4>Normal part contains normal activities like:</h4>
                <Card title="Activites">
                  {activities.map((act) => (
                    <Tag
                      style={{
                        display: "block",
                        fontSize: "15px",
                        padding: "5px",
                        margin: "5px auto",
                        width: "30%",
                      }}
                      color={"#87d068"}
                    >
                      {act.name}
                    </Tag>
                  ))}
                </Card>
              </div>
            </div>
          </>
        )}
      </div>
    );
  }
}

export default withSnackbar(NormalVideo);
