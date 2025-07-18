import { Form, Button, Row, Col } from "react-bootstrap";
import PhTypeSelect from "../custom/PhTypeSelect";
import CitySelect from "../custom/SelectCities";
import SelectCRMstatus from "../custom/SelectCRMstatus";
import SelectPhotographers from "../custom/SelectPhotographers";
import SelectLocation from "../custom/SelectLocation";

const UniversalForm = ({
  fields,
  onFormChange,
  onSubmit,
  formData,
  submitButtonText = "Submit",
}) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit();
  };

  // Группируем поля по строкам
  const groupedFields = fields.reduce((acc, field) => {
    const rowIndex = field.row || 0;
    if (!acc[rowIndex]) {
      acc[rowIndex] = [];
    }
    acc[rowIndex].push(field);
    return acc;
  }, []);

  return (
    <Form onSubmit={handleSubmit} autoComplete="off">
      {" "}
      {/* 1. Главный уровень */}
      {groupedFields.map((rowFields, rowIndex) => (
        <Row key={`row-${rowIndex}`} className="mb-3">
          {rowFields.map((field) => (
            <Col className="mb-2" key={field.name} sm={field.colSize || 12}>
              <Form.Group>
                <Form.Label>{field.label}</Form.Label>
                {field.type === "textarea" ? (
                  <Form.Control
                    as="textarea"
                    rows={3}
                    name={field.name}
                    value={formData[field.name] || ""}
                    onChange={onFormChange}
                    required={field.required}
                    autoComplete="off" // 3. Для textarea
                  />
                ) : field.type === "phTypeSelect" ? (
                  <PhTypeSelect
                    onChange={onFormChange}
                    value={formData[field.name]}
                  />
                ) : field.type === "selectCities" ? (
                  <CitySelect
                    onChange={onFormChange}
                    value={formData[field.name]}
                  />
                ) : field.type === "selectPhotographers" ? (
                  <SelectPhotographers
                    onChange={onFormChange}
                    value={formData[field.name]}
                  />
                ) : field.type === "selectLocation" ? (
                  <SelectLocation
                    onChange={onFormChange}
                    value={formData[field.name]}
                  />
                ) : field.type === "selectCrmStatus" ? (
                  <SelectCRMstatus
                    onChange={onFormChange}
                    value={formData[field.name]}
                  />
                ) : (
                  <Form.Control
                    type={field.type || "text"}
                    name={field.name}
                    value={formData[field.name] || ""}
                    onChange={onFormChange}
                    required={field.required}
                    autoComplete="off"
                  />
                )}
              </Form.Group>
            </Col>
          ))}
        </Row>
      ))}
      <Button variant="primary" type="submit">
        {submitButtonText}
      </Button>
    </Form>
  );
};

export default UniversalForm;
