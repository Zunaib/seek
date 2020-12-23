import React, { useState, useEffect } from "react";
import { PageHeader, Divider } from "antd";

const UserCCTVDetection = (props) => {
  const [loading, setloading] = useState(true);
  const [cam, setcam] = useState(null);

  useEffect(() => {
    setcam(props?.location?.state?.cam);
  }, [props]);

  return (
    <div className="Main">
      <PageHeader
        className="site-page-header"
        title={loading ? "Loading Stream" : cam?.name}
        subTitle={`This is Our Two Models, i.e. Activity Detection nad Objection Detection running on ${
          cam ? cam.name : "IP CAM"
        }`}
      />
      <Divider>Model Acting Stream</Divider>

      <img
        style={{ height: "700px" }}
        id="bg"
        onLoad={() => setloading(false)}
        src={
          "http://localhost:5000/cam_feed?email=" +
          localStorage.getItem("useremail") +
          "&ip_address=" +
          cam?.ip_address +
          "&camName=" +
          cam?.name
        }
        alt="#"
      ></img>
    </div>
  );
};

export default UserCCTVDetection;
