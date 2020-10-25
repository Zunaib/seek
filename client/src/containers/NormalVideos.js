import React, { useState, useEffect } from "react";
import axios from "axios";
import ReactPlayer from "react-player";
import Spinner from "../components/Spinner";
import { Link } from "react-router-dom";
import { withSnackbar } from "notistack";
import { PageHeader, Divider, Button, Popconfirm } from "antd";

const NormalVideos = (props) => {
  const [video, setVideo] = useState([]);
  const [loading, setLoading] = useState(true);
  const [reload, setReload] = useState(false);

  useEffect(() => {
    axios
      .get(
        "http://localhost:5000/getusernorvideos?email=" +
          localStorage.getItem("useremail")
      )
      .then((response) => {
        if (response.data.length >= 1) {
          setLoading(false);
          setVideo(response.data.filter((res) => res.nordeleted !== true));
        } else {
          setLoading(false);
          setVideo(response.data);
        }
      })
      .catch((err) => {
        console.log(err);
        return err;
      });
  }, [reload]);

  const normalvideostyles = {
    playing: false,
    controls: true,
    width: "100%",
  };

  const handleDelete = (vidName) => {
    axios
      .post("http://localhost:5000/deletenorvideo", {
        email: localStorage.getItem("useremail"),
        norvideoname: vidName,
      })
      .then((response) => {
        if (response.data.success) {
          props.enqueueSnackbar("Normal Video Deleted", {
            variant: "success",
          });
          setReload(!reload);
        } else {
          props.enqueueSnackbar("Normal Video Not Found", {
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
        title="My NormalVideos"
        subTitle="My Normal Videos Information and Actions"
      />
      <Divider>My Normal Videos</Divider>
      <div className=" container-fluid page">
        {loading ? (
          <div className="loading">
            <Spinner />
          </div>
        ) : video.length >= 1 ? (
          <div className="row">
            {video.length > 0 ? (
              video.map((vid, index) => (
                <div className="vlogCard" key={index}>
                  <ReactPlayer
                    url={
                      vid.norblocked
                        ? "http://localhost:5000/"
                        : "http://localhost:5000/" + vid.norPath
                    }
                    {...normalvideostyles}
                  />
                  <div className="cardText">
                    <h4>
                      <b>{vid.norName.split(".")[0]}</b>
                      <b>{vid.norblocked && "(Blocked By Admin)"}</b>
                    </h4>
                  </div>
                  <div className="cardInfo">
                    <div className="activities">
                      <Link to={"/videos/suspicious/" + vid.norName}>
                        <Button
                          type="primary"
                          size="small"
                          style={{ margin: "0px 4px 0px 4px" }}
                        >
                          Expand
                        </Button>
                      </Link>
                      <Popconfirm
                        title="Sure to delete?"
                        onConfirm={() => handleDelete(vid.norName)}
                      >
                        <Button
                          type="primary"
                          danger={true}
                          size="small"
                          style={{ margin: "0px 4px 0px 4px" }}
                        >
                          Delete Video
                        </Button>
                      </Popconfirm>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div>
                <h2>No Normal Videos Exist</h2>
              </div>
            )}
          </div>
        ) : (
          <h3>No Videos Found</h3>
        )}
      </div>
    </div>
  );
};

export default withSnackbar(NormalVideos);
