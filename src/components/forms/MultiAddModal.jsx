import { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";

const MultiAddModal = ({
  show,
  onHide,
  onSubmit,
  initialData,
  fields,
  title = "Добавление записей",
  validationError = "Неправильный формат данных",
}) => {
  const [inputText, setInputText] = useState("");

  // Сбрасываем текст при каждом закрытии модалки
  useEffect(() => {
    if (!show) {
      setInputText("");
    }
  }, [show]);

  const handleAdd = () => {
    const lines = inputText.split("\n").filter((line) => line.trim() !== "");

    const hasInvalidFormat = lines.some((line) => {
      const parts = line.trim().split(/\s+/);
      return parts.length < fields.filter((f) => f.required).length;
    });

    if (hasInvalidFormat) {
      alert(validationError);
      return;
    }

    const recordsData = lines.map((line) => {
      const values = line.trim().split(/\s+/);
      const record = { ...initialData };

      fields.forEach((field, index) => {
        if (values[index]) {
          record[field.name] = values[index];
        }
      });

      return record;
    });

    onSubmit(recordsData);
    setInputText("");
    onHide(); // Используем переданный onHide
  };

  const handleClose = () => {
    setInputText("");
    onHide(); // Вызываем оригинальный onHide
  };

  return (
    <Modal show={show} onHide={handleClose} size="6">
      {" "}
      {/* Используем handleClose здесь */}
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Group>
          <Form.Label>
            Введите данные (каждый с новой строки в формате "
            {fields.map((f) => f.label).join(" ")}"):
          </Form.Label>
          <Form.Control
            as="textarea"
            rows={5}
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
          />
        </Form.Group>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          {" "}
          {/* Используем handleClose */}
          Отмена
        </Button>
        <Button variant="primary" onClick={handleAdd}>
          Добавить
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default MultiAddModal;
