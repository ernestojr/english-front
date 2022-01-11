import React from 'react';
import {
  Form,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from 'reactstrap';

export default (props) => {
  const {
    children,
    cancelButtonCaption = 'Cancel',
    acceptButtonCaption = 'Accept',
    isOpen,
    title,
    toggle,
    onSubmit,
  } = props;
  return (
    <div>
      <Modal isOpen={isOpen} toggle={toggle}>
        <ModalHeader toggle={toggle}>{title}</ModalHeader>
        <Form onSubmit={onSubmit}>
          <ModalBody>{children}</ModalBody>
          <ModalFooter>
            <Button
              className="mr-2"
              color="secondary"
              type="button" onClick={toggle}>{cancelButtonCaption}</Button>
            <Button
              color="primary"
              type="submit">{acceptButtonCaption}</Button>
          </ModalFooter>
        </Form>
      </Modal>
    </div>
  );
}
