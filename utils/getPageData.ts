import { fetchStrapiGraphQL } from "@/utils/getStrapi";

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
query Page {
  page(id: 1) {
    data {
      attributes {
        slug
        sections {
          type: __typename
        }
      }
    }
  }
}
`;

export default getPageData;
