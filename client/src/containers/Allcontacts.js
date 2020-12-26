import React, { useState, useEffect } from "react";
import { PageHeader, Divider, Button, Table } from "antd";
import axios from "axios";
import { withSnackbar } from "notistack";

const Allcontacts = (props) => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [reload, setReloading] = useState(true);

  useEffect(() => {
    axios
      .get("http://localhost:5000/getcontactus")
      .then((response) => {
        setLoading(false);
        setContacts(
          response?.data?.map((cont, index) => ({
            key: index + 1,
            email: cont.email,
            message: cont.message,
            sentAt: cont.sentAt,
            cont: cont,
          }))
        );
      })
      .catch((err) => {
        console.log(err);
        return err;
      });
  }, [reload]);

  const columns = [
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Message",
      dataIndex: "message",
      key: "message",
    },
    {
      title: "Sent At",
      dataIndex: "sentAt",
      key: "sentAt",
    },
    {
      title: "Action",
      dataIndex: "",
      key: "x",
      render: (record) => (
        <Button type="primary" danger onClick={() => deleteQuery(record.cont)}>
          Delete
        </Button>
      ),
    },
  ];

  const deleteQuery = (cont) => {
    axios
      .post("http://localhost:5000/delcontactus", {
        contactid: cont._id,
      })
      .then((res) => {
        props.enqueueSnackbar(res.data.success, {
          variant: "success",
        });
        setReloading(!reload);
      })
      .catch((err) => {
        console.log(err);
        return err;
      });
  };

  return (
    <div>
      <PageHeader
        className="site-page-header"
        title="Contact Queries"
        subTitle="All The User Queries"
      />
      <Divider>Queries</Divider>
      <Table
        loading={loading}
        columns={columns}
        dataSource={contacts}
        bordered
      />
    </div>
  );
};

export default withSnackbar(Allcontacts);
