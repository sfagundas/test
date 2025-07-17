import React, { useState, useEffect } from "react";

import { Spinner } from "react-bootstrap";

const CitySelect = ({ value, onChange }) => {
  // Деструктурируем id из props
  const [cities, setCities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Функция для получения списка городов
    const fetchCities = async () => {
      try {
        const response = await fetch("http://okalbm.ru/api/api/cities_list");
        if (!response.ok) {
          throw new Error("Ошибка при получении данных");
        }
        const data = await response.json();
        setCities(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCities();
  }, []);

  if (loading) {
    return (
      <div>
        <Spinner animation="border" variant="primary" style={{}} />
      </div>
    );
  }

  if (error) {
    return <div>Ошибка: {error}</div>;
  }
  return (
    <>
      <div className={`mb-3`}>
        <select
          className="form-control"
          name="CityId"
          id="CityId"
          required
          onChange={onChange}
        >
          <option value="">-</option>

          {cities.map((city) => (
            <option
              key={city.Id}
              value={city.Id}
              selected={city.Id === value} // Устанавливаем selected, если id совпадает
            >
              {city.Name}
            </option>
          ))}
        </select>
      </div>
    </>
  );
};

export default CitySelect;
