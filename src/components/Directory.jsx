import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Tab from "react-bootstrap/Tab";
import Nav from "react-bootstrap/Nav";
import { useState } from "react";

import DirCities from "./directory/DirCities";
import DirCrmStatuses from "./directory/DirCrmStatuses";
import DirPhStatuses from "./directory/DirPhStatuses";

function Directory() {
  const [key, setKey] = useState("cities");

  return (
    <>
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
        <h1 className="h2">Справочники</h1>
      </div>

      <Tab.Container
        id="left-tabs-example"
        defaultActiveKey="first"
        activeKey={key}
        onSelect={(k) => setKey(k)}
      >
        <Row>
          <Col xxl={2} xl={3} lg={3} md={4} sm={5}>
            <Nav variant="pills" className="flex-column">
              <Nav.Item>
                <Nav.Link eventKey="cities">Города</Nav.Link>
              </Nav.Item>
            </Nav>
            <Nav variant="pills" className="flex-column">
              <Nav.Item>
                <Nav.Link eventKey="crmStatuses">Crm статусы</Nav.Link>
              </Nav.Item>
            </Nav>
            <Nav variant="pills" className="flex-column">
              <Nav.Item>
                <Nav.Link eventKey="phStatuses">Ph статусы</Nav.Link>
              </Nav.Item>
            </Nav>
          </Col>

          <Col xxl={10} xl={9} lg={9} md={8} sm={7}>
            <Tab.Content>
              <Tab.Pane eventKey="cities" title="cities">
                <DirCities />
              </Tab.Pane>

              <Tab.Pane eventKey="crmStatuses" title="crmStatuses">
                <DirCrmStatuses />
              </Tab.Pane>

              <Tab.Pane eventKey="phStatuses" title="phStatuses">
                <DirPhStatuses />
              </Tab.Pane>
            </Tab.Content>
          </Col>
        </Row>
      </Tab.Container>
    </>
  );
}

export default Directory;
