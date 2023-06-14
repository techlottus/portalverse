import { fetchStrapiGraphQL } from "@/utils/getStrapi";
import { SECTIONS } from "@/utils/strapi/queries";
import { formatBlogPostsPodcastSection } from "@/utils/strapi/sections/BlogPostsPodcast";
import { formatListconfigSection } from "@/utils/strapi/sections/Listconfig";
import type { ComponentSection } from "@/utils/strapi/queries";

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
