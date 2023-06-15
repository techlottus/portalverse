import { fetchStrapiGraphQL } from "@/utils/getStrapi";

export type DynamicPageData = {
  id: number;
  attributes: {
    slug: string;
    breadcrumb?: string;
  };
}

type DynamicPagesResponse = {
  pages: {
    data: Array<DynamicPageData>;
  };
};

const getPagesData = async () => {
  const pagesData = await fetchStrapiGraphQL<DynamicPagesResponse>(DYNAMIC_PAGES);
  return pagesData?.pages?.data;
};

const DYNAMIC_PAGES = `
query DynamicPages {
  pages(pagination: {start: 0, limit: -1}) {
    data {
      id
      attributes {
        slug
        breadcrumb
      }
    }
  }
}
`;

export default getPagesData;
