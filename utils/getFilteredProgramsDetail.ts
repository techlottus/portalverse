import { fetchStrapiGraphQL } from "@/utils/getStrapi";
import type { FilterProgram } from "./strapi/sections/ProgramsFilter";

export type FilteredProgramsVariables = {
  level?: string;
  modalities?: Array<string>;
};

export type FilteredProgramsResponse = {
  programs: {
    data: Array<FilterProgram>;
  }
};

const getQuery = (variables: FilteredProgramsVariables) => {
  const { modalities } = variables;
  return `
  query FilteredProgramsDetail(${modalities && modalities?.length > 0 ? "$modalities: [String], ": ""}$level: String) {
    programs(
      pagination: { start: 0, limit: -1 }
      filters: {
        available: { eq: true }
        publishedAt: { notNull: true }
        level: { title: { eq: $level } }
        ${modalities && modalities?.length > 0 ? "programModalities: { modality: { name: { in: $modalities } } }" : ""}
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
  `;
};

export const getFilteredProgramsDetail = async (variables: FilteredProgramsVariables) => {
  const query = getQuery(variables);
  console.log("query: ", query);
  console.log("variables: ", variables)
  const data = await fetchStrapiGraphQL<FilteredProgramsResponse>(
    query,
    variables
  );

  console.log("data: ", data);

  return data?.programs?.data;
};