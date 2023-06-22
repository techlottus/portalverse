import { fetchStrapiGraphQL } from "@/utils/getStrapi";

export type DynamicPageInfo = {
  id: number;
  attributes: {
    slug: string;
    breadcrumb?: string;
  };
}

type DynamicPagesInfoResponse = {
  pages: {
    data: Array<DynamicPageInfo>;
  };
};

const getPagesInfo = async () => {
  const pagesData = await fetchStrapiGraphQL<DynamicPagesInfoResponse>(DYNAMIC_PAGES_INFO);
  return pagesData?.pages?.data;
};

const DYNAMIC_PAGES_INFO = `
query DynamicPagesInfo {
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

export default getPagesInfo;
