import React, { useState } from "react";
import { Button } from "antd";
import { withSnackbar } from "notistack";
import axios from "axios";

const Cctvipaddress = (props) => {
  const [state, setState] = useState({
    cam_type: props.edit ? props.editData.cam_type : "",
    name: props.edit ? props.editData.name : "",
    ip_address: props.edit ? props.editData.ip_address : "",
  });

  const [errors, seterrors] = useState({
    cam_type: "",
    name: "",
    ip_address: "",
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
      if (
        validateForm(errors) &&
        state.name !== "" &&
        state.cam_type !== "" &&
        state.ip_address !== ""
      ) {
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
      } else {
        props.enqueueSnackbar("Invalid Form", {
          variant: "error",
        });
      }
    }
  };

  const validateForm = (errors) => {
    let valid = true;
    Object.values(errors).forEach((val) => val.length > 0 && (valid = false));
    return valid;
  };

  const onChange = (event) => {
    const { name, value } = event.target;
    switch (name) {
      case "name":
        setState({ ...state, name: value });
        seterrors({
          ...errors,
          name: value.length < 5 ? "CCTV Name must be 5 characters long!" : "",
        });
        break;
      case "ip_address":
        setState({ ...state, ip_address: value });

        seterrors({
          ...errors,
          ip_address: value.length > 10 ? "" : "IP address must be valid",
        });
        break;
      case "cam_type":
        setState({ ...state, cam_type: value });

        seterrors({
          ...errors,
          cam_type: value.length < 5 ? "Cam Type is not valid!" : "",
        });
        break;
      default:
        break;
    }
  };

  const addCam = () => {
    if (
      validateForm(errors) &&
      state.name !== "" &&
      state.cam_type !== "" &&
      state.ip_address !== ""
    ) {
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
    } else {
      props.enqueueSnackbar("Invalid Form", {
        variant: "error",
      });
    }
  };

  return (
    <>
      <div class="modal-main">
        <div class="modal-content">
          <div className="close">
            <i className="fas fa-times" onClick={props.onClose}></i>
          </div>
          <div className="form-group">
            <label htmlFor="cctvname">CCTV Cam Name</label>
            <input
              style={{ marginBottom: "10px" }}
              className={errors.name.length > 0 && "error"}
              type="text"
              name="name"
              placeholder="Enter Camera Name"
              value={state.name}
              onChange={(e) => onChange(e)}
            />
            {errors.name.length > 0 && (
              <span className="error-text">
                <em> {errors.name}</em>
              </span>
            )}
            <label htmlFor="ipaddress">CCTV IP Address</label>
            <input
              style={{ marginBottom: "10px" }}
              type="text"
              className={errors.ip_address.length > 0 && "error"}
              name="ip_address"
              placeholder="Enter Camera IP Address"
              value={state.ip_address}
              onChange={(e) => onChange(e)}
            />
            {errors.ip_address.length > 0 && (
              <span className="error-text">
                <em> {errors.ip_address}</em>
              </span>
            )}
            <label htmlFor="camtype">CCTV Cam Type</label>
            <input
              style={{ marginBottom: "10px" }}
              type="text"
              name="cam_type"
              className={errors.cam_type.length > 0 && "error"}
              placeholder="Enter Camera Type"
              value={state.cam_type}
              onChange={(e) => onChange(e)}
            />
            {errors.cam_type.length > 0 && (
              <span className="error-text">
                <em> {errors.cam_type}</em>
              </span>
            )}
          </div>
          <div className="btn-wrapper">
            <Button
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
