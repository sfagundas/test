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
} from "../single_class/commonfunction";

import UniversalModalForm from "../forms/UniversalModalForm";
import MultiAddModal from "../forms/MultiAddModal";
import { addClassMainForm, editClassMainModal } from "../forms/ExportForms";

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
  };

  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [content, setContent] = useState([
    { Id: 1, FirstName: "Алексей", LastName: "Иванов" },
    { Id: 2, FirstName: "Мария", LastName: "Петрова" },
    { Id: 3, FirstName: "Иван", LastName: "Сидоров" },
    { Id: 4, FirstName: "Екатерина", LastName: "Смирнова" },
    { Id: 5, FirstName: "Дмитрий", LastName: "Кузнецов" },
    { Id: 6, FirstName: "Анна", LastName: "Васильева" },
    { Id: 7, FirstName: "Сергей", LastName: "Попов" },
    { Id: 8, FirstName: "Ольга", LastName: "Новикова" },
    { Id: 9, FirstName: "Андрей", LastName: "Федоров" },
    { Id: 10, FirstName: "Наталья", LastName: "Морозова" },
    { Id: 11, FirstName: "Павел", LastName: "Волков" },
    { Id: 12, FirstName: "Елена", LastName: "Алексеева" },
    { Id: 13, FirstName: "Михаил", LastName: "Лебедев" },
    { Id: 14, FirstName: "Светлана", LastName: "Семенова" },
    { Id: 15, FirstName: "Артем", LastName: "Егоров" },
  ]);

  const [modalType, setModalType] = useState();
  const [show, setShow] = useState(false);
  const [formData, setFormData] = useState(formDataContent);

  const [showMultiAdd, setShowMultiAdd] = useState(false);

  const controlFormData = (type, data) => {
    setModalType(type);
    if (type === "addClassMain") {
      setFormData({
        ClassId: classId,
      });
    } else if (type === "editClassMain") {
      setFormData({
        Id: data.Id,
        FirstName: data.FirstName,
        LastName: data.LastName,
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

  // useEffect(() => {
  //   // Функция для получения данных из API
  //   const fetchData = async () => {
  //     try {
  //       const response = await fetch(
  //         `http://okalbm.ru/api/single_class/${API["GetLog"]}/${classId}`
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
  // }, []);

  // if (isLoading) {
  //   return (
  //     <div
  //       className="d-flex justify-content-center align-items-center"
  //       style={{ height: "100vh" }}
  //     >
  //       <Spinner animation="border" role="status">
  //         <span className="visually-hidden">Loading...</span>
  //       </Spinner>
  //     </div>
  //   );
  // }
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
                    controlFormData("addClassMain", classId);
                  }}
                >
                  <i className="bi bi-plus-lg"></i>
                </Button>
                <Button
                  variant="light"
                  size="sm"
                  onClick={() => setShowMultiAdd(true)}
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
                        {item.FirstName} {item.LastName}
                      </div>
                    </div>
                    <div>
                      <Button
                        variant="outline-secondary"
                        size="sm"
                        className="me-2"
                        onClick={() => controlFormData("editClassMain", item)}
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
        show={show && modalType === "addClassMain"}
        onHide={() => handleClose()}
        onFormChange={(e) => formEdit(e, setFormData)}
        formData={formData}
        title="Добавление ученика"
        fields={addClassMainForm}
        onSubmit={() =>
          addItem(
            formData,
            API["AddLog"],
            "single_class",
            setContent,
            handleClose
          )
        }
        submitButtonText="Добавить"
      />

      <UniversalModalForm
        show={show && modalType === "editClassMain"}
        onHide={() => handleClose()}
        formData={formData}
        onFormChange={(e) => formEdit(e, setFormData)}
        title="Редактировать запись"
        fields={editClassMainModal}
        onSubmit={() =>
          editItem(
            formData,
            API["EditLog"],
            "single_class",
            setContent,
            handleClose
          )
        }
        submitButtonText="Сохранить"
      />

      <DeleteModal
        show={show && modalType === "delete"}
        onHide={() => handleClose()}
        onConfirm={() =>
          deleteItem(
            formData,
            API["DeleteLog"],
            "single_class",
            setContent,
            handleClose
          )
        }
      />

      <MultiAddModal
        show={showMultiAdd}
        onHide={() => setShowMultiAdd(false)}
        onSubmit={(studentsData) => {
          // Для каждого ученика вызываем addItem
          studentsData.forEach((student) => {
            addItem(
              student,
              API["AddLog"],
              "single_class",
              setContent,
              () => {} // Не закрываем модалку после каждого добавления
            );
          });
          handleClose(); // Закрываем модалку после всех добавлений
        }}
      />
    </>
  );
}
