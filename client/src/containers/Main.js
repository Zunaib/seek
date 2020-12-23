import React, { useState } from "react";
import Videoupload from "../components/modals/videoupload";
import Cctvipaddress from "../components/modals/cctvipaddress";
import { Button, Typography, Row, Card, Col, PageHeader, Divider } from "antd";
import { withSnackbar } from "notistack";
const Main = (props) => {
  const [videoModal, setVideoModal] = useState(false);
  const [cctvModal, setCCTVModal] = useState(false);
  const { Title, Paragraph } = Typography;

  return (
    <div className="homepage">
      {videoModal ? <Videoupload onClose={() => setVideoModal(false)} /> : null}
      {cctvModal ? <Cctvipaddress onClose={() => setCCTVModal(false)} /> : null}
      <PageHeader
        className="site-page-header"
        title={<Title level={2}>THE SEEK</Title>}
        subTitle={<Title level={5}>Suspicious Activity Detector</Title>}
      >
        <Paragraph>
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book. It has survived not only
          five centuries, but also the leap into electronic typesetting,
          remaining essentially unchanged. It was popularised in the 1960s with
          the release of Letraset sheets containing Lorem Ipsum passages, and
          more recently with desktop publishing software like Aldus PageMaker
          including versions of Lorem Ipsum.
        </Paragraph>
      </PageHeader>
      <Divider>Home Page</Divider>
      <Row justify="center">
        <Col span={6}>
          <Card
            style={{ width: 350 }}
            className="main-card"
            cover={
              <img
                alt="example"
                src={require("../assets/shubhadeep-das-DGJ5nUe4etM-unsplash.jpg")}
              />
            }
            actions={[
              <Button
                type="primary"
                size="large"
                onClick={() => props.history.push("/webcamstream")}
              >
                Open Webcam
              </Button>,
            ]}
          >
            <Card.Meta
              title={<Title level={4}>Webcam</Title>}
              description={
                <div className="vid-card">
                  For the simplest of starters, We provide a webcam to test
                  Suspicious activity and object detection. Accessing your
                  webcam to perform a series of computations for detection.
                </div>
              }
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card
            style={{ width: 350 }}
            className="main-card"
            cover={
              <img
                alt="example"
                src={require("../assets/umit-yildirim-TEvEZqYomK8-unsplash.jpg")}
              />
            }
            actions={[
              <Button
                type="primary"
                size="large"
                onClick={() => setVideoModal(true)}
              >
                Upload Video
              </Button>,
            ]}
          >
            <Card.Meta
              title={<Title level={4}>Video</Title>}
              description="Incase of manual detection in a desired video, We provide an option
            to upload video and detect Suspicious activity and object. For that
            we provide a frame by frame activity detected and its original
            frame."
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card
            style={{ width: 350 }}
            className="main-card"
            cover={
              <img
                alt="example"
                src={require("../assets/helen-hermetic-SwJguEX8L3g-unsplash.jpg")}
              />
            }
            actions={[
              <Button
                type="primary"
                size="large"
                onClick={() => setCCTVModal(true)}
              >
                Add Camera
              </Button>,
            ]}
          >
            <Card.Meta
              title={<Title level={4}>CCTV Camera</Title>}
              description="Our main module is CCTV. CCTV is the way to detect Suspicious
            activity and objects over Cams. You can access cams with their IP
            address and we will computate over those Cam feeds to provide you
            with results."
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default withSnackbar(Main);
