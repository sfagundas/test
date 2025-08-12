import { Modal, Button } from "react-bootstrap";
import UniversalModal from "./UniversalForm";

const UniversalModalForm = ({
  show,
  onHide,
  onFormChange,
  formData,
  title,
  fields,
  onSubmit,
  submitButtonText,
  isMultiAdd = false, // Новый пропс
  multiAddHandler, // Функция для обработки мультидобавления
}) => {
  return (
    <Modal show={show} onHide={onHide} size={isMultiAdd ? "lg" : undefined}>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <UniversalModal
          fields={fields}
          onFormChange={onFormChange}
          formData={formData}
          onSubmit={(e) => {
            if (isMultiAdd) {
              e.preventDefault();
              multiAddHandler(formData);
            } else {
              onSubmit(e);
            }
          }}
          submitButtonText={submitButtonText}
        />
      </Modal.Body>
      {!isMultiAdd && (
        <Modal.Footer>
          <Button variant="secondary" onClick={onHide}>
            Отмена
          </Button>
          <Button variant="primary" type="submit">
            {submitButtonText}
          </Button>
        </Modal.Footer>
      )}
    </Modal>
  );
};

export default UniversalModalForm;
