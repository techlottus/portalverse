import Head from "next/head";
import { Fragment } from "react";
import HeaderFooterLayout from "@/layouts/HeaderFooter.layout";
import ContentGenerator from "@/utils/ContentGenerator";
import getPagesData from "@/utils/getPagesData";
import { getPageBySlug } from "@/utils/strapi";
import { isValidPath, normalizePath } from "@/utils/routes";
import type { ReactElement } from "react";
import type { PageData } from "@/utils/getPageData";

const Page = (props: { data: PageData }) => {
  const pageBlocks = props?.data?.attributes?.sections;

  return (
    <Fragment>
      <Head>
        <title>{props?.data?.attributes?.title}</title>
      </Head>
      <div className="flex flex-col w-p:space-y-12 w-t:space-y-12 w-d:space-y-18">
        {
          pageBlocks?.length > 0 ?
            <ContentGenerator
              blocks={pageBlocks}
            />
            : null
        }
      </div>

    </Fragment>
  );
};

Page.getLayout = (page: ReactElement) => {
  return (
    <HeaderFooterLayout>
      {page}
    </HeaderFooterLayout>
  );
};

export default Page;

export async function getStaticPaths() {
  const pagesData = await getPagesData();
  const pagesPaths = pagesData?.map((page) => page?.attributes?.slug);

  // pages with an invalid path format are filtered out and won't be generated at build time
  const normalizedPaths = pagesPaths?.filter(isValidPath)?.map(normalizePath);

  return {
    paths: normalizedPaths.map((path) => ({
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

  const pageData = await getPageBySlug(slug?.join("/"));

  return {
    props: {
      data: pageData,
    },
  };
}
