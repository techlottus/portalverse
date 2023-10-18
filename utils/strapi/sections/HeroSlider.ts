import type {
  ContentVariant,
  OverlayColor,
  StrapiImage,
  TextPosition,
} from "@/types/strapi/common";

export type Slide = {
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
};

export type HeroSliderSection = {
  type: "ComponentSectionsHeroSlider";
  slides: Array<Slide>;
  title: string;
  description: string;
};

export const HERO_SLIDER = `
...on ComponentSectionsHeroSlider {
  title
  description
  slides: slide(pagination: {start: 0, limit: -1}) {
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
  }
}
`;