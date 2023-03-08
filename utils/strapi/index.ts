import { StrapiImage } from "@/types/strapi/common";
import { ComponentSection } from "@/utils/strapi/queries";

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