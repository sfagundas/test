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
  Dropdown,
} from "react-bootstrap";

import {
  openModal,
  API,
  formEdit,
  addItem,
  editItem,
} from "./single_class/commonfunction";

import { Link } from "react-router-dom";

import UniversalModalForm from "./forms/UniversalModalForm";
import { editPhotosessionModal } from "./forms/ExportForms";
import { callDate } from "./forms/ExportForms";
import { reservationModal } from "./forms/ExportForms";
import { addPhotosessionForm } from "./forms/ExportForms";
import { editMainInfoForm } from "./forms/ExportForms";

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
    if (type === "addPhotosession") {
      setFormData({ ClassId: data.Id, StatusId: "1" });
    }
    if (type === "callDate") {
      setFormData({
        Id: data.Id,
        CallDate: data.CallDate,
      });
    } else if (type === "reservationModal") {
    } else if (type === "editPhotosessionModal") {
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
  const [photosessions, setPhotosessions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Функция для получения данных из API
    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://okalbm.ru/api/single_class/get_main_info/${class_id}`
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

  useEffect(() => {
    // Функция для получения данных из API
    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://okalbm.ru/api/single_class/get_photosessions/${class_id}`
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setPhotosessions(data);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData(); // Вызываем функцию для получения данных
  }, []);

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
                    <span style={{ fontSize: "14px" }}>
                      Детали заказа (ДОДУМАТЬ)
                    </span>
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
              <div className="d-flex justify-content-between">
                <Card.Title className="mb-2">
                  <div className="d-flex align-items-center">
                    <span style={{ fontSize: "14px" }}>Фотосъемки</span>
                  </div>
                </Card.Title>
                <div>
                  <Button
                    variant="light"
                    size="sm"
                    onClick={() =>
                      controlFormData("addPhotosession", content[0])
                    }
                  >
                    {" "}
                    <i className="bi bi-plus-lg"></i>{" "}
                  </Button>
                </div>
              </div>
              <ul>
                {photosessions &&
                  photosessions.map((item) => (
                    <div className="d-flex justify-content-between">
                      <li className="mb-2">
                        <div className="d-flex align-items-center">
                          <span style={{ fontSize: "14px" }}>
                            {item.PhTypeId}
                          </span>
                        </div>
                      </li>
                      <div>
                        <Dropdown>
                          <Dropdown.Toggle
                            variant="light"
                            className="btn-sm pt-0 pb-0"
                            id="dropdown-basic"
                          ></Dropdown.Toggle>
                          <Dropdown.Menu>
                            <Dropdown.Item
                              onClick={() => controlFormData("callDate", item)}
                            >
                              <i className="bi bi-calendar-event me-2"></i>
                              Дата связи
                            </Dropdown.Item>
                            <Dropdown.Item
                              onClick={() =>
                                controlFormData("reservationModal", item)
                              }
                            >
                              <i className="bi bi-calendar-check me-2"></i>
                              Забронировать
                            </Dropdown.Item>

                            <Dropdown.Item
                              onClick={() =>
                                controlFormData("editPhotosessionModal", item)
                              }
                            >
                              <i className="bi bi-pencil-square me-2"></i>
                              Редактировать
                            </Dropdown.Item>
                          </Dropdown.Menu>
                        </Dropdown>
                      </div>
                    </div>
                  ))}
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

      <UniversalModalForm
        show={show && modalType === "editMainInfo"}
        onHide={() => handleClose()}
        onFormChange={(e) => formEdit(e, setFormData)}
        formData={formData}
        title="Редактировать основную информацию"
        fields={editMainInfoForm}
        onSubmit={() =>
          editItem(
            formData,
            API["EditMain"],
            "single_class",
            setContent,
            handleClose
          )
        }
        submitButtonText="Сохранить"
      />

      <EditOrderModal
        show={show && modalType === "editOrder"}
        onHide={() => handleClose()}
        formData={formData}
        onFormChange={(e) => formEdit(e, setFormData)}
        onSave={() =>
          editItem(
            formData,
            API["Edit"],
            "single_class",
            setContent,
            handleClose
          )
        }
      />
      {/* <UniversalModalForm
        show={show && modalType === "editOrder"}
        onHide={() => handleClose()}
        onFormChange={(e) => formEdit(e, setFormData)}
        formData={formData}
        title="Редактировать основную информацию"
        fields={editMainInfoForm}
        onSubmit={() =>
          editItem(formData, API["Edit"], setContent, handleClose)
        }
        submitButtonText="Сохранить"
      /> */}

      <UniversalModalForm
        show={show && modalType === "addPhotosession"}
        onHide={() => handleClose()}
        onFormChange={(e) => formEdit(e, setFormData)}
        formData={formData}
        title="Добавление съемки"
        fields={addPhotosessionForm}
        onSubmit={() =>
          addItem(
            formData,
            API["AddPhotosession"],
            "photosessions",
            setPhotosessions,
            handleClose
          )
        }
        submitButtonText="Добавить"
      />
      <UniversalModalForm
        show={show && modalType === "callDate"}
        onHide={() => handleClose()}
        onFormChange={(e) => formEdit(e, setFormData)}
        formData={formData}
        title="Дата связи"
        fields={callDate}
        onSubmit={() =>
          editItem(
            formData,
            API["CallDate"],
            "photosessions",
            setContent,
            handleClose
          )
        }
        submitButtonText="Сохранить"
      />
      <UniversalModalForm
        show={show && modalType === "reservationModal"}
        onHide={() => handleClose()}
        onFormChange={(e) => formEdit(e, setFormData)}
        formData={formData}
        title="Забронировать"
        fields={reservationModal}
        onSubmit={() =>
          editItem(
            formData,
            API["Reservation"],
            "photosessions",
            setContent,
            handleClose
          )
        }
        submitButtonText="Сохранить"
      />
      <UniversalModalForm
        show={show && modalType === "editPhotosessionModal"}
        onHide={() => handleClose()}
        formData={formData}
        onFormChange={(e) => formEdit(e, setFormData)}
        title="Редактировать съемку"
        fields={editPhotosessionModal}
        onSubmit={() =>
          editItem(
            formData,
            API["EditMain"],
            "photosession",
            setContent,
            handleClose
          )
        }
        submitButtonText="Сохранить"
      />
    </>
  );
}
