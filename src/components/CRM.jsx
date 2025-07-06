import React from "react";
import { Row, Col, Tab, Nav, Badge, Spinner } from "react-bootstrap";
import { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import Request from "./crm/Request";
import Good from "./crm/Good";
import Bad from "./crm/Bad";
import Documents from "./crm/Documents";

import { openModal } from "./crm/commonfunction";

const CRM = () => {
  const [content, setContent] = useState([]);
  const [key, setKey] = useState("request");
  const [notifications, setNotifications] = useState({});

  const formDataContent = {
    Id: "",
    ClientName: "",
    Phone: "",
    CityId: "",
  };

  const [modalType, setModalType] = useState();
  const [show, setShow] = useState(false);
  const [formData, setFormData] = useState(formDataContent);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const setFD = () => {
    setFormData(formDataContent);
  };

  const handleClose = () => {
    setShow(false);
    setFD();
  };

  const controlFormData = (type, data) => {
    setModalType(type);

    if (type === "add") {
      setFD();
    } else if (type === "edit") {
      setFormData({
        Id: data.Id,
        ClientName: data.ClientName,
        CityId: data.CityId,
        Phone: data.Phone,
      });
    } else if (type === "delete") {
      setFormData({ Id: data });
    } else if (type === "comment") {
      setFormData({ Id: data.CrmId, ManagerNotes: data.ManagerNotes });
    } else if (type === "status") {
      setFormData({ Id: data.CrmId, StatusId: data.StatusId });
    } else if (type === "date") {
      setFormData({ Id: data.CrmId, NextDate: data.NextDate });
    } else if (type === "to_work") {
      setFormData({ Id: data });
    }

    openModal(type, setShow);
  };

  const updateNotifications = useCallback((data) => {
    const counts = {
      Request: 0,
      Bad: 0,
      Good: 0,
      Documents: 0,
    };

    data.forEach((item) => {
      const status = String(item.StatusId); // Явное преобразование в строку
      if (status === "1") counts.Request++;
      if (status === "2") counts.Bad++;
      if (status === "3") counts.Good++;
      if (status === "4") counts.Documents++;
    });

    setNotifications((prev) => {
      // 2. Обновляем только если значения изменились
      if (
        prev.Request === String(counts.Request) &&
        prev.Bad === String(counts.Bad) &&
        prev.Good === String(counts.Good) &&
        prev.Documents === String(counts.Documents)
      ) {
        return prev;
      }
      return {
        Request: String(counts.Request),
        Bad: String(counts.Bad),
        Good: String(counts.Good),
        Documents: String(counts.Documents),
      };
    });
  }, []);

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
        const response = await fetch("http://okalbm.ru/api/api/crm_class_list");
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
  return (
    <>
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
        <h1 className="h2">CRM</h1>
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
                  eventKey="request"
                  className="d-flex justify-content-between"
                >
                  <span>Заявка</span>
                  <div>
                    <Badge pill bg="light" text="dark">
                      {notifications.Request}
                    </Badge>
                  </div>
                </Nav.Link>
              </Nav.Item>

              <Nav.Item>
                <Nav.Link
                  eventKey="bad"
                  className="d-flex justify-content-between"
                >
                  <span>Отрицательно</span>
                  <div>
                    <Badge pill bg="light" text="dark">
                      {notifications.Bad}
                    </Badge>
                  </div>
                </Nav.Link>
              </Nav.Item>

              <Nav.Item>
                <Nav.Link
                  eventKey="good"
                  className="d-flex justify-content-between"
                >
                  <span>Положительно</span>
                  <div>
                    <Badge pill bg="light" text="dark">
                      {notifications.Good}
                    </Badge>
                  </div>
                </Nav.Link>
              </Nav.Item>

              <Nav.Item>
                <Nav.Link
                  eventKey="documents"
                  className="d-flex justify-content-between"
                >
                  <span>Документы</span>
                  <div>
                    <Badge pill bg="light" text="dark">
                      {notifications.Documents}
                    </Badge>
                  </div>
                </Nav.Link>
              </Nav.Item>
            </Nav>
          </Col>

          <Col xxl={10} xl={9} lg={9} md={8} sm={7}>
            <Tab.Content>
              <Tab.Pane eventKey="request" title="request">
                <Request
                  content={content}
                  setContent={setContent}
                  modalType={modalType}
                  show={show}
                  setFormData={setFormData}
                  handleClose={handleClose}
                  controlFormData={controlFormData}
                  formData={formData}
                />
              </Tab.Pane>

              <Tab.Pane eventKey="documents" title="documents">
                <Documents
                  content={content}
                  setContent={setContent}
                  modalType={modalType}
                  show={show}
                  setFormData={setFormData}
                  handleClose={handleClose}
                  controlFormData={controlFormData}
                  formData={formData}
                />
              </Tab.Pane>

              <Tab.Pane eventKey="good" title="good">
                <Good
                  content={content}
                  setContent={setContent}
                  modalType={modalType}
                  show={show}
                  setFormData={setFormData}
                  handleClose={handleClose}
                  controlFormData={controlFormData}
                  formData={formData}
                />
              </Tab.Pane>

              <Tab.Pane eventKey="bad" title="bad">
                <Bad
                  content={content}
                  setContent={setContent}
                  modalType={modalType}
                  show={show}
                  setFormData={setFormData}
                  handleClose={handleClose}
                  controlFormData={controlFormData}
                  formData={formData}
                />
              </Tab.Pane>
            </Tab.Content>
          </Col>
        </Row>
      </Tab.Container>
    </>
  );
};

export default CRM;
