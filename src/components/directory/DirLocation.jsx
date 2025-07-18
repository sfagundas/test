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
        <Modal.Title>Перенести локацию в архив</Modal.Title>
      </Modal.Header>
      <Modal.Body>Вы точно хотите перенести локацию в архив?</Modal.Body>
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

const DeleteModal = ({ show, onHide, onConfirm }) => {
  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Удалить локацию</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        Вы уверены, что хотите безвозвратно удалить локацию?
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

const addEditLocation = [
  {
    name: "Name",
    label: "Название",
    type: "text",
    required: true,
  },
  {
    name: "Comment",
    label: "Комментарий",
    type: "text",
  },
  {
    name: "Photo",
    label: "Ссылка",
    type: "text",
  },
];

export default function DirLocation() {
  const formDataContent = {
    Id: "",
    Name: "",
    Comment: "",
    Photo: "",
  };

  const API = {
    List: "location_list",
    Archive: "archive_location_list",
    Add: "add_dir_location",
    Edit: "edit_dir_location",
    Delete: "delete_dir_location", //нельзя, но нужно разделить deleterecover modal
    Recover: "recover_dir_location",
    toArchive: "to_archive_dir_location",
  };

  const [modalType, setModalType] = useState();
  const [show, setShow] = useState(false);
  const [content, setContent] = useState([
    {
      Id: "1",
      Name: "Сопка",
      Comment: "Вилючинск",
      Photo: "http://wfolio.ru",
    },
    {
      Id: "2",
      Name: "Вулкан",
      Comment: "Петропавловск-Камчатский",
      Photo: "http://wfolio.ru",
    },
    {
      Id: "3",
      Name: "Гетто",
      Comment: "Елизово",
      Photo: "http://wfolio.ru",
    },
    {
      Id: "4",
      Name: "Камень",
      Comment: "Петропавловск-Камчатский",
      Street: "Камченная",
      Photo: "http://wfolio.ru",
    },
  ]);
  const [archive, setArchive] = useState();
  const [formData, setFormData] = useState(formDataContent);
  // useEffect(() => {
  //   const loadMainContent = async () => {
  //     try {
  //       const data = await fetchContent(API["List"]); // ДОКУМЕНТ
  //       setContent(data);
  //     } catch {}
  //   };
  //   loadMainContent();

  //   const loadArchive = async () => {
  //     try {
  //       const data = await fetchContent(API["Archive"]); // ДОКУМЕНТ
  //       setArchive(data);
  //     } catch {}
  //   };
  //   loadArchive();
  // }, []);

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
                            onClick={() => controlFormData("delete", item.Id)}
                          >
                            <i className="bi bi-trash me-2"></i>
                            Удалить
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
                  <div className="mb-2 text-body-secondary row">
                    <Row>
                      <Col sm={1} className="pt-1">
                        <i className="bi bi-chat-right-text me-3"></i>
                      </Col>
                      <Col sm={11}>
                        <small>{item.Comment}</small>
                      </Col>
                    </Row>
                  </div>
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
                  <div
                    className="mb-2 text-body-secondary"
                    style={{ fontSize: "12px" }}
                  >
                    <Row>
                      <Col sm={1} className="pt-1">
                        <i className="bi bi-chat-right-text me-3"></i>
                      </Col>
                      <Col sm={10}>
                        <small>{item.Comment}</small>
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
        title="Добавить локацию"
        fields={addEditLocation}
        onSubmit={() => addItem(formData, API["Add"], setContent, handleClose)}
        submitButtonText="Добавить"
      />
      <UniversalModalForm
        show={show && modalType === "edit"}
        onHide={() => handleClose()}
        onFormChange={(e) => formEdit(e, setFormData)}
        formData={formData}
        title="Редактировать локацию"
        fields={addEditLocation}
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
      <DeleteModal
        show={show && modalType === "delete"}
        onHide={() => handleClose()}
        onConfirm={() =>
          deleteItem(formData, API["Delete"], setContent, handleClose)
        }
      />
    </>
  );
}
