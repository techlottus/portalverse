import { fetchStrapiGraphQL } from "@/utils/getStrapi";
import type { BannerData } from "@/utils/strapi/sections/Banner";
import type { StrapiImage } from "@/types/strapi/common";



export type ProgramDetailBachilleratoData = {
  attributes: {
    admissionProfileImage: StrapiImage;
    graduateProfileImage: StrapiImage;
    videoId: string;
    banner: BannerData;
  };
};

export type ProgramDetailBachilleratoResponse = {
  programDetailBachillerato: {
    type: "ProgramDetailBachilleratoEntityResponse";
    data: ProgramDetailBachilleratoData;
  };
};

const getProgramDetailBachillerato = async () => {
  const pageData = await fetchStrapiGraphQL<ProgramDetailBachilleratoResponse>(PROGRAM_DETAIL_BACHILLERATO);
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
        banner {
          ctaText
          ctaUrl
          title
          subtitle
          textPosition
          mobileImage {
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

export default getProgramDetailBachillerato;
