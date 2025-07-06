import React from "react";
import { Card, Dropdown, Row, Col } from "react-bootstrap";
import OkBadgeDate from "../../custom/OkBadgeDate";

const CardContent = ({ content, controlFormData, StatusId }) => {
  return (
    <Row>
      {content
        .filter((item) => item.StatusId == StatusId || !item.StatusId)
        .map((item) => (
          <Col sm={12} md={6} lg={4} xl={3} key={item.Id}>
            <Card className="mb-3">
              <Card.Body style={{ paddingBottom: "10px" }}>
                <div className="d-flex justify-content-between">
                  <Card.Title className="mb-2">
                    <div className="d-flex align-items-center">
                      <span style={{ fontSize: "14px" }}>
                        {item.ClientName}
                      </span>
                    </div>
                  </Card.Title>
                  <div>
                    <Dropdown>
                      <Dropdown.Toggle
                        variant="light"
                        className="btn-sm pt-0 pb-0"
                        id="dropdown-basic"
                      ></Dropdown.Toggle>
                      <Dropdown.Menu>
                        <Dropdown.Item
                          onClick={() => controlFormData("date", item)}
                        >
                          <i className="bi bi-calendar-event me-2"></i>
                          Дата связи
                        </Dropdown.Item>
                        <Dropdown.Item
                          onClick={() => controlFormData("comment", item)}
                        >
                          <i className="bi bi-chat-right-text me-2"></i>
                          Комментарий
                        </Dropdown.Item>
                        <Dropdown.Item
                          onClick={() => controlFormData("status", item)}
                        >
                          <i className="bi bi-arrow-left-right me-2"></i>
                          Статус
                        </Dropdown.Item>
                        <Dropdown.Item
                          onClick={() => controlFormData("edit", item)}
                        >
                          <i className="bi bi-pencil-square me-2"></i>
                          Изменить
                        </Dropdown.Item>
                        {item.StatusId == 2 && (
                          <Dropdown.Item
                            onClick={() => controlFormData("delete", item.Id)}
                          >
                            <i className="bi bi-trash me-2"></i>
                            Удалить
                          </Dropdown.Item>
                        )}
                        {item.StatusId == 4 && (
                          <Dropdown.Item
                            onClick={() => controlFormData("to_work", item.Id)}
                          >
                            <i className="bi bi-arrow-right me-2"></i>В работу
                          </Dropdown.Item>
                        )}
                      </Dropdown.Menu>
                    </Dropdown>
                  </div>
                </div>
                <div className="mb-2 text-body-secondary">
                  <Row>
                    <Col sm={1} className="pt-1" style={{ fontSize: "12px" }}>
                      <i className="bi bi-telephone "></i>
                    </Col>
                    <Col sm={10}>
                      <small style={{ fontSize: "11px" }}>{item.Phone}</small>
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
                      <small>{item.ManagerNotes}</small>
                    </Col>
                  </Row>
                </div>
                {item.NextDate && item.NextDate.trim() !== "" && (
                  <OkBadgeDate date={item.NextDate} />
                )}
              </Card.Body>
            </Card>
          </Col>
        ))}
    </Row>
  );
};
export default CardContent;
