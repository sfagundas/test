import React, { useState } from "react";
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
  handleCloseDelete,
  formEdit,
  addItem,
  editItem,
  deleteItem,
  openModal,
} from "./commonfunction";
import SelectCities from "../custom/SelectCities";
import SelectCRMstatus from "../custom/SelectCRMstatus";

import NotificationPanel from "./small/NotificationPanel";
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
                <SelectCities id={formData.cityID} onChange={onFormChange} />
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

// Компонент DeleteModal
const DeleteModal = ({ show, onHide, onConfirm }) => {
  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Удалить CRM статус</Modal.Title>
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

export default function Request({ content, setContent }) {
  const [show, setShow] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [formData, setFormData] = useState({
    Id: "",
    ClientName: "",
    Phone: "",
    cityID: "",
    CrmStatusID: "",
    CrmComment: "",
  });

  const [modalType, setModalType] = useState("add");

  const handleClose = () => {
    setShow(false);
    setFormData({
      Id: "",
      ClientName: "",
      Phone: "",
      cityID: "",
      CrmStatusID: "",
      CrmComment: "",
    });
  };

  return (
    <>
      <Button
        variant="light"
        className="col-12 mb-3"
        onClick={() =>
          openModal(
            "add",
            "Request",
            null,
            setFormData,
            setModalType,
            setShow,
            setShowDelete
          )
        }
      >
        <i className="bi bi-plus-lg"></i>
      </Button>

      <Row>
        {content
          .filter((item) => item.CrmStatusID == 1)
          .map((item) => (
            <Col sm={6} md={6} lg={6} xl={4} key={item.Id}>
              <Card className="mb-3">
                <Card.Body style={{ paddingBottom: "10px" }}>
                  <div className="d-flex justify-content-between">
                    <Card.Title className="mb-2">
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
                          <Dropdown.Item
                            onClick={() =>
                              openModal(
                                "edit",
                                "Request",
                                item,
                                setFormData,
                                setModalType,
                                setShow,
                                setShowDelete
                              )
                            }
                          >
                            <i className="bi bi-pencil-square me-2"></i>
                            Изменить
                          </Dropdown.Item>
                          <Dropdown.Item
                            onClick={() =>
                              openModal(
                                "delete",
                                "Request",
                                item.Id,
                                setFormData,
                                setModalType,
                                setShow,
                                setShowDelete
                              )
                            }
                          >
                            <i className="bi bi-trash me-2"></i>
                            Удалить
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
                        <small>{item.CrmComment}</small>
                      </Col>
                    </Row>
                  </div>
                  <hr style={{ marginTop: "6px", marginBottom: "6px" }} />
                  <Row>
                    <Col></Col>
                    <Col></Col>
                  </Row>
                </Card.Body>
              </Card>
            </Col>
          ))}
      </Row>

      <AddEditModal
        show={show && (modalType === "add" || modalType === "edit")}
        onHide={handleClose}
        formData={formData}
        onFormChange={(e) => formEdit(e, setFormData)}
        onSave={
          modalType === "add"
            ? () =>
                addItem(formData, "crm_add_cls_main", setContent, handleClose)
            : () =>
                editItem(formData, "crm_edit_cls_main", setContent, handleClose)
        }
        isEditMode={modalType === "edit"}
      />

      <DeleteModal
        show={showDelete}
        onHide={() => handleCloseDelete(setShowDelete)}
        onConfirm={() =>
          deleteItem(formData, "crm_delete_cls_main", setContent, () =>
            handleCloseDelete(setShowDelete)
          )
        }
      />
    </>
  );
}
