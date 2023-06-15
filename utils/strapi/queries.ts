import { ALERT } from "@/utils/strapi/sections/Alert";
import { BANNER } from "@/utils/strapi/sections/Banner";
import { BLOG_POSTS_PODCAST } from "@/utils/strapi/sections/BlogPostsPodcast";
import { CONTACT_TARGET_LIST } from "@/utils/strapi/sections/ContactTargetList";
import { FAQ_SECTION } from "@/utils/strapi/sections/FAQ";
import { FORM_VIDEO } from "@/utils/strapi/sections/FormVideo";
import { HERO_SLIDER } from "@/utils/strapi/sections/HeroSlider";
import { LEADERBOARD } from "@/utils/strapi/sections/Leaderboard";
import { LINK_LIST } from "@/utils/strapi/sections/LinkList";
import { LIST_CONFIG } from "@/utils/strapi/sections/Listconfig";
import { OVERLAY_CARD_LIST } from "@/utils/strapi/sections/OverlayCardList";
import { PODCAST_LIST } from "@/utils/strapi/sections/PodcastList";
import { PROGRAMS_FILTER } from "@/utils/strapi/sections/ProgramsFilter";
import { RICH_TEXT_IMAGE } from "@/utils/strapi/sections/RichTextImage";
import { STATISTICS_CARD_LIST } from "@/utils/strapi/sections/StatisticsCardList";
import { TEXT_CONTENT } from "@/utils/strapi/sections/TextContent";
import type { AlertSection } from "@/utils/strapi/sections/Alert";
import type { BannerSection } from "@/utils/strapi/sections/Banner";
import type { BlogPostsPodcastSection } from "@/utils/strapi/sections/BlogPostsPodcast";
import type { ContactTargetListSection } from "@/utils/strapi/sections/ContactTargetList";
import type { FAQSection } from "@/utils/strapi/sections/FAQ";
import type { FormVideoSection } from "@/utils/strapi/sections/FormVideo";
import type { HeroSliderSection } from "@/utils/strapi/sections/HeroSlider";
import type { LeaderboardSection } from "@/utils/strapi/sections/Leaderboard";
import type { LinkListSection } from "@/utils/strapi/sections/LinkList";
import type { ListconfigSection } from "@/utils/strapi/sections/Listconfig";
import type { PodcastListSection } from "@/utils/strapi/sections/PodcastList";
import type { ProgramsFilterSection } from "@/utils/strapi/sections/ProgramsFilter";
import type { RichTextImageSection } from "@/utils/strapi/sections/RichTextImage";
import type { StatisticsCardListSection } from "@/utils/strapi/sections/StatisticsCardList";
import type { TextContentSection } from "@/utils/strapi/sections/TextContent";

export type ComponentSection =
  | AlertSection
  | BannerSection
  | BlogPostsPodcastSection
  | ContactTargetListSection
  | FAQSection
  | FormVideoSection
  | HeroSliderSection
  | LeaderboardSection
  | LinkListSection
  | ListconfigSection
  | PodcastListSection
  | ProgramsFilterSection
  | RichTextImageSection
  | StatisticsCardListSection
  | TextContentSection

export const SECTIONS = `
  ${ALERT}
  ${BANNER}
  ${BLOG_POSTS_PODCAST}
  ${CONTACT_TARGET_LIST}
  ${FAQ_SECTION}
  ${FORM_VIDEO}
  ${HERO_SLIDER}
  ${LINK_LIST}
  ${LIST_CONFIG}
  ${LEADERBOARD}
  ${OVERLAY_CARD_LIST}
  ${PODCAST_LIST}
  ${PROGRAMS_FILTER}
  ${RICH_TEXT_IMAGE}
  ${STATISTICS_CARD_LIST}
  ${TEXT_CONTENT}
`;