import React, { useState } from "react";
import { PageHeader, Divider, Row, Col, Tag, Form, Input, Button } from "antd";
import { withSnackbar } from "notistack";
import axios from "axios";

const AdminRequest = (props) => {
  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };

  const [adminReq, setAdminReq] = useState({
    reason: "",
    message: "",
  });
  const [errors, seterrors] = useState({
    reason: "",
    message: "",
  });

  const onFinish = () => {
    if (validateForm(errors) && errors.reason !== "" && errors.message !== "")
      axios
        .post("http://localhost:5000/requestadmin", {
          email: localStorage.getItem("useremail"),
          reason: adminReq.reason,
          message: adminReq.message,
        })
        .then((res) => {
          if (res.data.success) {
            props.enqueueSnackbar(res.data.success, {
              variant: "success",
            });
            setAdminReq({
              reason: "",
              message: "",
            });
          } else if (res.data.error) {
            props.enqueueSnackbar(res.data.error, {
              variant: "error",
            });
          }
        })
        .catch((err) => {
          console.log(err);
        });
  };
  const validateForm = (errors) => {
    let valid = true;
    Object.values(errors).forEach((val) => val.length > 0 && (valid = false));
    return valid;
  };
  const onChange = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case "reason":
        setAdminReq({ ...adminReq, reason: e.target.value });
        seterrors({
          ...errors,
          reason: value.length < 5 ? "reason is too short" : "",
        });
        break;
      case "message":
        setAdminReq({ ...adminReq, message: e.target.value });
        seterrors({
          ...errors,
          message: value.length < 5 ? "message is too short" : "",
        });
        break;
      default:
        break;
    }
  };

  return (
    <div className="Main">
      <PageHeader
        className="site-page-header"
        title="Admin Request"
        subTitle="Requesting Admin Access"
      />
      <Divider>Request</Divider>
      <Row>
        <Col span={12}>
          <h5>Requesting Admin Access Includes Following Functionalities:</h5>
          <ul>
            <li>
              <Tag className="welcome-tag" color="magenta">
                View Any Video
              </Tag>
            </li>
            <li>
              <Tag className="welcome-tag" color="magenta">
                Block Any Video
              </Tag>
            </li>
            <li>
              <Tag className="welcome-tag" color="magenta">
                View Any Suspicious Video
              </Tag>
            </li>
            <li>
              <Tag className="welcome-tag" color="magenta">
                Block Any Suspicious Video
              </Tag>
            </li>
            <li>
              <Tag className="welcome-tag" color="magenta">
                View Any Normal Video
              </Tag>
            </li>
            <li>
              <Tag className="welcome-tag" color="magenta">
                Block Any Normal Video
              </Tag>
            </li>
            <li>
              <Tag className="welcome-tag" color="magenta">
                View Any Static Video
              </Tag>
            </li>
            <li>
              <Tag className="welcome-tag" color="magenta">
                Block Any Static Video
              </Tag>
            </li>
            <li>
              <Tag className="welcome-tag" color="magenta">
                View Any User
              </Tag>
            </li>
            <li>
              <Tag className="welcome-tag" color="magenta">
                Block Any User
              </Tag>
            </li>
            <li>
              <Tag className="welcome-tag" color="magenta">
                View Contact Queries
              </Tag>
            </li>
            <li>
              <Tag className="welcome-tag" color="magenta">
                Grant Admin Access
              </Tag>
            </li>
          </ul>
        </Col>
        <Col span={12}>
          <h5>For Requesting Admin Access, Fill Following:</h5>
          <Form {...layout} style={{ margin: "30px auto" }} onFinish={onFinish}>
            <Row>
              <Col span={20}>
                <Form.Item label="Reason" rules={[{ required: true }]}>
                  <Input
                    type="text"
                    className={errors.reason.length > 0 && "error"}
                    name="reason"
                    value={adminReq.reason}
                    onChange={(e) => onChange(e)}
                  />
                  {errors.reason.length > 0 && (
                    <span className="error-text">
                      <em> {errors.reason}</em>
                    </span>
                  )}
                </Form.Item>
                <Form.Item label="Message" rules={[{ required: true }]}>
                  <Input
                    type="text"
                    name="message"
                    className={errors.message.length > 0 && "error"}
                    value={adminReq.message}
                    onChange={(e) => onChange(e)}
                  />
                  {errors.message.length > 0 && (
                    <span className="error-text">
                      <em> {errors.message}</em>
                    </span>
                  )}
                </Form.Item>
                <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
                  <Button
                    type="primary"
                    htmlType="submit"
                    disabled={localStorage.getItem("admin") === "true"}
                  >
                    Request
                  </Button>
                </Form.Item>
                {localStorage.getItem("admin") === "true" && (
                  <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
                    <h2>You're Already An Admin</h2>
                  </Form.Item>
                )}
              </Col>
            </Row>
          </Form>
        </Col>
      </Row>
    </div>
  );
};

export default withSnackbar(AdminRequest);
