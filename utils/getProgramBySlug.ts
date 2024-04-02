import { fetchStrapiGraphQL } from "@/utils/getStrapi";
import type { StrapiImage } from "@/types/strapi/common";

/**
 * These are the current program levels available in [UANE, UTEG] exactly as they appear in Salesforce.
 * These strings must match exactly when registering program levels in Strapi's "Level" Collection Type.
 */
export type ProgramLevel =
  | "Bachillerato"
  | "Preparatoria"
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
        url: string;
      }
    }
  }
}

export type ProgramModalityDetail = {
  modality: {
    data: {
      attributes: {
        name: string;
        label?: string;
      }
    }
  }
  modalityDescription: string;
  programPerks: {
    data: Array<ProgramPerk>
  };
  labelModality: string;
  admissionProfile: string;
  graduateProfile: string;
  laborField: string;
  admissionRequirements: string;
  curriculumDescription: string;
  curriculums: Array<CurriculumDetail>

}

export type ProgramPerk = {
  attributes: {
    title: string;
    subtitle: string;
    iconName: string
  }
}
export type programBrand = {
  attributes: {
    contact: string;
  }
}

export type ProgramAttributes = {
  slug: string;
  name: string;
  programCategory: {
    data: {
      attributes: {
        name: string
      }
    }
  }
  description: string;
  image: StrapiImage;
  detail: string;
  certificationMessage: string;
  discountPercentageText: string;
  discount: number;
  periodicity: string;
  checkoutUrl: string;
  checkoutUrlText: string;
  brands: {
    data: Array<programBrand>
  }
  programPerks: {
    data: Array<ProgramPerk>
  };
  relatedPrograms: {
    data: Array<{
      attributes: {
        name: string;
        slug: string;
        level: {
          data: {
            attributes: {
              title: ProgramLevel;
            }
          }
        }
        image: StrapiImage;
      }
    }>
  };
  knowledgeAreas?: {
    data: Array<{
      attributes: {
        name: string;
      }
    }>
  };
  programModalities: Array<ProgramModalityDetail>;
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
  salesforceId?: string;
};

export type ProgramData = {
  id: number;
  attributes: ProgramAttributes;
};

type ProgramBySlugResponse = {
  programs: {
    data: Array<ProgramData>
  }
};

const getProgramBySlug = async (slug: string = "") => {
  const response = await fetchStrapiGraphQL<ProgramBySlugResponse>(PROGRAM_BY_SLUG, { slug });
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
        salesforceId
        programCategory{
          data{
            attributes{
              name
            }
          }
        }
        description
        certificationMessage
        discountPercentageText
        discount
        periodicity
        checkoutUrl
        checkoutUrlText
        brands {
          data {
            attributes {
              contact
            }
          }
        }
        programPerks {
          data {
            attributes {
              title
              subtitle
              iconName
            }
          }
        }
        relatedPrograms {
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
              slug 
              level {
                data {
                  attributes {
                    title
                  }
                }
              }
            }
          }
        }
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
        knowledgeAreas(pagination: { pageSize: 1}) {
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
                description
                name
                label
              }
            }
          }
          modalityDescription
          programPerks{
            data {
              attributes {
                iconName
                title
                subtitle
              }
            }
          }
          labelModality
          admissionProfile
          graduateProfile
          laborField
          admissionRequirements
          curriculumDescription
          curriculums (pagination: { start: 0, limit: -1 }){
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