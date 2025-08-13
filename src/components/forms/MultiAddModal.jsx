import { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";

const MultiAddModal = ({ show, onHide, onSubmit, classId }) => {
  const [inputText, setInputText] = useState("");

  const handleAdd = () => {
    const lines = inputText.split("\n").filter((line) => line.trim() !== "");

    const hasInvalidFormat = lines.some(
      (line) => line.trim().split(/\s+/).length < 2
    );

    if (hasInvalidFormat) {
      alert(
        "Некоторые строки имеют неправильный формат. Используйте 'Фамилия Имя'"
      );
      return;
    }

    const studentsData = lines.map((line) => {
      const [Name, LastName] = line.trim().split(/\s+/);
      return {
        Name: Name || "",
        LastName: LastName || "",
        ClassId: classId,
      };
    });

    onSubmit(studentsData);
    setInputText("");
    onHide();
  };

  return (
    <Modal show={show} onHide={onHide} size="6">
      <Modal.Header closeButton>
        <Modal.Title>Добавление нескольких учеников</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Group>
          <Form.Label>
            Введите фамилии и имена учеников (каждый с новой строки в формате
            "Фамилия Имя"):
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
        <Button variant="secondary" onClick={onHide}>
          Отмена
        </Button>
        <Button variant="primary" onClick={handleAdd}>
          {" "}
          {/* Используем handleAdd */}
          Добавить учеников
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default MultiAddModal;
