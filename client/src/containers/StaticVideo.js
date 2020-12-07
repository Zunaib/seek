import React, { Component } from "react";
import axios from "axios";
import ReactPlayer from "react-player";
import Spinner from "../components/Spinner";
import { PageHeader, Divider, Card, Tag, Row, Col } from "antd";
import { withSnackbar } from "notistack";
import { Redirect } from "react-router-dom";

class StaticVideo extends Component {
  state = {
    video: null,
    loading: true,
    redirect: false,
  };

  componentDidMount() {
    axios
      .post(
        "http://localhost:5000/getusersttvideo?email=" +
          localStorage.getItem("useremail"),
        {
          sttvideoname: window.location.href.split("/")[5],
        }
      )
      .then((response) => {
        if (response.data.Error) {
          this.props.enqueueSnackbar("Static Part Not Against this Video", {
            variant: "error",
          });
          this.setState({ loading: false, redirect: true });
        } else if (response.data.sttblocked) {
          this.props.enqueueSnackbar("Static Part Blocked", {
            variant: "error",
          });
          this.setState({ loading: false, redirect: true });
        } else if (response.data.sttdeleted) {
          this.props.enqueueSnackbar("Static Part Deleted", {
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
              title="Static Video"
              subTitle={
                `This is static part of ` +
                this.state.video.sttName.split(".")[0]
              }
            />
            <Divider>Static Part</Divider>
            <div className="managevideo">
              <div className="prvideo">
                <ReactPlayer
                  url={"http://localhost:5000/" + this.state.video.sttPath}
                  {...videostyles}
                />
                <h2>{this.state.video.sttName.split(".")[0]}</h2>
              </div>
              <div className="prvideostat">
                <h4>Static part contains static frames</h4>
                <Card title="Activites">
                  Static frames have just still activity like :
                  <Tag
                    style={{
                      display: "block",
                      fontSize: "15px",
                      padding: "5px",
                      margin: "5px auto",
                      width: "40%",
                    }}
                    color={"#87d068"}
                  >
                    Empty Garage At Night
                  </Tag>
                  <Tag
                    style={{
                      display: "block",
                      fontSize: "15px",
                      padding: "5px",
                      margin: "5px auto",
                      width: "40%",
                    }}
                    color={"#87d068"}
                  >
                    Empty Security Areas
                  </Tag>
                  <Tag
                    style={{
                      display: "block",
                      fontSize: "15px",
                      padding: "5px",
                      margin: "5px auto",
                      width: "40%",
                    }}
                    color={"#87d068"}
                  >
                    Empty Roads
                  </Tag>
                </Card>
              </div>
            </div>
          </>
        )}
      </div>
    );
  }
}

export default withSnackbar(StaticVideo);
