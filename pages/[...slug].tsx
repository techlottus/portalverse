import { Fragment } from "react";
import DynamicPageLayout from "@/layouts/DynamicPageLayout.layout";
import Container from "@/layouts/Container.layout";
import Breadcrumbs from "@/old-components/Breadcrumbs/BreadcrumbPortalverse";
import BlogEntryPageContent from "@/components/BlogEntryPageContent";
import PageContent from "@/components/PageContent";
import DynamicProgramContent from "@/components/DynamicProgramContent";
import StaticProgramContent from "@/components/StaticProgramContent";
import StaticContEdProgramContent from "@/components/StaticContEdProgramContent";
import {
  getBlogEntryPagesPaths,
  getPageBreadcrumb,
  getPageDataBySlug,
  getDynamicPagesPaths,
  getPageType,
  getProgramDetailPageData,
  getProgramDetailPagesPaths,
} from "@/utils/pages";
import { normalizePath } from "@/utils/misc";
import type { ReactElement } from "react";
import type { BlogEntryPageEntityResponse } from "@/utils/getBlogEntryPageData";
import type { PageEntityResponse } from "@/utils/getPageDataById";
import type { ProgramDetailPage } from "@/utils/pages";

type PageProps = {
  page: PageEntityResponse | BlogEntryPageEntityResponse | ProgramDetailPage;
  breadcrumb: Record<string, string>;
};

const Page = (props: PageProps) => {
  const { page, breadcrumb } = props;
  const pageType = page?.type;
  const pageData = page?.data;

  const renderContent = () => {
    switch (pageType) {
      case "BlogEntryPageEntityResponse":
        return <BlogEntryPageContent {...pageData} />;
      case "PageEntityResponse":
        return <PageContent {...pageData} />;
      case "StaticProgramDetail":
        return <StaticProgramContent {...pageData} />;
      case "StaticContinuousEducationProgramDetail":
        return <StaticContEdProgramContent {...pageData} />;
      case "DynamicProgramDetail":
        return <DynamicProgramContent {...pageData} />;
      default:
        return null;
    }
  };

  return (
    <Fragment>
      <Container>
        <Breadcrumbs visible breadcrumbs={breadcrumb} />
      </Container>
      {
        renderContent()
      }
    </Fragment>
  );
};

Page.getLayout = (page: ReactElement) => {
  return <DynamicPageLayout>{page}</DynamicPageLayout>;
};

export default Page;

export async function getStaticPaths() {
  const blogEntryPagesPaths = await getBlogEntryPagesPaths();
  const dynamicPagesPaths = await getDynamicPagesPaths();
  const programDetailPagesPaths = await getProgramDetailPagesPaths();

  // TODO: Uncomment when blog pages can be handled from Strapi and blog pages files can be deleted from the project.
  // const allPagesPaths = [...dynamicPagesPaths, ...blogEntriesPaths];
  const allPagesPaths = [...dynamicPagesPaths, ...programDetailPagesPaths]?.map(normalizePath);

  return {
    paths: allPagesPaths?.map((path) => ({
      params: { slug: path?.split("/") },
    })),
    fallback: false, // can also be true or 'blocking'
  };
}

// `getStaticPaths` requires using `getStaticProps`
export async function getStaticProps(context: any): Promise<{props: PageProps}> {
  const {
    params: { slug },
  } = context;

  const path = slug?.join("/");
  const pageType = await getPageType(path);

  switch (pageType) {
    case "programDetail": {
      const programDetailData = await getProgramDetailPageData(path);

      return {
        props: {
          page: { ...programDetailData },
          breadcrumb: {},
        },
      };
    }
    case "blogEntry": {
      return {
        props: {
          page: {} as any, // TODO
          breadcrumb: {},
        },
      };
    }
    case "dynamic": {
      const pageData = await getPageDataBySlug(path);
      const pageBreadcrumb = getPageBreadcrumb(pageData);

      return {
        props: {
          page: { ...pageData },
          breadcrumb: pageBreadcrumb,
        },
      };
    }
    default: {
      return {
        props: {
          page: {} as any, // TODO
          breadcrumb: {},
        },
      };
    }
  }
}