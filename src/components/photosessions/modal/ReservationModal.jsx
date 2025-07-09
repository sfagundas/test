import { Row, Col, Button, Modal, Form } from "react-bootstrap";

const ReservationModal = ({ show, onHide, formData, onFormChange, onSave }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    onSave();
  };

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Забронировать съемку</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <input type="hidden" name="Id" value={formData.Id} />
          <Row>
            <Col sm={6}>
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
            <Col sm={6}>
              <Form.Group controlId="Photographer" className="mb-3">
                <Form.Label>Фотограф</Form.Label>
                <Form.Control
                  type="text"
                  name="Photographer"
                  value={formData.CallDate}
                  onChange={onFormChange}
                />
              </Form.Group>
            </Col>

            <Col sm={6}>
              <Form.Group controlId="Photographer" className="mb-3">
                <Form.Label>Контактное лицо</Form.Label>
                <Form.Control
                  type="text"
                  name="Photographer"
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

export default ReservationModal;
