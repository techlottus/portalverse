import { StrapiImage } from "@/types/strapi/common";
import { StatisticsCard } from "./StatisticsCardList";

export type BannerNumeraliaData = {
  type: "ComponentSectionsBannerNumeralia"
  title: string;
  subtitle?: string;
  statistics: Array<StatisticsCard>;
  desktopImage: StrapiImage;
  tabletImage?: StrapiImage;
  mobileImage?: StrapiImage;
  overlayBannerNumeralia: string;
}

export const BANNER_NUMERALIA = `
... on ComponentSectionsBannerNumeralia {
  title
  subtitle
  overlayBannerNumeralia: overlay
  statistics {
    title
    body
    prefix
    suffix
    maxNumber
    iconName
    variant
    color
  }
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
`
