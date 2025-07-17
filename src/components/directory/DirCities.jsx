import React, { useState, useEffect } from "react";
import { Card, Row, Col, Button, Modal, Dropdown } from "react-bootstrap";
import {
  formEdit,
  addItem,
  editItem,
  deleteItem,
  recoverItem,
  openModal,
  fetchContent,
} from "./commonfunction"; // ШАБЛОН

import UniversalModalForm from "../forms/UniversalModalForm";

const DeleteRecoverModal = ({ show, onHide, onConfirm, isRecover }) => {
  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>
          {isRecover ? "Восстановить город" : "Удалить город"}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {isRecover ? (
          "Вы уверены, что хотите восстановить город из архива?"
        ) : (
          <>
            Вы уверены, что хотите безвозвратно удалить запись? <br />
            <span>
              (Если запись используется в других таблицах, она будет перенесена
              в архив.)
            </span>
          </>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Отмена
        </Button>
        <Button variant={isRecover ? "success" : "danger"} onClick={onConfirm}>
          {isRecover ? "Восстановить" : "Подтвердить"}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

// Основной компонент DirCities

export default function DirCities() {
  const formDataContent = {
    Id: "",
    Name: "",
    NameSm: "",
  }; // ДОКУМЕНТ (ШАБЛОН)

  const API = {
    List: "cities_list",
    Archive: "archive_cities_list",
    Add: "add_dir_city",
    Edit: "edit_dir_city",
    Delete: "delete_dir_city",
    Recover: "recover_dir_city",
  }; // ДОКУМЕНТ (ШАБЛОН)

  const [modalType, setModalType] = useState();
  const [show, setShow] = useState(false);
  const [content, setContent] = useState();
  const [archive, setArchive] = useState();
  const [formData, setFormData] = useState(formDataContent);

  // Загрузка данных при монтировании компонента
  useEffect(() => {
    const loadMainContent = async () => {
      try {
        const data = await fetchContent(API["List"]);
        setContent(data);
      } catch {}
    };
    loadMainContent();

    const loadArchive = async () => {
      try {
        const data = await fetchContent(API["Archive"]);
        setArchive(data);
      } catch {}
    };
    loadArchive();
  }, []);

  const setFD = () => {
    setFormData(formDataContent);
  };

  const handleClose = () => {
    setShow(false);
    setFD();
  };

  const JVV = (type, data) => {
    setModalType(type);

    if (type === "add") {
      setFD();
    } else if (type === "edit") {
      setFormData(data);
    } else if (type === "delete" || type === "recover") {
      setFormData({ Id: data });
    }

    openModal(type, setShow);
  };

  const addEditCity = [
    {
      name: "Name",
      label: "Название города",
      type: "text",
      required: true,
      colSize: 8,
    },
    {
      name: "NameSm",
      label: "Сокращение",
      type: "text",
      required: true,
      colSize: 4,
    },
  ];

  return (
    <>
      <Button
        variant="light"
        className="col-12 mb-3"
        onClick={() => JVV("add", null)}
      >
        <i className="bi bi-plus-lg"></i>
      </Button>
      <Row>
        {content &&
          content.map((item) => (
            <Col sm={6} md={6} lg={4} key={item.Id}>
              <Card className="mb-3">
                <Card.Body>
                  <div className="d-flex justify-content-between">
                    <Card.Title className="mb-2">
                      <div className="d-flex align-items-center">
                        <i className="bi bi-house-fill me-2"></i>
                        <span>
                          {item.Name} {"(" + item.NameSm + ")"}
                        </span>
                      </div>
                    </Card.Title>
                    <div>
                      <Dropdown>
                        <Dropdown.Toggle
                          variant="light"
                          className="btn-sm pt-0 pb-0"
                          id="dropdown-basic"
                        ></Dropdown.Toggle>
                        <Dropdown.Menu>
                          <Dropdown.Item onClick={() => JVV("edit", item)}>
                            <i className="bi bi-pencil-square me-2"></i>
                            Изменить
                          </Dropdown.Item>
                          <Dropdown.Item onClick={() => JVV("delete", item.Id)}>
                            <i className="bi bi-trash me-2"></i>
                            Удалить
                          </Dropdown.Item>
                        </Dropdown.Menu>
                      </Dropdown>
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
      </Row>
      <hr />
      <Row style={{ opacity: ".5" }}>
        {archive &&
          archive.map((item) => (
            <Col sm={6} md={6} lg={4} key={item.Id}>
              <Card className="mb-3">
                <Card.Body>
                  <div className="d-flex justify-content-between">
                    <Card.Title className="mb-2">
                      <div className="d-flex align-items-center">
                        <i className="bi bi-house-fill me-2"></i>
                        <span>
                          {item.Name} {"(" + item.NameSm + ")"}
                        </span>
                      </div>
                    </Card.Title>
                    <div>
                      <Button
                        variant="light"
                        className="btn-sm pt-0 pb-0"
                        onClick={() => JVV("recover", item.Id)}
                      >
                        <i class="bi bi-arrow-counterclockwise"></i>
                      </Button>
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
      </Row>

      <UniversalModalForm
        show={show && modalType === "add"}
        onHide={() => handleClose()}
        onFormChange={(e) => formEdit(e, setFormData)}
        formData={formData}
        title="Добавить город"
        fields={addEditCity}
        onSubmit={() => addItem(formData, API["Add"], setContent, handleClose)}
        submitButtonText="Добавить"
      />
      <UniversalModalForm
        show={show && modalType === "edit"}
        onHide={() => handleClose()}
        onFormChange={(e) => formEdit(e, setFormData)}
        formData={formData}
        title="Изменить город"
        fields={addEditCity}
        onSubmit={() =>
          editItem(formData, API["Edit"], setContent, handleClose)
        }
        submitButtonText="Сохранить"
      />

      <DeleteRecoverModal
        show={show && (modalType === "delete" || modalType === "recover")}
        onHide={() => handleClose()}
        isRecover={modalType === "recover"}
        onConfirm={
          modalType === "delete"
            ? () =>
                deleteItem(
                  formData,
                  API["Delete"],
                  setContent,
                  setArchive,
                  handleClose
                )
            : () =>
                recoverItem(
                  formData,
                  API["Recover"],
                  setContent,
                  setArchive,
                  handleClose
                )
        }
      />
      {/* <UniversalModalForm
        show={show && modalType === "edit"}
        onHide={() => handleClose()}
        onFormChange={(e) => formEdit(e, setFormData)}
        formData={formData}
        title="Удалить город"
        fields={addEditCity}
        onSubmit={() =>
          deleteItem(formData, API["Delete"], setContent, handleClose)
        }
        submitButtonText="Изменить"
      />
      <UniversalModalForm
        show={show && modalType === "edit"}
        onHide={() => handleClose()}
        onFormChange={(e) => formEdit(e, setFormData)}
        formData={formData}
        title="Восстановить город"
        fields={addEditCity}
        onSubmit={() =>
          editItem(formData, API["Recover"], setContent, handleClose)
        }
        submitButtonText="Изменить"
      /> */}
    </>
  );
}
