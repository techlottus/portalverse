import { fetchStrapiGraphQL } from "@/utils/getStrapi";
import { SECTIONS } from "@/utils/strapi/queries";
import { formatBlogPostsPodcastSection } from "@/utils/strapi/sections/BlogPostsPodcast";
import { formatContEdProgramsSection } from "@/utils/strapi/sections/ContEdPrograms";
import { formatListconfigSection } from "@/utils/strapi/sections/Listconfig";
import { formatProgramsFilterSection } from "@/utils/strapi/sections/ProgramsFilter";
import type { ComponentSection } from "@/utils/strapi/queries";

type PageVariables = {
  id: number;
};

export type DynamicPageData = {
  attributes: {
    title: string;
    slug: string;
    breadcrumb: string;
    sections: Array<ComponentSection>;
  };
};

export type PageEntityResponse = {
  type: "PageEntityResponse";
  data: DynamicPageData;
};

type PageResponse = {
  page: PageEntityResponse;
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
        case "ComponentSectionsContEdPrograms": {
          const formattedData = await formatContEdProgramsSection(section);
          return formattedData;
        }
        case "ComponentSectionsListconfig": {
          const formattedData = await formatListconfigSection(section);
          return formattedData;
        }
        case "ComponentSectionsProgramsFilter": {
          const formattedData = await formatProgramsFilterSection(section);
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

const getDynamicPageDataById = async (variables: PageVariables) => {
  const pageData = await fetchStrapiGraphQL<PageResponse>(PAGE, variables);
  const formattedData = await formatPageData(pageData);
  return formattedData;
};

const PAGE = `
query PageById($id: ID) {
  page(id: $id) {
    type: __typename
    data {
      attributes {
        title
        slug
        breadcrumb
        sections {
          type: __typename
          ${SECTIONS}
        }
      }
    }
  }
}
`;

export default getDynamicPageDataById;
