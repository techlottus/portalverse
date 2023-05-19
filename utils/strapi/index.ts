import { StrapiImage } from "@/types/strapi/common";
import { ComponentSection } from "@/utils/strapi/queries";
import getPageData from "@/utils/getPageData";
import getPagesData from "@/utils/getPagesData";
import { normalizePath } from "@/utils/routes";
  
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

export const getPageBySlug = async (slug: string) => {
  const pagesData = await getPagesData();

  const targetPage = pagesData?.find(
    (page) => normalizePath(page?.attributes?.slug) === normalizePath(slug)
  );
  const targetPageId = targetPage?.id;

  if (!targetPageId) throw new Error("Page ID Not Found");

  const pageData = await getPageData({ id: targetPageId });
  return pageData?.page?.data;
};