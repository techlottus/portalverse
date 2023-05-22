import Alert from "@/components/Alert";
import ContactTargetList from "@/components/ContactTargetList";
import LinkList from "@/components/LinkList";
import Paragraph from "@/components/Paragraph";
import RichTextImage from "@/components/RichTextImage";
import type { FC } from "react";

type Renderer = {
  [key: string]: FC<any>;
};

const defaultRenderers: Renderer = {
  paragraph: Paragraph,
  ComponentSectionsContactTargetList: ContactTargetList,
  ComponentSectionsAlert: Alert,
  ComponentSectionsRichTextImage: RichTextImage,
  ComponentSectionsLinkList: LinkList
};

export default defaultRenderers;