// commonfunction.js
export const handleCloseDelete = (setShowDelete) => {
  setShowDelete(false);
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
    const response = await fetch(`http://localhost/backend/insert/${api}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      throw new Error("Ошибка при добавлении");
    }

    const result = await response.json();

    if (!result.Id) {
      throw new Error("Сервер не вернул Id");
    }

    const newItem = {
      ...formData,
      Id: result.Id, // Используем Id, полученный от сервера
    };

    console.log("Новый элемент:", newItem);

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
      `http://localhost/backend/insert/${api}/${formData.Id}`,
      {
        method: "PUT", // или "PATCH", в зависимости от вашего API
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData), // Отправляем данные формы
      }
    );

    if (!response.ok) {
      throw new Error("Ошибка при обновлении города");
    }

    // Получаем ответ от сервера (если нужно)
    const result = await response.json();
    // Обновляем состояние только после успешного ответа от сервера
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.Id === formData.Id ? { ...item, ...formData } : item
      )
    );

    // Закрываем модальное окно
    handleClose();
  } catch (error) {
    console.error("Ошибка:", error);
    alert("Не удалось обновить город: " + error.message);
  }
};

export const deleteItem = async (
  formData,
  api,
  setItems,
  handleCloseDelete
) => {
  try {
    // Отправляем запрос на сервер для удаления
    const response = await fetch(
      `http://localhost/backend/insert/${api}/${formData.Id}`,
      {
        method: "DELETE", // Используем метод DELETE
      }
    );

    if (!response.ok) {
      throw new Error("Ошибка при удалении");
    }

    // Получаем ответ от сервера (если нужно)
    const result = await response.json();

    // Обновляем состояние только после успешного ответа от сервера
    setItems((prevItems) =>
      prevItems.filter((item) => item.Id !== formData.Id)
    );

    // Закрываем модальное окно
    handleCloseDelete();
  } catch (error) {
    console.error("Ошибка:", error);
    alert("Не удалось удалить город: " + error.message);
  }
};

export const openModal = (
  type,
  category,
  data,
  setFormData,
  setModalType,
  setShow,
  setShowDelete
) => {
  if (type === "add") {
    if (category === "Request") {
      setFormData({
        Id: "",
        ClientName: "",
        Phone: "",
        cityID: "",
        CrmStatusID: 1,
        CrmComment: "",
      });
    }
    if (category === "Good") {
      setFormData({
        Id: "",
        ClientName: "",
        Phone: "",
        cityID: "",
        CrmStatusID: 2,
        CrmComment: "",
      });
    }
    if (category === "Bad") {
      setFormData({
        Id: "",
        ClientName: "",
        Phone: "",
        cityID: "",
        CrmStatusID: 3,
        CrmComment: "",
      });
    }
    if (category === "Documents") {
      setFormData({
        Id: "",
        ClientName: "",
        Phone: "",
        cityID: "",
        CrmStatusID: 4,
        CrmComment: "",
      });
    }
    setModalType("add");
    setShow(true);
  } else if (type === "edit") {
    setFormData({
      Id: data.Id,
      ClientName: data.ClientName,
      Phone: data.Phone,
      cityID: data.cityID,
      CrmStatusID: data.CrmStatusID,
      CrmComment: data.CrmComment,
    });
    setModalType("edit");
    setShow(true);
  } else if (type === "delete") {
    setFormData({ Id: data });
    setModalType("delete");
    setShowDelete(true);
  }
};
