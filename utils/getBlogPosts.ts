import { fetchStrapiGraphQL } from "@/utils/getStrapi";
import type { StrapiImage } from "@/types/strapi/common";

export type BlogPostsVariables = {
  start?: number;
  limit?: number;
  sort?: "publication_date:desc" | "publication_date:asc";
};

const getBlogPosts = async (variables: BlogPostsVariables) => {
  const { start = 0, limit, sort } = variables;

  const data = await fetchStrapiGraphQL<BlogPostsData>(BLOG_POSTS, {
    start,
    limit,
    sort,
  });

  return data;
};

export type BlogPost = {
  attributes: {
    title: string;
    abstract: string;
    slug: string;
    body: string;
    publication_date: string;
    featured_image: StrapiImage;
  }
}

export type BlogPostsData = {
  blogPosts: {
    data: Array<BlogPost>
  }
}

const BLOG_POSTS = `
query BlogPosts ($start: Int, $limit: Int, $sort: [String]) {
  blogPosts(pagination: { start: $start, limit: $limit }, sort: $sort){
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

export default getBlogPosts;