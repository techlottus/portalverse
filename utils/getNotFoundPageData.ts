import { fetchStrapiGraphQL } from "@/utils/getStrapi";
import type { SeoData } from "@/utils/strapi/sections/SEO";
import { NotFoundPage, WebErrorSection } from "./strapi/sections/WebError";

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

const formatNotFoundPageData = async (
  data: NotfoundPageResponse
): Promise<NotfoundPageResponse> => {
  
  const sections = data?.notFoundPage?.data?.attributes?.sections;

  const formattedSections = await Promise.all(
    sections?.map(async (section) => section)
  );

  data.notFoundPage.data.attributes.sections = formattedSections;
  return data;
};

export const getNotFoundPageData = async () => {
  const data = await fetchStrapiGraphQL<NotfoundPageResponse>(NotFoundPage);
  const formattedData = await formatNotFoundPageData(data);
  return formattedData;
};

