import { StrapiImage } from "@/types/strapi/common";
import { fetchStrapiGraphQL } from "@/utils/getStrapi";

export type BlogPostsVariables = {
  page?: number;
  pageSize: number;
  sort: "publication_date:desc" | "publication_date:asc";
};

const getBlogPosts = async (variables: BlogPostsVariables) => {
  const { page = 1, pageSize, sort } = variables;

  const data = await fetchStrapiGraphQL<BlogPostsData>(BLOG_POSTS, {
    page,
    pageSize,
    sort,
  });

  return data;
};

export type BlogPost = {
  attributes: {
    title: string;
    abstract: string;
    slug: string;
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
query BlogPosts ($page: Int, $pageSize: Int, $sort: [String]) {
  blogPosts(pagination: { page: $page, pageSize: $pageSize }, sort: $sort){
    data {
      attributes {
        title
        abstract
        slug
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