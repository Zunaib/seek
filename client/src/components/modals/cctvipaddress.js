import React, { useState } from "react";
import { Button } from "antd";
import { withSnackbar } from "notistack";
import axios from "axios";

const Cctvipaddress = (props) => {
  console.log(props);
  const [state, setState] = useState({
    cam_type: props.edit ? props.editData.cam_type : "",
    name: props.edit ? props.editData.name : "",
    ip_address: props.edit ? props.editData.ip_address : "",
  });

  const updateCam = () => {
    if (
      JSON.stringify({
        cam_type: props.editData.cam_type,
        name: props.editData.name,
        ip_address: props.editData.ip_address,
      }) === JSON.stringify(state)
    ) {
      props.enqueueSnackbar("No Field Updated", {
        variant: "error",
      });
    } else {
      axios
        .post("http://localhost:5000/users/editcctv", {
          camid: props.editData._id,
          name: state.name,
          email: localStorage.getItem("useremail"),
          old_ip_address: props.editData.ip_address,
          ip_address: state.ip_address,
          cam_type: state.cam_type,
        })
        .then((res) => {
          if (res.data.success === "CCTV Cam Updated") {
            props.onClose();
            props.enqueueSnackbar(res.data.success, {
              variant: "success",
            });
          } else if (res.data.error === "This IP is Already Used By You") {
            props.enqueueSnackbar(res.data.error, {
              variant: "error",
            });
          }
        });
    }
  };
  const addCam = () => {
    axios
      .post("http://localhost:5000/users/addcctv", {
        name: state.name,
        email: localStorage.getItem("useremail"),
        ip_address: state.ip_address,
        cam_type: state.cam_type,
      })
      .then((res) => {
        if (res.data.success === "CCTV Cam Added") {
          props.onClose();
          props.enqueueSnackbar(res.data.success, {
            variant: "success",
          });
        } else if (res.data.error === "Ip Against User already exists") {
          props.enqueueSnackbar(res.data.error, {
            variant: "error",
          });
        }
      });
  };

  return (
    <>
      <div class="modal-main">
        <div class="modal-content">
          <div className="close" onClick={props.onClose}>
            <i className="fas fa-times"></i>
          </div>
          <div className="form-group">
            <label htmlFor="cctvname">CCTV Cam Name</label>
            <input
              style={{ marginBottom: "10px" }}
              type="text"
              name="cctvname"
              placeholder="Enter Camera Name"
              value={state.name}
              onChange={(e) => setState({ ...state, name: e.target.value })}
            />
            <label htmlFor="ipaddress">CCTV IP Address</label>
            <input
              style={{ marginBottom: "10px" }}
              type="text"
              name="ip_address"
              placeholder="Enter Camera IP Address"
              value={state.ip_address}
              onChange={(e) =>
                setState({ ...state, ip_address: e.target.value })
              }
            />
            <label htmlFor="camtype">CCTV Cam Type</label>
            <input
              style={{ marginBottom: "10px" }}
              type="text"
              name="camtype"
              placeholder="Enter Camera Type"
              value={state.cam_type}
              onChange={(e) => setState({ ...state, cam_type: e.target.value })}
            />
          </div>
          <div className="btn-wrapper">
            <Button
              style={{ backgroundColor: "#0068cf", color: "white" }}
              type="primary"
              size="middle"
              onClick={props.edit ? () => updateCam() : () => addCam()}
            >
              {props.edit ? "Update Camera" : "Add Camera"}
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default withSnackbar(Cctvipaddress);
