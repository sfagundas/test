import React, { useState } from "react";
import { Card, Row, Col, Button, Modal, Dropdown, Form } from "react-bootstrap";
import {
  API,
  formEdit,
  addItem,
  editItem,
  toWork,
  openModal,
} from "./commonfunction";

import CardContent from "./Main/CardContent";

import AddEditModal from "./Forms/AddEditModal";
import CommentModal from "./Forms/CommentModal";
import DateModal from "./Forms/DateModal";
import StatusModal from "./Forms/StatusModal";
import ToWorkModal from "./Forms/ToWorkModal";

export default function Documents({
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
      <CardContent
        content={content}
        controlFormData={controlFormData}
        StatusId={4}
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
      <ToWorkModal
        show={show && modalType === "to_work"}
        onHide={() => handleClose()}
        onConfirm={() =>
          toWork(formData, API["toWork"], setContent, handleClose)
        }
      />
    </>
  );
}
