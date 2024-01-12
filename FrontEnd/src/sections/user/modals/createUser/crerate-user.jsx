import React, { useState } from 'react';
import { Modal, Button } from 'antd';
import './create-user.scss';

const CreateUser = ({ isOpen, setIsOpen }) => {
  const handleOk = () => {};
  const handleCancel = () => {
    setIsOpen(false);
  };
  return (
    <>
      <Modal title="Basic Modal" open={isOpen} onOk={handleOk} onCancel={handleCancel}>
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Modal>
    </>
  );
};
export default CreateUser;
