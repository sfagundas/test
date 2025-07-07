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
import { Link } from "react-router-dom";
import OkBadgeDate from "../custom/OkBadgeDate";

export default function noReserved({
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
      {content
        .filter((item) => item.StatusId == 3 || !item.StatusId)
        .map((item) => (
          <Col sm={12}>
            <Card className="mb-3">
              <Card.Body style={{ paddingBottom: "10px" }}>
                <div className="d-flex justify-content-between">
                  <Card.Title className="mb-2">
                    <div className="d-flex align-items-center">
                      <span style={{ fontSize: "14px" }}>
                        <Link to={`/classes/single_class/${item.Id}`}>
                          {item.ClientName}
                        </Link>
                      </span>
                    </div>
                  </Card.Title>
                </div>
                <div className="mb-2 text-body-secondary">
                  <Row>
                    <Col sm={1} className="pt-1" style={{ fontSize: "12px" }}>
                      <i className="bi bi-telephone "></i>
                    </Col>
                    <Col sm={10}>
                      <small style={{ fontSize: "11px" }}>
                        8-888-888-88-88
                      </small>
                    </Col>
                  </Row>
                </div>
                <div
                  className="mb-2 text-body-secondary"
                  style={{ fontSize: "12px" }}
                >
                  <Row>
                    <Col sm={1} className="pt-1">
                      <i className="bi bi-chat-right-text me-3"></i>
                    </Col>
                    <Col sm={10}>
                      <small>Записка менеджера</small>
                    </Col>
                  </Row>
                </div>

                <OkBadgeDate date={"2025-04-20"} />
              </Card.Body>
            </Card>
          </Col>
        ))}
    </>
  );
}
