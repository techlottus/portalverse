import parseEditorRawData from "@/utils/parseEditorRawData";

const dictionary = {
  admissionProfile: {
    title: "Perfil de ingreso",
    image: {
      desktop:
        "https://assets.staging.bedu.org/UTEG/superior_perfil_ingreso_desk_c4b16d543a.png",
      mobile:
        "https://assets.staging.bedu.org/UTEG/superior_perfil_ingreso_desk_c4b16d543a.png",
    },
    backgroundColor: "#1B2D68",
  },
  graduateProfile: {
    title: "Perfil de egreso",
    image: {
      desktop:
        "https://assets.staging.bedu.org/UTEG/superior_perfil_egreso_desk_e9a163d219.png",
      mobile:
        "https://assets.staging.bedu.org/UTEG/superior_perfil_egreso_desk_e9a163d219.png",
    },
    backgroundColor: "#C31433",
  },
  admissionRequirements: {
    title: "Requisitos de admisión",
    image: {
      desktop:
        "https://assets.staging.bedu.org/UTEG/superior_requsitos_admision_desk_3ebc8cb957.png",
      mobile:
        "https://assets.staging.bedu.org/UTEG/superior_requsitos_admision_desk_3ebc8cb957.png",
    },
    backgroundColor: "#EEAA01",
  },
  laborField: {
    title: "Campo laboral",
    image: {
      desktop:
        "https://assets.staging.bedu.org/UTEG/superior_campo_laboral_desk_3d38432dc1.png",
      mobile:
        "https://assets.staging.bedu.org/UTEG/superior_campo_laboral_desk_3d38432dc1.png",
    },
    backgroundColor: "#4470B1",
  },
};

export const formatProgramContent = (programModalities: any) => {
  const modalities = [];

  for (let i = 0; i < programModalities?.length; i++) {
    const modalityList = [];
    const keys = Object.keys(programModalities[i]);
    for (let j = 0; j < keys?.length; j++) {
      const modalityText = parseEditorRawData(programModalities[i][keys[j]]);
      if (!!modalityText) {
        const modality = {
          text: modalityText,
          //@ts-ignore
          ...dictionary[keys[j]],
        };
        // Agregarlo a un arreglo
        modalityList.push(modality);
      }
    }
    modalities.push(modalityList);
  }
  return modalities;
};