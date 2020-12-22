import React, { useEffect, useState } from "react";
import axios from "axios";
import { Divider, PageHeader, Button, Table } from "antd";
import ReactPlayer from "react-player";

const AllsuspiciousVideos = (props) => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [reload, setReload] = useState(false);

  useEffect(() => {
    axios
      .get("http://localhost:5000/getallsuspvideos")
      .then((response) => {
        setLoading(false);
        setVideos(
          response?.data?.map((vid, index) => ({
            key: index + 1,
            video: (
              <ReactPlayer
                url={"http://localhost:5000/" + vid.suspPath}
                playing={false}
                controls={true}
                volume={1}
                width={"inherit"}
                height={"inherit"}
              />
            ),
            email: vid.email,
            name: vid.videoName,
            suspname: vid.suspName,
            filepath: vid.suspPath,
            blocked: vid.suspblocked ? "True" : "False",
            deleted: vid.suspdeleted ? "True" : "False",
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
        .post("http://localhost:5000/blocksuspvideo", {
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
        .post("http://localhost:5000/unblocksuspvideo", {
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
      title: "Suspicious Name",
      dataIndex: "suspname",
      key: "suspname",
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
              record.vid.suspblocked ? "unblock" : "block",
              record.vid.email,
              record.vid.videoName
            )
          }
        >
          {record.vid.suspblocked ? "Unblock" : "Block"}
        </Button>
      ),
    },
  ];

  return (
    <div className="Main">
      <PageHeader
        className="site-page-header"
        title="All Suspicious Videos"
        subTitle="All  Suspicious Videos Information and Actions"
      />
      <Divider>Normal Videos</Divider>
      <Table bordered loading={loading} dataSource={videos} columns={columns} />
      ;
    </div>
  );
};

export default AllsuspiciousVideos;
