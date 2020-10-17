import React, { useState, useEffect } from "react";
import axios from "axios";
import VideoList from "../components/admin/VideoList";
import { withSnackbar } from "notistack";
import Spinner from "../components/Spinner";
import { PageHeader, Divider } from "antd"

const Allvideos = (props) => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [reload, setReload] = useState(false);

  useEffect(() => {
    axios
      .get("http://localhost:5000/getallvideos")
      .then((response) => {
        console.log(response)
        setLoading(false);
        setVideos(response.data.filter(res => res.email !== localStorage.getItem("useremail")));
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

  return (
    <div className="Main">
      <PageHeader
        className="site-page-header"
        title="All Videos"
        subTitle="All Videos Information and Actions"
      />
      <Divider>Videos</Divider>
      {loading ? (
        <Spinner />
      ) : (
        videos.length >=1 ?
          <div className="AdminList">
            <div className="tbl-header">
              <table cellPadding="0" cellSpacing="0" border="0">
                <thead className="">
                  <tr>
                    <th>Video</th>
                    <th>Email</th>
                    <th>Name</th>
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
                      <VideoList
                        key={index}
                        btnClicked={(type) =>
                          actionBtn(type, video.email, video.videoName)
                        }
                        email={video.email}
                        name={video.videoName}
                        filePath={video.filePath}
                        blocked={video.blocked}
                        deleted={video.deleted}
                      />
                  )}
                </tbody>
              </table>
            </div>
          </div>
          : <h3>No Videos Found</h3>
        )}
    </div>
  );
};

export default withSnackbar(Allvideos);
