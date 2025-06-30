import React from "react";
import { Modal, Form, Row, Col, Button, InputGroup } from "react-bootstrap";

const ToWorkModal = ({ show, onHide, onConfirm }) => {
  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Перенести запись в работу</Modal.Title>
      </Modal.Header>
      <Modal.Body>Вы точно хотите перенести запись в работу?</Modal.Body>
      <Modal.Footer>
        <Button variant="danger" onClick={onHide}>
          Отмена
        </Button>
        <Button variant="warning" onClick={onConfirm}>
          Подтвердить
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ToWorkModal;
