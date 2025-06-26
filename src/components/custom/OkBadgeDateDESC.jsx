import React from "react";

const OkBadgeDateDESC = ({ date }) => {
  // Функция для форматирования даты


  // Преобразуем дату в объект Date
  const targetDate = new Date(date);
  const currentDate = new Date();

  // Убираем время, чтобы сравнивать только даты
  targetDate.setHours(0, 0, 0, 0);
  currentDate.setHours(0, 0, 0, 0);

  // Вычисляем разницу в днях
  const timeDifference = targetDate - currentDate;
  const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

  let badgeText = "";
  let badgeClass = "";

  // Определяем текст и класс в зависимости от разницы
  if (daysDifference === 0) {
    badgeText = "Дата сегодня";
    badgeClass = "badge bg-warning";
  } else if (daysDifference > 0) {
    if (daysDifference <= 3) {
      badgeText = `До даты 3 дня`; /*изменить под нас */
      badgeClass = "badge bg-primary";
    } else {
      badgeText = "До даты еще далеко";
      badgeClass = "light text-dark";
    }
  } else {
    badgeText = "Дата уже прошла";
    badgeClass = "badge bg-danger";
  }

  // Форматируем дату
  

  return (
    <div>
      <span className={badgeClass}>
        {badgeText}
      </span>
    </div>
  );
};

export default OkBadgeDateDESC;