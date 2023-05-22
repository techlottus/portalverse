import { fetchStrapiGraphQL } from "@/utils/getStrapi";
import { SECTIONS } from "./strapi/queries";

type PageVariables = {
  id: number;
};

export type PageData = {
  attributes: {
    slug: string;
    sections: Array<any>; // TODO
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
