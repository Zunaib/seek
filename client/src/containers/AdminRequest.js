import React, { useState } from 'react'
import {PageHeader,Divider, Row, Col,Tag, Form, Input, Button } from 'antd';
import { withSnackbar } from 'notistack';
import axios from "axios";

const AdminRequest = (props) => {

  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };

  const [adminReq, setAdminReq] = useState({
    reason: "",
    message: "",
  });

  
  const onFinish = () => {
  axios.post("http://localhost:5000/requestadmin",{
    email:localStorage.getItem("useremail"),
    reason:adminReq.reason,
    message:adminReq.message
  }).then(res =>{
    if(res.data.success){
      props.enqueueSnackbar(res.data.success, {
        variant: "success",
      });
      setAdminReq({
        reason: "",
        message: "",
      })
    }else if(res.data.error){
      props.enqueueSnackbar(res.data.error, {
        variant: "error",
      });
    }

  }).catch(err =>{
    console.log(err)
  })
  };


  return (
    <div className="Main">
        <PageHeader
                className="site-page-header"
                title="Admin Request"
                subTitle="Requesting Admin Access"
            />
            <Divider>Request</Divider>
      <Row>
        <Col span={12}>
          <h5>Requesting Admin Access Includes Following Functionalities:</h5>
          <ul>
            <li><Tag style={{fontSize:"20px", padding:"5px"}} color="#87d068">View Any Video</Tag></li>
            <li><Tag style={{fontSize:"20px", padding:"5px"}} color="#87d068">Block Any Video</Tag></li>
            <li><Tag style={{fontSize:"20px", padding:"5px"}} color="#87d068">View Any Suspicious Video</Tag></li>
            <li><Tag style={{fontSize:"20px", padding:"5px"}} color="#87d068">Block Any Suspicious Video</Tag></li>
            <li><Tag style={{fontSize:"20px", padding:"5px"}} color="#87d068">View Any Normal Video</Tag></li>
            <li><Tag style={{fontSize:"20px", padding:"5px"}} color="#87d068">Block Any Normal Video</Tag></li>
            <li><Tag style={{fontSize:"20px", padding:"5px"}} color="#87d068">View Any Static Video</Tag></li>
            <li><Tag style={{fontSize:"20px", padding:"5px"}} color="#87d068">Block Any Static Video</Tag></li>
            <li><Tag style={{fontSize:"20px", padding:"5px"}} color="#87d068">View Any User</Tag></li>
            <li><Tag style={{fontSize:"20px", padding:"5px"}} color="#87d068">Block Any User</Tag></li>
            <li><Tag style={{fontSize:"20px", padding:"5px"}} color="#87d068">View Contact Queries</Tag></li>
            <li><Tag style={{fontSize:"20px", padding:"5px"}} color="#87d068">Grant Admin Access</Tag></li>
          </ul>
        </Col>
        <Col span={12}>
        <h5>For Requesting Admin Access, Fill Following:</h5>
        <Form {...layout} style={{margin:"30px auto"}} onFinish={onFinish}>
            <Row>
              <Col span={20}>
            <Form.Item label="Reason" rules={[{ required: true }]}>
              <Input
                type="text"
                value={adminReq.reason}
                onChange={(e) =>
                  setAdminReq({ ...adminReq, reason: e.target.value })
                }
              />
            </Form.Item>
            <Form.Item label="Message" rules={[{ required: true }]}>
              <Input
                type="text"
                value={adminReq.message}
                onChange={(e) =>
                  setAdminReq({ ...adminReq, message: e.target.value })
                }
              />
            </Form.Item>
            <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
              <Button type="primary" htmlType="submit" disabled={localStorage.getItem("admin") === "true"}>
                Request
              </Button>
            </Form.Item>
            {
              localStorage.getItem("admin") === "true" &&
              <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
              <h2>You're Already An Admin</h2>
            </Form.Item>
            }
            
            </Col>
            </Row>
          </Form>
        </Col>
      </Row>
    </div>
  )
}

export default withSnackbar(AdminRequest);
