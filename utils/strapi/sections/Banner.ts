import type {
  ContentVariant,
  OverlayColor,
  StrapiImage,
  TextPosition,
} from "@/types/strapi/common";

export type BannerSection = {
  type: "ComponentSectionsBanner";
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
  mobileRatio: string;
  mobileImage: StrapiImage; 
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
}
`;