import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Tab from "react-bootstrap/Tab";
import Nav from "react-bootstrap/Nav";
import { useState, useEffect } from "react";

import DirPhTypes from "./directory/DirPhTypes";
import DirPhStatuses from "./directory/DirPhStatuses";
import DirAlbumTypes from "./directory/DirAlbumTypes";
import DirCities from "./directory/DirCities";
import DirCrmStatuses from "./directory/DirCrmStatuses";
import DirPhotographers from "./directory/DirPhotographers";
import DirLocation from "./directory/DirLocation";

function Directory() {
  const [activeTab, setActiveTab] = useState(() => {
    const savedTab = localStorage.getItem("activeTabDirectory");
    return savedTab || "phType";
  });

  useEffect(() => {
    localStorage.setItem("activeTabDirectory", activeTab);
  }, [activeTab]);

  const handleSelect = (selectedTab) => {
    setActiveTab(selectedTab);
  };

  return (
    <>
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
        <h1 className="h2">Справочники</h1>
      </div>

      <Tab.Container
        id="left-tabs-example"
        defaultActiveKey="first"
        activeKey={activeTab}
        onSelect={handleSelect}
      >
        <Row>
          <Col xxl={2} xl={3} lg={3} md={4} sm={5}>
            <Nav variant="pills" className="flex-column">
              <Nav.Item>
                <Nav.Link eventKey="phType">Типы съемок</Nav.Link>
              </Nav.Item>

              <Nav.Item>
                <Nav.Link eventKey="phStatus">Статусы съемок</Nav.Link>
              </Nav.Item>

              <Nav.Item>
                <Nav.Link eventKey="albumTypes">Типы альбомов</Nav.Link>
              </Nav.Item>

              <Nav.Item>
                <Nav.Link eventKey="cities">Города</Nav.Link>
              </Nav.Item>

              <Nav.Item>
                <Nav.Link eventKey="crmStatus">CRM статусы</Nav.Link>
              </Nav.Item>

              <Nav.Item>
                <Nav.Link eventKey="photographers">Фотографы</Nav.Link>
              </Nav.Item>

              <Nav.Item>
                <Nav.Link eventKey="location">Локации</Nav.Link>
              </Nav.Item>
            </Nav>
          </Col>

          <Col xxl={10} xl={9} lg={9} md={8} sm={7}>
            <Tab.Content>
              <Tab.Pane eventKey="phType" title="phType">
                <DirPhTypes />
              </Tab.Pane>

              <Tab.Pane eventKey="phStatus" title="phStatus">
                <DirPhStatuses />
              </Tab.Pane>

              <Tab.Pane eventKey="albumTypes" title="albumTypes">
                <DirAlbumTypes />
              </Tab.Pane>

              <Tab.Pane eventKey="cities" title="cities">
                <DirCities />
              </Tab.Pane>

              <Tab.Pane eventKey="crmStatus" title="crmStatus">
                <DirCrmStatuses />
              </Tab.Pane>

              <Tab.Pane eventKey="photographers" title="photographers">
                <DirPhotographers />
              </Tab.Pane>

              <Tab.Pane eventKey="location" title="location">
                <DirLocation />
              </Tab.Pane>
            </Tab.Content>
          </Col>
        </Row>
      </Tab.Container>
    </>
  );
}

export default Directory;
