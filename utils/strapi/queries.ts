import { BannerSection, BANNER } from "@/utils/strapi/sections/Banner";
import { HeroSliderSection, HERO_SLIDER } from "@/utils/strapi/sections/HeroSlider";
import { OverlayCardListSection, OVERLAY_CARD_LIST } from "@/utils/strapi/sections/OverlayCardList";
import { ListconfigSection, LIST_CONFIG } from "@/utils/strapi/sections/Listconfig";
import { StatisticsCardListSection, STATISTICS_CARD_LIST } from "@/utils/strapi/sections/StatisticsCardList";

export type ComponentSection =
  | BannerSection
  | HeroSliderSection
  | OverlayCardListSection
  | ListconfigSection
  | StatisticsCardListSection

export const SECTIONS = `
sections {
  __typename
  ${BANNER}
  ${HERO_SLIDER}
  ${OVERLAY_CARD_LIST}
  ${LIST_CONFIG}
  ${STATISTICS_CARD_LIST}
}
`;
