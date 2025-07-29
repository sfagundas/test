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
import {
  editMainInfoForm,
  addLogForm,
  editLogModal,
} from "../forms/ExportForms";

import OkBadgeDateMain from "../custom/OkBadgeDateMain";

const DeleteModal = ({ show, onHide, onConfirm }) => {
  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Удалить лог</Modal.Title>
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
export default function Main({ classId }) {
  const formDataContent = {
    Id: "",
  };

  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const [content, setContent] = useState([]);
  const [logs, setLogs] = useState([]);

  const [modalType, setModalType] = useState();
  const [show, setShow] = useState(false);
  const [formData, setFormData] = useState(formDataContent);

  function getCurrentDateTime() {
    const now = new Date();

    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const day = String(now.getDate()).padStart(2, "0");

    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");
    const seconds = String(now.getSeconds()).padStart(2, "0");

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  }

  const controlFormData = (type, data) => {
    setModalType(type);

    if (type === "editMainInfo") {
      setFormData(data);
    } else if (type === "addClassLog") {
      setFormData({
        ClassId: classId,
        DateTime: getCurrentDateTime(),
      });
    } else if (type === "editClassLog") {
      setFormData({
        Id: data.Id,
        Text: data.Text,
        DateTime: getCurrentDateTime(),
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

  useEffect(() => {
    // Функция для получения данных из API
    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://okalbm.ru/api/single_class/${API["GetMainInfo"]}/${classId}`
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

  // if (error) {
  //   return (
  //     <div className="alert alert-danger m-3">
  //       Error loading data: {error}
  //       <Link to="/classes" className="ms-2">
  //         Назад
  //       </Link>
  //     </div>
  //   );
  // }

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
                  controlFormData("addClassLog", classId);
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
                      <OkBadgeDateMain date={log.DateTime} />
                      <div>{log.Text}</div>
                    </div>
                    <div>
                      <Button
                        variant="outline-secondary"
                        size="sm"
                        className="me-2"
                        onClick={() => controlFormData("editClassLog", log)}
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
      <UniversalModalForm
        show={show && modalType === "editMainInfo"}
        onHide={() => handleClose()}
        onFormChange={(e) => formEdit(e, setFormData)}
        formData={formData}
        title="Редактировать основную информацию"
        fields={editMainInfoForm}
        onSubmit={() =>
          editItem(
            formData,
            API["EditMain"],
            "single_class",
            setContent,
            handleClose
          )
        }
        submitButtonText="Сохранить"
      />
      <UniversalModalForm
        show={show && modalType === "addClassLog"}
        onHide={() => handleClose()}
        onFormChange={(e) => formEdit(e, setFormData)}
        formData={formData}
        title="Добавление лога"
        fields={addLogForm}
        onSubmit={() =>
          addItem(formData, API["AddLog"], "single_class", setLogs, handleClose)
        }
        submitButtonText="Добавить"
      />

      <UniversalModalForm
        show={show && modalType === "editClassLog"}
        onHide={() => handleClose()}
        formData={formData}
        onFormChange={(e) => formEdit(e, setFormData)}
        title="Редактировать лог"
        fields={editLogModal}
        onSubmit={() =>
          editItem(
            formData,
            API["EditLog"],
            "single_class",
            setLogs,
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
            setLogs,
            handleClose
          )
        }
      />
    </>
  );
}
