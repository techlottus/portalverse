import { ALERT, AlertSection } from "@/utils/strapi/sections/Alert";
import { BANNER, BannerSection } from "@/utils/strapi/sections/Banner";
import { CONTACT_TARGET_LIST, ContactTargetListSection } from "@/utils/strapi/sections/ContactTargetList";
import { LEADERBOARD, LeaderboardSection } from "./sections/Leaderboard";
import { LINK_LIST, LinkListSection } from "@/utils/strapi/sections/LinkList";
import { RICH_TEXT_IMAGE, RichTextImageSection } from "@/utils/strapi/sections/RichTextImage";
import { TEXT_CONTENT, TextContentSection } from "@/utils/strapi/sections/TextContent";
import { FAQ_SECTION, FAQSection } from "@/utils/strapi/sections/FAQ";
import { ListconfigSection, LIST_CONFIG } from "./sections/Listconfig";
import { BlogPostsPodcastSection, BLOG_POSTS_PODCAST } from "./sections/BlogPostsPodcast";
import { PodcastListSection, PODCAST_LIST } from "./sections/PodcastList";
import { HeroSliderSection, HERO_SLIDER } from "./sections/HeroSlider";

export type ComponentSection =
  | AlertSection
  | BannerSection
  | ContactTargetListSection
  | FAQSection
  | LeaderboardSection
  | LinkListSection
  | RichTextImageSection
  | TextContentSection
  | BlogPostsPodcastSection
  | ListconfigSection
  | PodcastListSection
  | HeroSliderSection

export const SECTIONS = `
  ${ALERT}
  ${BANNER}
  ${CONTACT_TARGET_LIST}
  ${FAQ_SECTION}
  ${LINK_LIST}
  ${LEADERBOARD}
  ${RICH_TEXT_IMAGE}
  ${TEXT_CONTENT}
  ${BLOG_POSTS_PODCAST}
  ${LIST_CONFIG}
  ${PODCAST_LIST}
  ${HERO_SLIDER}
`;