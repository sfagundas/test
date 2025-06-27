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
  openModal,
} from "./commonfunction";
import SelectCities from "../custom/SelectCities";
import SelectCRMstatus from "../custom/SelectCRMstatus";
import OkBadgeDate from "../custom/OkBadgeDate";

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
          {isEditMode ? "Редактировать класс" : "Добавить класс"}
        </Modal.Title>
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
            <Col sm={12} md={6}>
              <Form.Group className="mb-3" controlId="Phone">
                <Form.Label>Телефон</Form.Label>
                <InputGroup>
                  <InputGroup.Text id="inputPhonePrepend">
                    <i className="bi bi-camera"></i>
                  </InputGroup.Text>
                  <Form.Control
                    type="text"
                    name="Phone"
                    placeholder="Название"
                    onChange={onFormChange}
                    value={formData.Phone}
                    aria-describedby="inputPhonePrepend"
                    required
                  />
                </InputGroup>
              </Form.Group>
            </Col>
            <Col sm={12} md={6}>
              <Form.Group className="mb-3" controlId="cityID">
                <SelectCities id={formData.cityId} onChange={onFormChange} />
              </Form.Group>
            </Col>

            {isEditMode ? (
              <SelectCRMstatus
                id={formData.CrmStatusID}
                onChange={onFormChange}
              />
            ) : (
              ""
            )}

            <Col sm={12}>
              <Form.Group className="mb-3" controlId="CrmComment">
                <Form.Label>Комментарий</Form.Label>
                <Form.Control
                  aria-describedby="inputCrmCommentPrepend"
                  type="text"
                  name="CrmComment"
                  as="textarea"
                  placeholder="Описание"
                  onChange={onFormChange}
                  value={formData.CrmComment}
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

const CommentModal = ({ show, onHide, formData, onFormChange, onSave }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    onSave();
  };

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>{"Комментарий"}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <input type="hidden" name="Id" value={formData.Id} />
          <Row>
            <Col sm={12}>
              <Form.Group className="mb-3" controlId="CrmComment">
                <Form.Label>Комментарий</Form.Label>
                <Form.Control
                  aria-describedby="inputCrmCommentPrepend"
                  type="text"
                  name="CrmComment"
                  as="textarea"
                  placeholder="Описание"
                  onChange={onFormChange}
                  value={formData.CrmComment}
                />
              </Form.Group>
            </Col>
          </Row>
          <Modal.Footer>
            <Button variant="secondary" onClick={onHide}>
              Отмена
            </Button>
            <Button variant="warning" type="submit">
              {"Сохранить"}
            </Button>
          </Modal.Footer>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

const DateModal = ({ show, onHide, formData, onFormChange, onSave }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    onSave();
  };

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>{"Дата следующей связи"}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <input type="hidden" name="Id" value={formData.Id} />
          <Row>
            <Col sm={12}>
              <Form.Group className="mb-3" controlId="CrmComment">
                <Form.Label>Комментарий</Form.Label>
                <Form.Control
                  aria-describedby="inputCrmCommentPrepend"
                  type="date"
                  name="CrmComment"
                  as="textarea"
                  placeholder="Описание"
                  onChange={onFormChange}
                  value={formData.CrmComment}
                />
              </Form.Group>
            </Col>
          </Row>
          <Modal.Footer>
            <Button variant="secondary" onClick={onHide}>
              Отмена
            </Button>
            <Button variant="warning" type="submit">
              {"Сохранить"}
            </Button>
          </Modal.Footer>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

const StatusModal = ({ show, onHide, formData, onFormChange, onSave }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    onSave();
  };

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>{"Изменить статус клиента"}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <input type="hidden" name="Id" value={formData.Id} />
          <Row>
            <Col sm={12}>
              <SelectCRMstatus
                id={formData.CrmStatusID}
                onChange={onFormChange}
              />
            </Col>
          </Row>
          <Modal.Footer>
            <Button variant="secondary" onClick={onHide}>
              Отмена
            </Button>
            <Button variant="warning" type="submit">
              {"Сохранить"}
            </Button>
          </Modal.Footer>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default function Documents({ content, setContent }) {
  const formDataContent = {
    Id: "",
    ClientName: "",
    Phone: "",
    cityId: "",
    StatusId: "1", //1-request, 2-documents, 3-good, 4-bad
    ManagerNotes: "",
  };

  const API = {
    Add: "crm_add_cls_main",
    Edit: "crm_edit_cls_main",
  };

  const [modalType, setModalType] = useState();
  const [show, setShow] = useState(false);
  const [formData, setFormData] = useState(formDataContent);

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
    } else if (type === "delete") {
      setFormData({ Id: data });
    } else if (type === "comment") {
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
        {content
          .filter((item) => item.StatusId == 2)
          .map((item) => (
            <Col sm={6} md={6} lg={6} xl={4} key={item.Id}>
              <Card className="mb-3">
                <Card.Body style={{ paddingBottom: "10px" }}>
                  <div className="d-flex justify-content-between">
                    <Card.Title className="mb-2 mainCardTitle">
                      <div className="d-flex align-items-center">
                        <span>{item.ClientName}</span>
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
                          <Dropdown.Item onClick={() => JVV("date", item)}>
                            <i class="bi bi-calendar-event me-2"></i>
                            Дата связи
                          </Dropdown.Item>
                          <Dropdown.Item onClick={() => JVV("comment", item)}>
                            <i className="bi bi-chat-right-text me-2"></i>
                            Комментарий
                          </Dropdown.Item>
                          <Dropdown.Item onClick={() => JVV("status", item)}>
                            <i class="bi bi-arrow-left-right me-2"></i>
                            Статус
                          </Dropdown.Item>
                          <Dropdown.Item onClick={() => JVV("edit", item)}>
                            <i className="bi bi-pencil-square me-2"></i>
                            Изменить
                          </Dropdown.Item>
                        </Dropdown.Menu>
                      </Dropdown>
                    </div>
                  </div>
                  <div className="mb-2 text-body-secondary">
                    <Row>
                      <Col sm={1} className="pt-1" style={{ fontSize: "14px" }}>
                        <i className="bi bi-telephone "></i>
                      </Col>
                      <Col sm={10}>
                        <small>{item.Phone}</small>
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
                        <small>{item.ManagerNotes}</small>
                      </Col>
                    </Row>
                  </div>
                  <OkBadgeDate date={"2025-06-22"}></OkBadgeDate>
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
            ? () => addItem(formData, API["Add"], setContent, handleClose)
            : () => editItem(formData, API["Edit"], setContent, handleClose)
        }
        isEditMode={modalType === "edit"}
      />
      <CommentModal
        show={show && modalType === "comment"}
        onHide={() => handleClose()}
        formData={formData}
        onFormChange={(e) => formEdit(e, setFormData)}
        onSave={""}
      />
      <DateModal
        show={show && modalType === "date"}
        onHide={() => handleClose()}
        formData={formData}
        onFormChange={(e) => formEdit(e, setFormData)}
        onSave={""}
      />
      <StatusModal
        show={show && modalType === "status"}
        onHide={() => handleClose()}
        formData={formData}
        onFormChange={(e) => formEdit(e, setFormData)}
        onSave={""}
      />
    </>
  );
}
