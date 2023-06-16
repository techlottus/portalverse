import { Fragment } from "react";
import DynamicPageLayout from "@/layouts/DynamicPageLayout.layout";
import Container from "@/layouts/Container.layout";
import Breadcrumbs from "@/old-components/Breadcrumbs/BreadcrumbPortalverse";
import BlogEntryPage from "@/components/BlogEntryPageContent";
import DynamicPageContent from "@/components/DynamicPageContent";
import getBlogEntryPageData from "@/utils/getBlogEntryPageData";
import getBlogEntryBySlug from "@/utils/getBlogEntryBySlug";
import getBlogPosts from "@/utils/getBlogPosts";
import getPagesData from "@/utils/getPagesData";
import { getPageBySlug } from "@/utils/strapi";
import { getDynamicPagesBreadcrumbs, isValidPath, normalizePath } from "@/utils/routes";
import type { ReactElement } from "react";
import type { BlogEntryPageEntity } from "@/utils/getBlogEntryPageData";
import type { PageEntity } from "@/utils/getPageData";

const Page = (props: { data: PageEntity | BlogEntryPageEntity, breadcrumbs: Record<string, string> }) => {
  const { data, breadcrumbs } = props;

  const renderContent = () => {
    switch (data?.type) {
      case "BlogEntryPageEntityResponse":
        return <BlogEntryPage {...data} />;
      case "PageEntityResponse":
        return <DynamicPageContent {...data} />;
      default:
        return null;
    }
  };

  return (
    <Fragment>
      <Container>
        <Breadcrumbs
          visible
          breadcrumbs={breadcrumbs}
        />
      </Container>
      {renderContent()}
    </Fragment>
  );
};

Page.getLayout = (page: ReactElement) => {
  return <DynamicPageLayout>{page}</DynamicPageLayout>;
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
    blogEntryPageData?.data?.attributes?.slug
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

  // TODO: Uncomment when blog pages can be handled from Strapi and blog pages files can be deleted from the project.
  // const allPagesPaths = [...dynamicPagesPaths, ...blogEntriesPaths];
  const allPagesPaths = [...dynamicPagesPaths];

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
    blogEntryPageData?.data?.attributes?.slug
  );

  /**
   * Blog Entry pages need to be handled separately
   */
  const isBlogEntry = normalizePath(slug?.join("/"))?.includes(blogEntryParentSlug) && normalizePath(slug?.join("/")) !== normalizePath(blogEntryParentSlug);

  if (isBlogEntry) {
    const blogEntrySlug = slug?.[slug?.length - 1];
    const blogEntryData = await getBlogEntryBySlug(blogEntrySlug);
    blogEntryPageData.data.attributes.blogPost = { ...blogEntryData };

    return {
      props: {
        data: { ...blogEntryPageData },
      },
    };
  } else {
    const pageData = await getPageBySlug(slug?.join("/"));

    const pagesData = await getPagesData();
    const pagesBreadcrumbs = getDynamicPagesBreadcrumbs(pagesData);

    return {
      props: {
        data: pageData,
        breadcrumbs: pagesBreadcrumbs
      },
    };
  }
}