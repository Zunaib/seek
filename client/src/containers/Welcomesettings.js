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
  const [errors, seterrors] = useState({
    first_name: "",
    last_name: "",
    about: "",
    address: "",
    phone_number: "",
    gender: "",
    password: "",
  });
  const validMobileRegex = RegExp(
    /^(\+92)-{0,1}\d{3}-{0,1}\d{7}$|^\d{4}-\d{7}$/i
  );

  const [reload, setReload] = useState(false);
  const onNumChange = (e) => {
    setChange({ ...change, phone_number: e.target.value });
    seterrors({
      ...errors,
      phone_number: validMobileRegex.test(e.target.value)
        ? ""
        : "Number is not valid!",
    });
  };

  const oninfoChange = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case "first_name":
        setChange({ ...change, first_name: e.target.value });
        seterrors({
          ...errors,
          first_name:
            value.length < 3 ? "First Name must be 3 characters long!" : "",
        });
        break;
      case "last_name":
        setChange({ ...change, last_name: e.target.value });

        seterrors({
          ...errors,
          last_name:
            value.length < 3 ? "Last Name must be 3 characters long!" : "",
        });
        break;
      case "about":
        setChange({ ...change, about: e.target.value });

        seterrors({
          ...errors,
          about:
            value.length < 10 ? "About must be more than 10 characters" : "",
        });
        break;
      case "address":
        setChange({ ...change, address: e.target.value });
        seterrors({
          ...errors,
          address:
            value.length < 10 ? "Address must be more than 10 characters" : "",
        });
        break;
      default:
        break;
    }
  };

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

  const validateForm = (errors) => {
    let valid = true;
    Object.values(errors).forEach((val) => val.length > 0 && (valid = false));
    return valid;
  };

  const updateSettings = () => {
    if (
      validateForm(errors) &&
      change.first_name !== "" &&
      change.last_name !== "" &&
      change.about !== "" &&
      change.address !== "" &&
      change.phone_number !== "" &&
      change.gender !== ""
    ) {
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
    } else {
      props.enqueueSnackbar("InValid Form", {
        variant: "error",
      });
    }
  };

  const { Title } = Typography;
  const { TextArea } = Input;
  const [fileList, setFileList] = useState(null);

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
        >
          <Col span={24}>
            <div className="site-card-wrapper">
              <Row justify="center" style={{ minHeight: "35vh" }}>
                <Col span={20}>
                  <Card
                    loading={loading}
                    className="welcome-card"
                    title={
                      <Title style={{ textAlign: "center" }} level={3}>
                        Welcome To The Seek
                      </Title>
                    }
                    bordered={true}
                    style={{ margin: "10px 0px" }}
                  >
                    <Row justify="center">
                      <Col span={12}>
                        <Row justify="center">
                          <Col style={{ textAlign: "center" }}>
                            <Title level={4}>Normal User</Title>
                            <Row justify="center">
                              <Col span={18} style={{ textAlign: "center" }}>
                                <h5>
                                  User Includes Following Functionalities:
                                </h5>
                                <Tag className="welcome-tag" color="magenta">
                                  View Own Suspicious/Normal/Static Video
                                </Tag>
                                <Tag className="welcome-tag" color="magenta">
                                  Add CCTV Cams
                                </Tag>
                                <Tag className="welcome-tag" color="magenta">
                                  Edit CCTV Cams
                                </Tag>
                                <Tag className="welcome-tag" color="magenta">
                                  Delete CCTV Cams
                                </Tag>
                                <Tag className="welcome-tag" color="magenta">
                                  Upload Videos
                                </Tag>
                                <Tag className="welcome-tag" color="magenta">
                                  Delete videos
                                </Tag>
                                <Tag className="welcome-tag" color="magenta">
                                  Update Settings
                                </Tag>
                                <Tag className="welcome-tag" color="magenta">
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
                          <Row justify="center">
                            <Col span={18} style={{ textAlign: "center" }}>
                              <h5>
                                Admin Access Includes Following Functionalities:
                              </h5>
                              <Tag className="welcome-tag" color="magenta">
                                View/Block Any Video
                              </Tag>
                              <Tag className="welcome-tag" color="magenta">
                                View/Block Any Suspicious Video
                              </Tag>
                              <Tag className="welcome-tag" color="magenta">
                                View/Block Any Normal Video
                              </Tag>

                              <Tag className="welcome-tag" color="magenta">
                                View/Block Any Static Video
                              </Tag>
                              <Tag className="welcome-tag" color="magenta">
                                View/Block Any User
                              </Tag>

                              <Tag className="welcome-tag" color="magenta">
                                View Contact Queries
                              </Tag>
                              <Tag className="welcome-tag" color="magenta">
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
        </Row>
        <Row justify="center">
          <Col className="wel-profile-settings" span={20}>
            <Row justify="true">
              <Col span={16}>
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
                          name="first_name"
                          className={errors.first_name.length > 0 && "error"}
                          placeholder="Enter First Name"
                          value={change.first_name}
                          onChange={(e) => oninfoChange(e)}
                        />
                        {errors.first_name.length > 0 && (
                          <span className="error-text">
                            <em> {errors.first_name}</em>
                          </span>
                        )}
                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      <Form.Item label="Last Name">
                        <Input
                          type="text"
                          className={errors.last_name.length > 0 && "error"}
                          name="last_name"
                          placeholder="Enter Last Name"
                          value={change.last_name}
                          onChange={(e) => oninfoChange(e)}
                        />
                        {errors.last_name.length > 0 && (
                          <span className="error-text">
                            <em> {errors.last_name}</em>
                          </span>
                        )}
                      </Form.Item>
                    </Col>
                  </Row>
                  <Row>
                    <Col span={12}>
                      <Form.Item label="About">
                        <TextArea
                          rows={5}
                          className={errors.about.length > 0 && "error"}
                          name="about"
                          placeholder="Enter About"
                          value={change.about}
                          onChange={(e) => oninfoChange(e)}
                        />
                        {errors.about.length > 0 && (
                          <span className="error-text">
                            <em> {errors.about}</em>
                          </span>
                        )}
                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      <Form.Item label="Address">
                        <TextArea
                          rows={5}
                          name="address"
                          className={errors.address.length > 0 && "error"}
                          placeholder="Enter Address"
                          value={change.address}
                          onChange={(e) => oninfoChange(e)}
                        />
                        {errors.address.length > 0 && (
                          <span className="error-text">
                            <em> {errors.address}</em>
                          </span>
                        )}
                      </Form.Item>
                    </Col>
                  </Row>
                  <Row>
                    <Col span={12}>
                      <Form.Item label="Phone Number">
                        <Input
                          type="text"
                          name="phone_number"
                          className={errors.phone_number.length > 0 && "error"}
                          placeholder="With country Code (+923456789098)"
                          value={change.phone_number}
                          onChange={(e) => onNumChange(e)}
                        />
                        {errors.phone_number.length > 0 && (
                          <span className="error-text">
                            <em> {errors.phone_number}</em>
                          </span>
                        )}
                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      <Form.Item label="Gender">
                        <Select
                          value={change.gender}
                          onChange={(val) => {
                            seterrors({
                              ...errors,
                              gender:
                                val === null ? "Please select gender" : "",
                            });
                            setChange({ ...change, gender: val });
                          }}
                        >
                          <Select.Option value="Male">Male</Select.Option>
                          <Select.Option value="Female">Female</Select.Option>
                        </Select>
                      </Form.Item>
                    </Col>
                  </Row>
                </Form>
              </Col>
              <Col span={6} style={{ textAlign: "center" }}>
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
                    <input
                      name="picture"
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        if (e.target.files[0].size > 5000000) {
                          props.enqueueSnackbar("Image Size Too Big", {
                            variant: "error",
                          });
                          setFileList(null);
                        } else {
                          setFileList(e.target.files[0]);
                        }
                      }}
                    />
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
            <Row justify="center">
              <Button type="primary" htmlType="submit">
                Proceed
              </Button>
            </Row>
          </Col>
        </Row>
      </div>
    </section>
  );
};

export default withSnackbar(Welcomesettings);
