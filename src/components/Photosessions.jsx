import React from "react";

import {
  API,
  formEdit,
  addItem,
  editItem,
  callDate,
  openModal,
} from "./photosessions/commonfunction";

import {
  Row,
  Col,
  Card,
  Spinner,
  Nav,
  Badge,
  Tab,
  Button,
  Modal,
  Dropdown,
  Form,
} from "react-bootstrap";
import { useState, useEffect } from "react";

import { Link } from "react-router-dom";

import NoReserved from "./photosessions/NoReserved";
import Reserved from "./photosessions/Reserved";
import Completed from "./photosessions/Completed";

import UniversalModalForm from "./forms/UniversalModalForm";

function AllPhotosessions() {
  const formDataContent = {
    Id: "",
    PhId: "",
    CallDate: "",
  };

  const [content, setContent] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState(formDataContent);
  const [show, setShow] = useState(false);
  const [modalType, setModalType] = useState();

  const [key, setKey] = useState("noReserved");

  useEffect(() => {
    // Функция для получения данных из API
    const fetchData = async () => {
      try {
        const response = await fetch(
          "http://okalbm.ru/api/photosessions/ph_list"
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
          Back to classes
        </Link>
      </div>
    );
  }

  const setFD = () => {
    setFormData(formDataContent);
  };

  const handleClose = () => {
    setShow(false);
    setFD();
  };

  const controlFormData = (type, data) => {
    setModalType(type);

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

  const callDate = [
    { name: "CallDate", label: "Дата", type: "date", required: true },
  ];
  const reservationModal = [
    { name: "Date", label: "Дата", type: "date", required: true },
    { name: "Photographer", label: "Фотограф", type: "text", required: true },
    {
      name: "ContactName",
      label: "ФИО Контакта",
      type: "text",
      required: true,
    },
    { name: "Phone", label: "Номер", type: "text" },
  ];
  const editPhotosessionModal = [
    { name: "PhType", label: "Тип съемки", type: "text", required: true },
    { name: "Location", label: "Локация", type: "text", required: true },
    { name: "Price", label: "Оплата", type: "text" },
  ];

  return (
    <>
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
        <h1 className="h2">Съемки</h1>
      </div>
      <Tab.Container
        id="left-tabs-example"
        defaultActiveKey="first"
        activeKey={key}
        onSelect={(k) => setKey(k)}
      >
        <Row>
          <Col xxl={2} xl={3} lg={3} md={4} sm={5}>
            <Nav variant="pills" className="flex-column">
              <Nav.Item>
                <Nav.Link
                  eventKey="noReserved"
                  className="d-flex justify-content-between"
                >
                  <span>Не забронировано</span>
                  <div>
                    <Badge pill bg="light" text="dark"></Badge>
                  </div>
                </Nav.Link>
              </Nav.Item>

              <Nav.Item>
                <Nav.Link
                  eventKey="Reserved"
                  className="d-flex justify-content-between"
                >
                  <span>Забронировано</span>
                  <div>
                    <Badge pill bg="light" text="dark"></Badge>
                  </div>
                </Nav.Link>
              </Nav.Item>

              <Nav.Item>
                <Nav.Link
                  eventKey="Completed"
                  className="d-flex justify-content-between"
                >
                  <span>Завершено</span>
                  <div>
                    <Badge pill bg="light" text="dark"></Badge>
                  </div>
                </Nav.Link>
              </Nav.Item>
            </Nav>
          </Col>

          <Col xxl={10} xl={9} lg={9} md={8} sm={7}>
            <Tab.Content>
              <Tab.Pane eventKey="noReserved" title="noReserved">
                <NoReserved
                  content={content}
                  controlFormData={controlFormData}
                />
              </Tab.Pane>
              <Tab.Pane eventKey="Reserved" title="Reserved">
                <Reserved content={content} controlFormData={controlFormData} />
              </Tab.Pane>
              <Tab.Pane eventKey="Completed" title="Completed">
                <Completed
                  content={content}
                  controlFormData={controlFormData}
                />
              </Tab.Pane>
            </Tab.Content>
          </Col>
        </Row>
      </Tab.Container>

      <UniversalModalForm
        show={show && modalType === "callDate"}
        onHide={() => handleClose()}
        onFormChange={(e) => formEdit(e, setFormData)}
        formData={formData}
        title="Дата связи"
        fields={callDate}
        onSubmit={() =>
          editItem(formData, API["CallDate"], setContent, handleClose)
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
          editItem(formData, API["Reservation"], setContent, handleClose)
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
          editItem(formData, API["EditMain"], setContent, handleClose)
        }
        submitButtonText="Сохранить"
      />
    </>
  );
}

export default AllPhotosessions;
