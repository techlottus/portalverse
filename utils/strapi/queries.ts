import { ALERT, AlertSection } from "@/utils/strapi/sections/Alert";
import { BANNER, BannerSection } from "@/utils/strapi/sections/Banner";
import { CONTACT_TARGET_LIST, ContactTargetListSection } from "@/utils/strapi/sections/ContactTargetList";
import { LINK_LIST, LinkListSection } from "@/utils/strapi/sections/LinkList";
import { RICH_TEXT_IMAGE, RichTextImageSection } from "@/utils/strapi/sections/RichTextImage";
import { TEXT_CONTENT, TextContentSection } from "@/utils/strapi/sections/TextContent";
import { FAQ_SECTION, FAQSection } from "@/utils/strapi/sections/FAQ";

export type ComponentSection =
  | ContactTargetListSection
  | AlertSection
  | RichTextImageSection
  | LinkListSection
  | BannerSection
  | TextContentSection
  | FAQSection

export const SECTIONS = `
  ${CONTACT_TARGET_LIST}
  ${ALERT}
  ${RICH_TEXT_IMAGE}
  ${LINK_LIST}
  ${BANNER}
  ${TEXT_CONTENT}
  ${FAQ_SECTION}
`;