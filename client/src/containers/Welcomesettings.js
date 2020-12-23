import React, { useState, useEffect } from "react";
import {
  Card,
  Tag,
  Button,
  Input,
  Row,
  Col,
  Form,
  Select,
  Avatar,
  Typography,
} from "antd";
import { UserOutlined } from "@ant-design/icons";
import { withSnackbar } from "notistack";
import axios from "axios";

const Welcomesettings = (props) => {
  const [loading, setLoading] = useState(true);
  const [extchange, setEXTChange] = useState({
    first_name: "",
    last_name: "",
    about: "",
    address: "",
    phone_number: "",
    picture: null,
    gender: "",
    password: "",
  });
  const [change, setChange] = useState({
    first_name: "",
    last_name: "",
    about: "",
    address: "",
    phone_number: "",
    picture: null,
    gender: "",
    password: "",
  });
  const [reload, setReload] = useState(false);

  useEffect(() => {
    axios
      .post("http://localhost:5000/users/fetchusersettngs", {
        email: localStorage.getItem("useremail"),
      })
      .then((response) => {
        setLoading(false);
        console.log(response);
        setEXTChange({
          first_name: response.data[0].first_name,
          last_name: response.data[0].last_name,
          about: response.data[0].about,
          address: response.data[0].address,
          phone_number: response.data[0].phone_number,
          gender: response.data[0].gender,
          picture: response.data[0].picture,
        });
        setChange({
          first_name: response.data[0].first_name,
          last_name: response.data[0].last_name,
          about: response.data[0].about,
          address: response.data[0].address,
          phone_number: response.data[0].phone_number,
          gender: response.data[0].gender,
          picture: response.data[0].picture,
        });
      })
      .catch((err) => {
        console.log(err);
        return err;
      });
  }, [reload]);

  const updateSettings = () => {
    console.log(change);
    console.log(fileList);
    if (
      change.first_name === "" ||
      change.last_name === "" ||
      change.about === "" ||
      change.address === "" ||
      change.phone_number === "" ||
      change.gender === "" ||
      fileList === null
    ) {
      props.enqueueSnackbar("Some Empty Fields", {
        variant: "error",
      });
    } else {
      const formData = new FormData();
      console.log(fileList);
      formData.append("picture", fileList);
      axios
        .post("http://localhost:5000/users/welcomesettings", formData, {
          params: {
            email: localStorage.getItem("useremail"),
            first_name: change.first_name,
            last_name: change.last_name,
            about: change.about ? change.about : "",
            address: change.address ? change.address : "",
            phone_number: change.phone_number ? change.phone_number : "",
            extPicture: fileList !== null ? "" : extchange.picture,
            gender: change.gender ? change.gender : "",
            welcomed: true,
          },
        })
        .then((response) => {
          if (response.data.success) {
            console.log(response);
            props.enqueueSnackbar("Welcome Done", {
              variant: "success",
            });
            localStorage.setItem("welcomed", true);
            setReload(!reload);
            if (localStorage.getItem("admin") === "true") {
              props.history.push("/dashboard");
            } else {
              props.history.push("/main");
            }
          }
        })
        .catch((err) => {
          console.log(err);
          return err;
        });
    }
  };

  const { Title } = Typography;
  const { TextArea } = Input;
  const [fileList, setFileList] = useState(null);
  const onChange = (e) => {
    setFileList(e.target.files[0]);
  };

  return (
    <section className="welcome-back ">
      <div
        className=" container-fluid page"
        style={{ padding: "70px 0px 0px 0px" }}
      >
        <Row
          className="wel-card-row"
          type="flex"
          justify="center"
          align="middle"
          style={{ margin: "0 50px" }}
        >
          <Col span={24}>
            <div className="site-card-wrapper">
              <Row
                gutter={16}
                justify="center"
                align="middle"
                style={{ minHeight: "35vh" }}
              >
                <Col span={16}>
                  <Card
                    loading={loading}
                    className="welcome-card"
                    title={
                      <Title style={{ textAlign: "center" }} level={3}>
                        Welcome To The Seek
                      </Title>
                    }
                    bordered={true}
                    style={{ margin: "10px" }}
                  >
                    <Row justify="center">
                      <Col span={12}>
                        <Row justify="center">
                          <Col style={{ textAlign: "center" }}>
                            <Title level={4}>Normal User</Title>
                            <Row justify="center">
                              <Col span={24} style={{ textAlign: "center" }}>
                                <h5>
                                  User Includes Following Functionalities:
                                </h5>
                                <Tag
                                  style={{
                                    fontSize: "15px",
                                    padding: "5px",
                                    margin: "5px",
                                  }}
                                  color="#87d068"
                                >
                                  View Own Suspicious/Normal/Static Video
                                </Tag>
                                <Tag
                                  style={{
                                    fontSize: "15px",
                                    padding: "5px",
                                    margin: "5px",
                                  }}
                                  color="#87d068"
                                >
                                  Add CCTV Cams
                                </Tag>
                                <Tag
                                  style={{
                                    fontSize: "15px",
                                    padding: "5px",
                                    margin: "5px",
                                  }}
                                  color="#87d068"
                                >
                                  Edit CCTV Cams
                                </Tag>
                                <Tag
                                  style={{
                                    fontSize: "15px",
                                    padding: "5px",
                                    margin: "5px",
                                  }}
                                  color="#87d068"
                                >
                                  Delete CCTV Cams
                                </Tag>
                                <Tag
                                  style={{
                                    fontSize: "15px",
                                    padding: "5px",
                                    margin: "5px",
                                  }}
                                  color="#87d068"
                                >
                                  Upload Videos
                                </Tag>
                                <Tag
                                  style={{
                                    fontSize: "15px",
                                    padding: "5px",
                                    margin: "5px",
                                  }}
                                  color="#87d068"
                                >
                                  Delete videos
                                </Tag>
                                <Tag
                                  style={{
                                    fontSize: "15px",
                                    padding: "5px",
                                    margin: "5px",
                                  }}
                                  color="#87d068"
                                >
                                  Update Settings
                                </Tag>
                                <Tag
                                  style={{
                                    fontSize: "15px",
                                    padding: "5px",
                                    margin: "5px",
                                  }}
                                  color="#87d068"
                                >
                                  Send Contact Queries
                                </Tag>
                              </Col>
                            </Row>
                          </Col>
                        </Row>
                      </Col>
                      <Col span={12}>
                        <Row justify="center">
                          <Col>
                            <Title level={4}>Admin User</Title>
                          </Col>
                          <Row>
                            <Col span={24} style={{ textAlign: "center" }}>
                              <h5>
                                Admin Access Includes Following Functionalities:
                              </h5>
                              <Tag
                                style={{
                                  fontSize: "15px",
                                  padding: "5px",
                                  margin: "5px",
                                }}
                                color="#87d068"
                              >
                                View/Block Any Video
                              </Tag>
                              <Tag
                                style={{
                                  fontSize: "15px",
                                  padding: "5px",
                                  margin: "5px",
                                }}
                                color="#87d068"
                              >
                                View/Block Any Suspicious Video
                              </Tag>
                              <Tag
                                style={{
                                  fontSize: "15px",
                                  padding: "5px",
                                  margin: "5px",
                                }}
                                color="#87d068"
                              >
                                View/Block Any Normal Video
                              </Tag>

                              <Tag
                                style={{
                                  fontSize: "15px",
                                  padding: "5px",
                                  margin: "5px",
                                }}
                                color="#87d068"
                              >
                                View/Block Any Static Video
                              </Tag>
                              <Tag
                                style={{
                                  fontSize: "15px",
                                  padding: "5px",
                                  margin: "5px",
                                }}
                                color="#87d068"
                              >
                                View/Block Any User
                              </Tag>

                              <Tag
                                style={{
                                  fontSize: "15px",
                                  padding: "5px",
                                  margin: "5px",
                                }}
                                color="#87d068"
                              >
                                View Contact Queries
                              </Tag>
                              <Tag
                                style={{
                                  fontSize: "15px",
                                  padding: "5px",
                                  margin: "5px",
                                }}
                                color="#87d068"
                              >
                                Grant Admin Access
                              </Tag>
                            </Col>
                          </Row>
                        </Row>
                      </Col>
                    </Row>
                  </Card>
                </Col>
              </Row>
            </div>
          </Col>
          <Col className="wel-profile-settings" span={14}>
            <Form
              labelCol={{ span: 8 }}
              wrapperCol={{ span: 16 }}
              onFinish={updateSettings}
            >
              <Row>
                <Col span={12}>
                  <Form.Item label="Name">
                    <Input
                      type="text"
                      placeholder="Enter First Name"
                      value={change.first_name}
                      onChange={(e) =>
                        setChange({ ...change, first_name: e.target.value })
                      }
                    />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label="Last Name">
                    <Input
                      type="text"
                      placeholder="Enter Last Name"
                      value={change.last_name}
                      onChange={(e) =>
                        setChange({ ...change, last_name: e.target.value })
                      }
                    />
                  </Form.Item>
                </Col>
              </Row>
              <Row>
                <Col span={12}>
                  <Form.Item label="About">
                    <TextArea
                      rows={5}
                      placeholder="Enter About"
                      value={change.about}
                      onChange={(e) =>
                        setChange({ ...change, about: e.target.value })
                      }
                    />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label="Address">
                    <TextArea
                      rows={5}
                      placeholder="Enter Address"
                      value={change.address}
                      onChange={(e) =>
                        setChange({ ...change, address: e.target.value })
                      }
                    />
                  </Form.Item>
                </Col>
              </Row>
              <Row>
                <Col span={12}>
                  <Form.Item label="Phone Number">
                    <Input
                      type="text"
                      placeholder="With country Code (+923456789098)"
                      value={change.phone_number}
                      onChange={(e) =>
                        setChange({ ...change, phone_number: e.target.value })
                      }
                    />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label="Gender">
                    <Select
                      value={change.gender}
                      onChange={(e) => setChange({ ...change, gender: e })}
                    >
                      <Select.Option value="Male">Male</Select.Option>
                      <Select.Option value="Female">Female</Select.Option>
                    </Select>
                  </Form.Item>
                </Col>
              </Row>
              <Row justify="center">
                <Title level={5}>
                  <strong>Note:</strong> All The Fields Are Mandatory
                </Title>
              </Row>
              <Row justify="center">
                <Button type="primary" htmlType="submit">
                  Proceed
                </Button>
              </Row>
            </Form>
          </Col>
          <Col className="wel-profile-settings-avatar" span={6}>
            <Row justify="center">
              <Col>
                <Avatar
                  size={128}
                  icon={<UserOutlined />}
                  src={
                    fileList
                      ? URL.createObjectURL(fileList)
                      : "http://localhost:5000/" + change.picture
                  }
                />
              </Col>
            </Row>
            <Row justify="center">
              <Col style={{ margin: "10px 0px" }}>
                <Title level={5}>Please crop to sqaure ratio.</Title>
                <input name="picture" type="file" onChange={onChange} />
              </Col>
            </Row>
            <Row justify="center">
              <Col style={{ margin: "10px 0px" }}>
                <Title level={2}></Title>
                <Title level={5}>{extchange.about}</Title>
              </Col>
            </Row>
            <Row justify="center">
              <Title level={5}>
                <strong>Note:</strong> Picture is Mandatory.
              </Title>
            </Row>
          </Col>
        </Row>
      </div>
    </section>
  );
};

export default withSnackbar(Welcomesettings);
