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
  Row,
  Col,
  Card,
  Typography,
} from "antd";

const SuspiciousVideos = (props) => {
  const [video, setVideo] = useState([]);
  const [loading, setLoading] = useState(true);
  const [reload, setReload] = useState(false);

  const { Title } = Typography;

  useEffect(() => {
    axios
      .get(
        "http://localhost:5000/getusersuspvideos?email=" +
          localStorage.getItem("useremail")
      )
      .then((response) => {
        if (response.data.length >= 1) {
          setLoading(false);
          setVideo(response.data.filter((res) => res.suspdeleted !== true));
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

  const suspiciousvideostyles = {
    playing: false,
    controls: true,
    width: "100%",
  };

  const handleDelete = (vidName) => {
    axios
      .post("http://localhost:5000/deletesuspvideo", {
        email: localStorage.getItem("useremail"),
        suspvideoname: vidName,
      })
      .then((response) => {
        if (response.data.success) {
          props.enqueueSnackbar("Suspicious Video Deleted", {
            variant: "success",
          });
          setReload(!reload);
        } else {
          props.enqueueSnackbar("Suspicious Video Not Found", {
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
        title="My SuspiciousVideos"
        subTitle="My Suspicious Videos Information and Actions"
      />
      <Divider>My Suspicious Videos</Divider>
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
                    vid.suspblocked
                      ? "http://localhost:5000/"
                      : "http://localhost:5000/" + vid.suspPath
                  }
                  {...suspiciousvideostyles}
                />
              }
              actions={[
                <Link to={"/videos/suspicious/" + vid.suspName}>
                  <Button
                    type="primary"
                    size="small"
                    style={{ margin: "0px 5px" }}
                  >
                    Expand
                  </Button>
                </Link>,
                <Popconfirm
                  title="Sure to delete?"
                  onConfirm={() => handleDelete(vid.suspName)}
                >
                  <Button type="primary" danger size="small">
                    Delete
                  </Button>
                </Popconfirm>,
              ]}
            >
              <Card.Meta
                title={
                  <Title level={4}>
                    {vid.suspblocked
                      ? vid.suspName.split(".")[0] + "" + vid.suspblocked &&
                        "(Blocked By Admin)"
                      : vid.suspName.split(".")[0]}
                  </Title>
                }
              />
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default withSnackbar(SuspiciousVideos);
