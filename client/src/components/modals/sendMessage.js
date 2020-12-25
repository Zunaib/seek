import React, { useState } from "react";
import { Button, Input, Row, Col, Form, Select } from "antd";
import { withSnackbar } from "notistack";
import axios from "axios";
const SendMessage = (props) => {
  const { TextArea } = Input;

  const [details, setDetails] = useState({
    number: [],
    email: [],
    message1: "",
  });

  const [errors, seterrors] = useState({
    number: "",
    email: "",
    message1: "",
  });

  const onFinish = () => {
    axios
      .post("http://localhost:5000/users/message", {
        number: details.number,
        recieveremail: details.email,
        message1: details.message1,
        email: localStorage.getItem("useremail"),
      })

      .then((res) => {
        if (res.data.success) {
          props.enqueueSnackbar(res.data.success, {
            variant: "success",
          });
          setDetails({
            number: [],
            email: [],
            message1: "",
          });
          props.onClose();
        } else if (res.data.error) {
          props.enqueueSnackbar(res.data.error, {
            variant: "error",
          });
        }
      });
  };

  const validMobileRegex = RegExp(
    /^(\+92)-{0,1}\d{3}-{0,1}\d{7}$|^\d{4}-\d{7}$/i
  );

  const onNumChange = (numbers) => {
    let invalidcount = 0;
    let temp = numbers?.map(
      (num) => !validMobileRegex.test(num) && invalidcount++
    );
    seterrors({
      ...errors,
      number: invalidcount === 0 ? "" : "Some numbers are invalid",
    });
  };

  return (
    <div class="modal-main">
      <div class="modal-content">
        <Form labelCol={{ span: 8 }}>
          <Row justify="end">
            <div className="close">
              <i className="fas fa-times" onClick={props.onClose}></i>
            </div>
          </Row>
          <Row>
            <Col span={24} pull={3}>
              <Form.Item label="Number">
                <Select
                  placeholder="Type with Country Code i.e. +923889787654"
                  open={false}
                  className={errors.number.length > 0 && "error"}
                  name="number"
                  mode="tags"
                  style={{ width: "100%" }}
                  // onChange={(val) => setDetails({ ...details, number: val })}
                  onChange={(numbers) => onNumChange(numbers)}
                  tokenSeparators={[","]}
                />
                {errors.number.length > 0 && (
                  <span className="error-text">
                    <em> {errors.number}</em>
                  </span>
                )}
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={24} pull={3}>
              <Form.Item label="Email">
                <Select
                  placeholder="Enter Valid Emails"
                  name="email"
                  open={false}
                  mode="tags"
                  style={{ width: "100%" }}
                  onChange={(val) => setDetails({ ...details, email: val })}
                  tokenSeparators={[","]}
                ></Select>
              </Form.Item>
            </Col>
          </Row>

          <Row type="flex" justify="center" align="middle">
            <Col span={24} pull={3}>
              <Form.Item label="Message">
                <TextArea
                  rows={2}
                  name="message1"
                  placeholder="Enter Message"
                  value={details.message1}
                  onChange={(e) =>
                    setDetails({ ...details, message1: e.target.value })
                  }
                />
              </Form.Item>
            </Col>
          </Row>

          <Button type="primary" onClick={onFinish}>
            Send
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default withSnackbar(SendMessage);
