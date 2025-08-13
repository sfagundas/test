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
import { addClassPeopleForm, editClassPeopleForm } from "../forms/ExportForms";

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

export default function Class({ classId }) {
  const formDataContent = {
    Id: "",
    Name: "",
    LastName: "",
    PersonalText: "",
    Associations: "",
    Portrait: "",
    PortraitPath: "",
  };

  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [content, setContent] = useState([]);

  const [modalType, setModalType] = useState();
  const [show, setShow] = useState(false);
  const [formData, setFormData] = useState(formDataContent);

  const controlFormData = (type, data) => {
    setModalType(type);
    if (type === "addClassPeople") {
      setFormData({
        ClassId: classId,
        Name: data.Name,
        LastName: data.LastName,
      });
    } else if (type === "editClassPeople") {
      console.log(data);
      setFormData({
        Id: data.Id || "",
        Name: data.Name || "",
        LastName: data.LastName || "",
        PersonalText: data.PersonalText || "",
        Associations: data.Associations || "",
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
          `http://okalbm.ru/api/single_class/${API["GetClassPeople"]}/${classId}`
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
              <span>Класс</span>
              <div gap-0>
                <Button
                  variant="light"
                  size="sm"
                  onClick={() => {
                    controlFormData("addClassPeople", classId);
                  }}
                >
                  <i className="bi bi-plus-lg"></i>
                </Button>
                <Button
                  variant="light"
                  size="sm"
                  onClick={() => {
                    controlFormData("multiAddClassPeople", classId);
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
                    <div>
                      <div>
                        {item.Name} {item.LastName}
                      </div>
                    </div>
                    <div>
                      <Button
                        variant="outline-secondary"
                        size="sm"
                        className="me-2"
                        onClick={() => controlFormData("editClassPeople", item)}
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
        show={show && modalType === "addClassPeople"}
        onHide={() => handleClose()}
        onFormChange={(e) => formEdit(e, setFormData)}
        formData={formData}
        title="Добавление ученика"
        fields={addClassPeopleForm}
        onSubmit={() =>
          addItem(
            formData,
            API["AddClassPeople"],
            "single_class",
            setContent,
            handleClose
          )
        }
        submitButtonText="Добавить учеников"
      />

      <UniversalModalForm
        show={show && modalType === "editClassPeople"}
        onHide={() => handleClose()}
        formData={formData}
        onFormChange={(e) => formEdit(e, setFormData)}
        title="Редактировать запись"
        fields={editClassPeopleForm}
        onSubmit={() =>
          editItem(
            formData,
            API["EditClassPeople"],
            "single_class",
            setContent,
            handleClose
          )
        }
        submitButtonText="Сохранить"
      />

      <MultiAddModal
        show={show && modalType === "multiAddClassPeople"}
        onHide={() => handleClose()}
        onSubmit={(studentsData) => {
          studentsData.forEach((student) => {
            addItem(
              student, // Уже содержит ClassId
              API["AddClassPeople"],
              "single_class",
              setContent,
              () => {}
            );
          });
          handleClose();
        }}
        classId={classId} // Передаём classId в модальное окно
      />

      <DeleteModal
        show={show && modalType === "delete"}
        onHide={() => handleClose()}
        onConfirm={() =>
          deleteItem(
            formData,
            API["DeleteClassPeople"],
            "single_class",
            setContent,
            handleClose
          )
        }
      />
    </>
  );
}
