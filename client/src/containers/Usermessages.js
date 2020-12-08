import React, { useState, useEffect } from "react";
import {
  Rate,
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
  Table,
  Tag,
} from "antd";
import { UserOutlined, UploadOutlined } from "@ant-design/icons";
import { withSnackbar } from "notistack";
import ImgCrop from "antd-img-crop";
import Spinner from "../components/Spinner";
import axios from "axios";

const Usermessages = (props) => {
  const { Title } = Typography;
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(
        "http://localhost:5000/users/getusermessages?email=" +
          localStorage.getItem("useremail")
      )
      .then((response) => {
        console.log(response);
        setLoading(false);
        setMessages(
          response?.data?.map((msg, index) => ({
            key: index + 1,
            emails: msg.recieveremail?.map((re) => {
              return <Tag>{re}</Tag>;
            }),
            numbers: msg.number?.map((num) => {
              return <Tag>{num}</Tag>;
            }),
            message: msg.message1,
            sentat: msg.createdat,
          }))
        );
      })
      .catch((err) => {
        console.log(err);
        return err;
      });
  }, []);

  const dataSource = [
    {
      key: "1",
      name: "Mike",
      age: 32,
      address: "10 Downing Street",
    },
    {
      key: "2",
      name: "John",
      age: 42,
      address: "10 Downing Street",
    },
  ];

  const columns = [
    {
      title: "Emails",
      dataIndex: "emails",
      key: "emails",
    },
    {
      title: "Numbers",
      dataIndex: "numbers",
      key: "numbers",
    },
    {
      title: "Message",
      dataIndex: "message",
      key: "message",
    },
    {
      title: "Sent At",
      dataIndex: "sentat",
      key: "sentat",
    },
  ];

  return (
    <div class="Main">
      <PageHeader
        className="site-page-header"
        title="My Videos"
        subTitle="My Videos Information and Actions"
      />
      <Divider>My Videos</Divider>
      <Table
        bordered
        loading={loading}
        dataSource={messages}
        columns={columns}
      />

      {/* <Col className="profile-settings" span={24}>
          <Row>
            <Col span={24}>
              <Card style={{ height: 50 }} bordered={true}>
                {message?.map((msg) => (
                  <Row justify="start">
                    <Col span={6}>
                      {msg.recieveremail?.map((re) => {
                        return re;
                      })}
                    </Col>
                    <Col span={6}>
                      {msg.number?.map((num) => {
                        return num;
                      })}
                    </Col>
                    <Col span={6}>{msg.message1}</Col>
                    <Col span={6}>{msg.createdat}</Col>
                  </Row>
                ))}
              </Card>
            </Col>
          </Row>
        </Col> */}
    </div>
  );
};

export default withSnackbar(Usermessages);
