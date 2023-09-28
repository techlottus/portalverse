import type { FilterProgram } from "@/utils/strapi/sections/ProgramsFilter";

export type KnowledgeAreaFilterSection = {
  type: "ComponentSectionsKnowledgeAreaFilter";
  area: {
    data: {
      attributes: {
        name: string;
        programs: {
          data: Array<FilterProgram>;
        };
      };
    };
  };
};

export const KNOWLEDGE_AREA_FILTER = `
... on ComponentSectionsKnowledgeAreaFilter {
  area {
    data {
      attributes {
        name
        programs(
          pagination: { start: 0, limit: -1 }
          filters: {
            available: { eq: true }
            publishedAt: { notNull: true }
          }
        ) {
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
              level {
                data {
                  attributes {
                    title
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
                      label
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
