import React, { useState } from "react";
import {
  Card,
  Row,
  Col,
  Button,
  Modal,
  Dropdown,
  Form,
  Badge,
} from "react-bootstrap";
import {
  API,
  formEdit,
  addItem,
  editItem,
  toWork,
  openModal,
} from "./commonfunction";
import { Link } from "react-router-dom";
import OkBadgeDate from "../custom/OkBadgeDate";

export default function noReserved({
  content,
  setContent,
  modalType,
  show,
  setFormData,
  handleClose,
  controlFormData,
  formData,
}) {
  return (
    <>
      <Row>
        <Col sm={6}>
          <Card
            className="mb-3 text-body-secondary"
            style={{ fontSize: "13px" }}
          >
            <Card.Body style={{ paddingBottom: "10px" }}>
              <Row>
                <Col sm={1}>
                  <Badge bg="light" text="dark"></Badge>
                </Col>

                <Col sm={3}>
                  <small>33 шк 11В</small>
                </Col>
                <Col sm={6}>
                  <small>Халактырский пляж</small>
                </Col>
                <Col sm={2}>
                  <div className="d-flex justify-content-between">
                    <div>
                      <span></span>
                    </div>
                    <div>
                      <Dropdown>
                        <Dropdown.Toggle
                          variant="light"
                          className="btn-sm pt-0 pb-0"
                          id="dropdown-basic"
                        ></Dropdown.Toggle>
                        <Dropdown.Menu>
                          <Dropdown.Item onClick={123}>
                            <i className="bi bi-calendar-event me-2"></i>
                            Дата связи
                          </Dropdown.Item>
                          <Dropdown.Item onClick={123}>
                            <i className="bi bi-calendar-event me-2"></i>
                            Забронировать
                          </Dropdown.Item>

                          <Dropdown.Item onClick={123}>
                            <i className="bi bi-calendar-event me-2"></i>
                            Редактировать
                          </Dropdown.Item>
                        </Dropdown.Menu>
                      </Dropdown>
                    </div>
                  </div>
                </Col>
              </Row>
              <Row>
                <OkBadgeDate date={"2025-05-20"} />
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      {content
        .filter((item) => item.StatusId == 1 || !item.StatusId)
        .map((item) => (
          <Col sm={6}>
            <Card
              className="mb-3 text-body-secondary"
              style={{ fontSize: "13px" }}
            >
              <Card.Body style={{ paddingBottom: "10px" }}>
                <Row>
                  <Col sm={1}>
                    <Badge bg="light" text="dark">
                      1
                    </Badge>
                  </Col>

                  <Col sm={3}>
                    <small>33 шк 11В</small>
                  </Col>
                  <Col sm={6}>
                    <small>Халактырский пляж</small>
                  </Col>
                  <Col sm={2}>
                    <div className="d-flex justify-content-between">
                      <div>
                        <span>
                          {item.PhTypeId == 1 ? (
                            <i className="bi bi-images"></i>
                          ) : item.PhTypeId == 14 ? (
                            <i className="bi bi-camera"></i>
                          ) : item.PhTypeId == 15 ? (
                            <i className="bi bi-collection"></i>
                          ) : null}
                        </span>
                      </div>
                      <div>
                        <Dropdown>
                          <Dropdown.Toggle
                            variant="light"
                            className="btn-sm pt-0 pb-0"
                            id="dropdown-basic"
                          ></Dropdown.Toggle>
                          <Dropdown.Menu>
                            <Dropdown.Item onClick={123}>
                              <i className="bi bi-calendar-event me-2"></i>
                              Дата связи
                            </Dropdown.Item>
                            <Dropdown.Item onClick={123}>
                              <i className="bi bi-calendar-event me-2"></i>
                              Забронировать
                            </Dropdown.Item>

                            <Dropdown.Item onClick={123}>
                              <i className="bi bi-calendar-event me-2"></i>
                              Редактировать
                            </Dropdown.Item>
                          </Dropdown.Menu>
                        </Dropdown>
                      </div>
                    </div>
                  </Col>
                </Row>
                <Row>
                  <OkBadgeDate date={"2025-05-20"} />
                </Row>
              </Card.Body>
            </Card>
          </Col>
        ))}
    </>
  );
}
