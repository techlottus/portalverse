import { fetchStrapiGraphQL } from "@/utils/getStrapi";
import type { StrapiImage } from "@/types/strapi/common";

export type BlogPostsVariables = {
  start?: number;
  limit?: number;
  sort?: "publication_date:desc" | "publication_date:asc";
  category?: string;
};

const getBlogPosts = async (variables: BlogPostsVariables = {}) => {

  console.log("Inside getBlogPosts");
  console.log("variables", variables);

  const start = variables?.start || 0;
  const limit = variables?.limit;
  const sort = variables?.sort || "publication_date:desc";
  const category = variables?.category;

  console.log("category", category);

  const data = await fetchStrapiGraphQL<BlogPostsData>(BLOG_POSTS, {
    start,
    limit,
    sort,
    category
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
query BlogPosts ($start: Int, $limit: Int, $sort: [String], $category: String) {
  blogPosts(
    pagination: { start: $start, limit: $limit }
    sort: $sort
    filters: { categories: { title: { eq: $category } } }
  ) {
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