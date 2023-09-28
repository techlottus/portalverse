import getProgramsByModality from "@/utils/getProgramsByModality";
import type { FilterProgram } from "@/utils/strapi/sections/ProgramsFilter";

export type ModalityFilterSection = {
  type: "ComponentSectionsModalityFilter";
  modality: {
    data: {
      attributes: {
        name: string;
        label: string;
        programs?: {
          data: Array<FilterProgram>
        }
      };
    };
  };
};

export const MODALITY_FILTER = `
... on ComponentSectionsModalityFilter {
  modality {
    data {
      attributes {
        name
        label
      }
    }
  }
}
`;

export const formatModalityFilterSection = async (
  section: ModalityFilterSection
): Promise<ModalityFilterSection> => {
  
  const modality = section?.modality?.data?.attributes?.name;
  const programs = await getProgramsByModality(modality);

  section.modality.data.attributes.programs = {
    data: programs,
  };

  return section;
};