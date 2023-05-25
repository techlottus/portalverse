import { fetchStrapiGraphQL } from "@/utils/getStrapi";
import { SEO, SeoData } from "@/utils/strapi/sections/SEO";
import { BannerSection, BANNER } from "./strapi/sections/Banner";
import { HeroSliderSection, HERO_SLIDER } from "./strapi/sections/HeroSlider";
import { ListconfigSection, LIST_CONFIG } from "./strapi/sections/Listconfig";
import { OverlayCardListSection, OVERLAY_CARD_LIST } from "./strapi/sections/OverlayCardList";
import { StatisticsCardListSection, STATISTICS_CARD_LIST } from "./strapi/sections/StatisticsCardList";

export type HomeComponentSection =
  | BannerSection
  | HeroSliderSection
  | OverlayCardListSection
  | ListconfigSection
  | StatisticsCardListSection

type HomePageData = {
  homePage: {
    data: {
      attributes: {
        title: string;
        slug: string;
        sections: Array<HomeComponentSection>;
        seo: SeoData;
      };
    };
  };
};

export const getHomePageData = async () => {
  const data = await fetchStrapiGraphQL<HomePageData>(HOME_PAGE);
  return data;
};

const HOME_PAGE_SECTIONS = `
sections {
  type: __typename
  ${BANNER}
  ${HERO_SLIDER}
  ${OVERLAY_CARD_LIST}
  ${LIST_CONFIG}
  ${STATISTICS_CARD_LIST}
}
`;

const HOME_PAGE = `
query HomePage {
  homePage {
    data {
      attributes {
        title
        slug
        ${HOME_PAGE_SECTIONS}
        ${SEO}
      }
    }
  }
}
`;
