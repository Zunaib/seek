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
const Message = (props) => {
    const Option = Select.Option;
    const { Title } = Typography;
    const { TextArea } = Input;


    const[details,setDetails]=useState({
      number:[],
      email:[],
      message1:""

    })
    const onFinish= () => {
      
      axios
      .post("http://localhost:5000/users/message",
      {
        number:details.number,
        recieveremail:details.email,
        message1:details.message1,
        email: localStorage.getItem("useremail")
      
      }
      )
      
     
      .then((res)=>{
        
        if(res.data.success){
          props.enqueueSnackbar(res.data.success, {
            variant: "success",
          });
          setDetails({
            number:[],
            email:[],
            message1:""
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
                    <Form.Item label="Number">
                    <Select
                        mode="tags"
                        style={{ width: '100%' }}
               /*          onChange={handleChange}  */
                       /*  value={details.number} */
                       onChange={(val)=>
                        setDetails({...details,number:val})}
                     
                        tokenSeparators={[',']}
                    >
                   
                    </Select>
                    </Form.Item>
                  </Col>
                </Row>
                <Row>
                <Col span={24}  pull={3}>
                  <Form.Item label="Email">
                    <Select
                        mode="tags"
                        style={{ width: '100%' }}
                    
                    
                       onChange={(val)=>
                      setDetails({...details,email:val})}
                        tokenSeparators={[',']}
                    >
                    
                    </Select>
                    </Form.Item>
                 
                  </Col>

                </Row>
                
                <Row  type="flex" justify="center" align="middle">
                <Col span={24}  pull={3}>
                    <Form.Item label="Message">
                      <TextArea
                        rows={2}
                        placeholder="Enter Message"
                        value={details.message1}
                        onChange={(e)=>
                        setDetails({...details,message1:e.target.value})}
                   
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

export default withSnackbar(Message);

