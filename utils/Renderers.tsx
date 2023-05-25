import Alert from "@/components/sections/Alert";
import Banner from "@/components/sections/Banner";
import ContactTargetList from "@/components/sections/ContactTargetList";
import FAQ from "@/components/sections/FAQ";
import LinkList from "@/components/sections/LinkList";
import Paragraph from "@/components/Paragraph";
import RichTextImage from "@/components/sections/RichTextImage";
import TextContent from "@/components/sections/TextContent";
import type { FC } from "react";

type Renderer = {
  [key: string]: FC<any>;
};

const defaultRenderers: Renderer = {
  paragraph: Paragraph,
  ComponentSectionsContactTargetList: ContactTargetList,
  ComponentSectionsAlert: Alert,
  ComponentSectionsRichTextImage: RichTextImage,
  ComponentSectionsLinkList: LinkList,
  ComponentSectionsBanner: Banner,
  ComponentSectionsTextContent: TextContent,
  ComponentSectionsFaqSection: FAQ
};

export default defaultRenderers;