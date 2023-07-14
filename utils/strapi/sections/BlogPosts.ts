import getBlogEntryPageData from "@/utils/getBlogEntryPageData";
import getBlogPosts from "@/utils/getBlogPosts";
import type { BlogPost } from "@/utils/getBlogPosts";

export type BlogPostsSection = {
  type: "ComponentSectionsBlogPosts";
  title: string;
  subtitle: string;
  description: string;
  maxEntries: number;
  sort: "latest" | "earliest";
  category?: {
    data: {
      attributes: {
        title: string;
      }
    }
  }
  blogPosts?: Array<BlogPost>; // appended by the formatBlogPostsSection function
  blogPageSlug?: string; // appended by the formatBlogPostsSection function
};

export const BLOG_POSTS = `
... on ComponentSectionsBlogPosts {
  title
  subtitle
  description
  maxEntries
  sort
  category {
    data {
      attributes {
        title
      }
    }
  }
}
`;

export const formatBlogPostsSection = async (
  section: BlogPostsSection
): Promise<BlogPostsSection> => {

  const { maxEntries, sort, category } = section;
  
  const blogPostsData = await getBlogPosts({
    limit: maxEntries,
    sort: sort === "earliest" ? "publication_date:asc" : "publication_date:desc",
    category: category?.data?.attributes?.title
  });

  const blogEntryPageData = await getBlogEntryPageData();

  section.blogPosts = blogPostsData?.blogPosts?.data;
  section.blogPageSlug = blogEntryPageData?.data?.attributes?.slug;

  return section;
};