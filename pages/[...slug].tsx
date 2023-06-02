import Head from "next/head";
import { Fragment } from "react";
import HeaderFooterLayout from "@/layouts/HeaderFooter.layout";
import ContentGenerator from "@/utils/ContentGenerator";
import getPagesData from "@/utils/getPagesData";
import { getPageBySlug } from "@/utils/strapi";
import { isValidPath, normalizePath } from "@/utils/routes";
import type { ReactElement } from "react";
import type { PageEntity } from "@/utils/getPageData";
import getBlogEntryPageData, {
  BlogEntryPageEntity,
} from "@/utils/getBlogEntryPageData";
import getBlogPosts from "@/utils/getBlogPosts";
import getBlogEntryBySlug from "@/utils/getBlogEntryBySlug";
import BlogEntryPage from "@/components/BlogEntryPageContent";
import DynamicPageContent from "@/components/DynamicPageContent";

const Page = (props: { data: PageEntity | BlogEntryPageEntity }) => {
  
  const renderContent = () => {
    switch (props?.data?.type) {
      case "BlogEntryPageEntityResponse":
        return <BlogEntryPage {...props?.data} />;
      case "PageEntityResponse":
        return <DynamicPageContent {...props?.data} />;
      default:
        return null;
    }
  };

  return <Fragment>{renderContent()}</Fragment>;
};

Page.getLayout = (page: ReactElement) => {
  return <HeaderFooterLayout>{page}</HeaderFooterLayout>;
};

export default Page;

export async function getStaticPaths() {
  /**
   * Dynamic Pages
   */

  const pagesData = await getPagesData();
  const pagesPaths = pagesData?.map((page) => page?.attributes?.slug);

  // pages with an invalid path format are filtered out and won't be generated at build time
  const dynamicPagesPaths = pagesPaths?.filter(isValidPath)?.map(normalizePath);

  /**
   * Blog Entry Pages
   */
  const blogEntryPageData = await getBlogEntryPageData();
  const blogEntryParentSlug = normalizePath(
    blogEntryPageData?.blogEntryPage?.data?.attributes?.slug
  );

  const blogPostsData = await getBlogPosts({ pageSize: 100 });
  const blogEntriesSlugs = blogPostsData?.blogPosts?.data?.map((blogPost) =>
    normalizePath(blogPost?.attributes?.slug)
  );
  const blogEntriesPaths = blogEntryParentSlug
    ? blogEntriesSlugs
        ?.map((blogEntrySlug) => `${blogEntryParentSlug}/${blogEntrySlug}`)
        ?.filter(isValidPath)
    : [];

  const allPagesPaths = [...dynamicPagesPaths, ...blogEntriesPaths];

  return {
    paths: allPagesPaths?.map((path) => ({
      params: { slug: path?.split("/") },
    })),
    fallback: false, // can also be true or 'blocking'
  };
}

// `getStaticPaths` requires using `getStaticProps`
export async function getStaticProps(context: any) {
  const {
    params: { slug },
  } = context;

  const blogEntryPageData = await getBlogEntryPageData();
  const blogEntryParentSlug = normalizePath(
    blogEntryPageData?.blogEntryPage?.data?.attributes?.slug
  );

  const isBlogEntry = normalizePath(slug?.join("/"))?.includes(
    blogEntryParentSlug
  );

  if (isBlogEntry) {
    console.log("inside getstaticprops else");
    const blogEntrySlug = slug?.[slug?.length - 1];
    const blogEntryData = await getBlogEntryBySlug(blogEntrySlug);
    blogEntryPageData.blogEntryPage.data.attributes.blogPost = {
      ...blogEntryData,
    };

    return {
      props: {
        data: { ...blogEntryPageData?.blogEntryPage },
      },
    };
  } else {
    const pageData = await getPageBySlug(slug?.join("/"));

    return {
      props: {
        data: pageData,
      },
    };
  }
}

