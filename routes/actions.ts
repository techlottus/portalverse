export const action = [
  {
    id: "admisiones",
    name: "Admisiones",
    shortcut: ["a", "A", "ad", "Ad"],
    keywords: "admisiones",
    perform: () => (window.location.pathname = "admisiones")
  },
  {
    id: "becas",
    name: "Becas",
    shortcut: ["b", "B", "be", "Be"],
    keywords: "becas",
    perform: () => (window.location.pathname = "admisiones/becas")
  },
  {
    id: "pedir-informacion",
    name: "Pedir Información",
    shortcut: ["i", "I", "inf", "Inf", "ped", "Pe", "pe"],
    keywords: "informes",
    perform: () => (window.location.pathname = "admisiones/pedir-informacion")
  },
  {
    id: "alumnos",
    name: "Alumnos",
    shortcut: ["a", "A", "al", "Al", "alu"],
    keywords: "alumnos",
    perform: () => (window.location.pathname = "alumnos")
  },
  {
    id: "contacto",
    name: "Contáctanos",
    shortcut: ["con", "Con", "c", "C"],
    keywords: "contacto",
    perform: () => (window.location.pathname = "contactanos")
  },
  {
    id: "fac",
    name: "Preguntas Frecuentes",
    shortcut: ["p", "P", "preg", "Pre"],
    keywords: "admisiones",
    perform: () => (window.location.pathname = "contactanos/faq/general")
  },
  {
    id: "directorio",
    name: "Directorio",
    shortcut: ["d", "Di", "con", "Cont"],
    keywords: "directorio",
    perform: () => (window.location.pathname = "contactanos/directorio")
  },
  {
    id: "extension-universitaria",
    name: "Extensión Universitaria",
    shortcut: ["e", "Ex", "ext", "Ext"],
    keywords: "extensión",
    perform: () => (window.location.pathname = "extension-universitaria")
  },  
  {
    id: "campus",
    name: "Campus",
    shortcut: ["c", "cam", "C", "Cam"],
    keywords: "campus",
    perform: () => (window.location.pathname = "nosotros/campus")
  },
  {
    id: "conexion-educativa",
    name: "Conexión Educativa",
    shortcut: ["c", "con", "Con", "Co", "C"],
    keywords: "conexión",
    perform: () => (window.location.pathname = "nosotros/conexión-educativa")
  },
  {
    id: "empleabilidad",
    name: "Empleabilidad",
    shortcut: ["e", "em", "bol", "emple", "Em"],
    keywords: "empleabilidad",
    perform: () => (window.location.pathname = "nosotros/empleabilidad")
  },
  {
    id: "internacionalizacion",
    name: "Internacionalización",
    shortcut: ["i", "I", "int", "in", "Int"],
    keywords: "internacionalización",
    perform: () => (window.location.pathname = "nosotros/internacionalizacion")
  },
  {
    id: "modelo-educativo",
    name: "Modelo Educativo",
    shortcut: ["mo", "Mo", "ed", "Ed"],
    keywords: "modelo",
    perform: () => (window.location.pathname = "nosotros/modelo-educativo")
  },
  {
    id: "somos-uane",
    name: "Somos UANE",
    shortcut: ["s", "S", "so", "So", "U", "u", "UA", "ua"],
    keywords: "somos",
    perform: () => (window.location.pathname = "nosotros/somos-uane")
  },
  {
    id: "oferta-educativa",
    name: "Oferta-Educativa",
    shortcut: ["o", "O", "of", "Of"],
    keywords: "oferta",
    perform: () => (window.location.pathname = "oferta-educativa")
  },
  {
    id: "voz-uane",
    name: "Voz-UANE",
    shortcut: ["v", "V", "vo", "Vo", "U", "u", "UA", "ua"],
    keywords: "admisiones",
    perform: () => (window.location.pathname = "voz-uane")
  },
  {
    id: "podcast",
    name: "Podcast",
    shortcut: ["p", "P", "po", "Po"],
    keywords: "podcast",
    perform: () => (window.location.pathname = "voz-uane/podcast")
  },
  {
    id: "blog",
    name: "Blog",
    shortcut: ["b", "B", "bl", "Bl", "No", "no"],
    keywords: "blog",
    perform: () => (window.location.pathname = "voz-uane/blog")
  },
  {
    id: "egresados",
    name: "Egresados",
    shortcut: ["e", "E", "eg", "Eg"],
    keywords: "egresados",
    perform: () => (window.location.pathname = "egresados")
  },
  {
    id: "egresados-talento",
    name: "Egresados Talento",
    shortcut: ["e", "Eg", "eg", "Tal", "ta"],
    keywords: "blog",
    perform: () => (window.location.pathname = "egresados/talento")
  },
]