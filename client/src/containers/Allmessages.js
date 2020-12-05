


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

    
    const { Title } = Typography;
  

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
                  <Card style={{ width: 1660, height: 50 }}  bordered={true}>

                      <Row >
                          <Col span={1} >waqar.gmail.com</Col>
                          <Col span={10} >helllooooooo from the other sidee</Col>
                          <Col  span={2} >Firing</Col>

                          <Col  span={1} >4.44 am</Col>
                      </Row>
            
           
            
           
          
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

