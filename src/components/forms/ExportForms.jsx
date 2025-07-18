//Форма изменения основной информации фотосессии
export const editPhotosessionModal = [
  {
    name: "PhType",
    label: "Тип съемки",
    type: "phTypeSelect",
    required: true,
  },
  {
    name: "Location",
    label: "Локация",
    type: "text", //апи с локациями сделать
    required: true,
    colSize: 6,
  },
  { name: "Price", label: "Оплата", type: "text", colSize: 6 },
];

//Форма изменения даты
export const callDate = [
  { name: "CallDate", label: "Дата", type: "date", required: true },
];

//Форма бронирования фотосъемки
export const reservationModal = [
  { name: "Date", label: "Дата", type: "date", required: true, colSize: 6 },
  {
    name: "Photographer",
    label: "Фотограф",
    type: "selectPhotographers",
    required: true,
    colSize: 6,
  },

  {
    name: "ContactName",
    label: "ФИО Контакта",
    type: "text",
    required: true,
    colSize: 6,
  },
  { name: "Phone", label: "Номер", type: "text", colSize: 6 },
];

//Форма изменения основной информации о классе
export const editMainInfoForm = [
  {
    name: "School",
    label: "Школа",
    type: "text",
    required: true,
    colSize: 6,
  },
  { name: "Class", label: "Класс", type: "text", required: true, colSize: 6 },
  {
    name: "FullSchoolName",
    label: "Полное название школы",
    type: "text",
    required: true,
  },
  {
    name: "ParentName",
    label: "ФИО ответственного",
    type: "text",
    required: true,
    colSize: 6,
  },
  {
    name: "ParentPhone",
    label: "Номер ответственного",
    type: "text",
    required: true,
    colSize: 6,
  },
  {
    name: "TeacherName",
    label: "ФИО кл. руководителя",
    type: "text",
    required: true,
    colSize: 6,
  },
  {
    name: "TeacherPhone",
    label: "Номер кл. руководителя",
    type: "text",
    required: true,
    colSize: 6,
  },
];

//Форма добавления фотосессии
export const addPhotosessionForm = [
  {
    name: "PhTypeId",
    label: "Тип съемки",
    type: "phTypeSelect",
    required: true,
  },
];
