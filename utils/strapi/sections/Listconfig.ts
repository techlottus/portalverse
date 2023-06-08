import type { BlogPost } from "@/utils/getBlogPosts";
import type { PodcastEpisode } from "@/utils/getPodcastEpisodes";

type BlogEntriesData = {
  blogPageSlug: string;
  blogPosts: Array<BlogPost>;
};

type Base = {
  title: string;
  maxentries: number;
  sortdate: "latest" | "earliest";
}

type Type =
  | {
      relatesto: "blogentries";
      data?: BlogEntriesData;
    }
  | {
      relatesto: "podcasts";
      data?: Array<PodcastEpisode>;
    };

export type ListconfigData = Base & Type;

export type ListconfigSection = ListconfigData & {
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
