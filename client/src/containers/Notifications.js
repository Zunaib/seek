import React, { useState, useEffect } from "react";
import Notificationmodal from "../components/modals/notification"
import {
    Button,Modal
  
} from "antd";
import { withSnackbar } from "notistack";
import axios from "axios";

const Notification = (props) => {
  /* const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  }; 

 */

    

return (
<div class="Main">
 <div>

<Notificationmodal/>

 




</div>
 
</div>
);
};


export default withSnackbar(Notification);

