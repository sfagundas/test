import React from "react";

const OkBadgeDate = ({ date }) => {
  const formatDate = (inputDate) => {
    const [year, month, day] = inputDate.split("-");
    return `${day}.${month}.${year}`;
  };
  const targetDate = new Date(date);
  const currentDate = new Date();

  targetDate.setHours(0, 0, 0, 0);
  currentDate.setHours(0, 0, 0, 0);

  const timeDifference = targetDate - currentDate;
  const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

  let badgeClass = "";

  if (daysDifference === 0) {
    badgeClass = "badge bg-warning  text-dark"; // Сегодня
  } else if (daysDifference > 0) {
    if (daysDifference <= 3) {
      badgeClass = "badge bg-primary"; // До даты 3 дня
    } else {
      badgeClass = "badge bg-light text-dark"; // До даты еще далеко
    }
  } else {
    badgeClass = "badge bg-danger"; // Дата уже прошла
  }
  const formattedDate = formatDate(date);

  return (
    <div>
      <span
        className={badgeClass}
        style={{ fontSize: "10px", fontWeight: "500" }}
      >
        {formattedDate}
      </span>
    </div>
  );
};

export default OkBadgeDate;
