import { LinkComponentConfig } from "./LinkListComponentS";

export type LinkListConfig = {
  links: Array<LinkComponentConfig>
  title: string;
}

export type LinkListData = {
  data: LinkListConfig
}