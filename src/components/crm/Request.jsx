import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { API, formEdit, addItem, editItem, deleteItem } from "./commonfunction";

import CardContent from "./Main/CardContent";

import AddEditModal from "./Forms/AddEditModal";
import CommentModal from "./Forms/CommentModal";
import DateModal from "./Forms/DateModal";
import StatusModal from "./Forms/StatusModal";

export default function Request({
  content,
  setContent,
  modalType,
  show,
  setFormData,
  handleClose,
  controlFormData,
  formData,
}) {
  return (
    <>
      <Button
        variant="light"
        className="col-12 mb-3"
        onClick={() => controlFormData("add", null)}
      >
        <i className="bi bi-plus-lg"></i>
      </Button>

      <CardContent
        content={content}
        controlFormData={controlFormData}
        StatusId={1}
      />

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
        onSave={() =>
          editItem(formData, API["EditComment"], setContent, handleClose)
        }
      />

      <DateModal
        show={show && modalType === "date"}
        onHide={() => handleClose()}
        formData={formData}
        onFormChange={(e) => formEdit(e, setFormData)}
        onSave={() =>
          editItem(formData, API["EditCrmDate"], setContent, handleClose)
        }
      />

      <StatusModal
        show={show && modalType === "status"}
        onHide={() => handleClose()}
        formData={formData}
        onFormChange={(e) => formEdit(e, setFormData)}
        onSave={() =>
          editItem(formData, API["EditStatus"], setContent, handleClose)
        }
      />
    </>
  );
}
