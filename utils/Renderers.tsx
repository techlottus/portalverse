import Alert from "@/components/Alert";
import ContactTargetList from "@/components/ContactTargetList";
import Paragraph from "@/components/Paragraph";
import type { FC } from "react";

type Renderer = {
  [key: string]: FC<any>;
};

const defaultRenderers: Renderer = {
  paragraph: Paragraph,
  ComponentSectionsContactTargetList: ContactTargetList,
  ComponentSectionsAlert: Alert
};

export default defaultRenderers;