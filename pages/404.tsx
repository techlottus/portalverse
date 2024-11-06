import { ReactElement } from "react";
import Head from "next/head";
import HeaderFooterLayout from "@/layouts/HeaderFooter.layout";
import ContentFullLayout from "@/layouts/ContentFull.layout";
import NextPageWithLayout from "@/types/Layout.types";
import ContentLayout from "@/layouts/Content.layout";
import { WebErrorPage } from "@/utils/strapi/sections/WebError";
import { getNotFoundPageData } from "@/utils/getNotFoundPageData";
import ContentGenerator from "@/utils/ContentGenerator";
import getLayout from "@/utils/getLayout";


const NotFound: NextPageWithLayout<WebErrorPage> = ( props: WebErrorPage ) => {

  const { sections, meta,layoutData } = props
  return <>
    <Head>
      <title>{ meta.metaTitle }</title>
    </Head>
    <HeaderFooterLayout layoutData={layoutData}>
       {sections?.length > 0 ? (
      <ContentGenerator blocks={sections} />
    ) : null}
    </HeaderFooterLayout>
   
  </>;
};

NotFound.getLayout = function getLayout(page: ReactElement) {
  return (<ContentFullLayout classNames="bg-surface-100">
        { page }
    </ContentFullLayout>)
};

export async function getStaticProps(context: any) {

  try {
    const notFoundPageData = await getNotFoundPageData();
    const layoutData = await getLayout();

    const sections = notFoundPageData?.notFoundPage?.data?.attributes?.sections || [];
    const meta = notFoundPageData?.notFoundPage?.data?.attributes?.seo || {
      metaTitle: 'Not Found'
    };

    return {
      props: {
        sections,
        meta,
        layoutData: layoutData || null
      },
    };
  } catch(err) {
    console.log(err)
    return {
      props: {
        sections: [],
        meta : {
          metaTitle: 'Not Found'
        }
      },
    };
  }
}

export default NotFound;
