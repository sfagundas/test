import { Button } from "react-bootstrap";
import CardContent from "./Main/CardContent";

export default function Request({ content, controlFormData }) {
  return (
    <>
      <Button
        variant="light"
        className="col-12 mb-3"
        onClick={() => controlFormData("add", null)}
      >
        <i className="bi bi-plus-lg"></i>
      </Button>

      <CardContent
        content={content}
        controlFormData={controlFormData}
        StatusId={1}
      />
    </>
  );
}
