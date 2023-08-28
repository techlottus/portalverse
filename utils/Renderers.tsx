import AccordionComponent from "@/components/sections/AccordionSection";
import Alert from "@/components/sections/Alert";
import Banner from "@/components/sections/Banner";
import BlogPostsPodcast from "@/components/sections/BlogPostsPodcast";
import CardList from "@/components/sections/CardList";
import ContactTargetList from "@/components/sections/ContactTargetList";
import ContEdPrograms from "@/components/sections/ContEdPrograms";
import FAQ from "@/components/sections/FAQ";
import FormVideo from "@/components/sections/FormVideo";
import HeroSlider from "@/components/sections/HeroSlider";
import Leaderboard from "@/components/sections/Leaderboard";
import LinkList from "@/components/sections/LinkList";
import Listconfig from "@/components/sections/Listconfig";
import OverlayCardList from "@/components/sections/OverlayCardList";
import Paragraph from "@/components/Paragraph";
import PodcastList from "@/components/sections/PodcastList";
import ProgramsFilter from "@/components/sections/ProgramsFilter";
import PromoLinkList from "@/components/sections/PromoLinkList";
import RichTextImage from "@/components/sections/RichTextImage";
import StatisticsCardList from "@/components/sections/StatisticsCardList";
import TextContent from "@/components/sections/TextContent";
import type { FC } from "react";

type Renderer = {
  [key: string]: FC<any>;
};

const defaultRenderers: Renderer = {
  paragraph: Paragraph,
  ComponentSectionsAccordion: AccordionComponent,
  ComponentSectionsAlert: Alert,
  ComponentSectionsBanner: Banner,
  ComponentSectionsBlogPostsPodcast: BlogPostsPodcast,
  ComponentSectionsCardList: CardList,
  ComponentSectionsContactTargetList: ContactTargetList,
  ComponentSectionsContEdPrograms: ContEdPrograms,
  ComponentSectionsFaqSection: FAQ,
  ComponentSectionsFormVideo: FormVideo,
  ComponentSectionsHeroSlider: HeroSlider,
  ComponentSectionsLeaderboard: Leaderboard,
  ComponentSectionsLinkList: LinkList,
  ComponentSectionsListconfig: Listconfig,
  ComponentSectionsOverlayCardList: OverlayCardList,
  ComponentSectionsPodcastList: PodcastList,
  ComponentSectionsProgramsFilter: ProgramsFilter,
  ComponentSectionsPromoLinkList: PromoLinkList,
  ComponentSectionsRichTextImage: RichTextImage,
  ComponentSectionsStatisticsCardList: StatisticsCardList,
  ComponentSectionsTextContent: TextContent,
};

export default defaultRenderers;
