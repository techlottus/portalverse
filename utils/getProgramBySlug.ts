import { fetchStrapiGraphQL } from "@/utils/getStrapi";
import type { StrapiImage } from "@/types/strapi/common";

/**
 * These are the current program levels available in [UANE, UTEG] exactly as they appear in Salesforce.
 * These strings must match exactly when registering program levels in Strapi's "Level" Collection Type.
 */
type ProgramLevel =
  | "Bachillerato"
  | "Licenciatura"
  | "Maestría"
  | "Doctorado"
  | "Especialidad"
  | "Educación Continua";

type CurriculumDetail = {
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
  curriculums: Array<CurriculumDetail>
}

export type ProgramData = {
  id: number;
  attributes: {
    slug: string;
    name: string;
    description: string;
    image: StrapiImage;
    detail: string;
    programModalities: Array<ProgramModalitiesDetail>;
    level: {
      data: {
        attributes: {
          title: ProgramLevel;
        }
      }
    }
    price: number;
    offerPrice: number;
    priceDetail: string;
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
      id
      attributes {
        slug
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
        detail
        level {
          data {
            attributes {
              title
            }
          }
        }
        price
        offerPrice
        priceDetail
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