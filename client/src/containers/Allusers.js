import React, { useState, useEffect } from "react";
import axios from "axios";
import { withSnackbar } from "notistack";
import { PageHeader, Divider, Table, Button } from "antd";

const Allusers = (props) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [reload, setReload] = useState(false);
  useEffect(() => {
    axios
      .get("http://localhost:5000/getallusers")
      .then((response) => {
        setLoading(false);
        setUsers(
          response?.data?.map((user, index) => ({
            key: index + 1,
            email: user.email,
            firstname: user.first_name,
            lastname: user.last_name,
            blocked: user.blocked ? "True" : "False",
            admin: user.admin ? "True" : "False",
            user: user,
          }))
        );
      })
      .catch((err) => {
        console.log(err);
        return err;
      });
  }, [reload]);

  const actionBtn = (type, email) => {
    if (type === "block") {
      axios
        .post("http://localhost:5000/blockuser", {
          email: email,
        })
        .then((res) => {
          if (res.data.success === "User Blocked") {
            props.enqueueSnackbar("User Blocked", {
              variant: "success",
            });
            setReload(!reload);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } else if (type === "unblock") {
      axios
        .post("http://localhost:5000/unblockuser", {
          email: email,
        })
        .then((res) => {
          if (res.data.success === "User UnBlocked") {
            props.enqueueSnackbar("User UnBlocked", {
              variant: "success",
            });
            setReload(!reload);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const columns = [
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "First Name",
      dataIndex: "firstname",
      key: "firstname",
    },
    {
      title: "Last Name",
      dataIndex: "lastname",
      key: "lastname",
    },
    {
      title: "Blocked",
      dataIndex: "blocked",
      key: "blocked",
    },
    {
      title: "Admin",
      dataIndex: "admin",
      key: "admin",
    },
    {
      title: "Action",
      dataIndex: "",
      key: "x",
      render: (record) => (
        <Button
          disabled={record.user.admin}
          type="primary"
          danger
          onClick={() =>
            actionBtn(
              record.user.blocked ? "unblock" : "block",
              record.user.email
            )
          }
        >
          {record.user.blocked ? "Unblock" : "Block"}
        </Button>
      ),
    },
  ];

  return (
    <div className="Main">
      <PageHeader
        className="site-page-header"
        title="All Users"
        subTitle="All Users Information and Actions"
      />
      <Divider>Users</Divider>
      <Table bordered loading={loading} dataSource={users} columns={columns} />;
    </div>
  );
};

export default withSnackbar(Allusers);
