import React from "react";
import ReactPlayer from "react-player";

const Test = () => {
  const videostyles = {
    playing: false,
    controls: true,
    volume: 1,
    width: "100%",
    // height: "auto",
  };
  return (
    <div className="Main">
      <h1>Test</h1>
      <h1>Video Streaming Demonstration</h1>
      <img id="bg" src={"http://localhost:5000/video_feed"}></img>
      <img id="bg" src="{{ url_for('video_feed') }}" />
    </div>
  );
};

export default Test;
