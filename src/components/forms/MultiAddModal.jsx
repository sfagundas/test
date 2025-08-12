import { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";

const MultiAddModal = ({ show, onHide, onSubmit, classId }) => {
  // Добавляем classId в props
  const [inputText, setInputText] = useState("");

  const handleAdd = () => {
    // Переименовываем handleSubmit в handleAdd
    const lines = inputText.split("\n").filter((line) => line.trim() !== "");

    // Проверяем, что все строки в правильном формате
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
      const [LastName, FirstName] = line.trim().split(/\s+/);
      return {
        FirstName: FirstName || "",
        LastName: LastName || "",
        ClassId: classId, // Используем переданный classId
      };
    });

    onSubmit(studentsData);
    setInputText("");
    onHide();
  };

  return (
    <Modal show={show} onHide={onHide} size="lg">
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
            rows={10}
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Иванов Алексей\nПетрова Мария\n..."
          />
          <Form.Text className="text-muted">
            Пример ввода: Фамилия и Имя через пробел, каждый ученик с новой
            строки
          </Form.Text>
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
