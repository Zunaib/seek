import React, { useState } from "react";
import { PageHeader, Divider } from "antd";

const WebCamStream = () => {
  const [loading, setloading] = useState(true);

  return (
    <div className="Main">
      <PageHeader
        className="site-page-header"
        title={loading ? "Loading Stream" : "Web Cam Stream"}
        subTitle={
          "This is Our Two Models, i.e. Activity Detection nad Objection Detection running on Webcam feed."
        }
      />
      <Divider>Model Acting Stream</Divider>

      <img
        style={{ height: "700px" }}
        id="bg"
        onLoad={() => setloading(false)}
        src={"http://localhost:5000/webcam_feed"}
        alt="#"
      ></img>
    </div>
  );
};

export default WebCamStream;
