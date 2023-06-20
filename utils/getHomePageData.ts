import { fetchStrapiGraphQL } from "@/utils/getStrapi";
import { BANNER } from "@/utils/strapi/sections/Banner";
import { FORM_VIDEO } from "@/utils/strapi/sections/FormVideo";
import { HERO_SLIDER } from "@/utils/strapi/sections/HeroSlider";
import { LIST_CONFIG, formatListconfigSection } from "@/utils/strapi/sections/Listconfig";
import { OVERLAY_CARD_LIST } from "@/utils/strapi/sections/OverlayCardList";
import { SEO } from "@/utils/strapi/sections/SEO";
import { STATISTICS_CARD_LIST } from "@/utils/strapi/sections/StatisticsCardList";
import type { BannerSection } from "@/utils/strapi/sections/Banner";
import type { FormVideoSection } from "@/utils/strapi/sections/FormVideo";
import type { HeroSliderSection } from "@/utils/strapi/sections/HeroSlider";
import type { ListconfigSection } from "@/utils/strapi/sections/Listconfig";
import type { OverlayCardListSection } from "@/utils/strapi/sections/OverlayCardList";
import type { SeoData } from "@/utils/strapi/sections/SEO";
import type { StatisticsCardListSection } from "@/utils/strapi/sections/StatisticsCardList";

export type HomeComponentSection =
  | BannerSection
  | HeroSliderSection
  | ListconfigSection
  | OverlayCardListSection
  | StatisticsCardListSection
  | FormVideoSection

type HomePageResponse = {
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

const formatHomePageData = async (
  data: HomePageResponse
): Promise<HomePageResponse> => {
  const sections = data?.homePage?.data?.attributes?.sections;

  const formattedSections = await Promise.all(
    sections?.map(async (section) => {
      switch (section?.type) {
        case "ComponentSectionsListconfig": {
          const formattedData = await formatListconfigSection(section);
          return formattedData;
        }
        default:
          return section;
      }
    })
  );

  data.homePage.data.attributes.sections = formattedSections;
  return data;
};

export const getHomePageData = async () => {
  const data = await fetchStrapiGraphQL<HomePageResponse>(HOME_PAGE);
  const formattedData = await formatHomePageData(data);
  return formattedData;
};

const HOME_PAGE_SECTIONS = `
sections {
  type: __typename
  ${BANNER}
  ${HERO_SLIDER}
  ${OVERLAY_CARD_LIST}
  ${LIST_CONFIG}
  ${STATISTICS_CARD_LIST}
  ${FORM_VIDEO}
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