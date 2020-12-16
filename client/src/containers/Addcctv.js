import React, { useState, useEffect } from "react";
import {
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
const Addcctv = (props) => {
    const Option = Select.Option;
    const { Title } = Typography;
    const { TextArea } = Input;


    const[cctv,setCctv]=useState({
      name:"",
      ip_address:"",
      cam_type:""

    })
    const onFinish= () => {
        console.log(cctv)
      
      axios
      .post("http://localhost:5000/users/addcctv",{
      email: localStorage.getItem("useremail"),
      name:cctv.name,
      ip_address:cctv.ip_address,
      cam_type:cctv.cam_type
      }) 
      .then((res)=>{
       
         if(res.data.success){
          props.enqueueSnackbar(res.data.success, {
            variant: "success",
          });
          setCctv({
            name:"",
            ip_address:"",
            cam_type:""
            
          });
        }
        else if(res.data.error){
          props.enqueueSnackbar(res.data.error, {
            variant: "error",
          });

        }
      })
      
    } 

  return (
    <div class="Main">
     <PageHeader/>
     
      <div className=" container-fluid page">
        {
         <Row type="flex" justify="center" align="middle" style={{minHeight: '90vh'}}>
            <Col className="profile-settings" span={14}>
              <Form
                labelCol={{ span: 8 }}
                onFinish={onFinish}
              >
                
                <Row>
                  <Col span={24} pull={3}>
                    <Form.Item label=" Camera Name">
                    <Input
                        mode="tags"
                        style={{ width: '100%' }}
               /*          onChange={handleChange}  */
                       /*  value={details.number} */
                       onChange={(e)=>
                        setCctv({...cctv,name:e.target.value})}
                     /* 
                        tokenSeparators={[',']} */
                    >
                   
                    </Input>
                    </Form.Item>
                  </Col>
                </Row>
                <Row>
                <Col span={24}  pull={3}>
                  <Form.Item label="Ip Address">
                    <Input
                        mode="tags"
                        style={{ width: '100%' }}
                    
                    
                       onChange={(e)=>
                      setCctv({...cctv,ip_address:e.target.value})}
                        tokenSeparators={[',']}
                    >
                    
                    </Input>
                    </Form.Item>
                 
                  </Col>

                </Row>
                
                <Row  type="flex" justify="center" align="middle">
                <Col span={24}  pull={3}>
                    <Form.Item label="Camera Type">
                      <Input
                        /* rows={2} */
                       /*  placeholder="Enter Message" */
                        value={cctv.cam}
                        onChange={(e)=>
                        setCctv({...cctv,cam_type:e.target.value})}
                   
                      />
                    </Form.Item>
                  </Col>
                 

                </Row>
            
            
                <Button type="primary" htmlType="submit">
                  Send
                </Button>
              </Form>
            </Col>
            
          </Row>
        }
      </div>
    </div>
  );
};

export default withSnackbar(Addcctv);

