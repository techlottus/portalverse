import { fetchStrapiGraphQL } from "@/utils/getStrapi";
import { ComponentSection, SECTIONS } from "@/utils/strapi/queries";
import getBlogPosts from "./getBlogPosts";
import getPodcastEpisodes from "./getPodcastEpisodes";
import { BlogPostsPodcastSection } from "./strapi/sections/BlogPostsPodcast";
import { ListconfigSection } from "./strapi/sections/Listconfig";

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

  const blogPostsData = await getBlogPosts({
    pageSize: blogPostsConfig?.maxentries,
    sort:
      blogPostsConfig?.sortdate === "latest"
        ? "publication_date:desc"
        : "publication_date:asc",
  });

  blogPostsConfig.data = blogPostsData?.blogPosts?.data;
  return section;
};

const formatListConfigSection = async (section: ListconfigSection) => {
  switch (section?.relatesto) {
    case "blogentries": {
      const blogPosts = await getBlogPosts({
        pageSize: section?.maxentries,
        sort:
          section?.sortdate === "latest"
            ? "publication_date:desc"
            : "publication_date:asc",
      });
      section.data = blogPosts?.blogPosts?.data;
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
          const formattedData = await formatListConfigSection(section);
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
