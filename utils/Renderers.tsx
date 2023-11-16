import AccordionComponent from "@/components/sections/AccordionSection";
import Alert from "@/components/sections/Alert";
import Banner from "@/components/sections/Banner";
import BannerNumeraliaSection from "@/components/sections/BannerNumeraliaSection";
import BlogPostsPodcast from "@/components/sections/BlogPostsPodcast";
import CardList from "@/components/sections/CardList";
import CardsStatistics from "@/components/sections/CardsStatistics";
import ContactTargetList from "@/components/sections/ContactTargetList";
import ContainerForm from "@/components/sections/ContainerForm";
import ContEdPrograms from "@/components/sections/ContEdPrograms";
import FAQ from "@/components/sections/FAQ";
import FormVideo from "@/components/sections/FormVideo";
import GoogleMap from "@/components/sections/GoogleMap";
import HeroSlider from "@/components/sections/HeroSlider";
import IntroductionImage from "@/components/sections/IntroductionImage";
import KnowledgeAreaFilter from "@/components/sections/KnowledgeAreaFilter";
import Leaderboard from "@/components/sections/Leaderboard";
import LinkList from "@/components/sections/LinkList";
import Listconfig from "@/components/sections/Listconfig";
import ModalityFilter from "@/components/sections/ModalityFilter";
import MosaicSection from "@/components/sections/MosaicSection";
import OutstandingList from "@/components/sections/OutstandingList";
import OverlayCardList from "@/components/sections/OverlayCardList";
import Paragraph from "@/components/Paragraph";
import PodcastList from "@/components/sections/PodcastList";
import ProgramAccordionList from "@/components/sections/ProgramAccordionList";
import ProgramsFilter from "@/components/sections/ProgramsFilter";
import PromoLinkList from "@/components/sections/PromoLinkList";
import RepeatableBannerSection from "@/components/sections/RepeatableBannerSection";
import RichTextImage from "@/components/sections/RichTextImage";
import RichTextVideo from "@/components/sections/RichTextVideo";
import StatisticsCardList from "@/components/sections/StatisticsCardList";
import TextContent from "@/components/sections/TextContent";
import WebError from "@/components/sections/WebError";
import type { FC } from "react";
import RockstarInfo from "@/components/sections/RockstarInfo";
import RockstarInfoList from "@/components/sections/RockstarInfoList";
import VideosSection from "@/components/sections/VideosSection";
import CardsDetailContent from "@/components/sections/CardsDetailContent";

type Renderer = {
  [key: string]: FC<any>;
};

const defaultRenderers: Renderer = {
  paragraph: Paragraph,
  ComponentSectionsAccordion: AccordionComponent,
  ComponentSectionsAlert: Alert,
  ComponentSectionsBanner: Banner,
  ComponentSectionsBannerNumeralia: BannerNumeraliaSection,
  ComponentSectionsBlogPostsPodcast: BlogPostsPodcast,
  ComponentSectionsCardList: CardList,
  ComponentSectionsCardsStatistics: CardsStatistics,
  ComponentSectionsContactTargetList: ContactTargetList,
  ComponentSectionsContEdPrograms: ContEdPrograms,
  ComponentSectionsFaqSection: FAQ,
  ComponentSectionsFormContainer: ContainerForm,
  ComponentSectionsFormVideo: FormVideo,
  ComponentSectionsGoogleMap: GoogleMap,
  ComponentSectionsHeroSlider: HeroSlider,
  ComponentSectionsIntroductionImage: IntroductionImage,
  ComponentSectionsKnowledgeAreaFilter: KnowledgeAreaFilter,
  ComponentSectionsLeaderboard: Leaderboard,
  ComponentSectionsLinkList: LinkList,
  ComponentSectionsListconfig: Listconfig,
  ComponentSectionsModalityFilter: ModalityFilter,
  ComponentSectionsMosaic: MosaicSection,
  ComponentSectionsContainerOutstandingList: OutstandingList,
  ComponentSectionsOverlayCardList: OverlayCardList,
  ComponentSectionsPodcastList: PodcastList,
  ComponentSectionsProgramAccordionList: ProgramAccordionList,
  ComponentSectionsProgramsFilter: ProgramsFilter,
  ComponentSectionsPromoLinkList: PromoLinkList,
  ComponentSectionsRepeatableBanner: RepeatableBannerSection,
  ComponentSectionsRichTextImage: RichTextImage,
  ComponentSectionsRichTextVideo: RichTextVideo,
  ComponentSectionsRockstarInfo: RockstarInfo,
  ComponentSectionsRockstarInfoList: RockstarInfoList,
  ComponentSectionsStatisticsCardList: StatisticsCardList,
  ComponentSectionsTextContent: TextContent,
  ComponentSectionsVideos: VideosSection,
  ComponentSectionsWebError: WebError,
  ComponentSectionsCardsDetailContent: CardsDetailContent
};

export default defaultRenderers;
