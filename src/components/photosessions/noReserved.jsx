import { useState } from "react";
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
  callDate,
  openModal,
} from "./commonfunction";
import OkBadgeDate from "../custom/OkBadgeDate";

import EditPhotosessionModal from "./modal/EditPhotosessionModal";
import ReservationModal from "./modal/ReservationModal";
import CallDateModal from "./modal/CallDateModal";

export default function NoReserved({
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
        {content
          .filter((item) => item.StatusId == 1 || !item.StatusId)
          .map((item, index) => (
            <Col sm={12} md={12} lg={10} xl={8} xxl={8}>
              <Card
                className="mb-3 text-body-secondary"
                style={{ fontSize: "13px" }}
              >
                <Card.Body style={{ paddingBottom: "16px" }}>
                  <Row>
                    <Col xl={1} xxl={1} sm={1} md={1}>
                      <Badge bg="light" text="dark">
                        {index + 1}
                      </Badge>
                    </Col>

                    <Col xl={2} xxl={2} md={2} sm={5}>
                      {/* <OkBadgeDate date={item.CallDate} /> */}
                    </Col>
                    <Col xl={3} xxl={3} md={4} sm={5}>
                      {item.ClientName}
                    </Col>
                    <Col xl={4} xxl={4} sm={8} md={3}>
                      <small>{item.Location}</small>
                    </Col>
                    <Col xl={2} xxl={2} sm={4} md={2}>
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
                              <Dropdown.Item
                                onClick={() =>
                                  controlFormData("callDate", item)
                                }
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
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            </Col>
          ))}
      </Row>
      <CallDateModal
        show={show && modalType === "callDate"}
        onHide={() => handleClose()}
        formData={formData}
        onFormChange={(e) => formEdit(e, setFormData)}
        onSave={() =>
          editItem(formData, API["CallDate"], setContent, handleClose)
        }
      />
      <ReservationModal
        show={show && modalType === "reservationModal"}
        onHide={() => handleClose()}
        formData={formData}
        onFormChange={(e) => formEdit(e, setFormData)}
        onSave={() =>
          editItem(formData, API["Reservation"], setContent, handleClose)
        }
      />
      <EditPhotosessionModal
        show={show && modalType === "editPhotosessionModal"}
        onHide={() => handleClose()}
        formData={formData}
        onFormChange={(e) => formEdit(e, setFormData)}
        onSave={() =>
          editItem(formData, API["EditPhotosession"], setContent, handleClose)
        }
      />
    </>
  );
}
