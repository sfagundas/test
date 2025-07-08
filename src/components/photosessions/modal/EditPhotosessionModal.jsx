import { Row, Col, Button, Modal, Form } from "react-bootstrap";

const EditPhotosessionModal = ({
  show,
  onHide,
  formData,
  onFormChange,
  onSave,
}) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    onSave();
  };

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Редактироват съемку</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <input type="hidden" name="Id" value={formData.Id} />
          <Row>
            <Col sm={12}>
              <Form.Group className="mb-3" controlId="CallDate">
                <Form.Label>Некое поле</Form.Label>
                <Form.Control
                  type="text"
                  name="CallDate"
                  placeholder="2025-04-23"
                  onChange={onFormChange}
                  value={formData.CallDate}
                  aria-describedby="inputCallDatePrepend"
                  required
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

export default EditPhotosessionModal;
