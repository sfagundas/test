import React, { useState, useEffect } from "react";

const LocationSelect = ({ value, onChange }) => {
  // Деструктурируем id из props
  const [Location, setLocation] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Функция для получения списка статусов
    const fetchLocation = async () => {
      try {
        const response = await fetch("http://okalbm.ru/api/api/locations_list");
        if (!response.ok) {
          throw new Error("Ошибка при получении данных");
        }
        const data = await response.json();
        setLocation(data);
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
          name="LocationId"
          id="LocationId"
          onChange={onChange}
          required
        >
          {Location.map((item) => (
            <option
              key={item.Id}
              value={item.Id}
              selected={item.Id === value} // Устанавливаем selected, если id совпадает
            >
              {item.Name}
            </option>
          ))}
        </select>
      </div>
    </>
  );
};

export default LocationSelect;
