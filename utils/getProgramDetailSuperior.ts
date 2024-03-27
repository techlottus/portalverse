import { fetchStrapiGraphQL } from "@/utils/getStrapi";
import type { BannerData } from "@/utils/strapi/sections/Banner";
import type { StrapiImage } from "@/types/strapi/common";
import type { ContentVariant } from "@/types/strapi/common";
import { RichTextImageSection } from "./strapi/sections/RichTextImage";

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
    contentVariant: ContentVariant;
    richTextImage: RichTextImageSection;
    banner: BannerData;
    rvoeTitle: string;
    rvoeDescription: string;
    rvoeImages: Array<{image:StrapiImage}>
    richTextImageCertifications: RichTextImageSection;
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
        contentVariant
        richTextImage {
          image {
            data {
              attributes {
                url
              }
            }
          }
          backgroundColor
          text
          title
          imagePosition
          buttons {
            variant
            CTA
            iconName
            label
          }
        }
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
        rvoeTitle
        rvoeDescription
        rvoeImages{
          image {
            data {
              attributes {
                url
              }
            }
          }
        }
        richTextImageCertifications {
          image {
            data {
              attributes {
                url
              }
            }
          }
          imagePosition
          backgroundColor
          text
          title
          buttons {
            variant
            CTA
            iconName
            label
          }
        }
      }
    }
  }
}
`;

export default getProgramDetailSuperior;
