import { Card, Dropdown, Row, Col } from "react-bootstrap";
export default function Details({ content, controlFormData }) {
  return (
    <>
      <Row>
        {content &&
          content.map((item) => (
            <Col lg={6} key={item.Id}>
              <Card className="mb-3">
                <Card.Body>
                  <div className="d-flex justify-content-between">
                    <Card.Title className="mb-2">Details</Card.Title>
                    <div>
                      <Dropdown>
                        <Dropdown.Toggle
                          variant="light"
                          className="btn-sm pt-0 pb-0"
                          id="dropdown-basic"
                        ></Dropdown.Toggle>

                        <Dropdown.Menu>
                          <Dropdown.Item
                            onClick={() =>
                              controlFormData("editMainInfo", item)
                            }
                          >
                            <i className="bi bi-pencil-square me-2"></i>
                            Изменить
                          </Dropdown.Item>
                        </Dropdown.Menu>
                      </Dropdown>
                    </div>
                  </div>
                  <div className="mb-2 text-body-secondary row">
                    <Row>
                      <Col>
                        <small>{item.School} </small>
                      </Col>
                    </Row>
                  </div>
                  <div className="mb-2 text-body-secondary row">
                    <Row>
                      <Col>
                        <small>{item.FullSchoolName} </small>
                      </Col>
                    </Row>
                  </div>
                  <div className="mb-2 text-body-secondary row">
                    <Row>
                      <Col>
                        <small>{item.ParentName} </small>
                      </Col>
                    </Row>
                  </div>
                  <div className="mb-2 text-body-secondary row">
                    <Row>
                      <Col>
                        <small>{item.ParentPhone} </small>
                      </Col>
                    </Row>
                  </div>
                  <div className="mb-2 text-body-secondary row">
                    <Row>
                      <Col>
                        <small>{item.TeacherName} </small>
                      </Col>
                    </Row>
                  </div>
                  <div className="mb-2 text-body-secondary row">
                    <Row>
                      <Col>
                        <small>{item.TeacherPhone} </small>
                      </Col>
                    </Row>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
      </Row>
    </>
  );
}
