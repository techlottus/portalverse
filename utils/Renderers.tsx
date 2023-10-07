import AccordionComponent from "@/components/sections/AccordionSection";
import Alert from "@/components/sections/Alert";
import Banner from "@/components/sections/Banner";
import BlogPostsPodcast from "@/components/sections/BlogPostsPodcast";
import CardList from "@/components/sections/CardList";
import ContactTargetList from "@/components/sections/ContactTargetList";
import ContEdPrograms from "@/components/sections/ContEdPrograms";
import FAQ from "@/components/sections/FAQ";
import FormVideo from "@/components/sections/FormVideo";
import GoogleMap from "@/components/sections/GoogleMap";
import HeroSlider from "@/components/sections/HeroSlider";
import KnowledgeAreaFilter from "@/components/sections/KnowledgeAreaFilter";
import Leaderboard from "@/components/sections/Leaderboard";
import LinkList from "@/components/sections/LinkList";
import Listconfig from "@/components/sections/Listconfig";
import ModalityFilter from "@/components/sections/ModalityFilter";
import OutstandingList from "@/components/sections/OutstandingList";
import OverlayCardList from "@/components/sections/OverlayCardList";
import Paragraph from "@/components/Paragraph";
import PodcastList from "@/components/sections/PodcastList";
import ProgramsFilter from "@/components/sections/ProgramsFilter";
import PromoLinkList from "@/components/sections/PromoLinkList";
import RichTextImage from "@/components/sections/RichTextImage";
import RichTextVideo from "@/components/sections/RichTextVideo";
import StatisticsCardList from "@/components/sections/StatisticsCardList";
import TextContent from "@/components/sections/TextContent";
import WebError from "@/components/sections/WebError";
import type { FC } from "react";
import ContainerForm from "@/components/sections/ContainerForm";
import RockstarInfo from "@/components/sections/RockstarInfo";
import RockstarInfoList from "@/components/sections/RockstarInfoList";


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
  ComponentSectionsGoogleMap: GoogleMap,
  ComponentSectionsHeroSlider: HeroSlider,
  ComponentSectionsKnowledgeAreaFilter: KnowledgeAreaFilter,
  ComponentSectionsLeaderboard: Leaderboard,
  ComponentSectionsLinkList: LinkList,
  ComponentSectionsListconfig: Listconfig,
  ComponentSectionsModalityFilter: ModalityFilter,
  ComponentSectionsContainerOutstandingList: OutstandingList,
  ComponentSectionsOverlayCardList: OverlayCardList,
  ComponentSectionsPodcastList: PodcastList,
  ComponentSectionsProgramsFilter: ProgramsFilter,
  ComponentSectionsPromoLinkList: PromoLinkList,
  ComponentSectionsRichTextImage: RichTextImage,
  ComponentSectionsStatisticsCardList: StatisticsCardList,
  ComponentSectionsTextContent: TextContent,
  ComponentSectionsWebError: WebError,
  ComponentSectionsRichTextVideo: RichTextVideo,
  ComponentSectionsFormContainer: ContainerForm,
  ComponentSectionsRockstarInfo: RockstarInfo,
  ComponentSectionsRockstarInfoList: RockstarInfoList
};

export default defaultRenderers;
