import React from "react";
import { Card, Dropdown, Row, Col, Accordion } from "react-bootstrap";
import OkBadgeDate from "../../custom/OkBadgeDate";
import CrmAccordion from "../../custom/CrmAccordion";

const CardContent = ({ content, controlFormData, StatusId }) => {
  return (
    <Row>
      {content
        .filter((item) => item.StatusId == StatusId || !item.StatusId)
        .map((item) => (
          <Col sm={12} md={8} lg={6} key={item.Id}>
            <Card className="mb-3">
              <Card.Body style={{ paddingBottom: "10px" }}>
                <div className="d-flex justify-content-between">
                    <small style={{ fontSize: "20px", flex: "1 1 auto" }} className="flex-grow-2">{item.ClientName}</small>
                    <small style={{ fontSize: "20px", flex: "1 1 auto"}} className="flex-grow-2">{/*{item.CityId}*/}Петропавловск-Камчатский</small>
                     <div style={{ flex: "0 0 auto" }}>       
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
                <div className="my-3 d-flex justify-content-between">
                <div style={{flex:"1 1 auto"}}>
                {item.NextDate && item.NextDate.trim() !== "" && (
                  <OkBadgeDate date={item.NextDate} />
                  
                )}</div>
                <small style={{ fontSize: "20px", flex: "1 1 auto" }} >{item.Phone}</small>
                </div>
                
          <CrmAccordion content={item.ManagerNotes}></CrmAccordion>
              </Card.Body>
            </Card>
          </Col>
        ))}
    </Row>
  );
};
export default CardContent;
