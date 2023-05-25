import { ALERT, AlertSection } from "@/utils/strapi/sections/Alert";
import { BANNER, BannerSection } from "@/utils/strapi/sections/Banner";
import { CONTACT_TARGET_LIST, ContactTargetListSection } from "@/utils/strapi/sections/ContactTargetList";
import { LEADERBOARD, LeaderboardSection } from "./sections/Leaderboard";
import { LINK_LIST, LinkListSection } from "@/utils/strapi/sections/LinkList";
import { RICH_TEXT_IMAGE, RichTextImageSection } from "@/utils/strapi/sections/RichTextImage";
import { TEXT_CONTENT, TextContentSection } from "@/utils/strapi/sections/TextContent";
import { FAQ_SECTION, FAQSection } from "@/utils/strapi/sections/FAQ";

export type ComponentSection =
  | AlertSection
  | BannerSection
  | ContactTargetListSection
  | FAQSection
  | LeaderboardSection
  | LinkListSection
  | RichTextImageSection
  | TextContentSection

export const SECTIONS = `
  ${ALERT}
  ${BANNER}
  ${CONTACT_TARGET_LIST}
  ${FAQ_SECTION}
  ${LINK_LIST}
  ${LEADERBOARD}
  ${RICH_TEXT_IMAGE}
  ${TEXT_CONTENT}
`;