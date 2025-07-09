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
        <Modal.Title>Редактировать съемку</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <input type="hidden" name="Id" value={formData.Id} />
          <Row>
            <Col sm={6}>
              <Form.Group className="mb-3" controlId="CallDate">
                <Form.Label>Тип съемки</Form.Label>
                <Form.Control
                  type="text"
                  name="CallDate"
                  placeholder=""
                  onChange={onFormChange}
                  value={formData.CallDate}
                  aria-describedby="inputCallDatePrepend"
                  required
                />
              </Form.Group>
            </Col>
            <Col sm={6}>
              <Form.Group className="mb-3" controlId="CallDate">
                <Form.Label>Локация</Form.Label>
                <Form.Control
                  type="text"
                  name="CallDate"
                  placeholder=""
                  onChange={onFormChange}
                  value={formData.CallDate}
                  aria-describedby="inputCallDatePrepend"
                  required
                />
              </Form.Group>
            </Col>
            <Col sm={6}>
              <Form.Group className="mb-3" controlId="CallDate">
                <Form.Label>Фотограф</Form.Label>
                <Form.Control
                  type="text"
                  name="CallDate"
                  placeholder=""
                  onChange={onFormChange}
                  value={formData.CallDate}
                  aria-describedby="inputCallDatePrepend"
                  required
                />
              </Form.Group>
            </Col>
            <Col sm={6}>
              <Form.Group className="mb-3" controlId="CallDate">
                <Form.Label>Оплата</Form.Label>
                <Form.Control
                  type="text"
                  name="CallDate"
                  placeholder=""
                  onChange={onFormChange}
                  value={formData.CallDate}
                  aria-describedby="inputCallDatePrepend"
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
