import { fetchStrapiGraphQL } from "@/utils/getStrapi";
import type { StrapiImage } from "@/types/strapi/common";

type CurriculumsDetail = {
  campus: {
    data: {
      attributes: {
        name: string;
      }
    }
  },
  curriculum: {
    data: {
      attributes: {
        url: string
      }
    }
  }
}

type ProgramModalitiesDetail = {
  modality: {
    data: {
      attributes: {
        name: string;
      }
    }
  }
  admissionProfile: string;
  graduateProfile: string;
  laborField: string;
  admissionRequirements: string;
  curriculumDescription: string;
  curriculums: Array<CurriculumsDetail>
}

export type ProgramData = {
  attributes: {
    name: string;
    description: string;
    image: StrapiImage
    programModalities: Array<ProgramModalitiesDetail>
    level: {
      data: {
        attributes: {
          title: string
        }
      }
    }
  }
}

type ProgramBySlugResponse = {
  programs: {
    data: Array<ProgramData>
  }
};

const getProgramBySlug = async (slug: string = "") => {
  const response = await fetchStrapiGraphQL<ProgramBySlugResponse>(PROGRAM_BY_SLUG, {slug});
  return response?.programs?.data?.[0];
};

const PROGRAM_BY_SLUG = `
query ProgramBySlug($slug: String!) {
  programs(filters: { slug: { eq: $slug } }) {
    data {
      attributes {
        name
        description
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
        programModalities {
          admissionProfile
          graduateProfile
          laborField
          admissionRequirements
          curriculumDescription
          curriculums {
            campus {
              data {
                attributes {
                  name
                }
              }
            }
            curriculum {
              data {
                attributes {
                  url
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

export default getProgramBySlug;