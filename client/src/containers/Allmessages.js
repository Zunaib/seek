


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

const Allmessages = (props) => {

  const[message,setMessage]=useState([]);
  useEffect(() => {
   /*  console.log(data) */
    axios
      .get("http://localhost:5000/users/allmessages")
      .then((response) => {
        setMessage(response.data
          /* response?.data?.map(allmsg=>({
            number: allmsg.number,
            email: allmsg.email,
            message1:allmsg.message1,
            recieveremail:allmsg.recieveremail,
            createdat:allmsg.createdat 

          })) */
        
        );
        console.log(response)
      })
      .catch((err) => {
        console.log(err)
        return err
    
      });
  }, []);


  return (
    <div class="Main">
     <PageHeader/>
      <div className=" container-fluid page">
        {
         <Row type="flex" justify="center" align="middle" style={{minHeight: '50vh'}}>
            <Col className="profile-settings" span={24}>
              <Form
                labelCol={{ span: 8 }}
               /*  wrapperCol={{ span: 16 }} */
               /*  onFinish={updateSettings} */
              >
                <Row type="flex" justify="center" align="middle" style={{minHeight: '25vh'}}>
                  <Col span={24} >
                  <Card style={{ height: 50 }}  bordered={true}>

                     
                      {message?.map(msg=>(
                         <Row >
                         <Col span={6}>{msg.recieveremail?.map(re=>{return re})}</Col>
                            <Col span={6}>{msg.number?.map(num=>{return num})}</Col>
                            <Col span={6}>{msg.message1}</Col>
                           <Col span={6}>{msg.createdat}</Col>
                     </Row>

                      ))}
                        
    
            
           
            
           
          
                </Card>
                  </Col>
                </Row>
               
                
                
            
            
              
              </Form>
            </Col>
            
          </Row>
        }
      </div>
    </div>
    
   
  );
};

export default withSnackbar(Allmessages);

