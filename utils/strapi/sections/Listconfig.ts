import { BlogPost } from "@/utils/getBlogPosts";
import { PodcastEpisode } from "@/utils/getPodcastEpisodes";


export type ListConfigData = {
  title: string;
  relatesto: "blogentries" | "podcasts"; // TODO: Add or remove pages & fqa
  maxentries: number;
  sortdate: "latest" | "earliest";
  data?: Array<BlogPost> | Array<PodcastEpisode>;
}

export type ListconfigSection = ListConfigData & {
  type: "ComponentSectionsListconfig";
};

export const LIST_CONFIG = `
...on ComponentSectionsListconfig {
  title
  maxentries
  relatesto
  sortdate
}
`;
