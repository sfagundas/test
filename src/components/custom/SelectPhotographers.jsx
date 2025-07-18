import React, { useState, useEffect } from "react";

const PhotographersSelect = ({ id, onChange }) => {
  // Деструктурируем id из props
  const [Photographers, setPhotographers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Функция для получения списка статусов
    const fetchPhotographers = async () => {
      try {
        const response = await fetch(
          "http://okalbm.ru/api/api/photographers_list"
        );
        if (!response.ok) {
          throw new Error("Ошибка при получении данных");
        }
        const data = await response.json();
        setPhotographers(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPhotographers();
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
          name="StatusId"
          id="StatusId"
          onChange={onChange}
          required
        >
          <option value="">-</option>
          {Photographers.map((item) => (
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

export default PhotographersSelect;
