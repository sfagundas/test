// commonfunction.js

export const formEdit = (e, setFormData) => {
  const { name, value } = e.target;
  setFormData((prevData) => ({
    ...prevData,
    [name]: value,
  }));
};

// Вспомогательная функция для получения названия справочника по API endpoint
const getEntityName = (api) => {
  const entityMap = {
    city: "город",
    crm_status: "CRM статус",
    alb_type: "тип альбома",
    ph_type: "тип съемки",
    ph_status: "статус съемки",
  };

  for (const [key, value] of Object.entries(entityMap)) {
    if (api.includes(key)) {
      return value;
    }
  }
  return "запись";
};

export const addItem = async (formData, api, setItems, handleClose) => {
  const entityName = getEntityName(api);
  try {
    const response = await fetch(`http://localhost/backend/insert/${api}`, {
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
      throw new Error("Сервер не вернул ID созданной записи");
    }

    const newItem = {
      ...formData,
      Id: result.Id,
    };

    setItems((prevItems) => [...prevItems, newItem]);
    handleClose();
  } catch (error) {
    console.error("Ошибка:", error);
    alert(`Не удалось добавить ${entityName}: ${error.message}`);
  }
};

export const editItem = async (formData, api, setItems, handleClose) => {
  const entityName = getEntityName(api);
  try {
    const response = await fetch(
      `http://localhost/backend/insert/${api}/${formData.Id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      }
    );

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || "Ошибка сервера");
    }

    await response.json();
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.Id === formData.Id ? { ...item, ...formData } : item
      )
    );
    handleClose();
  } catch (error) {
    console.error("Ошибка:", error);
    alert(`Не удалось обновить ${entityName}: ${error.message}`);
  }
};

export const deleteItem = async (
  formData,
  api,
  setContent,
  setArchive,
  handleClose
) => {
  const entityName = getEntityName(api);
  try {
    const response = await fetch(
      `http://localhost/backend/insert/${api}/${formData.Id}`,
      { method: "DELETE" }
    );
    //   console.log(response.ok);

    const errorData = await response.json().catch(() => ({}));
    console.log(formData);
    if (errorData.message == 1) {
      console.log("Ошибки есть");
      setContent((prev) => prev.filter((item) => item.Id !== formData.Id));

      setArchive((prev) => [...prev, formData]);
      handleClose();
      window.showNotification("Город перемещен в архив");
    } else {
      setContent((prev) => prev.filter((item) => item.Id !== formData.Id));
      setArchive((prev) => prev.filter((item) => item.Id !== formData.Id));
      console.log("Ошибки нет");
      handleClose();
      window.showNotification("Город успешно удален");
    }

    /*
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.log();

      if (errorData.code === "23000") {
        // Перенос в архив
        setContent((prev) => prev.filter((item) => item.Id !== formData.Id));

        setArchive((prev) => [...prev, formData]);
        console.log(123);
        handleClose();
        window.showNotification("Город перемещен в архив");
        throw new Error("Запись используется в других таблицах");
      }
      throw new Error(errorData.message || "Ошибка сервера");
    }

    */
    // Успешное удаление - обновляем оба состояния
  } catch (error) {
    console.error("Ошибка:", error);
    alert(`Не удалось удалить ${entityName}: ${error.message}`);
  }
};

export const recoverItem = async (
  formData,
  api,
  setContent, // Добавляем setContent для обновления основного списка
  setArchive,
  handleClose
) => {
  try {
    const response = await fetch(
      `http://localhost/backend/insert/${api}/${formData.Id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || "Ошибка сервера");
    }

    setArchive((prev) => prev.filter((item) => item.Id !== formData.Id));
    const recoveredItem = await response.json();

    setContent((prev) => [...prev, recoveredItem]);

    handleClose();
    window.showNotification("Город успешно восстановлен из архива");
  } catch (error) {
    console.error("Ошибка:", error);
    alert(`Не удалось восстановить город: ${error.message}`);
  }
};

export const openModal = (type, setShow) => {
  if (type === "add" || type === "edit") {
    setShow(true);
  } else if (type === "delete" || type === "recover") {
    setShow(true);
  }
};

export const fetchContent = async (api) => {
  try {
    const response = await fetch(`http://localhost/backend/api/${api}`);
    if (!response.ok) {
      throw new Error(`Ошибка при загрузке данных: ${response.statusText}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Ошибка:", error);
    return [];
  }
};
