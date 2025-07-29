import {
  Card,
  Dropdown,
  Row,
  Col,
  Button,
  Modal,
  Form,
  InputGroup,
} from "react-bootstrap";

import React from "react";
import { useState, useEffect } from "react";
import {
  openModal,
  API,
  formEdit,
  editItem,
} from "../single_class/commonfunction";

import UniversalModalForm from "../forms/UniversalModalForm";
import { editOrderForm } from "../forms/ExportForms";

export default function Details({ classId }) {
  const formDataContent = {
    Id: "",
  };

  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [content, setContent] = useState([]);
  const [modalType, setModalType] = useState();
  const [show, setShow] = useState(false);
  const [formData, setFormData] = useState(formDataContent);

  const controlFormData = (type, data) => {
    setModalType(type);

    if (type === "editOrder") {
      setFormData({
        Id: data.Id,
        det_AllStudents: data.det_AllStudents,
        det_BuyStudents: data.det_BuyStudents,
        det_TeacherAlbum: data.det_TeacherAlbum,
        det_AlbTypeId: data.det_AlbTypeId,
        det_PhCount: data.det_PhCount,
        det_AlbumPrice: data.det_AlbumPrice,
        det_AdditionalServices: data.det_AdditionalServices,
        det_AllPrice: data.det_AllPrice,
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

  useEffect(() => {
    // Функция для получения данных из API
    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://okalbm.ru/api/single_class/${API["GetOrder"]}/${classId}`
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
  }, [classId]);

  return (
    <>
      <Row>
        {content &&
          content.map((item) => (
            <Col lg={6} key={item.Id}>
              <Card className="mb-3">
                <Card.Body>
                  <div className="d-flex justify-content-between">
                    <Card.Title className="mb-2">Order</Card.Title>
                    <div>
                      <Button
                        variant="light"
                        size="sm"
                        onClick={() => {
                          controlFormData("editOrder", item);
                        }}
                      >
                        <i className="bi bi-pencil-square me-2"></i>
                      </Button>
                    </div>
                  </div>

                  <div className="mb-2 text-body-secondary row">
                    <Row>
                      <Col>
                        <small>Студенты: {item.det_AllStudents}</small>
                      </Col>
                    </Row>
                  </div>
                  <div className="mb-2 text-body-secondary row">
                    <Row>
                      <Col>
                        <small>
                          Покупатели Студенты: {item.det_BuyStudents}
                        </small>
                      </Col>
                    </Row>
                  </div>
                  <div className="mb-2 text-body-secondary row">
                    <Row>
                      <Col>
                        Альбом учителя:{" "}
                        {item.det_TeacherAlbum === "1" ? "Да" : "Нет"}
                      </Col>
                    </Row>
                  </div>
                  <div className="mb-2 text-body-secondary row">
                    <Row>
                      <Col>
                        <small>Пакет услуг: {item.det_AlbTypeId}</small>
                      </Col>
                    </Row>
                  </div>
                  <div className="mb-2 text-body-secondary row">
                    <Row>
                      <Col>
                        <small>Количество фотосессий: {item.det_PhCount}</small>
                      </Col>
                    </Row>
                  </div>
                  <div className="mb-2 text-body-secondary row">
                    <Row>
                      <Col>
                        <small>Цена за альбом: {item.det_AlbumPrice}</small>
                      </Col>
                    </Row>
                  </div>
                  <div className="mb-2 text-body-secondary row">
                    <Row>
                      <Col>
                        <small>Доп услуги: {item.det_AdditionalServices}</small>
                      </Col>
                    </Row>
                  </div>
                  <div className="mb-2 text-body-secondary row">
                    <Row>
                      <Col>
                        <small>Окончательная цена: {item.det_AllPrice}</small>
                      </Col>
                    </Row>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
      </Row>
      <UniversalModalForm
        show={show && modalType === "editOrder"}
        onHide={() => handleClose()}
        onFormChange={(e) => formEdit(e, setFormData)}
        formData={formData}
        title="Редактировать дополнительную информацию"
        fields={editOrderForm}
        onSubmit={() =>
          editItem(
            formData,
            API["EditOrder"],
            "single_class",
            setContent,
            handleClose
          )
        }
        submitButtonText="Сохранить"
      />
    </>
  );
}
