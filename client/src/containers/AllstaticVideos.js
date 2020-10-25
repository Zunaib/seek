import React, { useEffect, useState } from "react";
import StaticList from "../components/admin/StaticList";
import axios from "axios";
import Spinner from "../components/Spinner";
import { Divider, PageHeader } from "antd";

const AllstaticVideos = (props) => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [reload, setReload] = useState(false);

  useEffect(() => {
    axios
      .get("http://localhost:5000/getallsttvideos")
      .then((response) => {
        setLoading(false);
        setVideos(response.data);
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

  return (
    <div className="Main">
      <PageHeader
        className="site-page-header"
        title="All Static Videos"
        subTitle="All Normal Suspicious Videos Information and Actions"
      />
      <Divider>Static Videos</Divider>
      {loading ? (
        <Spinner />
      ) : videos.length >= 1 ? (
        <div className="AdminList">
          <div className="tbl-header">
            <table cellPadding="0" cellSpacing="0" border="0">
              <thead className="">
                <tr>
                  <th>Video</th>
                  <th>Email</th>
                  <th>Name</th>
                  <th>Suspicious Name</th>
                  <th>Path</th>
                  <th>Blocked</th>
                  <th>Deleted</th>
                  <th>Action</th>
                </tr>
              </thead>
            </table>
          </div>
          <div>
            <table cellPadding="0" cellSpacing="0" border="0">
              <tbody className="tbl-content">
                {videos.map((video, index) =>
                  video.email !== localStorage.getItem("useremail") ? (
                    <StaticList
                      key={index}
                      btnClicked={(type) =>
                        actionBtn(type, video.email, video.videoName)
                      }
                      email={video.email}
                      name={video.videoName}
                      sttName={video.sttName}
                      sttPath={video.sttPath}
                      sttblocked={video.sttblocked}
                      sttdeleted={video.sttdeleted}
                    />
                  ) : null
                )}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <h3>No Videos Found</h3>
      )}
    </div>
  );
};

export default AllstaticVideos;
