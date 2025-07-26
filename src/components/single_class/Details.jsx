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

const EditOrderModal = ({ show, onHide, formData, onFormChange, onSave }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    onSave();
  };

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Редактировать заказ</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <input type="hidden" name="Id" value={formData.Id} />
          <Row>
            <Col sm={12}>
              <Form.Group className="mb-3" controlId="ClientName">
                <Form.Label>Клиент</Form.Label>
                <InputGroup>
                  <InputGroup.Text id="inputClientNamePrepend">
                    <i className="bi bi-camera"></i>
                  </InputGroup.Text>
                  <Form.Control
                    type="text"
                    name="ClientName"
                    placeholder="Название"
                    onChange={onFormChange}
                    value={formData.ClientName}
                    aria-describedby="inputClientNamePrepend"
                    required
                  />
                </InputGroup>
              </Form.Group>
            </Col>
          </Row>
          <Modal.Footer>
            <Button variant="secondary" onClick={onHide}>
              Отмена
            </Button>
            <Button variant="warning" type="submit">
              Добавить
            </Button>
          </Modal.Footer>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default function Details({ classId }) {
  const formDataContent = {
    Id: "",
  };

  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [content, setContent] = useState([
    {
      Id: 1,
      det_AllStudents: "25 студентов",
      det_BuyStudents: "18 покупают",
      det_TeacherAlbum: "Да",
      det_AlbTypedId: "Премиум пакет",
      det_PhCount: "2 фотосессии",
      det_AlbumPrice: "1500 руб.",
      det_AdditionalServices: "Ретушь, дизайн",
      det_AllPrice: "32000 руб.",
    },
  ]);
  const [modalType, setModalType] = useState();
  const [show, setShow] = useState(false);
  const [formData, setFormData] = useState(formDataContent);

  const controlFormData = (type, data) => {
    setModalType(type);

    if (type === "editOrder") {
      setFormData({
        Id: data,
        det_AllStudents: data.det_AllStudents,
        det_BuyStudents: data.det_BuyStudents,
        det_TeacherAlbum: data.det_TeacherAlbum,
        det_AlbTypedId: data.det_AlbTypedId,
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

  // useEffect(() => {
  //   // Функция для получения данных из API
  //   const fetchData = async () => {
  //     try {
  //       const response = await fetch(
  //         `http://okalbm.ru/api/single_class/${API["GetMainInfo"]}/${classId}`
  //       );
  //       if (!response.ok) {
  //         throw new Error("Network response was not ok");
  //       }
  //       const data = await response.json();
  //       setContent(data);
  //     } catch (error) {
  //       console.error("Error fetching data:", error);
  //       setError(error.message);
  //     } finally {
  //       setIsLoading(false);
  //     }
  //   };

  //   fetchData(); // Вызываем функцию для получения данных
  // }, [classId]);

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
                        <small>{item.det_AllStudents}</small>
                      </Col>
                    </Row>
                  </div>
                  <div className="mb-2 text-body-secondary row">
                    <Row>
                      <Col>
                        <small>{item.det_BuyStudents}</small>
                      </Col>
                    </Row>
                  </div>
                  <div className="mb-2 text-body-secondary row">
                    <Row>
                      <Col>
                        <small>{item.det_TeacherAlbum}</small>
                      </Col>
                    </Row>
                  </div>
                  <div className="mb-2 text-body-secondary row">
                    <Row>
                      <Col>
                        <small>{item.det_AlbTypedId}</small>
                      </Col>
                    </Row>
                  </div>
                  <div className="mb-2 text-body-secondary row">
                    <Row>
                      <Col>
                        <small>{item.det_PhCount}</small>
                      </Col>
                    </Row>
                  </div>
                  <div className="mb-2 text-body-secondary row">
                    <Row>
                      <Col>
                        <small>{item.det_AlbumPrice}</small>
                      </Col>
                    </Row>
                  </div>
                  <div className="mb-2 text-body-secondary row">
                    <Row>
                      <Col>
                        <small>{item.det_AdditionalServices}</small>
                      </Col>
                    </Row>
                  </div>
                  <div className="mb-2 text-body-secondary row">
                    <Row>
                      <Col>
                        <small>{item.det_AllPrice}</small>
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
