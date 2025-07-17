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
} from "./commonfunction";

import UniversalModalForm from "../forms/UniversalModalForm";

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

export default function PhStatuses() {
  const formDataContent = { Id: "", Value: "", Comment: "" }; // ДОКУМЕНТ

  const API = {
    List: "ph_status_list",
    Archive: "archive_ph_status_list",
    Add: "add_dir_ph_status",
    Edit: "edit_dir_ph_status",
    Delete: "delete_dir_ph_status",
    Recover: "recover_dir_ph_status",
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

  const addEditPhStatuses = [
    {
      name: "Value",
      label: "Статус",
      type: "text",
      required: true,
    },
    {
      name: "Comment",
      label: "Комментарий",
      type: "textarea",
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
            <Col sm={6} md={6} lg={6} key={item.Id}>
              <Card className="mb-3">
                <Card.Body>
                  <div className="d-flex justify-content-between">
                    <Card.Title className="mb-2">{item.Value}</Card.Title>

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
                  <div className="mb-2 text-body-secondary row">
                    <Row>
                      <Col sm={1} className="pt-1">
                        {item.Comment && (
                          <i className="bi bi-chat-right-text me-3"></i>
                        )}
                      </Col>
                      <Col sm={11}>
                        {item.Comment && <small>{item.Comment}</small>}
                      </Col>
                    </Row>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
      </Row>
      <hr />
      <Row style={{ opacity: ".5" }}></Row>
      <Row>
        {archive &&
          archive.map((item) => (
            <Col sm={6} md={6} lg={6} key={item.Id}>
              <Card className="mb-3">
                <Card.Body>
                  <div className="d-flex justify-content-between">
                    <Card.Title className="mb-2">{item.Value}</Card.Title>
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
                  <div className="mb-2 text-body-secondary row">
                    <Row>
                      <Col sm={1} className="pt-1">
                        {item.Comment && (
                          <i className="bi bi-chat-right-text me-3"></i>
                        )}
                      </Col>
                      <Col sm={11}>
                        {item.Comment && <small>{item.Comment}</small>}
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
        title="Добавить статус"
        fields={addEditPhStatuses}
        onSubmit={() => addItem(formData, API["Add"], setContent, handleClose)}
        submitButtonText="Добавить"
      />
      <UniversalModalForm
        show={show && modalType === "edit"}
        onHide={() => handleClose()}
        onFormChange={(e) => formEdit(e, setFormData)}
        formData={formData}
        title="Редактировать статус"
        fields={addEditPhStatuses}
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
      />
    </>
  );
}
