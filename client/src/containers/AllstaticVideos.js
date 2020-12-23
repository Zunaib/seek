import React, { useEffect, useState } from "react";
import axios from "axios";
import { Divider, PageHeader, Button, Table } from "antd";
import ReactPlayer from "react-player";

const AllstaticVideos = (props) => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [reload, setReload] = useState(false);

  useEffect(() => {
    axios
      .get("http://localhost:5000/getallsttvideos")
      .then((response) => {
        setLoading(false);
        setVideos(
          response?.data?.map((vid, index) => ({
            key: index + 1,
            video: (
              <ReactPlayer
                url={"http://localhost:5000/" + vid.sttPath}
                playing={false}
                controls={true}
                volume={1}
                width={"inherit"}
                height={"inherit"}
              />
            ),
            email: vid.email,
            name: vid.videoName,
            sttname: vid.sttName,
            filepath: vid.sttPath,
            blocked: vid.sttblocked ? "True" : "False",
            deleted: vid.sttdeleted ? "True" : "False",
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
        .post("http://localhost:5000/blocksttvideo", {
          sttvideoname: vidName,
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
        .post("http://localhost:5000/unblocksttvideo", {
          sttvideoname: vidName,
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
      title: "Static Name",
      dataIndex: "sttname",
      key: "sttname",
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
              record.vid.sttblocked ? "unblock" : "block",
              record.vid.email,
              record.vid.videoName
            )
          }
        >
          {record.vid.sttblocked ? "Unblock" : "Block"}
        </Button>
      ),
    },
  ];

  return (
    <div className="Main">
      <PageHeader
        className="site-page-header"
        title="All Static Videos"
        subTitle="All Normal Suspicious Videos Information and Actions"
      />
      <Divider>Static Videos</Divider>
      <Table bordered loading={loading} dataSource={videos} columns={columns} />
    </div>
  );
};

export default AllstaticVideos;
