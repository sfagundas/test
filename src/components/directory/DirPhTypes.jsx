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
  handleCloseDelete,
  formEdit,
  addItem,
  editItem,
  deleteItem,
  openModal,
  fetchContent,
} from './commonfunction';

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
          {isEditMode ? "Редактировать тип съёмок" : "Добавить тип съёмок"}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <input type="hidden" name="Id" value={formData.Id} />
          <Row>
            <Col sm={12}>
              <Form.Group className="mb-3" controlId="Value">
                <Form.Label>Тип съёмок</Form.Label>
                <InputGroup>
                  <InputGroup.Text id="inputValuePrepend">
                    <i className="bi bi-camera"></i>
                  </InputGroup.Text>
                  <Form.Control
                    type="text"
                    name="Value"
                    placeholder="Название"
                    onChange={onFormChange}
                    value={formData.Value}
                    aria-describedby="inputValuePrepend"
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
const DeleteModal = ({ show, onHide, onConfirm }) => {
  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Удалить тип съёмок</Modal.Title>
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

// Основной компонент DirPhTypes
export default function DirPhTypes() {
  const [modalType, setModalType] = useState("add");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [show, setShow] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [mainContent, setMainContent] = useState();
  const [formData, setFormData] = useState({
    Id: "",
    Value: "",
    Comment: "",
  });
 
  
  useEffect(() => {
          const loadPhType = async () => {
            try {
              const data = await fetchContent("ph_types_list");
              setMainContent(data);
            } catch (error) {
              setError(error.message);
            } finally {
              setLoading(false);
            }
          };
          loadPhType();
        }, []);
      
        if (loading) {
          return <div>Загрузка...</div>;
        }
      
        if (error) {
          return <div>Ошибка: {error}</div>;
        }

  const handleClose = () => {
      setShow(false);
      setFormData({
      Id: "",
      Value: "",
      Comment: "",
      });
    };

  return (
    <>
      <Button
        variant="light"
        className="col-12 mb-3"
        onClick={() => openModal("add", "phType", null, setFormData, setModalType, setShow, setShowDelete)}
      >
        <i className="bi bi-plus-lg"></i>
      </Button>

      <Row>
        {mainContent.map((phType) => (
          <Col lg={6} key={phType.Id}>
            <Card className="mb-3">
              <Card.Body>
                <div className="d-flex justify-content-between">
                  <Card.Title className="mb-2">{phType.Value}</Card.Title>
                  <div>
                    <Dropdown>
                      <Dropdown.Toggle
                        variant="light"
                        className="btn-sm pt-0 pb-0"
                        id="dropdown-basic"
                      ></Dropdown.Toggle>
                      <Dropdown.Menu>
                        <Dropdown.Item
                          onClick={() => openModal("edit", "phType", phType, setFormData, setModalType, setShow, setShowDelete)}
                        >
                          <i className="bi bi-pencil-square me-2"></i>
                          Изменить
                        </Dropdown.Item>
                        <Dropdown.Item
                          onClick={() => openModal("delete", "phType", phType.Id, setFormData, setModalType, setShow, setShowDelete)}
                        >
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
      {phType.Comment && <i className="bi bi-chat-right-text me-3"></i>}
    </Col>
    <Col sm={11}>
      {phType.Comment && <small>{phType.Comment}</small>}
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
        onHide={handleClose}
        formData={formData}
        onFormChange={(e) => formEdit(e, setFormData)}
        onSave={
          modalType === "add"
            ? () => addItem(formData, 'add_dir_ph_types', setMainContent, handleClose)
            : () => editItem(formData, 'edit_dir_ph_types', setMainContent, handleClose)
        }
        isEditMode={modalType === "edit"}
      />

      <DeleteModal
        show={showDelete}
        onHide={() => handleCloseDelete(setShowDelete)}
        onConfirm={() => deleteItem(formData, 'delete_dir_ph_types', setMainContent, () => handleCloseDelete(setShowDelete))}
      />
    </>
  );
}