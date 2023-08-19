import { OpenFormControls } from "@/types/OpenFormControls.types";
import { OptionConfig } from "@/types/OptionPilll.types";
import { SelectOptionConfig } from "@/types/Select.types"

const OpenFormInit = {
  stepone: {
    title: "¿Quieres saber más sobre UTEG?",
    subtitle: "Sabemos que elegir una universidad donde cumplir tus sueños puede ser una decisión muy seria y que quieres solucionar cualquier incertidumbre, dinos tus datos y un asesor de admisiones te orientará para resolver todas tus dudas y realizar una elección bien informada.",
    conditions: "Al llenar tus datos aceptas nuestro",
    modality: "¿Qué modalidad te interesa?",
    privacyLink: { "link": "https://assets.staging.bedu.org/UTEG/aviso_de_privacidad_UTEG_24_02_2022_1_9018cd9357.pdf", "label": "Aviso de privacidad" },
  },
  steptwo: {
    title: "Cuéntanos ¿Qué programa te interesa?",
    modality: "Selecciona una modalidad",
    level: "Selecciona un nivel",
    program: "Programa de interés",
    campus: "Campus",
  },
  stepthree: {
    title: "Gracias por tu interés ",
    description: "Seleccionaste lo siguiente",
    labelModality: "Modalidad: ",
    labelNivel: "Nivel: ",
    labelProgram: "Programa: ",
    labelCampus: "Campus: ",
    contact: "¿Cómo prefieres que te contactemos?",
    schedule: "Elige el horario en el que prefieres que te contactemos",
  },
  stepzero: {
    title: "Escríbenos",
    subtitle: "Si tienes dudas sobre tu universidad o quieres información."
  },
  stepdetails: {
    title: "Escríbenos",
    subtitle: "Si tienes dudas sobre tu universidad o quieres información.",
    conditions: "Al llenar tus datos aceptas nuestro Aviso de privacidad",
  },
  steponecontinuos: {
    title: "Contáctanos e inscríbete",
    subtitle: "Llena el siguiente formulario para que te ayudemos a inscribirte en el curso de ",
    conditions: "Al llenar tus datos aceptas nuestro",
    privacyLink: { "link": "https://assets.staging.bedu.org/UTEG/aviso_de_privacidad_UTEG_24_02_2022_1_9018cd9357.pdf", "label": "Aviso de privacidad" },
  },
  steponecontinuoscontrols: {
    programs: "Curso seleccionado"
  },
  steponebewanted: {
    title: "Postúlate, y encuentra una oportunidad en nuestra bolsa de trabajo",
    description: "Regístrate, completa todos tus datos y haz match con la vacante de tus sueños."
  }
}

export const levels: Array<OptionConfig> = [
  {
    name: 'option 1',
    search: 'option1',
    disabled: false,
  },
  {
    name: 'option 2',
    search: 'option2',
    disabled: false,
  },
  {
    name: 'option 3',
    search: 'option3',
    disabled: true,
  },
  {
    name: 'option 4',
    search: 'option4',
    disabled: false,
  },
  {
    name: 'option 5',
    search: 'option5',
    disabled: false,
  },
];

export const contacts: Array<OptionConfig> = [
  {
    name: 'contact 1',
    search: 'contact1',
    disabled: false,
  },
  {
    name: 'contact 2',
    search: 'contact2',
    disabled: false,
  },
  {
    name: 'contact 3',
    search: 'contact3',
    disabled: false,
  },
  {
    name: 'contact 4',
    search: 'contact4',
    disabled: false,
  },
];

export const Modalities: Array<SelectOptionConfig> = [
  {
    value: 'Presencial',
    active: false,
    text: 'Presencial',
  },
  {
    value: 'Online',
    active: false,
    text: 'Online',
  },
  {
    value: 'Flex',
    active: false,
    text: 'Flex',
  }
];


export const QuestionStepZero: Array<SelectOptionConfig> = [
  {
    text: 'Quiero información sobre los programas educativos',
    value: 'programs',
    active: false,
  },
  {
    text: 'Me interesa hablar con alguien de la universidad',
    value: 'university',
    active: false,
  },
  {
    text: 'Soy parte de la comunidad y necesito que me contacten',
    value: 'community',
    active: false,
  },
  {
    text: 'Otro motivo de contacto',
    value: 'other',
    active: false,
  },
];

export const FormConfig: OpenFormControls = {
  level: { hidden: false },
  program: { hidden: false },
  modality: { hidden: false },
  campus: { hidden: false },
}

export default OpenFormInit