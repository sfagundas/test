import {
  Card,
  Dropdown,
  Row,
  Col,
  Button,
  Modal,
  Spinner,
} from "react-bootstrap";

import React from "react";
import { useState, useEffect } from "react";
import {
  openModal,
  API,
  formEdit,
  addItem,
  editItem,
  deleteItem,
} from "./commonfunction";

import UniversalModalForm from "../forms/UniversalModalForm";
import MultiAddModal from "../forms/MultiAddModal";
import {
  addClassTeacherForm,
  editClassTeacherForm,
} from "../forms/ExportForms";

const DeleteModal = ({ show, onHide, onConfirm }) => {
  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Удалить запись</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        Вы уверены, что хотите безвозвратно удалить запись?
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Отмена
        </Button>
        <Button variant="danger" onClick={onConfirm}>
          Подтвердить
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default function Teachers({ classId }) {
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
    if (type === "addClassTeacher" || type === "multiAddClassTeacher") {
      setFormData({
        ClassId: classId,
        Name: data.Name,
        LastName: data.LastName,
      });
    } else if (type === "editClassTeacher") {
      console.log(data);
      setFormData({
        Id: data.Id || "",
        Name: data.Name || "",
        LastName: data.LastName || "",
        Subject: data.Subject || "",
        Portrait: data.Portrait || "",
      });
    } else if (type === "delete") {
      setFormData({ Id: data });
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
          `http://okalbm.ru/api/single_class/${API["GetClassTeachers"]}/${classId}`
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
  return (
    <>
      <Row>
        <Col lg={4}>
          <Card>
            <Card.Header className="d-flex justify-content-between align-items-center">
              <span>Учителя</span>
              <div gap-0>
                <Button
                  variant="light"
                  size="sm"
                  onClick={() => {
                    controlFormData("addClassTeacher", classId);
                  }}
                >
                  <i className="bi bi-plus-lg"></i>
                </Button>
                <Button
                  variant="light"
                  size="sm"
                  onClick={() => {
                    controlFormData("multiAddClassTeacher", classId);
                  }}
                >
                  <i className="bi bi-plus-square-dotted"></i>
                </Button>
              </div>
            </Card.Header>
            <Card.Body>
              {content.map((item) => (
                <div key={item.Id} className="mb-3 p-2 border-bottom">
                  <div className="d-flex justify-content-between align-items-start">
                    <div
                      className="flex-grow-1 me-3"
                      style={{ wordBreak: "break-word" }}
                    >
                      <div style={{ margin: 0, padding: 0, lineHeight: 1 }}>
                        {item.Name} {item.LastName}
                      </div>
                    </div>
                    <div className="flex-shrink-0">
                      <Button
                        variant="outline-secondary"
                        size="sm"
                        className="me-2"
                        onClick={() =>
                          controlFormData("editClassTeacher", item)
                        }
                      >
                        <i className="bi bi-pencil"></i>
                      </Button>
                      <Button
                        variant="outline-danger"
                        size="sm"
                        onClick={() => controlFormData("delete", item.Id)}
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
      <UniversalModalForm
        show={show && modalType === "addClassTeacher"}
        onHide={() => handleClose()}
        onFormChange={(e) => formEdit(e, setFormData)}
        formData={formData}
        title="Добавление ученика"
        fields={addClassTeacherForm}
        onSubmit={() =>
          addItem(
            formData,
            API["AddClassTeacher"],
            "single_class",
            setContent,
            handleClose
          )
        }
        submitButtonText="Добавить учителя"
      />

      <UniversalModalForm
        show={show && modalType === "editClassTeacher"}
        onHide={() => handleClose()}
        formData={formData}
        onFormChange={(e) => formEdit(e, setFormData)}
        title="Редактировать запись"
        fields={editClassTeacherForm}
        onSubmit={() =>
          editItem(
            formData,
            API["EditClassTeacher"],
            "single_class",
            setContent,
            handleClose
          )
        }
        submitButtonText="Сохранить"
      />

      <MultiAddModal
        show={show && modalType === "multiAddClassTeacher"}
        onHide={handleClose}
        onSubmit={(Data) => {
          Data.forEach((item) => {
            addItem(
              item,
              API["AddClassTeacher"],
              "single_class",
              setContent,
              () => {}
            );
          });
          handleClose();
        }}
        initialData={{ ClassId: classId }}
        fields={addClassTeacherForm}
        title="Добавление учителей"
        validationError="Используйте формат 'Фамилия Имя'"
      />

      <DeleteModal
        show={show && modalType === "delete"}
        onHide={() => handleClose()}
        onConfirm={() =>
          deleteItem(
            formData,
            API["DeleteClassTeacher"],
            "single_class",
            setContent,
            handleClose
          )
        }
      />
    </>
  );
}
