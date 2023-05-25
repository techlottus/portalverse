import { fetchStrapiGraphQL } from "@/utils/getStrapi";
import { ComponentSection, SECTIONS } from "@/utils/strapi/queries";

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

type PageResponse = {
  page: {
    data: PageData;
  };
};

const getPageData = async (variables: PageVariables) => {
  const pageData = await fetchStrapiGraphQL<PageResponse>(PAGE, variables);
  return pageData;
};

const PAGE = `
query Page($id: ID) {
  page(id: $id) {
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
