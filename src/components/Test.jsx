import React, { useState } from "react";
import { Button } from "react-bootstrap";
import UniversalModalForm from "./forms/UniversalModalForm";

const Test = () => {
  const [showModal, setShowModal] = useState(false);

  const handleSubmit = (formData) => {
    console.log("Submitted data:", formData);
    // Отправка данных на сервер или обработка
  };

  const formFields = [
    { name: "username", label: "Username", type: "text", required: true },
    { name: "email", label: "Email", type: "email", required: true },
    { name: "password", label: "Password", type: "password", required: true },
    { name: "bio", label: "Bio", type: "textarea" },
  ];

  return (
    <div className="p-4">
      <Button onClick={() => setShowModal(true)}>Open Form Modal</Button>

      <UniversalModalForm
        show={showModal}
        onHide={() => setShowModal(false)}
        title="1"
        fields={formFields}
        onSubmit={handleSubmit}
        submitButtonText="Register"
      />
      <UniversalModalForm
        show={showModal}
        onHide={() => setShowModal(false)}
        title="2"
        fields={formFields}
        onSubmit={handleSubmit}
        submitButtonText="Register"
      />
    </div>
  );
};

export default Test;
