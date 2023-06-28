import parseEditorRawData from "@/utils/parseEditorRawData";
import type { ProgramModalityDetail } from "@/utils/getProgramBySlug";
import type { ProgramDetailSuperiorData } from "@/utils/getProgramDetailSuperior";
import type { OustandingModuleConfig } from "@/types/OustandingModule.types";

const dictionarySuperior = {
  admissionProfile: {
    title: "Perfil de ingreso",
    backgroundColorKey: "admissionProfileBackgroundColor",
    imageKey: "admissionProfileImage"
  },
  graduateProfile: {
    title: "Perfil de egreso",
    backgroundColorKey: "graduateProfileBackgroundColor",
    imageKey: "graduateProfileImage"
  },
  laborField: {
    title: "Campo laboral",
    backgroundColorKey: "laborFieldBackgroundColor",
    imageKey: "laborFieldImage"
  },
  admissionRequirements: {
    title: "Requisitos de admisión",
    backgroundColorKey: "admissionRequirementsBackgroundColor",
    imageKey: "admissionRequirementsImage"
  }
};

export const formatModalityDataSuperior = (modalityData: ProgramModalityDetail, layout: ProgramDetailSuperiorData) => {
  const cards: Array<OustandingModuleConfig> = Object?.keys(dictionarySuperior)?.map((key) => {
    //@ts-ignore
    const imageUrl = layout?.attributes?.[dictionarySuperior?.[key]?.imageKey]?.data?.attributes?.url;
    return {
      image: {
        mobile: imageUrl, desktop: imageUrl
      },
      //@ts-ignore
      title: dictionarySuperior?.[key]?.title, 
      //@ts-ignore
      text: parseEditorRawData(modalityData?.[key]),
      //@ts-ignore
      backgroundColor: layout?.attributes?.[dictionarySuperior?.[key]?.backgroundColorKey],
      direction: ""
    }
  })
  const curriculumsByModality = modalityData?.curriculums;
  const curriculumsByCampus: Array<{campusName: string, curriculumUrl: string}> = []
  curriculumsByModality?.map((campus) => {
    const campusName = campus?.campus?.data?.attributes?.name;
    const curriculumUrl = campus?.curriculum?.data?.attributes?.url;
    curriculumsByCampus?.push({ campusName, curriculumUrl })
  })

  return {cards, curriculumsByCampus}
}