import React, { useState, useEffect } from "react";
import { Table, PageHeader, Divider } from "antd";
import { withSnackbar } from "notistack";
import axios from "axios";

const Allcctvs = (props) => {
  const [allcctv, setAllcctv] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/users/allcctvs")
      .then((response) => {
        setAllcctv(
          response?.data?.map((allcctv, index) => ({
            key: index + 1,
            email: allcctv.email,
            name: allcctv.name,
            ip_address: allcctv.ip_address,
            cam_type: allcctv.cam_type,
          }))
        );
        console.log(response);
      })
      .catch((err) => {
        console.log(err);
        return err;
      });
  }, []);

  const columns = [
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "IP Address",
      dataIndex: "ip_address",
      key: "ip_address",
    },
    {
      title: "Camera Type",
      dataIndex: "cam_type",
      key: "cam_type",
    },
  ];

  return (
    <div>
      <PageHeader
        className="site-page-header"
        title="All CCTV's"
        subTitle="All CCTV Cams And Information"
      />
      <Divider>All CCTV's</Divider>
      <Table columns={columns} dataSource={allcctv} bordered />
    </div>
  );
};

export default withSnackbar(Allcctvs);
