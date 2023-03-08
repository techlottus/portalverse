import { ButtonInit, InputInit } from "@/old-components/fixture";

const patternEmail =  /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z0-9]{2,4}$/i;

const inputConfig = {
  ...InputInit,
  iconLeft: "person",
  label: "Ingresa tu matrícula",
  alphanumeric: true,
  alphabetical: false,
  test: "matricula",
  name: "matricula",
};
const buttonConfigStepOne = {
  ...ButtonInit,
  isExpand: false,
  title: "Consultar"
};
const inputMailConfig = {
  ...InputInit,
  iconLeft: "mail",
  label: "Correo electrónico personal",
  alphanumeric: false,
  alphabetical: false,
  onlyNumbers: false,
  test: "email",
  name: "email",
};
const inputPhoneConfig = {
  ...InputInit,
  iconLeft: "phone",
  label: "Teléfono",
  alphanumeric: false,
  alphabetical: false,
  onlyNumbers: true,
  test: "phone",
  name: "phone",
};
const inputCompanyConfig = {
  ...InputInit,
  iconLeft: "apartment",
  label: "Empresa para la que trabajas",
  test: "company",
  name: "company",
};
const buttonConfigStepTwo = {
  ...ButtonInit,
  title: "Enviar Datos"
};
const inputNameOpenFormStepOne = {
  ...InputInit,
  iconLeft: "person",
  label: "Nombre",
  test: "name",
  name: "name",
};
const inputSurnameOpenFormStepOne = {
  ...InputInit,
  iconLeft: "person",
  label: "Apellidos",
  test: "surname",
  name: "surname",
};
const inputPhoneOpenFormStepOne = {
  ...InputInit,
  iconLeft: "call",
  label: "Celular",
  alphanumeric: false,
  alphabetical: false,
  onlyNumbers: true,
  maxlength: '10',
  test: "phone",
  name: "phone",
};
const inputEmailOpenFormStepOne = {
  ...InputInit,
  iconLeft: "mail",
  label: "Correo Electrónico",
  alphanumeric: false,
  alphabetical: false,
  onlyNumbers: false,
  test: "mail",
  name: "mail",
};
const inputPasswordOpenFormStepOne = {
  ...InputInit,
  iconLeft: "visibility",
  label: "Contraseña",
  type: "password",
  alphanumeric: false,
  alphabetical: false,
  onlyNumbers: false,
  name: "passwordAccount",
  test: "passwordAccount"
};
const buttonConfigOpenFormStepOne = {
  ...ButtonInit,
  isExpand: false,
  title: "Continuar"
};
const buttonConfigOpenFormStepThree = {
  ...ButtonInit,
  isExpand: false,
  title: "Solicita información"
};
const buttonConfigSend = {
  ...ButtonInit,
  isExpand: false,
  title: "Enviar"
};
const inputCommentOpenFormStepOther = {
  ...InputInit,
  label: "Agrega un comentario",
  type: "textarea",
  maxlength: "100",
  test: "comments",
  name: "comments",
};

const errorMessagesStepOneOpenForm = {
  name: 'Ingresa un nombre',
  surname: 'Ingresa tus apellidos',
  email: 'Ingresa un correo electrónico válido',
  phone: 'Ingresa un teléfono de 10 dígitos',
  modality: 'Debes elegir una modalidad',
  comment: 'Proporciona el mensaje para contactarte',
  password: 'Ingresa una contraseña'
}
const errorMessagesStepTwoOpenForm = {
  modality: 'Debes elegir una modalidad',
  level: 'Debes elegir un nivel',
  program: 'Debes elegir un programa',
  campus: 'Debes elegir un campus'
}
const errorMessagesStepThreeOpenForm = {
  contacto: 'Debes elegir un Medio de Contacto',
  horario: 'Debes elegir un Horario de Contacto'
}
const errorMessagesStepOneOpenFormContinuous = {
  name: 'Ingresa un nombre',
  surname: 'Ingresa tus apellidos',
  email: 'Ingresa un correo electrónico válido',
  phone: 'Ingresa un teléfono de 10 dígitos',
  program: 'Debes elegir un programa'
}

const errorMessagesFormEgresados = {
  matricula: 'Ingresa matricula',
  email: 'Ingresa un correo electrónico válido',
  phone: 'Ingresa un teléfono de 10 dígitos',
  company: 'Debes proporcionar el nombre de la empresa',
  activeCompany: 'Debes seleccionar una opción'
}

export default {
  inputConfig,
  buttonConfigStepOne,
  inputMailConfig,
  inputPhoneConfig,
  inputCompanyConfig,
  buttonConfigStepTwo,
  inputNameOpenFormStepOne,
  inputSurnameOpenFormStepOne,
  inputPhoneOpenFormStepOne,
  inputEmailOpenFormStepOne,
  buttonConfigOpenFormStepOne,
  buttonConfigOpenFormStepThree,
  inputCommentOpenFormStepOther,
  buttonConfigSend,
  patternEmail,
  errorMessagesStepOneOpenForm,
  errorMessagesStepTwoOpenForm,
  errorMessagesStepThreeOpenForm,
  errorMessagesStepOneOpenFormContinuous,
  errorMessagesFormEgresados,
  inputPasswordOpenFormStepOne
}