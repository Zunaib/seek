
import React, { useState, useEffect } from "react";
import {
    
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

const Usermessages = (props) => {
    const { Title } = Typography;
    const [message,setMessage]=useState([]);

  
    useEffect(() => {
      axios
        .get("http://localhost:5000/users/getusermessages?email=" +

        localStorage.getItem("useremail")
        )
        .then((response) => {
          setMessage(response.data)
          console.log(response);
      
        })
        .catch((err) => {
          console.log(err);
          return err;
        });
    }, []);

  return (
    <div class="Main">
     <PageHeader/>
      <div className=" container-fluid page">
        {
         <Row type="flex" justify="center" align="middle" style={{minHeight: '50vh'}}>
            <Col className="profile-settings" span={24}>
              
                <Row>
                  <Col span={24} >
                  <Card style={{ height: 50 }}  bordered={true}>

                  
                      {message?.map(msg=>(
                            <Row justify="start">
                            <Col span={6}>{msg.recieveremail?.map(re=>{return re})}</Col>
                            <Col span={6}>{msg.number?.map(num=>{return num})}</Col>
                            <Col span={6}>{msg.message1}</Col>
                           <Col span={6}>{msg.createdat}</Col>
                        </Row>

                      ))}
            
           
            
           
          
                </Card>
                  </Col>
                </Row>
               
                
                
            
            
              
            
            </Col>
            
          </Row>
        }
      </div>
    </div>
    
   
  );
};

export default withSnackbar(Usermessages);

