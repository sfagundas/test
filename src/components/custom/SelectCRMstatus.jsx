import React, { useState, useEffect } from "react";

const CRMstatusSelect = ({ id, onChange }) => {
  // Деструктурируем id из props
  const [CRMstatus, setCRMstatus] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Функция для получения списка статусов
    const fetchCRMstatus = async () => {
      try {
        const response = await fetch(
          "http://okalbm.ru/api/api/crm_status_list"
        );
        if (!response.ok) {
          throw new Error("Ошибка при получении данных");
        }
        const data = await response.json();
        setCRMstatus(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCRMstatus();
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
        <label htmlFor="StatusId" className="form-label">
          CRM статус
        </label>
        <select
          className="form-control"
          name="StatusId"
          id="StatusId"
          onChange={onChange}
          required
        >
          <option value="">-</option>
          {CRMstatus.map((crm) => (
            <option
              key={crm.Id}
              value={crm.Id}
              selected={crm.Id === id} // Устанавливаем selected, если id совпадает
            >
              {crm.Name}
            </option>
          ))}
        </select>
      </div>
    </>
  );
};

export default CRMstatusSelect;
