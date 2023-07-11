import type { StrapiImage } from "@/types/strapi/common";

export const formatStrapiImage = (imageObj: StrapiImage): string => {
  return imageObj?.data?.attributes?.url;
};

