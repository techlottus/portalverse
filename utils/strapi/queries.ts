import { ACCORDION_SECTION } from "@/utils/strapi/sections/Accordion";
import { ALERT } from "@/utils/strapi/sections/Alert";
import { BANNER } from "@/utils/strapi/sections/Banner";
import { BLOG_POSTS_PODCAST } from "@/utils/strapi/sections/BlogPostsPodcast";
import { CARD_LIST } from "@/utils/strapi/sections/CardList";
import { CONTACT_TARGET_LIST } from "@/utils/strapi/sections/ContactTargetList";
import { CONT_ED_PROGRAMS } from "@/utils/strapi/sections/ContEdPrograms";
import { FAQ_SECTION } from "@/utils/strapi/sections/FAQ";
import { FORM_CONTAINER } from "@/utils/strapi/sections/ContainerForm";
import { FORM_VIDEO } from "@/utils/strapi/sections/FormVideo";
import { GOOGLE_MAP } from "@/utils/strapi/sections/GoogleMap";
import { HERO_SLIDER } from "@/utils/strapi/sections/HeroSlider";
import { KNOWLEDGE_AREA_FILTER } from "@/utils/strapi/sections/KnowledgeAreaFilter";
import { LEADERBOARD } from "@/utils/strapi/sections/Leaderboard";
import { LINK_LIST } from "@/utils/strapi/sections/LinkList";
import { LIST_CONFIG } from "@/utils/strapi/sections/Listconfig";
import { MODALITY_FILTER } from "@/utils/strapi/sections/ModalityFilter";
import { OUTSTANDING_LIST } from "@/utils/strapi/sections/OutstandingList";
import { OVERLAY_CARD_LIST } from "@/utils/strapi/sections/OverlayCardList";
import { PODCAST_LIST } from "@/utils/strapi/sections/PodcastList";
import { PROGRAM_ACCORDION_LIST,  } from "@/utils/strapi/sections/ProgramAccordionItems";
import { PROGRAMS_FILTER } from "@/utils/strapi/sections/ProgramsFilter";
import { PROMO_LINK_LIST } from "@/utils/strapi/sections/PromoLinkList";
import { RICH_TEXT_IMAGE } from "@/utils/strapi/sections/RichTextImage";
import { RICH_TEXT_VIDEO } from "@/utils/strapi/sections/RichTextVideo";
import { ROCKSTARINFO_LIST } from "@/utils/strapi/sections/RockstarInfloList";
import { STATISTICS_CARD_LIST } from "@/utils/strapi/sections/StatisticsCardList";
import { TEXT_CONTENT } from "@/utils/strapi/sections/TextContent";
import type {AccordionSection} from "@/utils/strapi/sections/Accordion";
import type { AlertSection } from "@/utils/strapi/sections/Alert";
import type { BannerSection } from "@/utils/strapi/sections/Banner";
import type { BlogPostsPodcastSection } from "@/utils/strapi/sections/BlogPostsPodcast";
import type { CardListSection } from "@/utils/strapi/sections/CardList";
import type { ContactTargetListSection } from "@/utils/strapi/sections/ContactTargetList";
import type { ContainerForm } from "@/utils/strapi/sections/ContainerForm";
import type { ContEdProgramsSection } from "@/utils/strapi/sections/ContEdPrograms";
import type { FAQSection } from "@/utils/strapi/sections/FAQ";
import type { FormVideoSection } from "@/utils/strapi/sections/FormVideo";
import type { GoogleMapSection } from "@/utils/strapi/sections/GoogleMap";
import type { HeroSliderSection } from "@/utils/strapi/sections/HeroSlider";
import type { KnowledgeAreaFilterSection } from "@/utils/strapi/sections/KnowledgeAreaFilter";
import type { LeaderboardSection } from "@/utils/strapi/sections/Leaderboard";
import type { LinkListSection } from "@/utils/strapi/sections/LinkList";
import type { ListconfigSection } from "@/utils/strapi/sections/Listconfig";
import type { ModalityFilterSection } from "@/utils/strapi/sections/ModalityFilter";
import type { ProgramAccordionListSection } from "@/utils/strapi/sections/ProgramAccordionItems";
import type { OutstandingListSection } from "@/utils/strapi/sections/OutstandingList";
import type { PodcastListSection } from "@/utils/strapi/sections/PodcastList";
import type { ProgramsFilterSection } from "@/utils/strapi/sections/ProgramsFilter";
import type { PromoLinkListSection } from "@/utils/strapi/sections/PromoLinkList";
import type { RichTextImageSection } from "@/utils/strapi/sections/RichTextImage";
import type { RichTextVideoSection } from "@/utils/strapi/sections/RichTextVideo";
import type { RockstarInfoListSection } from "@/utils/strapi/sections/RockstarInfloList";
import type { StatisticsCardListSection } from "@/utils/strapi/sections/StatisticsCardList";
import type { TextContentSection } from "@/utils/strapi/sections/TextContent";

export type ComponentSection =
  | AccordionSection
  | AlertSection
  | BannerSection
  | BlogPostsPodcastSection
  | CardListSection
  | ContactTargetListSection
  | ContainerForm
  | ContEdProgramsSection
  | FAQSection
  | FormVideoSection
  | GoogleMapSection
  | HeroSliderSection
  | KnowledgeAreaFilterSection
  | LeaderboardSection
  | LinkListSection
  | ListconfigSection
  | ModalityFilterSection
  | OutstandingListSection
  | PodcastListSection
  | ProgramAccordionListSection
  | ProgramsFilterSection
  | PromoLinkListSection
  | RichTextImageSection
  | RichTextVideoSection
  | RockstarInfoListSection
  | StatisticsCardListSection
  | TextContentSection

export const SECTIONS = `
  ${ACCORDION_SECTION}
  ${ALERT}
  ${BANNER}
  ${BLOG_POSTS_PODCAST}
  ${CARD_LIST} 
  ${CONTACT_TARGET_LIST}
  ${CONT_ED_PROGRAMS}
  ${FAQ_SECTION}
  ${FORM_CONTAINER}
  ${FORM_VIDEO}
  ${GOOGLE_MAP}
  ${HERO_SLIDER}
  ${KNOWLEDGE_AREA_FILTER}
  ${LINK_LIST}
  ${LIST_CONFIG}
  ${LEADERBOARD}
  ${MODALITY_FILTER}
  ${OUTSTANDING_LIST}
  ${OVERLAY_CARD_LIST}
  ${PODCAST_LIST}
  ${PROGRAM_ACCORDION_LIST}
  ${PROGRAMS_FILTER}
  ${PROMO_LINK_LIST}
  ${RICH_TEXT_IMAGE}
  ${RICH_TEXT_VIDEO}
  ${ROCKSTARINFO_LIST}
  ${STATISTICS_CARD_LIST}
  ${TEXT_CONTENT}
`;