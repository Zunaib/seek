import React, { useState, useEffect } from "react";
import axios from "axios";
import ReactPlayer from "react-player";
import { Link } from "react-router-dom";
import { withSnackbar } from "notistack";
import {
  PageHeader,
  Divider,
  Button,
  Popconfirm,
  Card,
  Row,
  Col,
  Typography,
  Tooltip,
} from "antd";
import { HeartOutlined, HeartFilled } from "@ant-design/icons";

const Videos = (props) => {
  const [video, setVideo] = useState([]);
  const [loading, setLoading] = useState(true);
  const [reload, setReload] = useState(false);

  const { Title } = Typography;

  useEffect(() => {
    axios
      .get(
        "http://localhost:5000/getuservideos?email=" +
          localStorage.getItem("useremail")
      )
      .then((response) => {
        if (response.data.length >= 1) {
          setLoading(false);
          setVideo(response.data.filter((res) => res.deleted !== true));
        } else {
          setLoading(false);
          setVideo([]);
        }
      })
      .catch((err) => {
        console.log(err);
        return err;
      });
  }, [reload]);

  const videostyles = {
    playing: false,
    controls: true,
    width: "100%",
  };

  const handleDelete = (vidName) => {
    axios
      .post("http://localhost:5000/deletevideo", {
        email: localStorage.getItem("useremail"),
        videoName: vidName,
      })
      .then((response) => {
        if (response.data.success) {
          props.enqueueSnackbar("Video Deleted", {
            variant: "success",
          });
          setReload(!reload);
        } else {
          props.enqueueSnackbar("Video Not Found", {
            variant: "error",
          });
        }
      })
      .catch((err) => {
        console.log(err);
        return err;
      });
  };

  const addToFav = (video) => {
    axios
      .post("http://localhost:5000/addtofavvideo", {
        email: video.email,
        name: video.videoName,
        path: video.filePath,
        suspName: video.suspName,
        norName: video.norName,
        sttName: video.sttName,
        blocked: video.blocked,
        deleted: video.deleted,
      })
      .then((response) => {
        console.log(response);
        if (response.data.success) {
          props.enqueueSnackbar("Video Favourited", {
            variant: "success",
          });
          setReload(!reload);
        } else {
          props.enqueueSnackbar("Video Not Found", {
            variant: "error",
          });
        }
      })
      .catch((err) => {
        console.log(err);
        return err;
      });
  };

  const delfromFav = (video) => {
    axios
      .post("http://localhost:5000/remfavvideo", {
        email: video.email,
        name: video.videoName,
      })
      .then((response) => {
        console.log(response);
        if (response.data.success) {
          props.enqueueSnackbar("Video UnFavourited", {
            variant: "success",
          });
          setReload(!reload);
        } else {
          props.enqueueSnackbar("Video Not Found", {
            variant: "error",
          });
        }
      })
      .catch((err) => {
        console.log(err);
        return err;
      });
  };

  return (
    <div className="Main">
      <PageHeader
        className="site-page-header"
        title="My Videos"
        subTitle="My Videos Information and Actions"
      />
      <Divider>My Videos</Divider>
      <Row justify="start">
        {video?.map((vid) => (
          <Col span={4}>
            <Card
              loading={loading}
              className="main-card"
              cover={
                <ReactPlayer
                  className="player"
                  url={
                    vid.blocked
                      ? "http://localhost:5000/"
                      : "http://localhost:5000/" + vid.filePath
                  }
                  {...videostyles}
                />
              }
              actions={[
                <Popconfirm
                  title="Sure to delete?"
                  onConfirm={() => handleDelete(vid.videoName)}
                >
                  <Button type="primary" danger size="small">
                    Delete
                  </Button>
                </Popconfirm>,
                vid.fav ? (
                  <Tooltip title="Remove From Favourite">
                    <HeartFilled
                      className="fav-icon"
                      onClick={() => delfromFav(vid)}
                    />
                  </Tooltip>
                ) : (
                  <Tooltip title="Add To Favourite">
                    <HeartOutlined
                      className="fav-icon"
                      onClick={() => addToFav(vid)}
                    />
                  </Tooltip>
                ),
              ]}
            >
              <Card.Meta
                title={
                  <Title level={4}>
                    {vid.blocked
                      ? vid.videoName.split(".")[0] + "" + vid.blocked &&
                        "(Blocked By Admin)"
                      : vid.videoName.split(".")[0]}
                  </Title>
                }
                description={
                  <div>
                    <Link to={"/videos/suspicious/" + vid.suspName}>
                      <Button
                        type="primary"
                        size="small"
                        style={{ margin: "2px 5px" }}
                      >
                        Suspicious
                      </Button>
                    </Link>
                    <Link to={"/videos/normal/" + vid.norName}>
                      <Button
                        type="primary"
                        size="small"
                        style={{ margin: "2px 5px" }}
                      >
                        Normal
                      </Button>
                    </Link>
                    <Link to={"/videos/static/" + vid.sttName}>
                      <Button
                        type="primary"
                        size="small"
                        style={{ margin: "2px 5px" }}
                      >
                        Static
                      </Button>
                    </Link>
                  </div>
                }
              />
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default withSnackbar(Videos);
