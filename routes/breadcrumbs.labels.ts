import Routes from "@/routes/Routes"

const BreadcrumbsLabels: any = {
  "oferta-educativa": "Oferta Educativa",
  "bachillerato": "Bachillerato",
  "licenciatura": "Licenciaturas",
  "maestria": "Maestrías",
  "especialidad": "Especialidades",
  "doctorado": "Doctorados",
  "extension-universitaria": "Extensión Universitaria",
  "contactanos": "Contactanos",
  "admisiones": "Admisiones",
  "becas": "Becas",
  "egresados": "Egresados",
  "talento": "Talento",
  "podcast": "Podcast",
  "blog": "Blog",
  "nosotros": "Nosotros",
  "internacionalizacion": "Internacionalización",
  "somos-UANE": "Somos UANE",
  "campus": "Campus",
  "modelo-educativo": "Modelo Educativa",
  "empleabilidad": "Empleabilidad",
  "conexion-educativa": "Conexión Educativa",
  "faq": "Preguntas Frecuentes",
  "general": "General",
  "voz-uane": "Voz UANE",
  "pedir-informacion": "Solicita Informes",
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