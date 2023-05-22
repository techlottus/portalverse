import { CONTACT_TARGET_LIST, ContactTargetListSection } from "@/utils/strapi/sections/ContactTargetList";
import { ALERT, AlertSection } from "@/utils/strapi/sections/Alert";

export type ComponentSection =
  | ContactTargetListSection
  | AlertSection

export const SECTIONS = `
  ${CONTACT_TARGET_LIST}
  ${ALERT}
`;