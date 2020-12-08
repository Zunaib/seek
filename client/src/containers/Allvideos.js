import React, { useState, useEffect } from "react";
import axios from "axios";
import { withSnackbar } from "notistack";
import { PageHeader, Divider, Button, Table } from "antd";
import ReactPlayer from "react-player";

const Allvideos = (props) => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [reload, setReload] = useState(false);

  useEffect(() => {
    axios
      .get("http://localhost:5000/getallvideos")
      .then((response) => {
        console.log(response);
        setLoading(false);

        setVideos(
          response?.data?.map((vid, index) => ({
            key: index + 1,
            video: (
              <ReactPlayer
                url={"http://localhost:5000/" + vid.filePath}
                playing={false}
                controls={true}
                volume={1}
                width={"inherit"}
                height={"inherit"}
              />
            ),
            email: vid.email,
            name: vid.videoName,
            filepath: vid.filePath ? "True" : "False",
            blocked: vid.blocked ? "True" : "False",
            deleted: vid.deleted ? "True" : "False",
            vid: vid,
          }))
        );
      })
      .catch((err) => {
        console.log(err);
        return err;
      });
  }, [reload]);

  const actionBtn = (type, email, vidName) => {
    if (type === "block") {
      axios
        .post("http://localhost:5000/blockvideo", {
          videoName: vidName,
          email: email,
        })
        .then((res) => {
          if (res.data.success === "Video Blocked") {
            props.enqueueSnackbar("Video Blocked", {
              variant: "success",
            });
            setReload(!reload);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } else if (type === "unblock") {
      axios
        .post("http://localhost:5000/unblockvideo", {
          videoName: vidName,
          email: email,
        })
        .then((res) => {
          if (res.data.success === "Video UnBlocked") {
            props.enqueueSnackbar("Video UnBlocked", {
              variant: "success",
            });
            setReload(!reload);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const columns = [
    {
      title: "Video",
      dataIndex: "video",
      key: "video",
      width: 200,
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Path",
      dataIndex: "filepath",
      key: "filepath",
    },
    {
      title: "Blocked",
      dataIndex: "blocked",
      key: "blocked",
    },
    {
      title: "Deleted",
      dataIndex: "deleted",
      key: "deleted",
    },
    {
      title: "Action",
      dataIndex: "",
      key: "x",
      render: (record) => (
        <Button
          disabled={record.vid.email === localStorage.getItem("useremail")}
          type="primary"
          danger
          onClick={() =>
            actionBtn(
              record.vid.blocked ? "unblock" : "block",
              record.vid.email,
              record.vid.videoName
            )
          }
        >
          {record.vid.blocked ? "Unblock" : "Block"}
        </Button>
      ),
    },
  ];

  return (
    <div className="Main">
      <PageHeader
        className="site-page-header"
        title="All Videos"
        subTitle="All Videos Information and Actions"
      />
      <Divider>Videos</Divider>
      <Table bordered loading={loading} dataSource={videos} columns={columns} />
    </div>
  );
};

export default withSnackbar(Allvideos);
