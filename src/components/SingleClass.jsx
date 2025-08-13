import React from "react";
import { useParams } from "react-router-dom";
import { useEffect, useState, useCallback } from "react";
import { Button, Spinner, Row, Col, Badge, Tab, Nav } from "react-bootstrap";

import Main from "./single_class/Main";
import Photosessions from "./single_class/Photosessions";
import ClassMain from "./single_class/ClassPeople";
import Teachers from "./single_class/Teachers";

export default function Class() {
  const { class_id } = useParams();

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
                  <span>Основное</span>
                </Nav.Link>
              </Nav.Item>

              <Nav.Item>
                <Nav.Link
                  eventKey="photosessions"
                  className="d-flex justify-content-between"
                >
                  <span>Фотосъёмки</span>
                </Nav.Link>
              </Nav.Item>

              <Nav.Item>
                <Nav.Link
                  eventKey="class"
                  className="d-flex justify-content-between"
                >
                  <span>Классы</span>
                </Nav.Link>
              </Nav.Item>

              <Nav.Item>
                <Nav.Link
                  eventKey="teachers"
                  className="d-flex justify-content-between"
                >
                  <span>Учителя</span>
                </Nav.Link>
              </Nav.Item>
            </Nav>
          </Col>

          <Col xxl={10} xl={9} lg={9} md={8} sm={7}>
            <Tab.Content>
              <Tab.Pane eventKey="main" title="main">
                <Main classId={class_id} />
              </Tab.Pane>

              <Tab.Pane eventKey="photosessions" title="photosessions">
                <Photosessions classId={class_id} />
              </Tab.Pane>

              <Tab.Pane eventKey="class" title="class">
                <ClassMain classId={class_id} />
              </Tab.Pane>

              <Tab.Pane eventKey="teachers" title="teachers">
                <Teachers classId={class_id} />
              </Tab.Pane>
            </Tab.Content>
          </Col>
        </Row>
      </Tab.Container>
    </>
  );
}
