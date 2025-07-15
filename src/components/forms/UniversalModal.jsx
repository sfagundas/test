import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";

const UniversalForm = ({
  fields,
  onFormChange,
  onSubmit,
  formData,
  submitButtonText = "Submit",
}) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit();
  };

  return (
    <Form onSubmit={handleSubmit}>
      {fields.map((field) => (
        <Form.Group key={field.name} className="mb-3">
          <Form.Label>{field.label}</Form.Label>
          {field.type === "textarea" ? (
            <Form.Control
              as="textarea"
              rows={3}
              name={field.name}
              value={formData[field.name] || ""}
              onChange={onFormChange}
              required={field.required}
            />
          ) : (
            <Form.Control
              type={field.type || "text"}
              name={field.name}
              value={formData[field.name] || ""}
              onChange={onFormChange}
              required={field.required}
            />
          )}
        </Form.Group>
      ))}
      <Button variant="primary" type="submit">
        {submitButtonText}
      </Button>
    </Form>
  );
};

export default UniversalForm;
