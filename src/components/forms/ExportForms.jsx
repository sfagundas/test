//Форма изменения основной информации фотосессии
export const editPhotosessionModal = [
  {
    name: "PhTypeId",
    label: "Тип съемки",
    type: "phTypeSelect",
    required: true,
  },
  {
    name: "LocationId",
    label: "Локация",
    type: "selectLocation", //апи с локациями сделать
    required: true,
    colSize: 6,
  },
  { name: "v", label: "Оплата", type: "text", colSize: 6 },
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

export const addLogForm = [
  {
    name: "Text",
    label: "Комментарий",
    type: "textarea",
    required: true,
  },
];

export const editLogModal = [
  {
    name: "Text",
    label: "Комментарий",
    type: "textarea",
    required: true,
  },
];

export const editOrderForm = [
  {
    name: "det_AllStudents",
    label: "Ученики",
    type: "text",
    required: true,
    colSize: 5,
  },
  {
    name: "det_BuyStudents",
    label: "Берут",
    type: "text",
    required: true,
    colSize: 5,
  },
  {
    name: "det_TeacherAlbum",
    label: "Учитель",
    type: "checkbox",
    colSize: 2,
  },
  {
    name: "det_AlbTypeId",
    label: "Пакет услуг",
    type: "selectAlbType",
    required: true,
    colSize: 6,
  },
  {
    name: "det_PhCount",
    label: "Количество фотосессий",
    type: "text",
    required: true,
    colSize: 6,
  },
  {
    name: "det_AlbumPrice",
    label: "Цена за альбом",
    type: "text",
    required: true,
    colSize: 6,
  },

  {
    name: "det_AdditionalServices",
    label: "Доп услуги",
    type: "text",
    required: true,
    colSize: 6,
  },
  {
    name: "det_AllPrice",
    label: "Окончательная цена",
    type: "text",
    required: true,
    colSize: 6,
  },
];
