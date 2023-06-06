import { LinkComponentConfig } from "./LinkListComponentS";

export type LinkListconfig = {
  links: Array<LinkComponentConfig>
  title: string;
}

export type LinkListData = {
  data: LinkListconfig
}