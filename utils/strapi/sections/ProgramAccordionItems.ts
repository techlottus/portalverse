import { getFilteredPrograms } from "@/utils/getFilteredPrograms";

export type ProgramAccordionItem = {
  label?: string;
  level?: {
    data: {
      attributes: {
        title: string;
      }
    }
  },
  campus?: {
    data: {
      attributes: {
        name: string;
      }
    }
  },
  modality?: {
    data: {
      attributes: {
        name: string;
      }
    }
  },
  programs?: {
    data: Array<{
      attributes: {
        name: string;
        slug: string;
      }
    }>
  }
};

export type ProgramAccordionList = Array<ProgramAccordionItem>;

export type ProgramAccordionListSection = {
  type: "ComponentSectionsProgramAccordionList";
  title: string;
  programAccordionItems: ProgramAccordionList;
};

export const PROGRAM_ACCORDION_LIST = `
...on ComponentSectionsProgramAccordionList {
  __typename
  title
  programAccordionItems {
    label
    level {
      data {
        attributes {
          title
        }
      }
    }
    modality {
      data {
        attributes {
          name
        }
      }
    }
    campus {
      data {
        attributes {
          name
        }
      }
    }
  }
}
`;

export const formatOfferAccordionListSection = async (section: ProgramAccordionListSection) => {  
  const formattedData = await Promise.all(section?.programAccordionItems?.map(async (offerAccordionItem) => {
    const { level = null, modality = null, campus = null } = offerAccordionItem;
    const levelName = level?.data?.attributes?.title;
    const modalityName = modality?.data?.attributes?.name;
    const campusName = campus?.data?.attributes?.name;

    const filteredPrograms = await getFilteredPrograms({ level: levelName, modality: modalityName, campus: campusName });

    return { ...offerAccordionItem, programs: filteredPrograms?.programs };
  }));

  return {
    ...section,
    programAccordionItems: formattedData
  };
};