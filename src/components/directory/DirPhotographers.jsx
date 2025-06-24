import {
  Card,
  Row,
  Col,
  Button,
  Modal,
  Dropdown,
  Form,
  InputGroup,
} from "react-bootstrap";
import { useState } from "react";
import { useModal } from "./useModal";

export default function DirPhotographers() {
  const { show, formData, handleShow, handleClose, formEdit, setFormData } =
    useModal({
      Id: "",
      Name: "",
      Contact: "",
      Email: "",
      Portfolio: "",
    });

  const [photographers, setPhotographers] = useState([
    {
      Id: "1",
      Name: "Тимофеев Тимофей",
      Contact: "8-888-888-88-88",
      Email: "tim@yandex.ru",
      Portfolio: "http://wfolio.ru",
    },
    {
      Id: "2",
      Name: "Филиппов Максим",
      Contact: "9-999-999-99-99",
      Email: "pussydestroyer@yandex.ru",
      Portfolio: "http://wfolio.ru",
    },
    {
      Id: "3",
      Name: "Панов Ян",
      Contact: "7-777-777-77-77",
      Email: "panov@yandex.ru",
      Portfolio: "http://wfolio.ru",
    },
    {
      Id: "4",
      Name: "Калинина Яна",
      Contact: "5-555-555-55-55",
      Email: "kalina@yandex.ru",
      Portfolio: "http://wfolio.ru",
    },
  ]);

  // Добавление фотографа
  const addPhotographer = () => {
    const newPhotographer = {
      ...formData,
      Id: (photographers.length + 1).toString(),
    };
    setPhotographers([...photographers, newPhotographer]);
    handleClose();
  };

  // СУПЕР ВАЖНЫЕ ЗАМЕЧАНИЯ
  // При работе с базой, проверять что все записалось
  // В данной функции ID гнерится здесь, в рабочем виде должно браться новое значение из БД и записываться в photorgaphers !!!

  // Редактирование фотографа
  const editPhotographer = (Id) => {
    const updatedPhotographers = photographers.map((item) =>
      item.Id === Id ? { ...item, ...formData } : item
    );
    setPhotographers(updatedPhotographers);
    handleClose();
  };

  // Открытие модального окна для редактирования
  const openEditModal = (data) => {
    setFormData(data);
    handleShow();
  };

  return (
    <>
      <Button variant="light" className="col-12 mb-3" onClick={handleShow}>
        <i className="bi bi-plus-lg"></i>
      </Button>

      <Row>
        {photographers.map((photographer) => (
          <Col lg={6} key={photographer.id}>
            <Card className="mb-3">
              <Card.Body>
                <div className="d-flex justify-content-between">
                  <Card.Title className="mb-2">{photographer.Name}</Card.Title>
                  <div>
                    <Dropdown>
                      <Dropdown.Toggle
                        variant="light"
                        className="btn-sm pt-0 pb-0"
                        id="dropdown-basic"
                      ></Dropdown.Toggle>

                      <Dropdown.Menu>
                        <Dropdown.Item
                          onClick={() => openEditModal(photographer)}
                        >
                          <i className="bi bi-pencil-square me-2"></i>
                          Изменить
                        </Dropdown.Item>
                        <Dropdown.Item>
                          <i className="bi bi-trash me-2"></i>Удалить
                        </Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  </div>
                </div>
                <div className="mb-2">
                  <i className="bi bi-telephone me-2"></i>
                  {photographer.Contact}
                </div>
                <div className="mb-2">
                  <i className="bi bi-envelope-at me-2"></i>
                  {photographer.Email}
                </div>
                <div>
                  <a href="{photographer.Portfolio}">
                    <i className="bi bi-box-arrow-up-right me-2"></i>Портфолио
                  </a>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      <div
        className="modal show"
        style={{ display: "block", position: "initial" }}
      >
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>
              {formData.Id ? "Редактировать фотографа" : "Добавить фотографа"}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <input type="hidden" name="Id" value={formData.Id} />
              <Row>
                <Col xs={6}>
                  <Form.Group className="mb-3" controlId="Name">
                    <Form.Label>Фамилия и имя</Form.Label>

                    <InputGroup>
                      <InputGroup.Text id="inputNamePrepend">
                        <i className="bi bi-person"></i>
                      </InputGroup.Text>
                      <Form.Control
                        type="text"
                        name="Name"
                        placeholder="ФИО"
                        onChange={formEdit}
                        value={formData.Name}
                        aria-describedby="inputNamePrepend"
                        required
                      />
                    </InputGroup>
                  </Form.Group>
                </Col>

                <Col xs={6}>
                  <Form.Group className="mb-3" controlId="Contact">
                    <Form.Label>Телефон</Form.Label>
                    <InputGroup>
                      <InputGroup.Text id="inputContactPrepend">
                        <i className="bi bi-telephone"></i>
                      </InputGroup.Text>
                      <Form.Control
                        aria-describedby="inputContactPrepend"
                        type="text"
                        name="Contact"
                        placeholder="Введите телефон"
                        onChange={formEdit}
                        value={formData.Contact}
                      />
                    </InputGroup>
                  </Form.Group>
                </Col>

                <Col xs={6}>
                  <Form.Group className="mb-3" controlId="Email">
                    <Form.Label>Почта</Form.Label>
                    <InputGroup>
                      <InputGroup.Text id="inputEmailPrepend">
                        <i className="bi bi-envelope-at"></i>
                      </InputGroup.Text>
                      <Form.Control
                        aria-describedby="inputEmailPrepend"
                        type="text"
                        name="Email"
                        placeholder="Yandex почта"
                        onChange={formEdit}
                        value={formData.Email}
                      />
                    </InputGroup>
                  </Form.Group>
                </Col>
                <Col xs={6}>
                  <Form.Group className="mb-3" controlId="Portfolio">
                    <Form.Label>Портфолио</Form.Label>
                    <InputGroup>
                      <InputGroup.Text id="inputPortfolioPrepend">
                        <i className="bi bi-images"></i>
                      </InputGroup.Text>
                      <Form.Control
                        aria-describedby="inputPortfolioPrepend"
                        type="text"
                        name="Portfolio"
                        placeholder="Вставьте ссылку"
                        onChange={formEdit}
                        value={formData.Portfolio}
                      />
                    </InputGroup>
                  </Form.Group>
                </Col>
              </Row>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Отмена
            </Button>

            {formData.Id ? (
              <Button
                variant="warning"
                onClick={() => editPhotographer(formData.Id)}
              >
                Сохранить
              </Button>
            ) : (
              <Button variant="warning" onClick={addPhotographer}>
                Добавить
              </Button>
            )}
          </Modal.Footer>
        </Modal>
      </div>
    </>
  );
}
