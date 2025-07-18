import React, { useState, useEffect } from "react";
import {
  Card,
  Row,
  Col,
  Button,
  Modal,
  Dropdown,
  Form,
  InputGroup,
} from "react-bootstrap";
import {
  formEdit,
  addItem,
  editItem,
  deleteItem,
  recoverItem,
  toArchive,
  openModal,
  fetchContent,
} from "./commonfunction";

import UniversalModalForm from "../forms/UniversalModalForm";

const ToArchiveModal = ({ show, onHide, onConfirm }) => {
  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Перенести фотографа в архив</Modal.Title>
      </Modal.Header>
      <Modal.Body>Вы точно хотите перенести фотографа в архив?</Modal.Body>
      <Modal.Footer>
        <Button variant="danger" onClick={onHide}>
          Отмена
        </Button>
        <Button variant="warning" onClick={onConfirm}>
          Подтвердить
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
const DeleteRecoverModal = ({ show, onHide, onConfirm, isRecover }) => {
  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>
          {isRecover ? "Восстановить запись" : "Удалить запись"}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {isRecover ? (
          "Вы уверены, что хотите восстановить запись из архива?"
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

const addEditPhotographers = [
  {
    name: "Name",
    label: "ФИО Фотографа",
    type: "text",
    required: true,
    colSize: 6,
  },
  {
    name: "Phone",
    label: "Номер",
    type: "text",
    required: true,
    colSize: 6,
  },
  {
    name: "Email",
    label: "Почта",
    type: "text",
    colSize: 6,
  },
  {
    name: "Portfolio",
    label: "Ссылка на портфолио",
    type: "text",
    colSize: 6,
  },
];

export default function DirPhotographers() {
  const formDataContent = {
    Id: "",
    Name: "",
    Phone: "",
    Email: "",
    Portfolio: "",
  }; // ДОКУМЕНТ

  const API = {
    List: "photographers_list",
    Archive: "archive_photographers_list",
    Add: "add_dir_photographer",
    Edit: "edit_dir_photographer",
    Delete: "delete_dir_photographer", //нельзя, но нужно разделить deleterecover modal
    Recover: "recover_dir_photographer",
    toArchive: "to_archive_dir_photographer",
  };

  const [modalType, setModalType] = useState();
  const [show, setShow] = useState(false);
  const [content, setContent] = useState();
  const [archive, setArchive] = useState();
  const [formData, setFormData] = useState(formDataContent);
  useEffect(() => {
    const loadMainContent = async () => {
      try {
        const data = await fetchContent(API["List"]); // ДОКУМЕНТ
        setContent(data);
      } catch {}
    };
    loadMainContent();

    const loadArchive = async () => {
      try {
        const data = await fetchContent(API["Archive"]); // ДОКУМЕНТ
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

  const controlFormData = (type, data) => {
    setModalType(type);

    if (type === "add") {
      setFD();
    } else if (type === "edit") {
      setFormData(data);
    } else if (type === "to_archive" || type === "recover") {
      setFormData({ Id: data });
    }

    openModal(setShow);
  };

  return (
    <>
      <Button
        variant="light"
        className="col-12 mb-3"
        onClick={() => controlFormData("add", null)}
      >
        <i className="bi bi-plus-lg"></i>
      </Button>
      <Row>
        {content &&
          content.map((item) => (
            <Col lg={6} key={item.Id}>
              <Card className="mb-3">
                <Card.Body>
                  <div className="d-flex justify-content-between">
                    <Card.Title className="mb-2">{item.Name}</Card.Title>
                    <div>
                      <Dropdown>
                        <Dropdown.Toggle
                          variant="light"
                          className="btn-sm pt-0 pb-0"
                          id="dropdown-basic"
                        ></Dropdown.Toggle>

                        <Dropdown.Menu>
                          <Dropdown.Item
                            onClick={() => controlFormData("edit", item)}
                          >
                            <i className="bi bi-pencil-square me-2"></i>
                            Изменить
                          </Dropdown.Item>
                          <Dropdown.Item
                            onClick={() =>
                              controlFormData("to_archive", item.Id)
                            }
                          >
                            <i className="bi bi-arrow-right me-2"></i>В архив
                          </Dropdown.Item>
                        </Dropdown.Menu>
                      </Dropdown>
                    </div>
                  </div>
                  {item.Email && ( // новое написание, которое позволяет дважды не оборочивать один код
                    <div className="mb-2 text-body-secondary row">
                      <Row>
                        <Col sm={1} className="pt-1">
                          <i className="bi bi-envelope-fill"></i>
                        </Col>
                        <Col sm={11}>
                          <small>{item.Email}</small>
                        </Col>
                      </Row>
                    </div>
                  )}
                  {item.Phone && ( // новое написание, которое позволяет дважды не оборочивать один код
                    <div className="mb-2 text-body-secondary row">
                      <Row>
                        <Col sm={1} className="pt-1">
                          <i className="bi bi-telephone-fill"></i>
                        </Col>
                        <Col sm={11}>
                          <small>{item.Phone}</small>
                        </Col>
                      </Row>
                    </div>
                  )}
                </Card.Body>
              </Card>
            </Col>
          ))}
      </Row>
      <hr />
      <Row>
        {archive &&
          archive.map((item) => (
            <Col sm={6} md={6} lg={6} key={item.Id}>
              <Card className="mb-3">
                <Card.Body>
                  <div className="d-flex justify-content-between">
                    <Card.Title className="mb-2">{item.Name}</Card.Title>
                    <div>
                      <Button
                        variant="light"
                        className="btn-sm pt-0 pb-0"
                        onClick={() => controlFormData("recover", item.Id)}
                      >
                        <i class="bi bi-arrow-counterclockwise"></i>
                      </Button>
                    </div>
                  </div>
                  <div className="mb-2 text-body-secondary row">
                    <Row>
                      <Col sm={1} className="pt-1">
                        <i class="bi bi-envelope-fill"></i>
                      </Col>
                      <Col sm={11}>
                        <small>{item.Email}</small>
                      </Col>
                    </Row>
                  </div>
                  <div className="mb-2 text-body-secondary row">
                    <Row>
                      <Col sm={1} className="pt-1">
                        {item.Phone && <i class="bi bi-telephone-fill"></i>}
                      </Col>
                      <Col sm={11}>
                        {item.Phone && <small>{item.Phone}</small>}
                      </Col>
                    </Row>
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
        title="Добавить фотографа"
        fields={addEditPhotographers}
        onSubmit={() => addItem(formData, API["Add"], setContent, handleClose)}
        submitButtonText="Добавить"
      />
      <UniversalModalForm
        show={show && modalType === "edit"}
        onHide={() => handleClose()}
        onFormChange={(e) => formEdit(e, setFormData)}
        formData={formData}
        title="Редактировать фотографа"
        fields={addEditPhotographers}
        onSubmit={() =>
          editItem(formData, API["Edit"], setContent, handleClose)
        }
        submitButtonText="Сохранить"
      />

      <ToArchiveModal
        show={show && modalType === "to_archive"}
        onHide={() => handleClose()}
        onConfirm={() =>
          toArchive(formData, API["toArchive"], setContent, handleClose)
        }
      />

      {/* <recoverModal
        show={show && modalType === "to_archive"}
        onHide={() => handleClose()}
        onConfirm={() =>
          toArchive(formData, API["toArchive"], setContent, handleClose)
        }
      /> */}

      {/* <DeleteRecoverModal
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
                ) //ДОКУМЕНТ
            : () =>
                recoverItem(
                  formData,
                  API["Recover"],
                  setContent,
                  setArchive,
                  handleClose
                ) //ДОКУМЕНТ
        }
      /> */}
      {/* <DeleteModal
        show={show && modalType === "delete"}
        onHide={() => handleClose()}
        onConfirm={() =>
          deleteItem(formData, API["Delete"], setContent, handleClose)
        }
      /> */}
    </>
  );
}
