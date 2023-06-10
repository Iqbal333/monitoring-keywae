import React from 'react';
import { Button, Modal } from 'antd';
import { useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';

const ModalMaster = () => {
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  // const [modalText, setModalText] = useState('Content of the modal');
  const showModal = () => {
    setOpen(true);
  };
  const handleOk = () => {
    // setModalText('The modal will be closed after two seconds');
    setConfirmLoading(true);
    setTimeout(() => {
      setOpen(false);
      setConfirmLoading(false);
    }, 2000);
  };
  const handleCancel = () => {
    console.log('Clicked cancel button');
    setOpen(false);
  };
  return (
    <>
      <Button onClick={showModal} icon={<PlusOutlined />}>
        Add New
      </Button>
      <Modal
        title='Add Region'
        open={open}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
        okText='Submit'
      >
        <p>
          <input type='text' />
        </p>
      </Modal>
    </>
  );
};

export default ModalMaster;
