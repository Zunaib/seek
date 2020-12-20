import React, { useState, useEffect } from "react";
import axios from "axios";
import { withSnackbar } from "notistack";
import { PageHeader, Divider, Button, Table } from "antd";
const Allrequests = (props) => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [reload, setReload] = useState(false);

  useEffect(() => {
    axios
      .get("http://localhost:5000/fetchrequests")
      .then((response) => {
        setLoading(false);
        if (response.data.length >= 1) {
          setRequests(
            response?.data?.map((req, index) => ({
              key: index + 1,
              email: req.email,
              reason: req.reason,
              message: req.message,
              type: "Wants To Be Admin",
              req: req,
            }))
          );
        }
      })

      .catch((err) => {
        console.log(err);
        return err;
      });
  }, [reload]);

  const actionBtn = (email) => {
    axios
      .post("http://localhost:5000/grantadminaccess", {
        email: email,
      })
      .then((res) => {
        if (res.data.success === "Access Granted") {
          props.enqueueSnackbar("Access Granted", {
            variant: "success",
          });
          setReload(!reload);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const columns = [
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Reason",
      dataIndex: "reason",
      key: "reason",
    },
    {
      title: "Message",
      dataIndex: "message",
      key: "message",
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
    },
    {
      title: "Action",
      dataIndex: "",
      key: "x",
      render: (record) => (
        <Button
          type="primary"
          danger
          onClick={() => actionBtn(record.req.email)}
        >
          Grant Access
        </Button>
      ),
    },
  ];

  return (
    <div className="Main">
      <PageHeader
        className="site-page-header"
        title="All Requests"
        subTitle="All Admin Requests"
      />
      <Divider>Requests</Divider>
      <Table
        bordered
        loading={loading}
        dataSource={requests}
        columns={columns}
      />
    </div>
  );
};

export default withSnackbar(Allrequests);
