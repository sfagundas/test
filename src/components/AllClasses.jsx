import React from "react";
import { Row, Col, Card, Spinner } from "react-bootstrap";
import { useState, useEffect } from "react";
import OkBadgeDate from "./custom/OkBadgeDateCrm";
// import OkBadgeDate from "./custom/OkBadgeDate";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

function AllClasses() {
  const [content, setContent] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Функция для получения данных из API
    const fetchData = async () => {
      try {
        const response = await fetch(
          "http://okalbm.ru/api/api/work_class_list"
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setContent(data);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData(); // Вызываем функцию для получения данных
  }, []);

  if (isLoading) {
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ height: "100vh" }}
      >
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>
    );
  }

  if (error) {
    return (
      <div className="alert alert-danger m-3">
        Error loading data: {error}
        <Link to="/classes" className="ms-2">
          Back to classes
        </Link>
      </div>
    );
  }

  return (
    <>
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
        <h1 className="h2">Классы в работе</h1>
      </div>

      <Row>
        {content.map((item) => (
          <Col sm={12}>
            <Card className="mb-3">
              <Card.Body style={{ paddingBottom: "10px" }}>
                <div className="d-flex justify-content-between">
                  <Card.Title className="mb-0">
                    <div className="d-flex align-items-center">
                      <span style={{ fontSize: "25px" }}>
                        <Link to={`/classes/single_class/${item.Id}`}>
                          {item.ClientName}
                        </Link>
                      </span>
                    </div>
                  </Card.Title>
                </div>
                <div className="my-3 d-flex justify-content-between">
                  <small style={{ fontSize: "25px" }}>{item.CityName}</small>
                  <small style={{ fontSize: "25px" }}>У[25]П[5]Ц[3]А[7]О[2]Ф[J]</small>
                </div>


                <div className="mb-3">
                <OkBadgeDate date={"2025-04-20"} />
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </>
  );
}

export default AllClasses;

//БЫЛО           <Card.Body style={{ paddingBottom: "10px" }}>
//                 <div className="d-flex justify-content-between">
//                   <Card.Title className="mb-2">
//                     <div className="d-flex align-items-center">
//                       <span style={{ fontSize: "14px" }}>
//                         <Link to={`/classes/single_class/${item.Id}`}>
//                           {item.ClientName}
//                         </Link>
//                       </span>
//                     </div>
//                   </Card.Title>
//                 </div>
//                 <div className="mb-2 text-body-secondary">
//                   <Row>
//                     <Col sm={1} className="pt-1" style={{ fontSize: "12px" }}>
//                       <i className="bi bi-telephone "></i>
//                     </Col>
//                     <Col sm={10}>
//                       <small style={{ fontSize: "11px" }}>
//                         8-888-888-88-88
//                       </small>
//                     </Col>
//                   </Row>
//                 </div>
//                 <div
//                   className="mb-2 text-body-secondary"
//                   style={{ fontSize: "12px" }}
//                 >
//                   <Row>
//                     <Col sm={1} className="pt-1">
//                       <i className="bi bi-chat-right-text me-3"></i>
//                     </Col>
//                     <Col sm={10}>
//                       <small>Записка менеджера</small>
//                     </Col>
//                   </Row>
//                 </div>

//                 <OkBadgeDate date={"2025-04-20"} />
//               </Card.Body>
//  