import React, { useState, useEffect } from "react";

const PhTypeSelect = ({ onChange }) => {
  // Деструктурируем id из props
  const [content, setContent] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Функция для получения списка статусов
    const Load = async () => {
      try {
        const response = await fetch("http://okalbm.ru/api/api/ph_types_list");
        if (!response.ok) {
          throw new Error("Ошибка при получении данных");
        }
        const data = await response.json();
        setContent(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    Load();
  }, []);

  if (loading) {
    return <div>Загрузка...</div>;
  }

  if (error) {
    return <div>Ошибка: {error}</div>;
  }
  return (
    <>
      <div className={`mb-3`}>
        <select
          className="form-control"
          name="PhTypeId"
          id="PhTypeId"
          onChange={onChange}
          required
        >
          <option value="">-</option>
          {content.map((item) => (
            <option key={item.Id} value={item.Id}>
              {item.Value}
            </option>
          ))}
        </select>
      </div>
    </>
  );
};

export default PhTypeSelect;
