import { fetchStrapiGraphQL } from "@/utils/getStrapi";
import { SECTIONS, ComponentSection } from "@/utils/strapi/queries";
import { SEO, SeoData } from "@/utils/strapi/sections/SEO";

type HomePageData = {
  homePage: {
    data: {
      attributes: {
        title: string;
        slug: string;
        sections: Array<ComponentSection>;
        seo: SeoData;
      };
    };
  };
};

export const getHomePageData = async () => {
  const data = await fetchStrapiGraphQL<HomePageData>(HOME_PAGE);
  return data;
};

const HOME_PAGE = `
query HomePage {
  homePage {
    data {
      attributes {
        title
        slug
        ${SECTIONS}
        ${SEO}
      }
    }
  }
}
`;
