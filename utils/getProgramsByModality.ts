import { fetchStrapiGraphQL } from "@/utils/getStrapi";
import type { FilterProgram } from "@/utils/strapi/sections/ProgramsFilter";

type ProgramsByModalityResponse = {
  programs: {
    data: Array<FilterProgram>
  }
}

const getProgramsByModality = async(modality: string) => {
  const data = await fetchStrapiGraphQL<ProgramsByModalityResponse>(
    PROGRAMS_BY_MODALITY,
    { modality }
  );
  return data?.programs?.data;
}

const PROGRAMS_BY_MODALITY = `
query ProgramsByModality($modality: String!) {
  programs(
    pagination: { start: 0, limit: -1 }
    filters: {
      available: { eq: true }
      publishedAt: { notNull: true }
      programModalities: { modality: { name: { eq: $modality } } }
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

export default getProgramsByModality;