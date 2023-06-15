import { getDataPageFromJSON } from "@/utils/getDataPage";
import { normalizeString } from "@/utils/misc";
import parseEditorRawData from "@/utils/parseEditorRawData";
import type { StrapiImage } from "@/types/strapi/common";

type CurriculumByCampus = {
  campus: {
    data: {
      attributes: {
        name: string;
      };
    };
  };
};

type KnowledgeArea = {
  attributes: {
    name: string;
  };
};

type ProgramModality = {
  modality: {
    data: {
      attributes: {
        name: string;
      };
    };
  };
  curriculums: Array<CurriculumByCampus>;
};

export type FilterProgram = {
  attributes: {
    name: string;
    slug: string;
    image: StrapiImage;
    knowledgeAreas: {
      data: Array<KnowledgeArea>;
    };
    programModalities: Array<ProgramModality>;
  };
};

export type ProgramsFilterSection = {
  type: "ComponentSectionsProgramsFilter";
  title?: string;
  description?: string;
  level: {
    data: {
      attributes: {
        title: string;
        programs: {
          data: Array<FilterProgram>;
        };
      };
    };
  };
};

export const PROGRAMS_FILTER = `
... on ComponentSectionsProgramsFilter {
  title
  description
  level {
    data {
      attributes {
        title
        programs(pagination: { start: 0, limit: -1 }, filters: { available: { eq: true } }) {
          data {
            attributes {
              name
              slug
              image {
                data {
                  attributes {
                    url
                    alternativeText
                  }
                }
              }
              knowledgeAreas {
                data {
                  attributes {
                    name
                  }
                }
              }
              programModalities {
                modality {
                  data {
                    attributes {
                      name
                    }
                  }
                }
                curriculums {
                  campus {
                    data {
                      attributes {
                        name
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}
`;

type StaticProgram = {
  title: string;
  config: {
    nombre: string;
    modalidad: Array<string>;
    areaConocimiento: Array<string>;
    campus: Array<string>;
    image: {
      src: string;
      alt: string;
    };
  };
  route: string;
};

const formatStaticProgram = (program: StaticProgram): FilterProgram => {
  return {
    attributes: {
      name: program?.title,
      slug: program?.route,
      image: {
        data: {
          attributes: {
            url: program?.config?.image?.src,
            alternativeText: program?.config?.image?.alt,
          },
        },
      },
      knowledgeAreas: {
        data: program?.config?.areaConocimiento?.map(
          (areaConocimiento) => ({ attributes: { name: areaConocimiento } })
        ),
      },
      programModalities: program?.config?.modalidad?.map(
        (modalidad) => ({
          modality: {
            data: {
              attributes: {
                name: modalidad,
              },
            },
          },
          curriculums: program?.config?.campus?.map((campus) => ({
            campus: {
              data: {
                attributes: {
                  name: campus,
                },
              },
            },
          })),
        })
      ),
    },
  };
}

export const formatProgramsFilterSection = async (
  section: ProgramsFilterSection
): Promise<ProgramsFilterSection> => {
  
  const levelAttributes = section?.level?.data?.attributes;

  const levelTitle = normalizeString(levelAttributes.title);
  const programsData = levelAttributes?.programs?.data;

  const staticProgramsData = await getDataPageFromJSON(`/oferta-educativa/${levelTitle?.toLowerCase()}.json`);
  const staticPrograms = staticProgramsData?.programs as Array<StaticProgram>;

  /**
   * Format programs coming from static JSON data into the program structure expected
   * from Stapi-captured programs.
   */
  const formattedStaticPrograms: Array<FilterProgram> = staticPrograms?.map(formatStaticProgram);

  levelAttributes.programs.data = [
    ...programsData,
    ...formattedStaticPrograms,
  ];

  if(section?.description) {
    section.description = parseEditorRawData(section?.description);
  }

  return section;
};
