import React, { useState } from "react";
import { Modal, Button } from "antd";
import { withSnackbar } from "notistack";

const Notification = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <div class="Main">
      <div>
        <h4>Notification</h4>
        <Button type="primary" onClick={showModal}>
          Send Notifications
        </Button>
        <Modal
          title="Detection Info"
          visible={isModalVisible}
          onOk={handleOk}
          onCancel={handleCancel}
        >
          <p>Fighting is detected</p>
          <p>Object:gun</p>
          <p>time of detection:10:26 pm</p>
          <p>message sent to :03015037166</p>
        </Modal>
      </div>
    </div>
  );
};

export default withSnackbar(Notification);
