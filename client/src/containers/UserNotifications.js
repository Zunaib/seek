import React, { useState, useEffect } from "react";
import axios from "axios";
import { withSnackbar } from "notistack";
import { PageHeader, Divider, Button, Table } from "antd";
const UserNotifications = (props) => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [reload, setReload] = useState(false);

  useEffect(() => {
    axios
      .get(
        "http://localhost:5000/users/getusernotifications?email=" +
          localStorage.getItem("useremail")
      )
      .then((response) => {
        setLoading(false);
        if (response.data.length >= 1) {
          setNotifications(
            response?.data?.map((not, index) => ({
              key: index + 1,
              activity: not.activity,
              notification: not.notification,
              sentat: not.sentAt,
              type: "Wants To Be Admin",
              not: not,
            }))
          );
        } else {
          setLoading(false);
          setNotifications([]);
        }
      })

      .catch((err) => {
        console.log(err);
        return err;
      });
  }, [reload]);

  const columns = [
    {
      title: "Activity",
      dataIndex: "activity",
      key: "activity",
    },
    {
      title: "Notification",
      dataIndex: "notification",
      key: "notification",
    },
    {
      title: "SentAt",
      dataIndex: "sentat",
      key: "sentat",
    },
    {
      title: "Action",
      dataIndex: "",
      key: "x",
      render: (record) => (
        <Button type="primary" danger onClick={() => deleteNot(record.not)}>
          Delete
        </Button>
      ),
    },
  ];

  const deleteNot = (not) => {
    axios
      .post("http://localhost:5000/deletenotification", {
        notificationid: not._id,
      })
      .then((res) => {
        props.enqueueSnackbar(res.data.success, {
          variant: "success",
        });
        setReload(!reload);
      })
      .catch((err) => {
        console.log(err);
        return err;
      });
  };

  return (
    <div className="Main">
      <PageHeader
        className="site-page-header"
        title="My Notification"
        subTitle="My Notification Information"
      />
      <Divider>Notifications</Divider>
      <Table
        bordered
        loading={loading}
        dataSource={notifications}
        columns={columns}
      />
    </div>
  );
};

export default withSnackbar(UserNotifications);
