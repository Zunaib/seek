import React, { useState, useEffect } from "react";
import {
  Checkbox,
  Card,
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

const Welcomesettings = (props) => {
  const [loading, setLoading] = useState(true);

  const { Title } = Typography;
  const { TextArea } = Input;
  const [fileList, setFileList] = useState();

  return (
    <div class="Main">
      <PageHeader />

      <div className="site-card-wrapper">
        <Row
          gutter={16}
          type="flex"
          justify="center"
          align="middle"
          style={{ minHeight: "50vh" }}
        >
          <Col span={8}>
            <Card title="Card title" bordered={true} style={{ height: 250 }}>
              Card content
            </Card>
          </Col>
          <Col span={8}>
            <Card title="Card title" bordered={true} style={{ height: 250 }}>
              Card content
            </Card>
          </Col>
          <Col span={8}>
            <Card title="Card title" bordered={true} style={{ height: 250 }}>
              Card content
            </Card>
          </Col>
        </Row>
      </div>

      <div className=" container-fluid page">
        {
          <Row
            type="flex"
            justify="center"
            align="middle"
            style={{ minHeight: "25vh" }}
          >
            <Col className="profile-settings" span={14}>
              <Form
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                /*  onFinish={updateSettings} */
              >
                <Row>
                  <Col span={12}>
                    <Form.Item label="Name">
                      <Input
                        type="text"
                        placeholder="Enter First Name"
                        /*  value={change.first_name} */
                        /*  onChange={(e) =>
                          setChange({ ...change, first_name: e.target.value })
                        } */
                      />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Checkbox>Do you Want Admin Access</Checkbox>
                  </Col>
                </Row>
                <Row>
                  <Col span={12}>
                    <Form.Item label="About">
                      <TextArea
                        rows={5}
                        placeholder="Enter About"
                        /*   value={change.about}
                        onChange={(e) =>
                          setChange({ ...change, about: e.target.value })
                        } */
                      />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item label="Address">
                      <TextArea
                        rows={5}
                        placeholder="Enter Address"
                        /*    value={change.address}
                        onChange={(e) =>
                          setChange({ ...change, address: e.target.value })
                        } */
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
                        /*  value={change.phone_number}
                        onChange={(e) =>
                          setChange({ ...change, phone_number: e.target.value })
                        } */
                      />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item label="Gender">
                      <Select
                      /*    value={change.gender}
                        onChange={(e) => setChange({ ...change, gender: e })} */
                      >
                        <Select.Option value="Male">Male</Select.Option>
                        <Select.Option value="Female">Female</Select.Option>
                      </Select>
                    </Form.Item>
                  </Col>
                </Row>

                <Button type="primary" htmlType="submit">
                  Proceed
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
                  <input
                    name="picture"
                    type="file" /*  onChange={onChange}  */
                  />
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
                    {/*    {change.first_name + " " + change.last_name} */}
                  </Title>
                  <Title level={5}>{/* {change.about} */}</Title>
                </Col>
              </Row>
            </Col>
          </Row>
        }
      </div>
    </div>
  );
};

export default withSnackbar(Welcomesettings);
