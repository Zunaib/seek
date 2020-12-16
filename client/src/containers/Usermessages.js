import React, { useState, useEffect } from "react";
import { PageHeader, Divider, Button, Table, Tag } from "antd";
import axios from "axios";
import { withSnackbar } from "notistack";
import SendMessage from "../components/modals/sendMessage";

const Usermessages = (props) => {
  const [messages, setMessages] = useState([]);
  const [msgModal, setMsgModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [reload, setReloading] = useState(false);

  useEffect(() => {
    axios
      .get(
        "http://localhost:5000/users/getusermessages?email=" +
          localStorage.getItem("useremail")
      )
      .then((response) => {
        setLoading(false);
        if (response.data.length > 0) {
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
              msg: msg,
            }))
          );
        } else {
          setMessages([]);
        }
      })
      .catch((err) => {
        console.log(err);
        return err;
      });
  }, [reload]);

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
    {
      title: "Action",
      dataIndex: "",
      key: "x",
      render: (record) => (
        <Button type="primary" danger onClick={() => deleteMsg(record.msg)}>
          Delete
        </Button>
      ),
    },
  ];

  const deleteMsg = (msg) => {
    axios
      .post("http://localhost:5000/users/remmsg", {
        messageid: msg._id,
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

  const closeMsg = () => {
    setMsgModal(false);
    setReloading(!reload);
  };

  return (
    <div class="Main">
      {msgModal && <SendMessage onClose={closeMsg} />}
      <PageHeader
        className="site-page-header"
        title="My Message"
        subTitle="My Messages And Information"
        extra={[
          <Button type="primary" onClick={() => setMsgModal(!msgModal)}>
            Send New Message
          </Button>,
        ]}
      />
      <Divider>My Message</Divider>
      <Table
        bordered
        loading={loading}
        dataSource={messages}
        columns={columns}
      />
    </div>
  );
};

export default withSnackbar(Usermessages);
