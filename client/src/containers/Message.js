import React, { useState, useEffect } from "react";
import {
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

const Message = (props) => {
    const [loading, setLoading] = useState(true);
    const Option = Select.Option;
 
    const { Title } = Typography;
    const { TextArea } = Input;
    const [fileList, setFileList] = useState();
  
    const children = [];
    for (let i = 10; i < 36; i++) {
    children.push(<Option key={i.toString(36) + i}>{i.toString(36) + i}</Option>);
    }

    function handleChange(value) {
  console.log(`selected ${value}`);
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
               /*  wrapperCol={{ span: 16 }} */
               /*  onFinish={updateSettings} */
              >
                <Row>
                  <Col span={24} pull={3}>
                    <Form.Item label="Number">
                    <Select
                        mode="tags"
                        style={{ width: '100%' }}
                       onChange={handleChange} 
                        tokenSeparators={[',']}
                    >
                        {children}
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
                       onChange={handleChange} 
                        tokenSeparators={[',']}
                    >
                        {children}
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
                      /*   value={change.about}
                        onChange={(e) =>
                          setChange({ ...change, about: e.target.value })
                        } */
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

