import React from "react";
import { useParams } from "react-router-dom";
import { useEffect, useState, useCallback } from "react";
import {
  Button,
  Spinner,
  Row,
  Col,
  Card,
  Badge,
  Tab,
  Nav,
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
  deleteItem,
} from "./single_class/commonfunction";

import { Link } from "react-router-dom";

import UniversalModalForm from "./forms/UniversalModalForm";
import { editPhotosessionModal } from "./forms/ExportForms";
import {
  callDate,
  reservationModal,
  addPhotosessionForm,
  editMainInfoForm,
  addLogForm,
  editLogModal,
} from "./forms/ExportForms";

import Main from "./single_class/Main";
import Details from "./single_class/Details";
import Photosessions from "./single_class/Photosessions";
import ClassMain from "./single_class/ClassMain";
import Teachers from "./single_class/Teachers";

const DeleteModal = ({ show, onHide, onConfirm }) => {
  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Удалить лог</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        Вы уверены, что хотите безвозвратно удалить запись?
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Отмена
        </Button>
        <Button variant="danger" onClick={onConfirm}>
          Подтвердить
        </Button>
      </Modal.Footer>
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
      setFormData({
        Id: data.Id,
        PhTypeId: data.PhTypeId,
        Price: data.Price,
        LocationId: data.LocationId,
      });
    } else if (type === "addLog") {
      setFormData({
        //НЕ ЗАБЫТЬ
      });
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
  const [notifications, setNotifications] = useState({});

  const updateNotifications = useCallback((data) => {
    const counts = {
      Main: 0,
      Details: 0,
      Photosessions: 0,
      Class: 0,
      Teachers: 0,
    };

    data.forEach((item) => {
      const status = String(item.StatusId); // Явное преобразование в строку
      if (status === "1") counts.Main++;
      if (status === "2") counts.Details++;
      if (status === "3") counts.Photosessions++;
      if (status === "4") counts.Class++;
      if (status === "5") counts.Teachers++;
    });

    setNotifications((prev) => {
      // 2. Обновляем только если значения изменились
      if (
        prev.Main === String(counts.Main) &&
        prev.Details === String(counts.Details) &&
        prev.Photosessions === String(counts.Photosessions) &&
        prev.Class === String(counts.Class) &&
        prev.Teachers === String(counts.Teachers)
      ) {
        return prev;
      }
      return {
        Main: String(counts.Main),
        Details: String(counts.Details),
        Photosessions: String(counts.Photosessions),
        Class: String(counts.Class),
        Teachers: String(counts.Teachers),
      };
    });
  }, []);

  const [activeTab, setActiveTab] = useState(() => {
    const savedTab = localStorage.getItem("activeTabSingleClass");
    return savedTab || "details";
  });
  useEffect(() => {
    localStorage.setItem("activeTabSingleClass", activeTab);
  }, [activeTab]);

  const handleSelect = (selectedTab) => {
    setActiveTab(selectedTab);
  };

  useEffect(() => {
    // 3. Вызываем updateNotifications только при изменении content
    if (content.length > 0) {
      updateNotifications(content);
    }
  }, [content, updateNotifications]);

  useEffect(() => {
    // Функция для получения данных из API
    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://okalbm.ru/api/single_class/${API["GetMainInfo"]}/${class_id}`
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
          `http://okalbm.ru/api/photosessions/ph_class_photosessions/${class_id}`
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
      <Row>
        <Col sm={1}>
          {" "}
          <Button variant="light">
            <a href="/classes">
              <i className="bi bi-arrow-bar-left"></i>
            </a>
          </Button>
        </Col>
        <Col>
          <div>НАЗВАНИЕ КЛАССА АВТОМАТИЧЕСКИ</div>
        </Col>
        <Col></Col>
      </Row>

      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom"></div>

      <Tab.Container
        id="left-tabs-example"
        defaultActiveKey="first"
        activeKey={activeTab}
        onSelect={handleSelect}
      >
        <Row>
          <Col xxl={2} xl={3} lg={3} md={4} sm={5}>
            <Nav variant="pills" className="flex-column">
              <Nav.Item>
                <Nav.Link
                  eventKey="main"
                  className="d-flex justify-content-between"
                >
                  <span>Основная информация</span>
                  <div>
                    <Badge pill bg="light" text="dark">
                      {notifications.main}
                    </Badge>
                  </div>
                </Nav.Link>
              </Nav.Item>

              <Nav.Item>
                <Nav.Link
                  eventKey="details"
                  className="d-flex justify-content-between"
                >
                  <span>Детали заказов</span>
                  <div>
                    <Badge pill bg="light" text="dark">
                      {notifications.details}
                    </Badge>
                  </div>
                </Nav.Link>
              </Nav.Item>

              <Nav.Item>
                <Nav.Link
                  eventKey="photosessions"
                  className="d-flex justify-content-between"
                >
                  <span>Фотосъёмки</span>
                  <div>
                    <Badge pill bg="light" text="dark">
                      {notifications.photosessions}
                    </Badge>
                  </div>
                </Nav.Link>
              </Nav.Item>

              <Nav.Item>
                <Nav.Link
                  eventKey="class"
                  className="d-flex justify-content-between"
                >
                  <span>Классы</span>
                  <div>
                    <Badge pill bg="light" text="dark">
                      {notifications.class}
                    </Badge>
                  </div>
                </Nav.Link>
              </Nav.Item>

              <Nav.Item>
                <Nav.Link
                  eventKey="teachers"
                  className="d-flex justify-content-between"
                >
                  <span>Учителя</span>
                  <div>
                    <Badge pill bg="light" text="dark">
                      {notifications.teachers}
                    </Badge>
                  </div>
                </Nav.Link>
              </Nav.Item>
            </Nav>
          </Col>

          <Col xxl={10} xl={9} lg={9} md={8} sm={7}>
            <Tab.Content>
              <Tab.Pane eventKey="main" title="main">
                <Main
                  content={content}
                  controlFormData={controlFormData}
                  classId={class_id}
                />
              </Tab.Pane>

              <Tab.Pane eventKey="details" title="details">
                <Details content={content} controlFormData={controlFormData} />
              </Tab.Pane>

              <Tab.Pane eventKey="photosessions" title="photosessions">
                <Photosessions
                  content={photosessions}
                  controlFormData={controlFormData}
                />
              </Tab.Pane>

              <Tab.Pane eventKey="class" title="class">
                <ClassMain
                  content={content}
                  controlFormData={controlFormData}
                />
              </Tab.Pane>

              <Tab.Pane eventKey="teachers" title="teachers">
                <Teachers content={content} controlFormData={controlFormData} />
              </Tab.Pane>
            </Tab.Content>
          </Col>
        </Row>
      </Tab.Container>

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
            setPhotosessions,
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
            "photosessions",
            setPhotosessions,
            handleClose
          )
        }
        submitButtonText="Сохранить"
      />
      <UniversalModalForm
        show={show && modalType === "addClassLog"}
        onHide={() => handleClose()}
        onFormChange={(e) => formEdit(e, setFormData)}
        formData={{ formData, CallDate: new Date().toISOString().slice(0, 10) }}
        title="Добавление лога"
        fields={addLogForm}
        onSubmit={() =>
          addItem(
            formData,
            API["AddLog"],
            "photosessions",
            setPhotosessions,
            handleClose
          )
        }
        submitButtonText="Добавить"
      />

      <UniversalModalForm
        show={show && modalType === "editClassLog"}
        onHide={() => handleClose()}
        formData={formData}
        onFormChange={(e) => formEdit(e, setFormData)}
        title="Редактировать лог"
        fields={editLogModal}
        onSubmit={() =>
          editItem(
            formData,
            API["EditLog"],
            "photosessions",
            setPhotosessions,
            handleClose
          )
        }
        submitButtonText="Сохранить"
      />
      <DeleteModal
        show={show && modalType === "delete"}
        onHide={() => handleClose()}
        onConfirm={() =>
          deleteItem(formData, API["Delete"], setContent, handleClose)
        }
      />
    </>
  );
}
