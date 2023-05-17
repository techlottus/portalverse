import { CONTACT_TARGET_LIST, ContactTargetListSection } from "./sections/ContactTargetList";

export type ComponentSection =
  | ContactTargetListSection

export const SECTIONS = `
sections {
  __typename
  ${CONTACT_TARGET_LIST}
}
`;