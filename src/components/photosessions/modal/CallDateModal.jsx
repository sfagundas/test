import { Row, Col, Button, Modal, Form } from "react-bootstrap";
import { useState } from "react";

const CallDateModal = ({ show, onHide, formData, onFormChange, onSave }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    onSave();
  };

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Установить дату связи</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <input type="hidden" name="Id" value={formData.Id} />
          <Row>
            <Col sm={12}>
              <Form.Group controlId="CallDate" className="mb-3">
                <Form.Label>Выберите дату</Form.Label>
                <Form.Control
                  type="date"
                  name="CallDate"
                  value={formData.CallDate}
                  onChange={onFormChange}
                />
              </Form.Group>
            </Col>
          </Row>
          <Modal.Footer>
            <Button variant="secondary" onClick={onHide}>
              Отмена
            </Button>
            <Button variant="warning" type="submit">
              Сохранить
            </Button>
          </Modal.Footer>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default CallDateModal;
