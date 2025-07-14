import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";

const UniversalFormModal = ({
  show,
  onHide,
  title = "Форма",
  fields = [],
  onSubmit,
  submitText = "Отправить",
}) => {
  const [formData, setFormData] = useState({});

  const handleChange = (fieldName, value) => {
    setFormData((prev) => ({ ...prev, [fieldName]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    onHide();
  };

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          {fields.map((field) => (
            <Form.Group key={field.name} className="mb-3">
              <Form.Label>{field.label}</Form.Label>
              {field.type === "select" ? (
                <Form.Select
                  value={formData[field.name] || ""}
                  onChange={(e) => handleChange(field.name, e.target.value)}
                  required={field.required}
                >
                  {field.options?.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </Form.Select>
              ) : field.type === "textarea" ? (
                <Form.Control
                  as="textarea"
                  value={formData[field.name] || ""}
                  onChange={(e) => handleChange(field.name, e.target.value)}
                  required={field.required}
                />
              ) : (
                <Form.Control
                  type={field.type || "text"}
                  value={formData[field.name] || ""}
                  onChange={(e) => handleChange(field.name, e.target.value)}
                  required={field.required}
                />
              )}
            </Form.Group>
          ))}
          <Button variant="primary" type="submit">
            {submitText}
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default UniversalFormModal;
