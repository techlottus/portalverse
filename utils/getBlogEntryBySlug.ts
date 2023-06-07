import { fetchStrapiGraphQL } from "@/utils/getStrapi";
import type { BlogPost } from "@/utils/getBlogPosts";

const getBlogEntryBySlug = async (slug: string) => {
  const data = await fetchStrapiGraphQL<BlogPostsData>(BLOG_ENTRY_BY_SLUG, {
    slug,
  });

  return data?.blogPosts?.data?.[0];
};

export type BlogPostsData = {
  blogPosts: {
    data: Array<BlogPost>;
  };
};

const BLOG_ENTRY_BY_SLUG = `
query BlogEntryBySlug($slug: String) {
  blogPosts(filters: { slug: { eq: $slug } }) {
    data {
      attributes {
        title
        abstract
        slug
        body
        publication_date
        featured_image {
          data {
            attributes {
              url
            }
          }
        }
      }
    }
  }
}
`;

export default getBlogEntryBySlug;
