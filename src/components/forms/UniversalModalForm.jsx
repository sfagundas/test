import React from "react";
import { Modal } from "react-bootstrap";
import UniversalModal from "./UniversalModal";

const UniversalModalForm = ({
  show,
  onHide,
  onFormChange,
  formData,
  title,
  fields,
  onSubmit,
  submitButtonText,
}) => {
  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <UniversalModal
          fields={fields}
          onFormChange={onFormChange}
          formData={formData}
          onSubmit={(data) => {
            onSubmit(data);
            onHide();
          }}
          submitButtonText={submitButtonText}
        />
      </Modal.Body>
    </Modal>
  );
};

export default UniversalModalForm;
