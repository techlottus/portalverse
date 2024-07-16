import { fetchStrapiGraphQL } from "@/utils/getStrapi";
import type { StrapiImage } from "@/types/strapi/common";
import { ReactNode } from "react";

export type BlogPostsVariables = {
  start?: number;
  limit?: number;
  sort?: "publication_date:desc" | "publication_date:asc";
  category?: string;
};

const getBlogPosts = async (variables: BlogPostsVariables = {}) => {

  const start = variables?.start || 0;
  const limit = variables?.limit;
  const sort = variables?.sort || "publication_date:desc";
  const category = variables?.category;

  const data = await fetchStrapiGraphQL<BlogPostsData>(BLOG_POSTS, {
    start,
    limit,
    sort,
    category
  });

  return data;
};

export type metaSocial = {
  socialNetwork: String;
  title: string;
  description: string;
  image: {
    data: {
      attributes: {
        url: string;
      }
    }
  }
}

export type BlogPost = {
  attributes: {
    title: string;
    abstract: string;
    slug: string;
    seo: {
      metaTitle: string;
      metaDescription: string;
      metaImage: StrapiImage;
      keywords: string;
      metaRobots: string;
      metaViewport: string;
      canonicalURL: string;
      structuredData: JSON;
      metaSocial?: Array<metaSocial>
    }
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
        seo {
          metaTitle
          metaDescription
          metaImage {
            data {
              attributes {
                url
              }
            }
          }
          keywords
          metaRobots
          metaViewport
          canonicalURL
          structuredData
          metaSocial {
            socialNetwork
            title
            description
            image {
              data {
                attributes {
                  url
                }
              }
            }
          }
        }
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