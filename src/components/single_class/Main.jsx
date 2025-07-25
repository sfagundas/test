import { Card, Dropdown, Row, Col, Button } from "react-bootstrap";

import React from "react";
import { useState, useEffect } from "react";
import { API } from "./commonfunction";
export default function Main({ content, controlFormData, classId }) {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [logs, setLogs] = useState([]);
  console.log(content);

  useEffect(() => {
    // Функция для получения данных из API
    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://okalbm.ru/api/single_class/${API["GetLog"]}/${classId}`
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setLogs(data);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData(); // Вызываем функцию для получения данных
  }, []);
  return (
    <>
      <Row>
        {content &&
          content.map((item) => (
            <Col lg={6} key={item.Id}>
              <Card className="mb-3">
                <Card.Body>
                  <div className="d-flex justify-content-between">
                    <Card.Title className="mb-2">Main</Card.Title>
                    <div>
                      <Dropdown>
                        <Dropdown.Toggle
                          variant="light"
                          className="btn-sm pt-0 pb-0"
                          id="dropdown-basic"
                        ></Dropdown.Toggle>

                        <Dropdown.Menu>
                          <Dropdown.Item
                            onClick={() =>
                              controlFormData("editMainInfo", item)
                            }
                          >
                            <i className="bi bi-pencil-square me-2"></i>
                            Изменить
                          </Dropdown.Item>
                        </Dropdown.Menu>
                      </Dropdown>
                    </div>
                  </div>

                  {/* Основная информация */}
                  <div className="mb-2 text-body-secondary row">
                    <Row>
                      <Col>
                        <small>{item.School}</small>
                      </Col>
                    </Row>
                  </div>
                  <div className="mb-2 text-body-secondary row">
                    <Row>
                      <Col>
                        <small>{item.FullSchoolName}</small>
                      </Col>
                    </Row>
                  </div>
                  <div className="mb-2 text-body-secondary row">
                    <Row>
                      <Col>
                        <small>{item.ParentName}</small>
                      </Col>
                    </Row>
                  </div>
                  <div className="mb-2 text-body-secondary row">
                    <Row>
                      <Col>
                        <small>{item.ParentPhone}</small>
                      </Col>
                    </Row>
                  </div>
                  <div className="mb-2 text-body-secondary row">
                    <Row>
                      <Col>
                        <small>{item.TeacherName}</small>
                      </Col>
                    </Row>
                  </div>
                  <div className="mb-2 text-body-secondary row">
                    <Row>
                      <Col>
                        <small>{item.TeacherPhone}</small>
                      </Col>
                    </Row>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        <Col>
          <Card>
            <Card.Header className="d-flex justify-content-between align-items-center">
              <span>Логи</span>

              <Button
                variant="light"
                size="sm"
                onClick={() => {
                  const currentDate = new Date().toISOString().slice(0, 10);
                  controlFormData("addClassLog", { CallDate: currentDate });
                  console.log(currentDate);
                }}
              >
                <i className="bi bi-plus-lg"></i>
              </Button>
            </Card.Header>
            <Card.Body>
              {logs.map((log) => (
                <div key={log.Id} className="mb-3 p-2 border-bottom">
                  <div className="d-flex justify-content-between align-items-start">
                    <div>
                      <strong>{log.DateTime}</strong>
                      <div>{log.Text}</div>
                    </div>
                    <div>
                      <Button
                        variant="outline-secondary"
                        size="sm"
                        className="me-2"
                        onClick={() => controlFormData("editClassLog", log.Id)}
                      >
                        <i className="bi bi-pencil"></i>
                      </Button>
                      <Button
                        variant="outline-danger"
                        size="sm"
                        onClick={() => controlFormData("delete", log.Id)}
                      >
                        <i className="bi bi-trash"></i>
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  );
}
