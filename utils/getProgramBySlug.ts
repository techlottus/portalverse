import { fetchStrapiGraphQL } from "@/utils/getStrapi";
import type { StrapiImage } from "@/types/strapi/common";
import { TestimonialCardData } from "@/types/TestimonialCard";

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

type InformativeIcons= {
  title: string;
  description: string;
  iconName: string;
}

type Subject = {
  title: string;
}
type Summary = {
  title: string;
  subjects: Array<Subject>
}
export type ProgramModalityDetail = {
  modality: {
    data: {
      attributes: {
        name: string;
        label?: string;
        desktopImage: StrapiImage;
        tabletImage: StrapiImage;
        mobileImage: StrapiImage;
        Characteristics: {
          title: string;
          subtitle: string;
          InformativeIcons: Array<InformativeIcons>
        }
      }
    }
  }
  summaries: Array<Summary>
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
    name: string;
    contact: string;
    about: string;
    website: string;
  }
}

export type ProgramAttributes = {
  slug: string;
  name: string;
  admissionProfile: string;
  graduateProfile: string;
  laborField: string;
  admissionRequirements: string;
  certificationsTitle: string;
  certificationsDescription: string;
  certifications: {
    data: Array<{
      attributes: {
        name: string;
        imgCertification: StrapiImage;
      }
    }>
  }
  academicTitleName: string;
  programCategory: {
    data: {
      attributes: {
        name: string
      }
    }
  }
  price_list: any;
  program_rvoes: any;
  HasRvoe: boolean;
  description: string;
  image: StrapiImage;
  detail: string;
  certificationMessage: string;
  discountPercentageText: string;
  discount: number;
  periodicity: string;
  checkoutUrl: string;
  checkoutUrlText: string;
  testimonials: {
    title: string,
    description: string;
    bgImageDesktop:StrapiImage;
    bgImageTablet: StrapiImage;
    bgImageMobile: StrapiImage;
    testimonialCards: Array<TestimonialCardData>
  }
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
        SFlevels: [{ level: string }]
      }
    }
  }
  price: number;
  offerPrice: number;
  priceDetail: string;
  nombreProgramaSalesforce?: string;
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
        nombreProgramaSalesforce
        admissionProfile
        graduateProfile
        laborField
        admissionRequirements
        certificationsTitle
        certificationsDescription
        certifications {
          data {
            attributes {
              name
              imgCertification {
                data {
                  attributes {
                    url
                  }
                }
              }
            }
          }
        }
        academicTitleName
        programCategory {
          data {
            attributes {
              name
            }
          }
        }
        HasRvoe
        program_rvoes {
          data {
            attributes {
              name
              date
              modality {
                data {
                  attributes {
                    name,
                  }
                }
              }
              knowledgeArea {
                data {
                  attributes {
                    name
                  }
                }
              }
              program {
                data {
                  attributes {
                    name,
                  }
                }
              }
            }
          }
        }
        price_list {
          general_perks {
            accent
          }
          price {
            title
            subtitle
            perks {
              accent
            }
            discount
            checkout_url
            price
            discounted_price
            total_payment
            periodicity
            featured_price
            payment_provider_image {
              data {
                attributes {
                  url                  
                }
              }
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
        testimonials {
          title
          description
          testimonialCards {
            title
            subtitle
            testimonialText
            testimonialImage{
              data{
                attributes{
                  url
                }
              }
            }
          }
          bgImageDesktop{
            data{
              attributes{
                url
              }
            }
          }
          bgImageTablet{
            data{
              attributes{
                url
              }
            }
          }
          bgImageMobile{
            data{
              attributes{
                url
              }
            }
          }
        }
        brands {
          data {
            attributes {
              name
              contact
              about
              website
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
              SFlevels {
                level
              }
            }
          }
        }
        price
        offerPrice
        priceDetail
        knowledgeAreas(pagination: { pageSize: 1 }) {
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
                desktopImage {
                  data {
                    attributes {
                      url
                    }
                  }
                }
                tabletImage {
                  data {
                    attributes {
                      url
                    }
                  }
                }
                mobileImage {
                  data {
                    attributes {
                      url
                    }
                  }
                }
                Characteristics {
                  title
                  subtitle
                  InformativeIcons {
                    title
                    description
                    iconName
                  }
                }
              }
            }
          }
          summaries {
            title
            subjects {
              title
            }
          }
          modalityDescription
          programPerks {
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
          curriculums(pagination: { start: 0, limit: -1 }) {
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