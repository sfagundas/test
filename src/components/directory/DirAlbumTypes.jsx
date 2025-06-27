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
  openModal,
  fetchContent,
} from "./commonfunction";

// Компонент AddEditModal
const AddEditModal = ({
  show,
  onHide,
  formData,
  onFormChange,
  onSave,
  isEditMode,
}) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    onSave();
  };

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>
          {isEditMode ? "Редактировать тип альбома" : "Добавить тип альбома"}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <input type="hidden" name="Id" value={formData.Id} />
          <Row>
            <Col sm={6}>
              <Form.Group className="mb-3" controlId="Name">
                <Form.Label>Тип альбома</Form.Label>
                <InputGroup>
                  <InputGroup.Text id="inputNamePrepend">
                    <i className="bi bi-book"></i>
                  </InputGroup.Text>
                  <Form.Control
                    type="text"
                    name="Name"
                    placeholder="Название"
                    onChange={onFormChange}
                    value={formData.Name}
                    aria-describedby="inputNamePrepend"
                    required
                  />
                </InputGroup>
              </Form.Group>
            </Col>
            <Col sm={6}>
              <Form.Group className="mb-3" controlId="Price">
                <Form.Label>Цена</Form.Label>
                <InputGroup>
                  <InputGroup.Text id="inputPricePrepend">
                    <i className="bi bi-cash"></i>
                  </InputGroup.Text>
                  <Form.Control
                    type="number"
                    name="Price"
                    placeholder="Цена"
                    onChange={onFormChange}
                    onKeyPress={(e) => {
                      if (!/[0-9]/.test(e.key) && e.key !== "Backspace") {
                        e.preventDefault();
                      }
                    }}
                    value={formData.Price}
                    min="0"
                    step="1"
                    aria-describedby="inputPricePrepend"
                    required
                  />
                </InputGroup>
              </Form.Group>
            </Col>
            <Col sm={12}>
              <Form.Group className="mb-3" controlId="Comment">
                <Form.Label>Комментарий</Form.Label>
                <Form.Control
                  aria-describedby="inputCommentPrepend"
                  type="text"
                  name="Comment"
                  as="textarea"
                  placeholder="Описание"
                  onChange={onFormChange}
                  value={formData.Comment}
                />
              </Form.Group>
            </Col>
          </Row>
          <Modal.Footer>
            <Button variant="secondary" onClick={onHide}>
              Отмена
            </Button>
            <Button variant="warning" type="submit">
              {isEditMode ? "Сохранить" : "Добавить"}
            </Button>
          </Modal.Footer>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

// Компонент DeleteModal
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

// Основной компонент DirAlbumTypes
export default function DirAlbumTypes() {
  const formDataContent = { Id: "", Name: "", Price: "", Comment: "" }; // ДОКУМЕНТ

  const API = {
    List: "album_types_list",
    Archive: "archive_album_types_list",
    Add: "add_dir_alb_types",
    Edit: "edit_dir_alb_types",
    Delete: "delete_dir_alb_types",
    Recover: "recover_dir_alb_types",
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
                          <Dropdown.Item onClick={() => JVV("edit", item)}>
                            <i className="bi bi-pencil-square me-2"></i>
                            Изменить
                          </Dropdown.Item>
                          <Dropdown.Item onClick={() => JVV("delete", item.Id)}>
                            <i className="bi bi-trash me-2"></i>Удалить
                          </Dropdown.Item>
                        </Dropdown.Menu>
                      </Dropdown>
                    </div>
                  </div>
                  <div className="mb-2 text-body-secondary row">
                    <Row>
                      <Col sm={1} className="pt-1">
                        <i className="bi bi-cash me-3"></i>
                      </Col>
                      <Col sm={11}>
                        <small>{item.Price} руб.</small>
                      </Col>
                    </Row>
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
                        onClick={() => JVV("recover", item.Id)}
                      >
                        <i class="bi bi-arrow-counterclockwise"></i>
                      </Button>
                    </div>
                  </div>
                  <div className="mb-2 text-body-secondary row">
                    <Row>
                      <Col sm={1} className="pt-1">
                        <i className="bi bi-cash me-3"></i>
                      </Col>
                      <Col sm={11}>
                        <small>{item.Price} руб.</small>
                      </Col>
                    </Row>
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

      <AddEditModal
        show={show && (modalType === "add" || modalType === "edit")}
        onHide={() => handleClose()}
        formData={formData}
        onFormChange={(e) => formEdit(e, setFormData)}
        onSave={
          modalType === "add"
            ? () => addItem(formData, API["Add"], setContent, handleClose) //ДОКУМЕНТ
            : () => editItem(formData, API["Edit"], setContent, handleClose) //ДОКУМЕНТ
        }
        isEditMode={modalType === "edit"}
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
