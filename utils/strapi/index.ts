import { StrapiImage } from "@/types/strapi/common";
import { HeroSliderSection } from "./sections/HeroSlider";
import { BannerSection } from "./sections/Banner";
import { ListconfigSection } from "./sections/Listconfig";
import { OverlayCardListSection } from "./sections/OverlayCardList";
import { StatisticsCardListSection } from "./sections/StatisticsCardList";

type ComponentSection =
  | BannerSection
  | HeroSliderSection
  | OverlayCardListSection
  | ListconfigSection
  | StatisticsCardListSection
  
export function findSection<T extends ComponentSection>(sections: Array<ComponentSection>, sectionTypename: T["__typename"]): T {
  //@ts-ignore
  return sections?.find((section): section is T => section?.__typename === sectionTypename);
}

export function findSections<T extends ComponentSection>(sections: Array<ComponentSection>, sectionTypename: T["__typename"]): Array<T> {
  //@ts-ignore
  return sections?.filter((section): section is T => section?.__typename === sectionTypename);
}

export const formatStrapiImage = (imageObj: StrapiImage): string => {
  return imageObj?.data?.attributes?.url;
};