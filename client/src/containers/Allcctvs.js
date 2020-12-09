


import React, { useState, useEffect } from "react";
import {
    Table,
    Rate,
    Checkbox,
 Card,
  PageHeader,
  Divider,
  Button,
  Input,
  Row,
  Col,
  Form,
  Select,
  Avatar,
  Upload,
  message,
  Typography,
} from "antd";
import { UserOutlined, UploadOutlined } from "@ant-design/icons";
import { withSnackbar } from "notistack";
import ImgCrop from "antd-img-crop";
import Spinner from "../components/Spinner";
import axios from "axios";

const Allcctvs = (props) => {

  const[allcctv,setAllcctv]=useState([]);

  useEffect(() => {
    /*  console.log(data) */
     axios
       .get("http://localhost:5000/users/allcctvs")
       .then((response) => {
         setAllcctv(
           response?.data?.map((allcctv, index)=>({
            key: index + 1,
            name:allcctv.name,
            ip_address:allcctv.ip_address,
            cam_type:allcctv.cam_type,
          
           })) 
         
         );
         console.log(response)
       })
       .catch((err) => {
         console.log(err)
         return err
     
       });
   }, []);
 

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key:"name"
    },
    {
      title: 'IP Address',
      dataIndex: 'ip_address',
      key:"ip_address"
    },
    {
      title: 'Camera Type',
      dataIndex: 'cam_type',
      key:"cam_type"
    },
  ];
 






return (
<div class="Main">
 <div>
<h4>User Cctv Cameras</h4>
<Table columns={columns} dataSource={allcctv} /* size="middle" */ />

</div>
 

</div>
);
};


export default withSnackbar(Allcctvs);

