import { fetchStrapiGraphQL } from "@/utils/getStrapi";
import type { BannerData } from "@/utils/strapi/sections/Banner";
import type { StrapiImage } from "@/types/strapi/common";

export type ProgramDetailSuperiorData = {
  attributes: {
    admissionProfileImage: StrapiImage;
    admissionProfileBackgroundColor: string;
    graduateProfileImage: StrapiImage;
    graduateProfileBackgroundColor: string;
    laborFieldImage: StrapiImage;
    laborFieldBackgroundColor: string;
    admissionRequirementsImage: StrapiImage;
    admissionRequirementsBackgroundColor: string;
    banner: BannerData;
  }
}

export type ProgramDetailSuperiorPageResponse = {
  programDetailSuperior : {
    type: "ProgramDetailSuperiorEntityResponse";
    data: ProgramDetailSuperiorData;
  }
};

const getProgramDetailSuperior = async () => {
  const pageData = await fetchStrapiGraphQL<ProgramDetailSuperiorPageResponse>(PROGRAM_DETAIL_SUPERIOR);
  return pageData?.programDetailSuperior?.data;
};

const PROGRAM_DETAIL_SUPERIOR = `
query ProgramDetailSuperior {
  programDetailSuperior {
    type: __typename
    data {
      attributes {
        admissionProfileImage {
          data {
            attributes {
              url
            }
          }
        }
        admissionProfileBackgroundColor
        graduateProfileImage {
          data {
            attributes {
              url
            }
          }
        }
        graduateProfileBackgroundColor
        laborFieldImage {
          data {
            attributes {
              url
            }
          }
        }
        laborFieldBackgroundColor
        admissionRequirementsImage {
          data {
            attributes {
              url
            }
          }
        }
        admissionRequirementsBackgroundColor
        banner {
          ctaText
          ctaUrl
          title
          subtitle
          textPosition
          contentVariant
          overlay
          mobileImage {
            data {
              attributes {
                url
              }
            }
          }
          mobileRatio
          tabletImage {
            data {
              attributes {
                url
              }
            }
          }
          tabletRatio
          desktopImage {
            data {
              attributes {
                url
              }
            }
          }
          desktopRatio
        }
      }
    }
  }
}
`;

export default getProgramDetailSuperior;
