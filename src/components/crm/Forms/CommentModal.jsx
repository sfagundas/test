import React from "react";
import { Modal, Form, Row, Col, Button } from "react-bootstrap";

const CommentModal = ({ show, onHide, formData, onFormChange, onSave }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    onSave();
  };

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>{"Комментарий"}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <input type="hidden" name="Id" value={formData.Id} />
          <Row>
            <Col sm={12}>
              <Form.Group className="mb-3" controlId="ManagerNotes">
                <Form.Control
                  aria-describedby="inputManagerNotesPrepend"
                  type="text"
                  name="ManagerNotes"
                  as="textarea"
                  placeholder="Запись менеджера"
                  onChange={onFormChange}
                  value={formData.ManagerNotes}
                />
              </Form.Group>
            </Col>
          </Row>
          <Modal.Footer>
            <Button variant="secondary" onClick={onHide}>
              Отмена
            </Button>
            <Button variant="warning" type="submit">
              {"Сохранить"}
            </Button>
          </Modal.Footer>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default CommentModal;
