import { getDataPageFromJSON } from "@/utils/getDataPage";
import getEducationalOfferingConfig from "@/utils/getEducationalOfferingConfig";
import { normalizePath } from "@/utils/misc";
import type { StrapiImage } from "@/types/strapi/common";
import type { ProgramLevel } from "@/utils/getProgramBySlug";

type ContinuousEducationProgram = {
  attributes: {
    name: string;
    slug: string;
    programCategory: {
      data: {
        attributes: {
          name: string;
        }
      }
    }
    image: StrapiImage;
    level: {
      data: {
        attributes: {
          title: ProgramLevel;
        };
      };
    };
  };
};

type ContinuousEducationKnowledgeArea = {
  attributes: {
    name: string;
    programs: {
      data: Array<ContinuousEducationProgram>;
    };
  };
};

export type ContEdProgramsSection = {
  type: "ComponentSectionsContEdPrograms";
  knowledgeAreas: {
    data: Array<ContinuousEducationKnowledgeArea>;
  };
  programParentPageSlug?: string;
};

export const CONT_ED_PROGRAMS = `
... on ComponentSectionsContEdPrograms {
  knowledgeAreas(pagination: { start: 0, limit: -1 }) {
    data {
      attributes {
        name
        programs(
          pagination: { start: 0, limit: -1 }
          filters: { publishedAt: { notNull: true } }
        ) {
          data {
            attributes {
              name
              slug
              level {
                data {
                  attributes {
                    title
                  }
                }
              }
              image {
                data {
                  attributes {
                    alternativeText
                    url
                  }
                }
              }
              programCategory {
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
`;

export type StaticContinuousEducationProgram = {
  hidden: boolean;
  id: string;
  title: string;
  link: {
    text: string;
    size: string;
    isBold: boolean;
    disabled: boolean;
    id: string;
    icon: string;
  };
  image: {
    desk: {
      alt: string;
      src: string;
    };
    mobile: {
      alt: string;
      src: string;
    };
  };
  redirect: string;
};

export type StaticContinuousEducationCategory = {
  title: string;
  cursos: Array<StaticContinuousEducationProgram>;
};

const formatStaticProgramCategory = (
  category: StaticContinuousEducationCategory
): ContinuousEducationKnowledgeArea => {
  return {
    attributes: {
      name: category?.title,
      programs: {
        data: category?.cursos?.map((curso) => {
          return {
            attributes: {
              name: curso?.title,
              slug: curso?.redirect,
              level: {
                data: {
                  attributes: {
                    title: "Educación Continua"
                  }
                }
              },
              programCategory: {
                data: {
                  attributes: {
                    name: "",
                  },
                },
              },
              image: {
                data: {
                  attributes: {
                    url: curso?.image?.desk?.src,
                    alternativeText: curso?.image?.desk?.alt,
                  },
                },
              },
            },
          };
        }),
      },
    },
  };
};

const excludeHiddenPrograms = (category: StaticContinuousEducationCategory) => {
  return {
    ...category,
    cursos: category?.cursos?.filter((program) => !program?.hidden),
  };
};

const hasAtLeastOneProgram = (category: StaticContinuousEducationCategory) => {
  return category?.cursos?.length > 0;
};

export const formatContEdProgramsSection = async (
  section: ContEdProgramsSection
) => {
  let staticCategories: Array<StaticContinuousEducationCategory> = []

  try {
    const continuousEducationStaticPageData = await getDataPageFromJSON(
      "extension-universitaria/extension-universitaria.json"
    );
    staticCategories = continuousEducationStaticPageData?.sections
      ?.extension?.sections as Array<StaticContinuousEducationCategory>;
  } catch (error) {
    // staticCategories remains empty
  }

  const formattedStaticCategories = staticCategories
    ?.map(excludeHiddenPrograms)
    ?.filter(hasAtLeastOneProgram)
    ?.map(formatStaticProgramCategory);

  const knowledgeAreas = section?.knowledgeAreas?.data;
  //we need to filter only programs with level "Educación Continua"
  const prograsmByKnowledgeArea = knowledgeAreas?.map((knowledgeArea) => {
    const filteredPrograms = knowledgeArea?.attributes?.programs?.data?.filter(
      (program) =>
        program?.attributes?.level?.data?.attributes?.title ===
        "Educación Continua"
    );
    const newObj = {...knowledgeArea}
    newObj.attributes.programs.data = filteredPrograms;
    return newObj;
  });

  prograsmByKnowledgeArea?.forEach((knowledgeArea) => {
    const knowledgeAreaName = knowledgeArea?.attributes?.name;
    const programs = knowledgeArea?.attributes?.programs?.data;

    // Retrieve static programs under the given category.
    const staticPrograms =
      formattedStaticCategories?.find(
        (programCategory) =>
          programCategory?.attributes?.name === knowledgeAreaName
      )?.attributes?.programs?.data || [];

    knowledgeArea.attributes.programs.data = [...programs, ...staticPrograms];
  });

  const educationalOfferingConfig = await getEducationalOfferingConfig();
  const continuousEducationSlug =
    educationalOfferingConfig?.find(
      (configItem) =>
        configItem?.level?.data?.attributes?.title === "Educación Continua"
    )?.slug || "";

  section.programParentPageSlug = normalizePath(continuousEducationSlug);

  return section;
};