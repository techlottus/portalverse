import { StrapiImage } from "@/types/strapi/common";
import { fetchStrapiGraphQL } from "@/utils/getStrapi";
import type { BannerData } from "@/utils/strapi/sections/Banner";
import { AlertSection } from "./strapi/sections/Alert";

export type ProgramDetailBachilleratoData = {
  attributes: {
    admissionProfileImage: StrapiImage;
    graduateProfileImage: StrapiImage;
    videoId: string;
    feedback: AlertSection;
    banner: BannerData;
  }
}

export type ProgramDetailBachilleratoPageResponse = {
  programDetailBachillerato : {
    type: "ProgramDetailBachilleratoEntityResponse",
    data: ProgramDetailBachilleratoData
  }
};

const getProgramDetailBachillerato = async () => {
  const pageData = await fetchStrapiGraphQL<ProgramDetailBachilleratoPageResponse>(PROGRAM_DETAIL_BACHILLERATO);
  return pageData?.programDetailBachillerato?.data;
};

const PROGRAM_DETAIL_BACHILLERATO = `
query ProgramDetailBachillerato {
  programDetailBachillerato {
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
        graduateProfileImage {
          data {
            attributes {
              url
            }
          }
        }
        videoId
        feedback {
          title
          text
          iconName
          links {
            text
            href
            target
            iconName
            iconPosition
            disabled
          }
        }
        banner {
          ctaText
          ctaUrl
          title
          subtitle
          textPosition
          overlay
          contentVariant
          mobileRatio
          mobileImage {
            data {
              attributes {
                url
              }
            }
          }
          tabletRatio
          tabletImage {
            data {
              attributes {
                url
              }
            }
          }
          desktopRatio
          desktopImage {
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
`;

export default getProgramDetailBachillerato
