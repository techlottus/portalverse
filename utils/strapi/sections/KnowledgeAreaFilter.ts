import type { StrapiImage } from "@/types/strapi/common";

export type KnowledgeAreaFilterSection = {
  type: "ComponentSectionsKnowledgeAreaFilter";
  area: {
    data: {
      attributes: {
        name: string;
        programs: {
          data: Array<{
            attributes: {
              name: string;
              image: StrapiImage;
              level: {
                data: {
                  attributes: {
                    title: string;
                  };
                };
              };
              slug: string;
            };
          }>;
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
              slug
            }
          }
        }
      }
    }
  }
}
`;
