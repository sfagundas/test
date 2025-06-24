import React, { useState, useEffect } from "react";
import { Alert } from "react-bootstrap";

const Notification = () => {
  const [notification, setNotification] = useState(null);
  const [show, setShow] = useState(false);

  // Глобальная функция для показа уведомлений
  useEffect(() => {
    const showNotification = (message, variant = "success") => {
      setNotification({ message, variant });
      setShow(true);
    };

    window.showNotification = showNotification;

    return () => {
      delete window.showNotification;
    };
  }, []);

  useEffect(() => {
    if (show) {
      const timer = setTimeout(() => setShow(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [show]);

  if (!show) return null;

  return (
    <div
      style={{
        position: "fixed",
        bottom: "20px",
        right: "20px",
        zIndex: 9999,
      }}
    >
      <Alert
        variant={notification.variant}
        onClose={() => setShow(false)}
        dismissible
      >
        {notification.message}
      </Alert>
    </div>
  );
};

export default Notification;
