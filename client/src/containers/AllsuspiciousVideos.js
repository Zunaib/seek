import React, { useEffect, useState } from "react";
import SuspiciousList from "../components/admin/SuspiciousList";
import axios from "axios";
import Spinner from "../components/Spinner";
import { Divider, PageHeader } from "antd";

const AllsuspiciousVideos = (props) => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [reload, setReload] = useState(false);

  useEffect(() => {
    axios
      .get("http://localhost:5000/getallsuspvideos")
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

  return (
    <div className="Main">
      <PageHeader
        className="site-page-header"
        title="All Suspicious Videos"
        subTitle="All  Suspicious Videos Information and Actions"
      />
      <Divider>Normal Videos</Divider>
      {loading ? (
        <Spinner />
      ) : videos && videos.length >= 1 ? (
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
                {videos.map((video, index) => (
                  <SuspiciousList
                    key={index}
                    btnClicked={(type) =>
                      actionBtn(type, video.email, video.videoName)
                    }
                    email={video.email}
                    videoName={video.videoName}
                    suspName={video.suspName}
                    suspPath={video.suspPath}
                    suspblocked={video.suspblocked}
                    suspdeleted={video.suspdeleted}
                  />
                ))}
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

export default AllsuspiciousVideos;
