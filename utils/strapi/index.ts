import getPageData from "@/utils/getPageData";
import getPagesData from "@/utils/getPagesData";
import { normalizePath } from "@/utils/routes";
import type { StrapiImage } from "@/types/strapi/common";
import type { BannerSection } from "@/utils/strapi/sections/Banner";
import type { HeroSliderSection } from "@/utils/strapi/sections/HeroSlider";
import type { ListconfigSection } from "@/utils/strapi/sections/Listconfig";
import type { OverlayCardListSection } from "@/utils/strapi/sections/OverlayCardList";
import type { StatisticsCardListSection } from "@/utils/strapi/sections/StatisticsCardList";

type ComponentSection =
  | BannerSection
  | HeroSliderSection
  | OverlayCardListSection
  | ListconfigSection
  | StatisticsCardListSection
  
export function findSection<T extends ComponentSection>(sections: Array<ComponentSection>, sectionTypename: T["type"]): T {
  //@ts-ignore
  return sections?.find((section): section is T => section?.type === sectionTypename);
}

export function findSections<T extends ComponentSection>(sections: Array<ComponentSection>, sectionTypename: T["type"]): Array<T> {
  //@ts-ignore
  return sections?.filter((section): section is T => section?.type === sectionTypename);
}

export const formatStrapiImage = (imageObj: StrapiImage): string => {
  return imageObj?.data?.attributes?.url;
};

export const getPageBySlug = async (slug: string) => {
  const pagesData = await getPagesData();

  const targetPage = pagesData?.find(
    (page) => normalizePath(page?.attributes?.slug) === normalizePath(slug)
  );
  const targetPageId = targetPage?.id;

  if (!targetPageId) throw new Error("Page ID Not Found");

  const pageData = await getPageData({ id: targetPageId });
  return pageData?.page;
};