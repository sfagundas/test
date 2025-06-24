import { useState } from "react";

export const useModal = (initialData) => {
  const [show, setShow] = useState(false); // Состояние видимости модального окна #1
  const [showDelete, setShowDelete] = useState(false); // Состояние видимости модального окна #2
  const [formData, setFormData] = useState(initialData); // Данные формы

  // Открытие модального окна
  const handleShow = () => {
    setShow(true);
  };

  const handleShowDelete = () => {
    setShowDelete(true);
  };

  // Закрытие модального окна и сброс данных формы
  const handleClose = () => {
    setFormData(initialData);
    setShow(false);
  };
  const handleCloseDelete = () => {
    setShowDelete(false);
  };

  // Обновление данных формы
  const formEdit = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return {
    show,
    showDelete,
    formData,
    handleShow,
    handleClose,
    handleShowDelete,
    handleCloseDelete,
    formEdit,
    setFormData, // Для ручного обновления данных формы
  };
};
