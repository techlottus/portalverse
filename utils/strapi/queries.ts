import { CONTACT_TARGET_LIST, ContactTargetListSection } from "@/utils/strapi/sections/ContactTargetList";
import { ALERT, AlertSection } from "@/utils/strapi/sections/Alert";
import { RichTextImageSection, RICH_TEXT_IMAGE } from "./sections/RichTextImage";

export type ComponentSection =
  | ContactTargetListSection
  | AlertSection
  | RichTextImageSection

export const SECTIONS = `
  ${CONTACT_TARGET_LIST}
  ${ALERT}
  ${RICH_TEXT_IMAGE}
`;