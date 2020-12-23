import React, { useState, useEffect } from "react";
import axios from "axios";
import ReactPlayer from "react-player";
import { Link } from "react-router-dom";
import { withSnackbar } from "notistack";
import {
  PageHeader,
  Divider,
  Button,
  Card,
  Row,
  Col,
  Typography,
  Tooltip,
} from "antd";
import { HeartFilled } from "@ant-design/icons";

const FavVideos = (props) => {
  const [video, setVideo] = useState([]);
  const [loading, setLoading] = useState(true);
  const [reload, setReload] = useState(false);

  const { Title } = Typography;

  useEffect(() => {
    axios
      .get(
        "http://localhost:5000/getuserfavvideos?email=" +
          localStorage.getItem("useremail")
      )
      .then((response) => {
        if (response.data.length >= 1) {
          setLoading(false);
          setVideo(response.data);
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

  const delfromFav = (video) => {
    axios
      .post("http://localhost:5000/remfavvideo", {
        email: video.email,
        name: video.name,
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
        title="My Favourite Videos"
        subTitle="My Favorite Videos Information and Actions"
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
                      : "http://localhost:5000/" + vid.path
                  }
                  {...videostyles}
                />
              }
              actions={[
                <Tooltip title="Remove From Favourite">
                  <HeartFilled
                    className="fav-icon"
                    onClick={() => delfromFav(vid)}
                  />
                </Tooltip>,
              ]}
            >
              <Card.Meta
                title={
                  <Title level={4}>
                    {vid.blocked
                      ? vid.name.split(".")[0] + "" + vid.blocked &&
                        "(Blocked By Admin)"
                      : vid.name.split(".")[0]}
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

export default withSnackbar(FavVideos);
