import getBlogEntryPageData from "@/utils/getBlogEntryPageData";
import getBlogPosts from "@/utils/getBlogPosts";
import getPodcastEpisodes from "@/utils/getPodcastEpisodes";
import type { BlogPost } from "@/utils/getBlogPosts";
import type { PodcastEpisode } from "@/utils/getPodcastEpisodes";

type BlogEntriesData = {
  blogPageSlug: string;
  blogPosts: Array<BlogPost>;
};

type ListconfigBase = {
  title: string;
  maxentries: number;
  sortdate: "latest" | "earliest";
};

type ListconfigType =
  | {
      relatesto: "blogentries";
      data?: BlogEntriesData;
    }
  | {
      relatesto: "podcasts";
      data?: Array<PodcastEpisode>;
    };

export type ListconfigData = ListconfigBase & ListconfigType;

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

export const formatListconfigSection = async (
  section: ListconfigSection
): Promise<ListconfigSection> => {
  switch (section?.relatesto) {
    case "blogentries": {
      const blogEntryPage = await getBlogEntryPageData();

      const blogPostsData = await getBlogPosts({
        pageSize: section?.maxentries,
        sort:
          section?.sortdate === "latest"
            ? "publication_date:desc"
            : "publication_date:asc",
      });

      const blogPosts = blogPostsData?.blogPosts?.data;

      section.data = {
        blogPageSlug: blogEntryPage?.data?.attributes?.slug,
        blogPosts,
      };
      break;
    }
    case "podcasts": {
      const podcastEpisodes = await getPodcastEpisodes({
        pageSize: section?.maxentries,
        sort:
          section?.sortdate === "latest"
            ? "publicationDate:desc"
            : "publicationDate:asc",
      });
      section.data = podcastEpisodes?.podcasts?.data;
    }
    default:
      return section;
  }

  return section;
};
