import { ALERT, AlertSection } from "@/utils/strapi/sections/Alert";
import { BANNER, BannerSection } from "@/utils/strapi/sections/Banner";
import { CONTACT_TARGET_LIST, ContactTargetListSection } from "@/utils/strapi/sections/ContactTargetList";
import { RichTextImageSection, RICH_TEXT_IMAGE } from "@/utils/strapi/sections/RichTextImage";
import { LinkListSection, LINK_LIST } from "./sections/LinkList";

export type ComponentSection =
  | ContactTargetListSection
  | AlertSection
  | RichTextImageSection
  | LinkListSection
  | BannerSection

export const SECTIONS = `
  ${CONTACT_TARGET_LIST}
  ${ALERT}
  ${RICH_TEXT_IMAGE}
  ${LINK_LIST}
  ${BANNER}
`;