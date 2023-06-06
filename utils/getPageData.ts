import { fetchStrapiGraphQL } from "@/utils/getStrapi";
import { SECTIONS } from "@/utils/strapi/queries";
import getBlogEntryPageData from "@/utils/getBlogEntryPageData";
import getBlogPosts from "@/utils/getBlogPosts";
import getPodcastEpisodes from "@/utils/getPodcastEpisodes";
import type { BlogPostsPodcastSection } from "@/utils/strapi/sections/BlogPostsPodcast";
import type { ComponentSection } from "@/utils/strapi/queries";
import type { ListconfigSection } from "@/utils/strapi/sections/Listconfig";

type PageVariables = {
  id: number;
};

export type PageData = {
  attributes: {
    title: string;
    slug: string;
    sections: Array<ComponentSection>;
  };
};

export type PageEntity = {
  type: "PageEntityResponse";
  data: PageData;
};

type PageResponse = {
  page: PageEntity;
};

const formatBlogPostsPodcastSection = async (
  section: BlogPostsPodcastSection
) => {
  const blogPostsConfig = section?.blogPosts;

  if (blogPostsConfig?.relatesto !== "blogentries")
    throw new Error(
      "BlogPostsPodcastSection must have its relatesto value set to 'blogentries'"
    );

  const blogEntryPage = await getBlogEntryPageData();

  const blogPostsData = await getBlogPosts({
    pageSize: blogPostsConfig?.maxentries,
    sort:
      blogPostsConfig?.sortdate === "latest"
        ? "publication_date:desc"
        : "publication_date:asc",
  });

  blogPostsConfig.data = {
    blogPageSlug: blogEntryPage?.data?.attributes?.slug,
    blogPosts: blogPostsData?.blogPosts?.data,
  };
  return section;
};

const formatListconfigSection = async (section: ListconfigSection) => {
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

      section.data = { blogPageSlug: blogEntryPage?.data?.attributes?.slug, blogPosts };
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

const formatPageData = async (data: PageResponse): Promise<PageResponse> => {
  const sections = data?.page?.data?.attributes?.sections;

  const formattedSections = await Promise.all(
    sections?.map(async (section) => {
      switch (section?.type) {
        case "ComponentSectionsBlogPostsPodcast": {
          const formattedData = await formatBlogPostsPodcastSection(section);
          return formattedData;
        }
        case "ComponentSectionsListconfig": {
          const formattedData = await formatListconfigSection(section);
          return formattedData;
        }
        default:
          return section;
      }
    })
  );

  data.page.data.attributes.sections = formattedSections;
  return data;
};

const getPageData = async (variables: PageVariables) => {
  const pageData = await fetchStrapiGraphQL<PageResponse>(PAGE, variables);
  const formattedData = await formatPageData(pageData);
  return formattedData;
};

const PAGE = `
query Page($id: ID) {
  page(id: $id) {
    type: __typename
    data {
      attributes {
        title
        slug
        sections {
          type: __typename
          ${SECTIONS}
        }
      }
    }
  }
}
`;

export default getPageData;
