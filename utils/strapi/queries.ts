import { CONTACT_TARGET_LIST, ContactTargetListSection } from "@/utils/strapi/sections/ContactTargetList";

export type ComponentSection =
  | ContactTargetListSection

export const SECTIONS = `
  ${CONTACT_TARGET_LIST}
`;