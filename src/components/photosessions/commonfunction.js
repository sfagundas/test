// commonfunction.js

export const API = {
  EditMain: "edit_main_info",
  AddPhotosession: "add_photosession",
};

export const formEdit = (e, setFormData) => {
  const { name, value } = e.target;
  setFormData((prevData) => ({
    ...prevData,
    [name]: value,
  }));
};

export const addItem = async (formData, api, setItems, handleClose) => {
  try {
    const response = await fetch(`http://okalbm.ru/api/single_class/${api}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || "Ошибка сервера");
    }

    const result = await response.json();

    if (!result.Id) {
      throw new Error("Сервер не вернул Id");
    }

    const newItem = {
      Id: String(result.Id),
      PhTypeId: formData.StatusId,
      ClassId: formData.ClassId,
      StatusId: "1",
      // Добавьте остальные обязательные поля, которые есть в других элементах
    };

    setItems((prevContent) => {
      const updatedContent = [...prevContent, newItem];
      console.log("Обновленный content:", updatedContent);
      return updatedContent;
    });

    handleClose(); // Закрываем модальное окно
  } catch (error) {
    console.error("Ошибка:", error);
    alert("Не удалось добавить: " + error.message);
  }
};

export const editItem = async (formData, api, setItems, handleClose) => {
  try {
    // Отправляем данные на сервер для обновления
    const response = await fetch(
      `http://okalbm.ru/api/single_class/${api}/${formData.Id}`,
      {
        method: "PUT", // или "PATCH", в зависимости от вашего API
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData), // Отправляем данные формы
      }
    );

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || "Ошибка сервера");
    }

    setItems((prevItems) =>
      prevItems.map((item) =>
        item.Id === formData.Id ? { ...item, ...formData } : item
      )
    );
    handleClose();
  } catch (error) {
    console.error("Ошибка:", error);
    alert("Не удалось обновить запись: " + error.message);
  }
};

export const deleteItem = async (formData, api, setItems, handleClose) => {
  try {
    // Отправляем запрос на сервер для удаления
    const response = await fetch(
      `http://okalbm.ru/api/insert/${api}/${formData.Id}`,
      {
        method: "DELETE", // Используем метод DELETE
      }
    );

    if (!response.ok) {
      throw new Error("Ошибка при удалении");
    }

    setItems((prevItems) =>
      prevItems.filter((item) => item.Id !== formData.Id)
    );

    handleClose();
  } catch (error) {
    console.error("Ошибка:", error);
    alert("Не удалось удалить запись: " + error.message);
  }
};

export const toWork = async (formData, api, setItems, handleClose) => {
  try {
    // Отправляем запрос на сервер для удаления
    const response = await fetch(
      `http://okalbm.ru/api/insert/${api}/${formData.Id}`,
      {
        method: "put",
      }
    );

    if (!response.ok) {
      throw new Error("Ошибка при переносе");
    }

    setItems((prevItems) =>
      prevItems.filter((item) => item.Id !== formData.Id)
    );

    handleClose();
  } catch (error) {
    console.error("Ошибка:", error);
    alert("Не удалось перенести запись: " + error.message);
  }
};

export const openModal = (type, setShow) => {
  setShow(true);
};
