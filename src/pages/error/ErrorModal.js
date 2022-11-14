import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";

const ErrorModal = ({msg, onClose}) => {
  const [show, setShow] = useState(true);
  const handleClose = () => {
    setShow(false);
    onClose();
  }

  return (
    <Modal 
      show={show} 
      onHide={handleClose}
      backdrop="static"
      keyboard={false}>
      <Modal.Header closeButton>
        <Modal.Title>ERROR</Modal.Title>
      </Modal.Header>
      <Modal.Body>{msg}</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>     
      </Modal.Footer>
    </Modal>
  );
};

export default ErrorModal;

