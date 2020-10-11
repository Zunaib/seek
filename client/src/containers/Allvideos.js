import React, { Component } from "react";
import axios from "axios";
import VideoList from "../components/admin/dashboard/VideoList";

import Spinner from "../components/Spinner";
import { NavLink } from "react-router-dom";

class Allvideos extends Component {
  state = {
    videos: [],
    loading: true,
  };

  componentDidMount() {
    axios
      .get("http://localhost:5000/getallvideos")
      .then((response) => {
        this.setState({ loading: false, videos: response.data });
        console.log(response);
      })
      .catch((err) => {
        console.log(err);
        return err;
      });
  }

  render() {
    return (
      <div className="Main">
        {this.state.loading ? (
          <Spinner />
        ) : (
          <div className="AdminList">
            <NavLink to="/admin-dashboard">
              <div className="cross">
                <h4>Close</h4>
                <i className="fas fa-times"></i>
              </div>
            </NavLink>
            <h1>All Videos</h1>
            <div className="tbl-header">
              <table cellpadding="0" cellspacing="0" border="0">
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
              <table cellpadding="0" cellspacing="0" border="0">
                <tbody className="tbl-content">
                  {this.state.videos.map((video, index) => (
                    <VideoList
                      key={index}
                      email={video.email}
                      name={video.videoName}
                      filePath={video.filePath}
                      blocked={video.blocked}
                      deleted={video.deleted}
                    />
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default Allvideos;
