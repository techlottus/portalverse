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
  desktopRatio: string;
  desktopImage: StrapiImage;
  tabletRatio: string;
  tabletImage: StrapiImage;
  mobileImage: StrapiImage;
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
  desktopRatio
  desktopImage{
    data {
      attributes {
        url
      }
    }
  }
  tabletRatio
  tabletImage{
    data {
      attributes {
        url
      }
    }
  }
  mobileRatio
  mobileImage{
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
