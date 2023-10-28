import { BannerData } from "./Banner";

export type RepeatableBanner = {
  type: "ComponentSectionsRepeatableBanner";
  title: string;
  description: string;
  banners: Array<BannerData>
}

export const REPEATABLE_BANNER = `
...on ComponentSectionsRepeatableBanner {
  title
  description
  banners {
    title
    subtitle
    ctaText
    ctaUrl
    textPosition
    contentVariant
    overlay
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