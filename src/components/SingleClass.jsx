import React from "react";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  Button,
  Spinner,
  Row,
  Col,
  Card,
  Modal,
  Form,
  InputGroup,
} from "react-bootstrap";

import {
  openModal,
  API,
  formEdit,
  addItem,
  editItem,
} from "./single_class/commonfunction";

import { Link } from "react-router-dom";

const EditMainInfoModal = ({
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
        <Modal.Title>Редактировать основную информацию</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <input type="hidden" name="Id" value={formData.Id} />
          <Row>
            <Col sm={6}>
              <Form.Group className="mb-3" controlId="School">
                <Form.Label>Школа</Form.Label>
                <Form.Control
                  type="text"
                  name="School"
                  placeholder="Пример: 33 школа"
                  onChange={onFormChange}
                  value={formData.School}
                  aria-describedby="inputSchoolPrepend"
                  required
                />
              </Form.Group>
            </Col>
            <Col sm={6}>
              <Form.Group className="mb-3" controlId="Class">
                <Form.Label>Класс</Form.Label>
                <Form.Control
                  type="text"
                  name="Class"
                  placeholder="Пример: 11А"
                  onChange={onFormChange}
                  value={formData.Class}
                  aria-describedby="inputClassPrepend"
                  required
                />
              </Form.Group>
            </Col>

            <Col sm={12}>
              <Form.Group className="mb-3" controlId="FullSchoolName">
                <Form.Label>Полное название школы</Form.Label>
                <Form.Control
                  type="text"
                  name="FullSchoolName"
                  placeholder="Название"
                  onChange={onFormChange}
                  value={formData.FullSchoolName}
                  aria-describedby="inputFullSchoolNamePrepend"
                  required
                />
              </Form.Group>
            </Col>

            <Col sm={6}>
              <Form.Group className="mb-3" controlId="ParentName">
                <Form.Label>ФИО ответственного</Form.Label>
                <Form.Control
                  type="text"
                  name="ParentName"
                  placeholder="ФИО"
                  onChange={onFormChange}
                  value={formData.ParentName}
                  aria-describedby="inputParentNamePrepend"
                  required
                />
              </Form.Group>
            </Col>

            <Col sm={6}>
              <Form.Group className="mb-3" controlId="ParentPhone">
                <Form.Label>Номер ответственного</Form.Label>
                <Form.Control
                  type="text"
                  name="ParentPhone"
                  placeholder="*-***-***-**-**"
                  onChange={onFormChange}
                  value={formData.ParentPhone}
                  aria-describedby="inputParentPhonePrepend"
                  required
                />
              </Form.Group>
            </Col>

            <Col sm={6}>
              <Form.Group className="mb-3" controlId="TeacherName">
                <Form.Label>ФИО кл. руководителя</Form.Label>
                <Form.Control
                  type="text"
                  name="TeacherName"
                  placeholder="ФИО"
                  onChange={onFormChange}
                  value={formData.TeacherName}
                  aria-describedby="inputTeacherNamePrepend"
                  required
                />
              </Form.Group>
            </Col>

            <Col sm={6}>
              <Form.Group className="mb-3" controlId="TeacherPhone">
                <Form.Label>Номер кл. руководителя</Form.Label>
                <Form.Control
                  type="text"
                  name="TeacherPhone"
                  placeholder="*-***-***-**-**"
                  onChange={onFormChange}
                  value={formData.TeacherPhone}
                  aria-describedby="inputTeacherPhonePrepend"
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
              Добавить
            </Button>
          </Modal.Footer>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

const EditOrderModal = ({ show, onHide, formData, onFormChange, onSave }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    onSave();
  };

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Редактировать заказ</Modal.Title>
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
          </Row>
          <Modal.Footer>
            <Button variant="secondary" onClick={onHide}>
              Отмена
            </Button>
            <Button variant="warning" type="submit">
              Добавить
            </Button>
          </Modal.Footer>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default function Class() {
  const { class_id } = useParams();

  const formDataContent = {
    Id: "",
  };

  const [modalType, setModalType] = useState();
  const [show, setShow] = useState(false);
  const [formData, setFormData] = useState(formDataContent);

  const controlFormData = (type, data) => {
    setModalType(type);

    if (type === "editMainInfo") {
      setFormData(data);
    }
    if (type === "editOrder") {
      setFormData({ Id: data });
    }

    openModal(type, setShow);
  };

  const setFD = () => {
    setFormData(formDataContent);
  };

  const handleClose = () => {
    setShow(false);
    setFD();
  };

  const [content, setContent] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Функция для получения данных из API
    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://okalbm.ru/api/api/work_class/${class_id}`
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setContent(data);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData(); // Вызываем функцию для получения данных
  }, [class_id]);
  if (isLoading) {
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ height: "100vh" }}
      >
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>
    );
  }

  if (error) {
    return (
      <div className="alert alert-danger m-3">
        Error loading data: {error}
        <Link to="/classes" className="ms-2">
          Назад
        </Link>
      </div>
    );
  }
  return (
    <>
      <div className="d-flex flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
        <Button as={Link} to="/classes" variant="light" size="sm">
          <i className="bi bi-arrow-bar-left"></i>
        </Button>
        <h1 className="h2 ms-5">{content[0]?.ClientName}</h1>
      </div>
      <Row>
        <Col sm={4}>
          <Card>
            <Card.Body>
              <div className="d-flex justify-content-between">
                <Card.Title className="mb-2">
                  <div className="d-flex align-items-center">
                    <span style={{ fontSize: "14px" }}>
                      Основная информация
                    </span>
                  </div>
                </Card.Title>
                <div>
                  <Button
                    variant="light"
                    size="sm"
                    onClick={() => controlFormData("editMainInfo", content[0])}
                  >
                    {" "}
                    <i className="bi bi-pencil-square"></i>{" "}
                  </Button>
                </div>
              </div>

              <ul>
                <li>
                  {" "}
                  Школа -{" "}
                  {content[0]?.School ? content[0].School : "Не заполнено"}
                </li>
                <li>
                  Класс -{" "}
                  {content[0]?.Class ? content[0].Class : "Не заполнено"}
                </li>
                <li>
                  {" "}
                  Полное название -{" "}
                  {content[0]?.FullSchoolName
                    ? content[0].FullSchoolName
                    : "Не заполнено"}
                </li>
                <li>
                  ФИО отв.-{" "}
                  {content[0]?.ParentName
                    ? content[0].ParentName
                    : "Не заполнено"}
                </li>
                <li>
                  Номер отв. -{" "}
                  {content[0]?.ParentPhone
                    ? content[0].ParentPhone
                    : "Не заполнено"}
                </li>
                <li>
                  ФИО кр -{" "}
                  {content[0]?.TeacherName
                    ? content[0].TeacherName
                    : "Не заполнено"}
                </li>
                <li>
                  Номер кр -{" "}
                  {content[0]?.TeacherPhone
                    ? content[0].TeacherPhone
                    : "Не заполнено"}
                </li>
              </ul>
            </Card.Body>
          </Card>
        </Col>

        <Col sm={4}>
          <Card>
            <Card.Body>
              <div className="d-flex justify-content-between">
                <Card.Title className="mb-2">
                  <div className="d-flex align-items-center">
                    <span style={{ fontSize: "14px" }}>Детали заказа</span>
                  </div>
                </Card.Title>
                <div>
                  <Button
                    variant="light"
                    size="sm"
                    onClick={() => controlFormData("editOrder", "ПОКА ПУСТО")}
                  >
                    {" "}
                    <i className="bi bi-pencil-square"></i>{" "}
                  </Button>
                </div>
              </div>
              <ul>
                <li>
                  Кол-во альбомов -
                  {content[0]?.School ? content[0].School : "Не заполнено"}
                </li>
                <li>
                  Пакет услуг -
                  {content[0]?.School ? content[0].School : "Не заполнено"}
                </li>
                <li>
                  Цена за альбом -
                  {content[0]?.School ? content[0].School : "Не заполнено"}
                </li>
                <li>
                  Альбом учителю -
                  {content[0]?.School ? content[0].School : "Не заполнено"}
                </li>
                <li>
                  Сумма заказа -
                  {content[0]?.School ? content[0].School : "Не заполнено"}
                </li>
                <li>
                  Оплачено -
                  {content[0]?.School ? content[0].School : "Не заполнено"}
                </li>
                <li>
                  Доп. Услуги -
                  {content[0]?.School ? content[0].School : "Не заполнено"}
                </li>
              </ul>
            </Card.Body>
          </Card>
        </Col>

        <Col sm={4}>
          <Card>
            <Card.Body>
              <Card.Title>Фотосъемки</Card.Title>
              <ul>
                <li>
                  Уличная -
                  {content[0]?.School ? content[0].School : "Не заполнено"}
                </li>
                <li>
                  Школьная -
                  {content[0]?.School ? content[0].School : "Не заполнено"}
                </li>
                <li>
                  Портретная -
                  {content[0]?.School ? content[0].School : "Не заполнено"}
                </li>
              </ul>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <h3 className="mt-4">Для сборки</h3>
      <Row className="mt-4">
        <Col sm={8}>
          <Card>
            <Card.Body>
              <Card.Title>Класс</Card.Title>
              Контент
            </Card.Body>
          </Card>
        </Col>

        <Col sm={4}>
          <Card>
            <Card.Body>
              <Card.Title>Учителя</Card.Title>
              Контент
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <EditMainInfoModal
        show={show && modalType === "editMainInfo"}
        onHide={() => handleClose()}
        formData={formData}
        onFormChange={(e) => formEdit(e, setFormData)}
        onSave={() => editItem(formData, API["Edit"], setContent, handleClose)}
      />

      <EditOrderModal
        show={show && modalType === "editOrder"}
        onHide={() => handleClose()}
        formData={formData}
        onFormChange={(e) => formEdit(e, setFormData)}
        onSave={() => editItem(formData, API["Edit"], setContent, handleClose)}
      />
    </>
  );
}
