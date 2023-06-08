import Alert from "@/components/sections/Alert";
import Banner from "@/components/sections/Banner";
import BlogPostsPodcast from "@/components/sections/BlogPostsPodcast";
import ContactTargetList from "@/components/sections/ContactTargetList";
import FAQ from "@/components/sections/FAQ";
import HeroSlider from "@/components/sections/HeroSlider";
import Leaderboard from "@/components/sections/Leaderboard";
import LinkList from "@/components/sections/LinkList";
import Listconfig from "@/components/sections/Listconfig";
import Paragraph from "@/components/Paragraph";
import PodcastList from "@/components/sections/PodcastList";
import RichTextImage from "@/components/sections/RichTextImage";
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
  ComponentSectionsHeroSlider: HeroSlider,
  ComponentSectionsLeaderboard: Leaderboard,
  ComponentSectionsLinkList: LinkList,
  ComponentSectionsListconfig: Listconfig,
  ComponentSectionsRichTextImage: RichTextImage,
  ComponentSectionsTextContent: TextContent,
  ComponentSectionsPodcastList: PodcastList,
};

export default defaultRenderers;
