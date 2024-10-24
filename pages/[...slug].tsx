import { Fragment } from "react";
import DynamicPageLayout from "@/layouts/DynamicPageLayout.layout";
import Container from "@/layouts/Container.layout";
import Breadcrumbs from "@/old-components/Breadcrumbs/BreadcrumbPortalverse";
import BlogEntryPageContent from "@/components/BlogEntryPageContent";
import PageContent from "@/components/PageContent";
import DynamicProgramContent from "@/components/DynamicProgramContent";
import StaticProgramContent from "@/components/StaticProgramContent";
import StaticContEdProgramContent from "@/components/StaticContEdProgramContent";
import getBlogEntryBySlug from "@/utils/getBlogEntryBySlug";
import getBlogEntryPageData from "@/utils/getBlogEntryPageData";
import {
  getBlogEntryPagesPaths,
  getPageDataBySlug,
  getDynamicPagesBreadcrumbs,
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
import { getLayout } from "@/utils/getLayout";

type PageProps = {
  page: PageEntityResponse | BlogEntryPageEntityResponse | ProgramDetailPage ;
  breadcrumbs: Record<string, string>;
  layoutData?:any;
};

const Page = (props: PageProps) => {
  const { page, breadcrumbs,layoutData } = props;
  const renderContent = () => {
    switch (page?.type) {
      case "BlogEntryPageEntityResponse":
        return <BlogEntryPageContent {...page?.data} />;
      case "PageEntityResponse":
        return <PageContent {...page?.data} />;
      case "StaticProgramDetail":
        return <StaticProgramContent {...page?.data} />;
      case "StaticContinuousEducationProgramDetail":
        return <StaticContEdProgramContent {...page?.data} />;
      case "DynamicProgramDetail":
        return <DynamicProgramContent {...page?.data} />;
      default:
        return null;
    }
  };

  // const layout = (page.data?.attributes as PageEntityResponse | BlogEntryPageEntityResponse) ? 

  
  return (
    <DynamicPageLayout layoutData={page.data?.attributes?.layout?.data || layoutData}>
    <Fragment>
      <Container>
        <Breadcrumbs visible breadcrumbs={breadcrumbs} />
      </Container>
      {
        renderContent()
      }
    </Fragment></DynamicPageLayout>
  );
};

// Page.getLayout = (page: ReactElement) => {
  
//   console.log("prop",page.props, "page: ", page)
//   return < >{page}</>;
// };

export default Page;

export async function getStaticPaths() {
  const blogEntryPagesPaths = await getBlogEntryPagesPaths();
  const dynamicPagesPaths = await getDynamicPagesPaths();
  const programDetailPagesPaths = await getProgramDetailPagesPaths();

  const allPagesPaths = [
    ...dynamicPagesPaths,
    ...programDetailPagesPaths,
    ...blogEntryPagesPaths,
  ]?.map(normalizePath);

  return {
    paths: allPagesPaths?.map((path) => ({
      params: { slug: path?.split("/") },
    })),
    fallback: false, // can also be true or 'blocking'
  };
}

// `getStaticPaths` requires using `getStaticProps`
export async function getStaticProps(context: any): Promise<{props: PageProps}> {

  try {
    const {
      params: { slug },
    } = context;

    const path = slug?.join("/");
    const pageType = await getPageType(path);

    const breadcrumbs = await getDynamicPagesBreadcrumbs();
    const layoutData = await getLayout();
    switch (pageType) {
      case "programDetail": {
        const programDetailPage = await getProgramDetailPageData(path);

        if (programDetailPage?.type === "DynamicProgramDetail") {
          // Add program breadcrumb. Static program breadcrumbs already exist in the Routes.ts file
          const programAttributes =
            programDetailPage?.data?.attributes;
          const programSlug = programAttributes?.slug;
          const programName = programAttributes?.name;
          breadcrumbs[programSlug] = programName;
        }

        return {
          props: {
            page: { ...programDetailPage },
            breadcrumbs,
            layoutData: layoutData || null
          },
        };
      }
      case "blogEntry": {
        const blogEntryPageData = await getBlogEntryPageData();
        const blogEntrySlug = slug?.[slug?.length - 1];
        const blogEntryData = await getBlogEntryBySlug(blogEntrySlug);
        blogEntryPageData.data.attributes.blogPost = { ...blogEntryData };

        breadcrumbs[blogEntrySlug] = blogEntryData?.attributes?.title;

        return {
          props: {
            page: {
              type: "BlogEntryPageEntityResponse",
              data: blogEntryPageData?.data,
            },
            breadcrumbs,
            layoutData: layoutData || null
          },
        };
      }
      case "dynamic": {
        const pageData = await getPageDataBySlug(path);

        return {
          props: {
            page: { ...pageData },
            breadcrumbs,
            layoutData: layoutData || null
          },
        };
      }
      default: {
        return {
          props: {
            page: {} as PageEntityResponse,
            breadcrumbs: {},
            layoutData: layoutData || null
          },
        };
      }
    }
  } catch {
    return {
      //@ts-ignore
      notFound: true,
    };
  }
}
