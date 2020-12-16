import React, { useState, useEffect } from "react";
import {
    Table,
  PageHeader,
  Button,
  Input,
  Row,
  Col,
  Form,
  Select,
  Typography,
} from "antd";
import { withSnackbar } from "notistack";
import axios from "axios";
const Usercctv = (props) => {
    const[usercctv,setUsercctv]=useState([]);

    useEffect(() => {
        axios
          .get("http://localhost:5000/users/getusercctv?email=" +
  
          localStorage.getItem("useremail")
          )
          .then((response) => {
            setUsercctv(
                response?.data?.map((usercctv, index) => ({
                    key: index + 1,
                    name:usercctv.name,
                    ip_address:usercctv.ip_address,
                    cam_type:usercctv.cam_type,
                   
                  }))
                )
            console.log(response);
        
          })
          .catch((err) => {
            console.log(err);
            return err;
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
    <Table columns={columns} dataSource={usercctv} size="middle" />

  </div>
     
  
    </div>
  );
};

export default withSnackbar(Usercctv);

