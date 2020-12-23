import React, { useState, useEffect } from "react";
import { PageHeader, Divider, Button, Table } from "antd";
import axios from "axios";
import Cctvipaddress from "../components/modals/cctvipaddress";
import { withSnackbar } from "notistack";
import { Link } from "react-router-dom";

const Usercctvs = (props) => {
  const [cctvs, setcctvs] = useState([]);
  const [cctvToEdit, setcctvToEdit] = useState([]);
  const [cctvModal, setCctvModal] = useState(false);

  const [loading, setLoading] = useState(true);
  const [reload, setReloading] = useState(false);

  useEffect(() => {
    axios
      .get(
        "http://localhost:5000/users/getusercctv?email=" +
          localStorage.getItem("useremail")
      )
      .then((response) => {
        setLoading(false);
        setcctvs(
          response.data?.map((cam) => ({
            name: cam.name,
            ip_address: cam.ip_address,
            cam_type: cam.cam_type,
            cam: cam,
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
      title: "Camera Name",
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
    {
      title: "Action",
      dataIndex: "",
      key: "x",
      render: (record) => (
        <>
          <Button
            style={{ margin: "0 10px" }}
            type="primary"
            danger
            onClick={() => deleteCam(record.cam)}
          >
            Delete
          </Button>
          <Button
            style={{ margin: "0 10px" }}
            type="primary"
            onClick={() => {
              setcctvToEdit(record.cam);
              setCctvModal(true);
            }}
          >
            Edit
          </Button>
          <Link
            to={{
              pathname: "/cctvdetection",
              state: {
                cam: record.cam,
              },
            }}
          >
            <Button
              style={{ margin: "0 10px", backgroundColor: "crimson" }}
              type="primary"
            >
              Stream Camera
            </Button>
          </Link>
        </>
      ),
    },
  ];

  const deleteCam = (cam) => {
    axios
      .post("http://localhost:5000/users/remcctv", {
        camid: cam._id,
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
      {cctvModal ? (
        <Cctvipaddress
          edit={true}
          editData={cctvToEdit}
          onClose={() => {
            setReloading(!reload);
            setCctvModal(false);
          }}
        />
      ) : null}

      <PageHeader
        className="site-page-header"
        title="My CCTV's"
        subTitle="My CCTV Cams And Information"
      />
      <Divider>My CCTV's</Divider>
      <Table bordered loading={loading} dataSource={cctvs} columns={columns} />
    </div>
  );
};

export default withSnackbar(Usercctvs);
