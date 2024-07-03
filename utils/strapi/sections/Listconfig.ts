import getBlogEntryPageData from "@/utils/getBlogEntryPageData";
import getBlogPosts from "@/utils/getBlogPosts";
import getPodcastEpisodes from "@/utils/getPodcastEpisodes";
import getVacancies, { Vacancies } from "@/utils/getVacancies";
import type { BlogPost } from "@/utils/getBlogPosts";
import type { PodcastEpisode } from "@/utils/getPodcastEpisodes";

type VacanciesData = {
  vacancies: Array<Vacancies>;
};

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
  }
  | {
    relatesto: "vacancies";
    data?: VacanciesData;
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
        limit: section?.maxentries,
        sort:
          section?.sortdate === "latest"
            ? "publication_date:desc"
            : "publication_date:asc",
      });

      const blogPageSlug = blogEntryPage?.data?.attributes?.slug;
      const blogPosts = blogPostsData?.blogPosts?.data;

      if (blogPageSlug && blogPosts) {
        section.data = {
          blogPageSlug: blogEntryPage?.data?.attributes?.slug,
          blogPosts,
        };
      }

      break;

    }
    case "vacancies": {
      const vacanciesData = await getVacancies({
        limit: section?.maxentries,
        sort:
          section?.sortdate === "latest"
            ? "publication_date:desc"
            : "publication_date:asc",
      });

      const vacancies = vacanciesData?.vacancies?.data;

      if (vacancies) {
        section.data = {
          vacancies
        };
      }

      break;
    }
    case "podcasts": {
      const podcastEpisodes = await getPodcastEpisodes({
        limit: section?.maxentries,
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
