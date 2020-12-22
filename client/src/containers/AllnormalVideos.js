import React, { useEffect, useState } from "react";
import axios from "axios";
import { withSnackbar } from "notistack";
import { PageHeader, Divider, Button, Table } from "antd";
import ReactPlayer from "react-player";

const AllnormalVideos = (props) => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [reload, setReload] = useState(false);

  useEffect(() => {
    axios
      .get("http://localhost:5000/getallnorvideos")
      .then((response) => {
        setLoading(false);
        setVideos(
          response?.data?.map((vid, index) => ({
            key: index + 1,
            video: (
              <ReactPlayer
                url={"http://localhost:5000/" + vid.norPath}
                playing={false}
                controls={true}
                volume={1}
                width={"inherit"}
                height={"inherit"}
              />
            ),
            email: vid.email,
            name: vid.videoName,
            norname: vid.norName,
            filepath: vid.norPath,
            blocked: vid.norblocked ? "True" : "False",
            deleted: vid.nordeleted ? "True" : "False",
            vid: vid,
          }))
        );
      })
      .catch((err) => {
        console.log(err);
        return err;
      });
  }, [reload]);

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
      title: "Normal Name",
      dataIndex: "norname",
      key: "norname",
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
              record.vid.norblocked ? "unblock" : "block",
              record.vid.email,
              record.vid.videoName
            )
          }
        >
          {record.vid.norblocked ? "Unblock" : "Block"}
        </Button>
      ),
    },
  ];

  const actionBtn = (type, email, vidName) => {
    if (type === "block") {
      axios
        .post("http://localhost:5000/blocknorvideo", {
          suspvideoname: vidName,
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
        .post("http://localhost:5000/unblocknorvideo", {
          suspvideoname: vidName,
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

  return (
    <div className="Main">
      <PageHeader
        className="site-page-header"
        title="All Normal Videos"
        subTitle="All Normal Suspicious Videos Information and Actions"
      />
      <Divider>Normal Videos</Divider>
      <Table bordered loading={loading} dataSource={videos} columns={columns} />
      ;
    </div>
  );
};

export default withSnackbar(AllnormalVideos);
