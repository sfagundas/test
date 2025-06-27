import React from "react";
import { Row, Col, Tab, Nav, Badge } from "react-bootstrap";
import { useState, useEffect } from "react";
import Request from "./crm/Request";
import Good from "./crm/Good";
import Bad from "./crm/Bad";
import Documents from "./crm/Documents";

const CRM = () => {
  const [content, setContent] = useState([]);
  const [key, setKey] = useState("request");
  const [notifications, setNotifications] = useState({
    Request: "1",
    Documents: "2",
    Good: "3",
    Bad: "4",
  });

  useEffect(() => {
    // Функция для получения данных из API
    const fetchData = async () => {
      try {
        const response = await fetch("http://okalbm.ru/api/api/crm_class_list");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setContent(data); // Обновляем состояние content данными из API
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData(); // Вызываем функцию для получения данных
  }, []);

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
            </Nav>
          </Col>

          <Col xxl={10} xl={9} lg={9} md={8} sm={7}>
            <Tab.Content>
              <Tab.Pane eventKey="request" title="request">
                <Request content={content} setContent={setContent} />
              </Tab.Pane>

              <Tab.Pane eventKey="documents" title="documents">
                <Documents content={content} setContent={setContent} />
              </Tab.Pane>

              <Tab.Pane eventKey="good" title="good">
                <Good content={content} setContent={setContent} />
              </Tab.Pane>

              <Tab.Pane eventKey="bad" title="bad">
                <Bad content={content} setContent={setContent} />
              </Tab.Pane>
            </Tab.Content>
          </Col>
        </Row>
      </Tab.Container>
    </>
  );
};

export default CRM;
