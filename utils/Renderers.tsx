import Alert from "@/components/sections/Alert";
import Banner from "@/components/sections/Banner";
import BlogPostsPodcast from "@/components/sections/BlogPostsPodcast";
import ContactTargetList from "@/components/sections/ContactTargetList";
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
import RichTextImage from "@/components/sections/RichTextImage";
import StatisticsCardList from "@/components/sections/StatisticsCardList";
import TextContent from "@/components/sections/TextContent";
import type { FC } from "react";

type Renderer = {
  [key: string]: FC<any>;
};

const defaultRenderers: Renderer = {
  paragraph: Paragraph,
  ComponentSectionsAlert: Alert,
  ComponentSectionsBanner: Banner,
  ComponentSectionsBlogPostsPodcast: BlogPostsPodcast,
  ComponentSectionsContactTargetList: ContactTargetList,
  ComponentSectionsFaqSection: FAQ,
  ComponentSectionsFormVideo: FormVideo,
  ComponentSectionsHeroSlider: HeroSlider,
  ComponentSectionsLeaderboard: Leaderboard,
  ComponentSectionsLinkList: LinkList,
  ComponentSectionsListconfig: Listconfig,
  ComponentSectionsOverlayCardList: OverlayCardList,
  ComponentSectionsPodcastList: PodcastList,
  ComponentSectionsProgramsFilter: ProgramsFilter,
  ComponentSectionsRichTextImage: RichTextImage,
  ComponentSectionsStatisticsCardList: StatisticsCardList,
  ComponentSectionsTextContent: TextContent,
};

export default defaultRenderers;
