import React from "react";

import {
  API,
  formEdit,
  editItem,
  openModal,
} from "./photosessions/commonfunction";

import { Row, Col, Spinner, Nav, Badge, Tab } from "react-bootstrap";
import { useState, useEffect, useCallback } from "react";

import { Link } from "react-router-dom";

import NoReserved from "./photosessions/NoReserved";
import Reserved from "./photosessions/Reserved";
import Completed from "./photosessions/Completed";

import UniversalModalForm from "./forms/UniversalModalForm";
import { editPhotosessionModal } from "./forms/ExportForms";
import { callDate } from "./forms/ExportForms";
import { reservationModal } from "./forms/ExportForms";

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

  const [notifications, setNotifications] = useState({});
  const updateNotifications = useCallback((data) => {
    const counts = {
      NoReserved: 0,
      Reserved: 0,
      Completed: 0,
    };

    data.forEach((item) => {
      const status = String(item.StatusId); // Явное преобразование в строку
      if (status === "1") counts.NoReserved++;
      if (status === "2") counts.Reserved++;
      if (status === "3") counts.Completed++;
    });

    setNotifications((prev) => {
      // 2. Обновляем только если значения изменились
      if (
        prev.NoReserved === String(counts.NoReserved) &&
        prev.Reserved === String(counts.Reserved) &&
        prev.Completed === String(counts.Completed)
      ) {
        return prev;
      }
      return {
        NoReserved: String(counts.NoReserved),
        Reserved: String(counts.Reserved),
        Completed: String(counts.Completed),
      };
    });
  }, []);

  const [activeTab, setActiveTab] = useState(() => {
    const savedTab = localStorage.getItem("activeTabPhotosessions");
    return savedTab || "noReserved"; // 'home' - это ID вашего первого таба
  });

  const handleSelect = (selectedTab) => {
    setActiveTab(selectedTab);
  };

  // useEffect для сохранения активного таба в localStorage при его изменении
  useEffect(() => {
    localStorage.setItem("activeTabPhotosessions", activeTab);
  }, [activeTab]); // Этот эффект запускается только когда activeTab меняется

  useEffect(() => {
    if (content.length > 0) {
      updateNotifications(content);
    }
  }, [content, updateNotifications]);
  useEffect(() => {
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
      setFormData({
        Id: data.Id,
        PhTypeId: data.PhTypeId,
        LocationId: data.LocationId,
        Price: data.Price,
      });
    }

    openModal(type, setShow);
  };

  return (
    <>
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
        <h1 className="h2">Съемки</h1>
      </div>
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
                  eventKey="noReserved"
                  className="d-flex justify-content-between"
                >
                  <span>Не забронировано</span>
                  <div>
                    <Badge pill bg="light" text="dark">
                      {notifications.NoReserved}
                    </Badge>
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
                    <Badge pill bg="light" text="dark">
                      {notifications.Reserved}
                    </Badge>
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
                    <Badge pill bg="light" text="dark">
                      {notifications.Completed}
                    </Badge>
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
