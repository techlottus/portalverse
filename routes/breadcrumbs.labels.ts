import Routes from "@/routes/Routes"

const BreadcrumbsLabels: any = {
  "oferta-educativa": "Oferta Educativa",
  "bachillerato": "Bachillerato",
  "licenciatura": "Licenciaturas",
  "maestria": "Maestrías",
  "especialidad": "Especialidades",
  "doctorado": "Doctorados",
  "extension-universitaria": "Extensión Universitaria",
  "contactanos": "Contáctanos",
  "admisiones": "Admisiones",
  "becas": "Becas",
  "egresados": "Egresados",
  "talento": "Talento",
  "podcast": "Podcast",
  "blog": "Blog",
  "nosotros": "Nosotros",
  "internacionalizacion": "Internacionalización",
  "somos-UTEG": "Somos UTEG",
  "planteles": "Planteles",
  "modelo-educativo": "Modelo Educativa",
  "bolsa-de-talento": "Bolsa de Talento",
  "vinculacion-empresarial": "Vinculación empresarial",
  "faq": "Preguntas Frecuentes",
  "general": "General",
  "voz-uane": "Voz UANE",
  "pedir-informacion": "Contacto",
  "vida-estudiantil": "Vida Estudiantil",
  "alumnos": "Alumnos",
  "SIAAF": "SIAAF",
  "programa-titulacion-segura": "Programa Titulación Segura",
  "servicio-social-practicas-profesionales-voluntarias": "Servicio Social Prácticas Profesionales Voluntarias",
  "servicio-social-lic-semestrales": "Servicio Social Licenciaturas Semestrales UdeG",
  "servicio-social-lic-cuatrimestrales": "Servicio Social Licenciaturas Cuatrimestrales",
  "bachillerato-tecnico-sej": "Servicio Social Bachillerato Técnico SEJ",
  "modalidades-requisitos-y-reglamentos-de-titulacion": "Modalidades, Requisitos y Reglamentos de Titulación",
  "convocatorias-titulacion-comunicados": "Convocatorias de Titulación y Comunicados",
  "carta-pasante": "Carta de Pasante",
  "aviso-privacidad-egresados": "Aviso de Privacidad Encuesta Egresados",
  ...Routes["oferta-educativa"].reduce((prev: any, value: any) => {
    const {params: {programs}} = value
    const programList = programs.reduce((p:any, c:any) => {
      const {params: {program , nameProgram}} = c
      return {...p, [program] : nameProgram}
    }, {})
    return {...prev, ...programList}
  }, {}),

  ...Routes["extension-universitaria"]["params"]["programs"].reduce((prev:any, curr: any) => {
    const {params: {program, nameProgram}} = curr
    return {...prev, [program]: nameProgram}
  }, {})
}

export default BreadcrumbsLabels;