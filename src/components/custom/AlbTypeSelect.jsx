import React, { useState, useEffect } from "react";

const ALbTypeSelect = ({ id, onChange }) => {
  // Деструктурируем id из props
  const [AlbType, setAlbType] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Функция для получения списка статусов
    const fetchLocation = async () => {
      try {
        const response = await fetch(
          "http://okalbm.ru/api/api/album_types_list"
        );
        if (!response.ok) {
          throw new Error("Ошибка при получении данных");
        }
        const data = await response.json();
        setAlbType(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchLocation();
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
          name="det_AlbTypeId"
          id="det_AlbTypeId"
          onChange={onChange}
          required
        >
          {AlbType.map((item) => (
            <option
              key={item.Id}
              value={item.Id}
              selected={item.Id === id} // Устанавливаем selected, если id совпадает
            >
              {item.Name}
            </option>
          ))}
        </select>
      </div>
    </>
  );
};

export default ALbTypeSelect;
