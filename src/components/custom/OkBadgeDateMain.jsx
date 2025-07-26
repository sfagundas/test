import React from "react";

const OkBadgeDate = ({ date }) => {
  const formatDateTime = (inputDateTime) => {
    if (!inputDateTime) return "Нет даты";

    // Разделяем дату и время
    const [datePart, timePart] = inputDateTime.split(" ");
    if (!datePart) return inputDateTime;

    // Разбираем компоненты даты
    const [year, month, day] = datePart.split("-");

    // Разбираем компоненты времени (если есть)
    let timeDisplay = "";
    if (timePart) {
      const [hours, minutes] = timePart.split(":");
      timeDisplay = ` ${hours}:${minutes}`;
    }

    return `${day}.${month}.${year}${timeDisplay}`;
  };

  // Форматируем дату
  const formattedDateTime = formatDateTime(date);

  return (
    <div>
      <span
        className={"badge bg-light text-dark"}
        style={{ fontSize: "10px", fontWeight: "500" }}
      >
        {formattedDateTime}
      </span>
    </div>
  );
};

export default OkBadgeDate;
