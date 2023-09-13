import { fetchStrapiGraphQL } from "@/utils/getStrapi";
import { SEO, type SeoData } from "@/utils/strapi/sections/SEO";
import { WEB_ERROR, WebErrorSection } from "./strapi/sections/WebError";

export type NotfoundSection = WebErrorSection

type NotfoundPageResponse = {
  notFoundPage: {
    data: {
      attributes: {
        title: string;
        slug: string;
        sections: Array<NotfoundSection>;
        seo: SeoData;
      };
    };
  };
};
export const getNotFoundPageData = async () => {
  const data = await fetchStrapiGraphQL<NotfoundPageResponse>(NotFoundPage);
  return data;
};

export const NotFoundPage = `
query NotFoundPage {
  notFoundPage {
    data {
      attributes {
        title
        slug
        sections {
          type: __typename
          ${WEB_ERROR}
        }
        ${SEO}
      }
    }
  }
}
`;
