import { Card, Dropdown, Row, Col, Badge } from "react-bootstrap";

import React from "react";
import { useState, useEffect } from "react";
import {
  openModal,
  API,
  formEdit,
  addItem,
  editItem,
  deleteItem,
} from "../single_class/commonfunction";

import UniversalModalForm from "../forms/UniversalModalForm";

import OkBadgeDate from "../custom/OkBadgeDate";

import {
  callDate,
  reservationModal,
  editPhotosessionModal,
} from "../forms/ExportForms";

export default function Photosessions({ classId }) {
  const formDataContent = {
    Id: "",
  };

  const [modalType, setModalType] = useState();
  const [show, setShow] = useState(false);
  const [formData, setFormData] = useState(formDataContent);

  const controlFormData = (type, data) => {
    setModalType(type);
    if (type === "callDate") {
      setFormData({
        Id: data.Id,
        CallDate: data.CallDate,
      });
    } else if (type === "reservationModal") {
      setFormData({
        Id: data.Id,
        Date: data.Date,
        Photographer: data.Photographer,
        ContactName: data.ContactName,
        Phone: data.Phone,
      });
    } else if (type === "editPhotosessionModal") {
      setFormData({
        Id: data.Id,
        PhTypeId: data.PhTypeId,
        Price: data.Price,
        LocationId: data.LocationId,
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

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [content, setContent] = useState([]);
  useEffect(() => {
    // Функция для получения данных из API
    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://okalbm.ru/api/photosessions/ph_class_photosessions/${classId}`
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
  return (
    <>
      <Row>
        {content.map((item, index) => (
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

                  <Col xl={3} xxl={3} md={3} sm={6}>
                    <OkBadgeDate date={item.CallDate} />
                  </Col>

                  <Col xl={5} xxl={5} sm={9} md={4}>
                    <small>{item.Location}</small>
                  </Col>
                  <Col xl={3} xxl={3} sm={5} md={3}>
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
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
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
            "photosessions",
            setContent,
            handleClose
          )
        }
        submitButtonText="Сохранить"
      />
    </>
  );
}
