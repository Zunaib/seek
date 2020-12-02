import React, { useState, useEffect } from "react";
import {
  PageHeader,
  Divider,
  Button,
  Input,
  Row,
  Col,
  Form,
  Select,
  Avatar,
  Upload,
  message,
  Typography,
} from "antd";
import { UserOutlined, UploadOutlined } from "@ant-design/icons";
import { withSnackbar } from "notistack";
import ImgCrop from "antd-img-crop";
import Spinner from "../components/Spinner";
import axios from "axios";

const Settings = (props) => {
  const [loading, setLoading] = useState(true);
  const [extchange, setEXTChange] = useState({
    first_name: "",
    last_name: "",
    about: "",
    address: "",
    phone_number: "",
    gender: "",
    password: "",
    picture: "",
  });
  const [change, setChange] = useState({
    first_name: "",
    last_name: "",
    about: "",
    address: "",
    phone_number: "",
    gender: "",
    password: "",
    picture: "",
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
        });
        setChange({
          first_name: response.data[0].first_name,
          last_name: response.data[0].last_name,
          about: response.data[0].about,
          address: response.data[0].address,
          phone_number: response.data[0].phone_number,
          gender: response.data[0].gender,
        });
      })
      .catch((err) => {
        console.log(err);
        return err;
      });
  }, [reload]);

  const updateSettings = () => {
    if (JSON.stringify(extchange) === JSON.stringify(change)) {
      props.enqueueSnackbar("Nothing Changed in Fields", {
        variant: "error",
      });
    } else {
      if (change.first_name === "" || change.last_name === "") {
        props.enqueueSnackbar("Empty Fields", {
          variant: "error",
        });
      } else {
        const formData = new FormData();
        formData.append("picture", fileList);
        axios
          .post("http://localhost:5000/users/updateusersettings", formData, {
            params: {
              email: localStorage.getItem("useremail"),
              first_name: change.first_name,
              last_name: change.last_name,
              about: change.about ? change.about : "",
              address: change.address ? change.address : "",
              phone_number: change.phone_number ? change.phone_number : "",
              gender: change.gender ? change.gender : "",
            },
          })
          .then((response) => {
            if (response.data.success) {
              console.log(response);
              props.enqueueSnackbar("User Updated", {
                variant: "success",
              });
              setReload(!reload);
            }
          })
          .catch((err) => {
            console.log(err);
            return err;
          });
      }
    }
  };

  const { Title } = Typography;
  const { TextArea } = Input;

  const [fileList, setFileList] = useState();
  const onChange = (e) => {
    // if (file.status !== "uploading") {
    //   console.log(file, newFileList);
    // }
    setFileList(e.target.files[0]);
  };
  // const onChange = ({ file, fileList: newFileList }) => {
  //   if (file.status !== "uploading") {
  //     console.log(file, newFileList);
  //   }
  //   setFileList(newFileList);
  // };

  const onPreview = async (file) => {
    let src = file.url;
    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj);
        reader.onload = () => resolve(reader.result);
      });
    }
    const image = new Image();
    image.src = src;
    const imgWindow = window.open(src);
    imgWindow.document.write(image.outerHTML);
  };

  return (
    <div class="Main">
      <PageHeader
        className="site-page-header"
        title="My Settings"
        subTitle="User Settings"
      />
      <Divider>Settings</Divider>
      <div className=" container-fluid page">
        {loading ? (
          <Row justify="center">
            <Col>
              <div className="loading-spinner">
                <Spinner />
              </div>
            </Col>
          </Row>
        ) : (
          <Row justify="start">
            <Col className="profile-settings" span={14}>
              <Form
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                onFinish={updateSettings}
              >
                <Row>
                  <Col span={12}>
                    <Form.Item label="First Name">
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
                        placeholder="Enter Phone Number"
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

                <Button type="primary" htmlType="submit">
                  Update Settings
                </Button>
              </Form>
            </Col>
            <Col className="profile-settings" span={6}>
              <Row justify="center">
                <Col>
                  <Avatar
                    size={128}
                    icon={<UserOutlined />}
                    src={fileList && URL.createObjectURL(fileList)}
                  />
                </Col>
              </Row>
              <Row justify="center">
                <Col style={{ margin: "10px 0px" }}>
                  <input name="picture" type="file" onChange={onChange} />
                  {/* <ImgCrop rotate>
                    <Upload
                      onPreview={onPreview}
                      name="profilepicture"
                      action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                      accept="image/*"
                      listType="picture"
                      className="upload-list-inline"
                      fileList={fileList}
                      onChange={onChange}
                    >
                      {fileList.length < 1 && <Button>Update</Button>}
                    </Upload>
                  </ImgCrop> */}
                </Col>
              </Row>
              <Row justify="center">
                <Col style={{ margin: "10px 0px" }}>
                  <Title level={2}>
                    {change.first_name + " " + change.last_name}
                  </Title>
                  <Title level={5}>{change.about}</Title>
                </Col>
              </Row>
            </Col>
          </Row>
        )}
      </div>
    </div>
  );
};

export default withSnackbar(Settings);
