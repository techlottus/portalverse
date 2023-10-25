import { StrapiImage } from "@/types/strapi/common";

type Images = {
  desktopImage: StrapiImage;
  tabletImage: StrapiImage;
  mobileImage: StrapiImage;
  desktopRatio: string;
  mobileRatio: string;
  tabletRatio: string;
}

export type IntroductionImageSection = {
  type: "ComponentSectionsIntroductionImage";
  title: string;
  description: string;
  images: Array<Images>
}

export const INTRODUCTION_IMAGE_SECTION = `
...on ComponentSectionsIntroductionImage {
  title
  description
  images {
    desktopRatio
    desktopImage {
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
    mobileRatio
    mobileImage {
      data {
        attributes {
          url
        }
      }
    }
  }
}
`;