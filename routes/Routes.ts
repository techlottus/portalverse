const Routes = {
  "oferta-educativa": [
    { params:
      {
        "level": "bachillerato",
        "levelRoute": "oferta-educativa/bachillerato",
        "config": {
          title: "Bachillerato",
          promo: {
            urlImage: {
              mobile: "https://drive.google.com/uc?export=view&id=1wTgY7bg1cFqdEWKNLrsTO8GNR4u3T38_",
              desktop: "https://drive.google.com/uc?export=view&id=1wTgY7bg1cFqdEWKNLrsTO8GNR4u3T38_"
            },
            text: "",
            icon: "arrow_forward",
            color: "#FFD033",
            opacity: "multiply",
            height: "282px",
            enable: true,
            nobackground: false
          },
          banner: {
            image: {
              src: "https://www.uane.edu.mx/multi/images/programas/becas.jpg",
              alt: "alumnos"
            },
            description: {
              title: "Bachilleratos",
              subtitle: "Elige una lorem ipsum sit amet consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
            }
          },
          head: {
            title: "",
            description: "",
          },
        },
        "programs": [
          { params: { "program": "bachillerato-general-competencia", "nameProgram": "Bachillerato General por Competencia" } },
          { params: { "program": "bachillerato-intensivo-semiescolarizado", "nameProgram": "Bachillerato Intensivo Semiescolarizado" } },
          { params: { "program": "bachillerato-general-competencia-gastronomia", "nameProgram": "Bachillerato General por Competencia con Diplomado en Gastronomía" } },
          { params: { "program": "bachillerato-general-competencia-proulex", "nameProgram": "Bachillerato General por Competencia con Certificación en Inglés Proulex" } },

        ] 
      }
    },
    { params:
      {
        "level": "licenciatura",
        "levelRoute": "oferta-educativa/licenciatura",
        "config": {
          title: "Licenciaturas",
          promo: {
            urlImage: {
              mobile: "https://drive.google.com/uc?export=view&id=19XGOqZziUfaXmB57vG1wxXcFSzWZ8ctR",
              desktop: "https://drive.google.com/uc?export=view&id=19XGOqZziUfaXmB57vG1wxXcFSzWZ8ctR"
            },
            text: "",
            icon: "arrow_forward",
            color: "#F6B5AF",
            opacity: "multiply",
            height: "282px",
            enable: true,
            nobackground: false
          },
          banner: {
            image: {
              src: "https://www.uane.edu.mx/multi/images/programas/becas.jpg",
              alt: "alumnos"
            },
            description: {
              title: "Licenciaturas",
              subtitle: "Elige una lorem ipsum sit amet consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
            }
          },
          head: {
            title: "",
            description: "",
          },
        },
        "programs": [
          { params: { "program": "cirujano-dentista", "nameProgram": "Cirujano Dentista" } },
          { params: { "program": "enfermeria", "nameProgram": "Licenciatura en Enfermeria" } },
          { params: { "program": "carrera-abogado", "nameProgram": "Carrera de Abogado" } },
          { params: { "program": "arquitectura", "nameProgram": "Licenciatura en Arquitectura" } },
          { params: { "program": "diseno-interiores", "nameProgram": "Licenciatura en Diseño de Interiores" } },
          { params: { "program": "ingenieria-comunicaciones-electronica", "nameProgram": "Ingeniería Comunicaciones y Electrónica" } },
          { params: { "program": "gastronomia", "nameProgram": "Licenciatura en Gastronomía" } },
          { params: { "program": "diseno-modas", "nameProgram": "Licenciatura Diseño de Modas" } },
          { params: { "program": "trabajo-social", "nameProgram": "Licenciatura Trabajo Social" } },
          { params: { "program": "lic-administracion", "nameProgram": "Licenciatura en Administración" } },
          { params: { "program": "negocios-internacionales", "nameProgram": "Licenciatura en Negocios Internacionales" } },
          { params: { "program": "mercadotecnia", "nameProgram": "Licenciatura en Mercadotecnia" } },
          { params: { "program": "psicologia", "nameProgram": "Licenciatura en Psicología" } },
          { params: { "program": "nutricion", "nameProgram": "Licenciatura en Nutrición" } },
          { params: { "program": "cultura-fisica-deportes", "nameProgram": "Licenciatura en Cultura Física y Deportes" } },
          { params: { "program": "quimico-farmaceutico-biologo", "nameProgram": "Licenciatura en Químico Farmacéutico Biólogo" } },
          { params: { "program": "diseno-comunicacion-grafica", "nameProgram": "Licenciatura en Diseño para la Comunicación Gráfica" } },
          { params: { "program": "ingenieria-computacion", "nameProgram": "Ingeniería en Computación" } },
          { params: { "program": "ingenieria-desarrollo-software", "nameProgram": "Ingeniería en Desarrollo de Software" } },
          { params: { "program": "ingenieria-sistemas", "nameProgram": "Ingeniería en Sistemas" } },
          { params: { "program": "administracion-liderazgo-empresarial", "nameProgram": "Licenciatura Administración y Liderazgo Empresarial" } },
          { params: { "program": "comunicacion", "nameProgram": "Licenciatura en Comunicación" } },
          { params: { "program": "gestion-deportiva", "nameProgram": "Licenciatura en Gestión Deportiva" } },
          { params: { "program": "diseno-grafico", "nameProgram": "Licenciatura en Diseño Gráfico" } },
          { params: { "program": "ingenieria-civil", "nameProgram": "Ingeniería Civil" } },
          { params: { "program": "ingenieria-civil-proulex", "nameProgram": "Ingeniería Civil con Certificación en Inglés Proulex" } },
          { params: { "program": "ingenieria-industrial", "nameProgram": "Ingeniería Industrial" } },
          { params: { "program": "ingenieria-industrial-proulex", "nameProgram": "Ingeniería Industrial con Certificación en Inglés Proulex" } },
          { params: { "program": "administracion-proulex", "nameProgram": "Licenciatura en Administración con Certificación en Inglés Proulex" } },
          { params: { "program": "contaduria-publica", "nameProgram": "Licenciatura en Contaduría Pública" } },
          { params: { "program": "contaduria-publica-proulex", "nameProgram": "Licenciatura en contaduría Pública con Certificación en Inglés Proulex" } },
          { params: { "program": "l-derecho", "nameProgram": "Licenciatura en Derecho" } },
          { params: { "program": "ingenieria-creacion-desarrollo-software-apps", "nameProgram": "Licenciatura en Ingeniería en Creación y Desarrollo de Software y Aplicaciones" } },
          { params: { "program": "pedagogia", "nameProgram": "Licenciatura en Pedagogía" } },
          { params: { "program": "quimico-farmaceutico-biologo-proulex", "nameProgram": "Licenciatura en Químico Farmaceutico Biólogo con Certificación en Inglés Proulex" } },
          { params: { "program": "enfermeria-internacional", "nameProgram": "Licenciatura en Enfermería Internacional" } },
        ]
      }
    },
    { params:
      {
        "level": "maestria",
        "levelRoute": "oferta-educativa/maestria",
        "config": {
          title: "Maestrías",
          promo: {
            urlImage: {
              mobile: "https://drive.google.com/uc?export=view&id=11C7rUa3eAS6-tONNT666vk1jrayFBLHv",
              desktop: "https://drive.google.com/uc?export=view&id=11C7rUa3eAS6-tONNT666vk1jrayFBLHv"
            },
            text: "",
            icon: "arrow_forward",
            color: "#E84537",
            opacity: "multiply",
            height: "282px",
            enable: true,
            nobackground: false
          },
          banner: {
            image: {
              src: "https://www.uane.edu.mx/multi/images/programas/becas.jpg",
              alt: "alumnos"
            },
            description: {
              title: "Maestrias",
              subtitle: "Elige una lorem ipsum sit amet consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
            }
          },
          head: {
            title: "",
            description: "",
          },
        },
        "programs": [
          { params: { "program": "planeacion-fiscal-corporativa", "nameProgram": "Maestría en Planeación Fiscal Corporativa" } },
          { params: { "program": "desarrollo-organizacional", "nameProgram": "Maestría en Desarrollo Organizacional" } },
          { params: { "program": "alta-direccion", "nameProgram": "Maestría en Alta Dirección" } },
          { params: { "program": "mercadotecnia-digital", "nameProgram": "Maestría en Mercadotecnia Digital " } },
          { params: { "program": "docencia", "nameProgram": "Maestría en Docencia" } },
          { params: { "program": "educacion", "nameProgram": "Maestría en Educación " } },
          { params: { "program": "administracion", "nameProgram": "Maestría en Administración" } },
          { params: { "program": "comunicacion-empresarial", "nameProgram": "Maestría en Comunicación Empresarial" } },
          { params: { "program": "derecho", "nameProgram": "Maestría en Derecho" } },
          { params: { "program": "desarrollo-organizacional-talento-humano", "nameProgram": "Maestría en Desarrollo Organizacional y Talento Humano" } },
          { params: { "program": "gobierno-estrategia", "nameProgram": "Master en Gobierno y Estrategia" } },
        ] 
      }
    },
  ],
  "extension-universitaria": { 
    params: {
      "level": "extension-universitaria",
      "config": {
        title: "Extensión Universitaria",
        promo: {
          urlImage: {
            mobile: "https://drive.google.com/uc?export=view&id=1Ti7_CzkaVjV8jg5mxmaUzkF7rfYKKr34",
            desktop: "https://drive.google.com/uc?export=view&id=1Ti7_CzkaVjV8jg5mxmaUzkF7rfYKKr34"
          },
          text: "",
          icon: "arrow_forward",
          color: "#B9C3C8",
          opacity: "multiply",
          height: "282px",
          enable: true,
          nobackground: false
        },
        banner: {
          image: {
            src: "https://www.uane.edu.mx/multi/images/programas/becas.jpg",
            alt: "alumnos"
          },
          description: {
            title: "Extensión Universitaria",
            subtitle: "Elige una lorem ipsum sit amet consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
          }
        },
        head: {
          title: "",
          description: "",
        },
      },
    }
  },
  "faq": [
    { params: { "section": "general" } },
    { params: { "section": "becas" } },
    { params: { "section": "finanzas" } },
  ],
  "blog": [
    { params:
      {
        "level": "entrada",
        "levelRoute": "extension-universitaria/",
        "config": {
          title: "entradas de blog",
          head: {
            title: "",
            description: "",
          },
        },
        "entries": [
          { params: { "entry": "convocatoria-investigacion-1" } },
          { params: { "entry": "convocatoria-investigacion-2" } },
          { params: { "entry": "convocatoria-investigacion-3" } },
          { params: { "entry": "convocatoria-investigacion-4" } },
          { params: { "entry": "convocatoria-investigacion-5" } },
          { params: { "entry": "convocatoria-investigacion-6" } },
          { params: { "entry": "convocatoria-investigacion-7" } },
          { params: { "entry": "convocatoria-investigacion-8" } },
          { params: { "entry": "convocatoria-investigacion-9" } },
          { params: { "entry": "convocatoria-investigacion-10" } },
          { params: { "entry": "convocatoria-investigacion-11" } },
          { params: { "entry": "convocatoria-investigacion-12" } },
        ] 
      }
    },
  ]
}

export default Routes