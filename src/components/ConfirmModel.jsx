import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

const ConfirmModel = (props) => {
  const {
    onClick,
    message,
    isOpen,
  } = props;
  return (
    <div>
      <Modal isOpen={isOpen} toggle={onClick(false)}>
        <ModalHeader toggle={onClick(false)}>Confirm</ModalHeader>
        <ModalBody>{message}</ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={onClick(true)}>Accept</Button>{' '}
          <Button color="secondary" onClick={onClick(false)}>Cancel</Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default ConfirmModel;
