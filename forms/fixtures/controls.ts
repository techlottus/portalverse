import { ButtonInit, InputInit } from "@/old-components/fixture";

const patternEmail = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z0-9]{2,4}$/i;
const patternCurp = /^([A-Z][AEIOUX][A-Z]{2}\d{2}(?:0[1-9]|1[0-2])(?:0[1-9]|[12]\d|3[01])[HM](?:AS|B[CS]|C[CLMSH]|D[FG]|G[TR]|HG|JC|M[CNS]|N[ETL]|OC|PL|Q[TR]|S[PLR]|T[CSL]|VZ|YN|ZS)[B-DF-HJ-NP-TV-Z]{3}[A-Z\d])(\d)$/;

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
  label: "Nombre(s)",
  test: "name",
  name: "name",
};
const inputNameProgramDetail = {
  ...InputInit,
  label: "Nivel",
  test: "level",
  name: "level",
  disabled:true
};
const inputProgram = {
  ...InputInit,
  label: "Programa",
  test: "program",
  name: "program",
  disabled:true

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
  title: "Enviar"
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
const errorMessagesBeWantedForm = {
  name: 'Ingresa un nombre',
  surname: 'Ingresa tus apellidos',
  email: 'Ingresa un correo electrónico válido',
  phone: 'Ingresa un teléfono de 10 dígitos',
  password: {
    required: "Ingresa una contraseña",
    minLength: "Ingresa una contraseña de al menos 8 caracteres"
  }
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

const errorMessagesInscriptionForm = {
  curp: 'Ingresa un curp válido',
  name: 'Ingresa un nombre',
  surname: 'Ingresa tus apellidos',
  email: 'Ingresa un correo electrónico válido',
  phone: 'Ingresa un teléfono de 10 dígitos',
  birthdate: 'Ingresa tu fecha de nacimiento (DD/MM/YYYY)',
  birth_entity: 'Ingresa tu lugar de nacimiento',
  gender: 'Ingresa tu género'
}

export default {
  inputConfig,
  buttonConfigStepOne,
  inputMailConfig,
  inputPhoneConfig,
  inputCompanyConfig,
  buttonConfigStepTwo,
  inputNameOpenFormStepOne,
  inputNameProgramDetail,
  inputProgram,
  inputSurnameOpenFormStepOne,
  inputPhoneOpenFormStepOne,
  inputEmailOpenFormStepOne,
  buttonConfigOpenFormStepOne,
  buttonConfigOpenFormStepThree,
  inputCommentOpenFormStepOther,
  buttonConfigSend,
  patternEmail,
  patternCurp,
  errorMessagesBeWantedForm,
  errorMessagesStepOneOpenForm,
  errorMessagesStepTwoOpenForm,
  errorMessagesStepThreeOpenForm,
  errorMessagesStepOneOpenFormContinuous,
  errorMessagesFormEgresados,
  inputPasswordOpenFormStepOne,
  errorMessagesInscriptionForm
}