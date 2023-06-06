import { fetchStrapiGraphQL } from "@/utils/getStrapi";
import { BANNER } from "@/utils/strapi/sections/Banner";
import type { BlogPost } from "@/utils/getBlogPosts";
import type { BannerSection } from "@/utils/strapi/sections/Banner";

type BlogEntryPageComponentSections = Array<BannerSection>;

export type BlogEntryPageEntity = {
  type: "BlogEntryPageEntityResponse";
  data: {
    attributes: {
      slug: string;
      sections: BlogEntryPageComponentSections;
      blogPost?: BlogPost;
    };
  };
};

export type BlogEntryPageResponse = {
  blogEntryPage: BlogEntryPageEntity;
};

const getBlogEntryPageData = async () => {
  const pageData = await fetchStrapiGraphQL<BlogEntryPageResponse>(BLOG_ENTRY_PAGE);
  return pageData?.blogEntryPage;
};

const BLOG_ENTRY_PAGE = `
query BlogEntryPage {
  blogEntryPage {
    type: __typename
    data {
      attributes {
        slug
        sections {
          ${BANNER}
        }
      }
    }
  }
}
`;

export default getBlogEntryPageData;
