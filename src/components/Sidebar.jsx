import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

import logo from "../images/logo.jpg";

const Sidebar = () => {
  function getPathSegmentRegex(path) {
    const match = path.match(/^\/([^\/]+)\/[^\/]+/);
    return match ? `/${match[1]}` : path;
  }

  const location = useLocation();
  const segment = getPathSegmentRegex(location.pathname);
  const [activeLink, setActiveLink] = useState(segment);
  const handleLinkClick = (path) => {
    setActiveLink(path);
  };

  return (
    <>
      <Navbar expand="lg" className="bg-dark">
        <Container>
          <Navbar.Brand>
            <div style={{ borderRadius: "5px", overflow: "hidden" }}>
              <img src={logo} alt="Логотип" height="34" className="logo" />
            </div>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link
                as={Link}
                to="/CRM"
                className={activeLink === "/CRM" ? "active" : "text-white"}
                onClick={() => handleLinkClick("/CRM")}
              >
                <i className="bi bi-card-checklist me-2"></i> CRM
              </Nav.Link>
              <Nav.Link
                as={Link}
                to="/classes"
                className={activeLink === "/classes" ? "active" : "text-white"}
                onClick={() => handleLinkClick("/classes")}
              >
                <i className="bi bi-table me-2"></i>Классы
              </Nav.Link>
              <Nav.Link
                as={Link}
                to="/photo"
                className={activeLink === "/photo" ? "active" : "text-white"}
                onClick={() => handleLinkClick("/photo")}
              >
                <i className="bi bi-record-btn me-2"></i>Фотосессии
              </Nav.Link>
              <Nav.Link
                as={Link}
                to="/directory"
                className={
                  activeLink === "/directory" ? "active" : "text-white"
                }
                onClick={() => handleLinkClick("/directory")}
              >
                <i className="bi bi-book me-2"></i>Справочники
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default Sidebar;
