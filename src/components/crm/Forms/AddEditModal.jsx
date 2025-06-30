import React from "react";
import { Modal, Form, Row, Col, Button, InputGroup } from "react-bootstrap";

import SelectCities from "../../custom/SelectCities";

const AddEditModal = ({
  show,
  onHide,
  formData,
  onFormChange,
  onSave,
  isEditMode,
}) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    onSave();
  };

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>
          {isEditMode ? "Редактировать класс" : "Добавить класс"}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <input type="hidden" name="Id" value={formData.Id} />
          <Row>
            <Col sm={12}>
              <Form.Group className="mb-3" controlId="ClientName">
                <Form.Label>Клиент</Form.Label>
                <InputGroup>
                  <InputGroup.Text id="inputClientNamePrepend">
                    <i className="bi bi-camera"></i>
                  </InputGroup.Text>
                  <Form.Control
                    type="text"
                    name="ClientName"
                    placeholder="Название"
                    onChange={onFormChange}
                    value={formData.ClientName}
                    aria-describedby="inputClientNamePrepend"
                    required
                  />
                </InputGroup>
              </Form.Group>
            </Col>
            <Col sm={12} md={6}>
              <Form.Group className="mb-3" controlId="Phone">
                <Form.Label>Телефон</Form.Label>
                <InputGroup>
                  <InputGroup.Text id="inputPhonePrepend">
                    <i className="bi bi-camera"></i>
                  </InputGroup.Text>
                  <Form.Control
                    type="text"
                    name="Phone"
                    placeholder="Название"
                    onChange={onFormChange}
                    value={formData.Phone}
                    aria-describedby="inputPhonePrepend"
                    required
                  />
                </InputGroup>
              </Form.Group>
            </Col>
            <Col sm={12} md={6}>
              <Form.Group className="mb-3" controlId="CityID">
                <SelectCities id={formData.CityId} onChange={onFormChange} />
              </Form.Group>
            </Col>
          </Row>
          <Modal.Footer>
            <Button variant="secondary" onClick={onHide}>
              Отмена
            </Button>
            <Button variant="warning" type="submit">
              {isEditMode ? "Сохранить" : "Добавить"}
            </Button>
          </Modal.Footer>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default AddEditModal;
