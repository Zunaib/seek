import React, { useState, useEffect } from "react";
import { PageHeader, Divider, Button, Input, Row, Col, Form } from "antd";
import { withSnackbar } from "notistack";
import Spinner from "../components/Spinner";
import axios from "axios";

const Settings = (props) => {
  const [loading, setLoading] = useState(true);
  const [change, setChange] = useState({
    first_name: "",
    last_name: "",
    address: "",
    phone_number: "",
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
        setChange({
          first_name: response.data[0].first_name,
          last_name: response.data[0].last_name,
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
    console.log(change);
    axios
      .post("http://localhost:5000/users/updateusersettings", {
        email: localStorage.getItem("useremail"),
        first_name: change.first_name,
        last_name: change.last_name,
        address: change.address,
        phone_number: change.phone_number,
        gender: change.gender,
        password: change.password,
      })
      .then((response) => {
        if (response.data.success) {
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
  };

  return (
    <div class="Main">
      <PageHeader
        className="site-page-header"
        title="My Settings"
        subTitle="User Sttings"
      />
      <Divider>Settings</Divider>
      <div className=" container-fluid page">
        {loading ? (
          <div className="loading">
            <Spinner />
          </div>
        ) : (
          <Row>
            <Col span={8}></Col>
            <Col span={8}>
              <Form onFinish={updateSettings}>
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

                <Form.Item label="Address">
                  <Input
                    type="text"
                    placeholder="Enter Address"
                    value={change.address}
                    onChange={(e) =>
                      setChange({ ...change, address: e.target.value })
                    }
                  />
                </Form.Item>
                <Form.Item label="Gender">
                  <Input
                    type="text"
                    placeholder="Enter Gender"
                    value={change.gender}
                    onChange={(e) =>
                      setChange({ ...change, gender: e.target.value })
                    }
                  />
                </Form.Item>
                <Button type="primary" htmlType="submit">
                  Update Settings
                </Button>
              </Form>
            </Col>
            <Col span={8}></Col>
          </Row>
        )}
      </div>
    </div>
  );
};

export default withSnackbar(Settings);
