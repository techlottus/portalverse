import { ALERT } from "@/utils/strapi/sections/Alert";
import { BANNER } from "@/utils/strapi/sections/Banner";
import { BLOG_POSTS_PODCAST } from "@/utils/strapi/sections/BlogPostsPodcast";
import { CONTACT_TARGET_LIST } from "@/utils/strapi/sections/ContactTargetList";
import { FAQ_SECTION } from "@/utils/strapi/sections/FAQ";
import { HERO_SLIDER } from "@/utils/strapi/sections/HeroSlider";
import { LEADERBOARD } from "@/utils/strapi/sections/Leaderboard";
import { LINK_LIST } from "@/utils/strapi/sections/LinkList";
import { LIST_CONFIG } from "@/utils/strapi/sections/Listconfig";
import { PODCAST_LIST } from "@/utils/strapi/sections/PodcastList";
import { RICH_TEXT_IMAGE } from "@/utils/strapi/sections/RichTextImage";
import { TEXT_CONTENT } from "@/utils/strapi/sections/TextContent";
import { PROMO_LINK_LIST } from "@/utils/strapi/sections/PromoLinkList";
import type { AlertSection } from "@/utils/strapi/sections/Alert";
import type { BannerSection } from "@/utils/strapi/sections/Banner";
import type { BlogPostsPodcastSection } from "@/utils/strapi/sections/BlogPostsPodcast";
import type { ContactTargetListSection } from "@/utils/strapi/sections/ContactTargetList";
import type { FAQSection } from "@/utils/strapi/sections/FAQ";
import type { HeroSliderSection } from "@/utils/strapi/sections/HeroSlider";
import type { LeaderboardSection } from "@/utils/strapi/sections/Leaderboard";
import type { LinkListSection } from "@/utils/strapi/sections/LinkList";
import type { ListconfigSection } from "@/utils/strapi/sections/Listconfig";
import type { PodcastListSection } from "@/utils/strapi/sections/PodcastList";
import type { RichTextImageSection } from "@/utils/strapi/sections/RichTextImage";
import type { TextContentSection } from "@/utils/strapi/sections/TextContent";
import type { PromoLinkListSection } from "@/utils/strapi/sections/PromoLinkList";

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
  | PromoLinkListSection

export const SECTIONS = `
  ${ALERT}
  ${BANNER}
  ${BLOG_POSTS_PODCAST}
  ${CONTACT_TARGET_LIST}
  ${FAQ_SECTION}
  ${HERO_SLIDER}
  ${LINK_LIST}
  ${LIST_CONFIG}
  ${LEADERBOARD}
  ${PODCAST_LIST}
  ${RICH_TEXT_IMAGE}
  ${TEXT_CONTENT}
  ${BLOG_POSTS_PODCAST}
  ${LIST_CONFIG}
  ${PODCAST_LIST}
  ${HERO_SLIDER}
  ${PROMO_LINK_LIST}
`;