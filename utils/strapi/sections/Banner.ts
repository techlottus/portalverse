import type {
  ContentVariant,
  OverlayColor,
  StrapiImage,
  TextPosition,
} from "@/types/strapi/common";

export type BannerData = {
  title: string;
  subtitle: string;
  ctaText: string;
  ctaUrl: string;
  textPosition: TextPosition;
  overlay: OverlayColor;
  contentVariant: ContentVariant;
  desktopImage: StrapiImage;
  tabletImage: StrapiImage;
  mobileImage: StrapiImage;
  desktopRatio: string;
  tabletRatio: string;
  mobileRatio: string;
};

export type BannerSection = BannerData & {
  type: "ComponentSectionsBanner";
};

export const BANNER = `
...on ComponentSectionsBanner {
  title
  subtitle
  ctaText
  ctaUrl
  textPosition
  overlay
  contentVariant
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
  desktopRatio
  tabletRatio
  mobileRatio
}
`;
