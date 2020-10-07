import React from "react";

const Services = () => (
  <section className="Services">
    <div>
      <p className="ServiceIcon"></p>
      <p className="ServiceTitle">Webcam</p>
      <p>
        For the simplest of starters, We provide a webcam to test Suspicious
        activity and object detection. Accessing your webcam to perform a series
        of computations for detection.
      </p>
    </div>
    <div>
      <p className="ServiceIcon"></p>
      <p className="ServiceTitle">Video</p>
      <p>
        Incase of manual detection in a desired video, We provide an option to
        upload video and detect Suspicious activity and object. For that we
        provide a frame by frame activity detected and its original frame.
      </p>
    </div>
    <div>
      <p className="ServiceIcon"></p>
      <p className="ServiceTitle">CCTV</p>
      <p>
        Our main module is CCTV. CCTV is the way to detect Suspicious activity
        and objects over Cams. You can access cams with their IP address and we
        will computate over those Cam feeds to provide you with results.
      </p>
    </div>
  </section>
);

export default Services;
