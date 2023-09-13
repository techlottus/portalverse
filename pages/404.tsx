import { ReactElement } from "react";
import Head from "next/head";
import HeaderFooterLayout from "@/layouts/HeaderFooter.layout";
import ContentFullLayout from "@/layouts/ContentFull.layout";
import NextPageWithLayout from "@/types/Layout.types";
import ContentLayout from "@/layouts/Content.layout";
import { WebErrorPage } from "@/utils/strapi/sections/WebError";
import { getNotFoundPageData } from "@/utils/getNotFoundPageData";
import WebError from "@/components/sections/WebError";
import ContentGenerator from "@/utils/ContentGenerator";


const NotFound: NextPageWithLayout<WebErrorPage> = ( props: WebErrorPage ) => {

  const { sections, meta } = props
  return <>
    <Head>
      <title>{ meta.metaTitle }</title>
    </Head>
    {sections?.length > 0 ? (
      <ContentGenerator blocks={sections} />
    ) : null}
  </>;
};

NotFound.getLayout = function getLayout(page: ReactElement) {
  return <HeaderFooterLayout breadcrumbs={false}>
    <ContentFullLayout classNames="bg-surface-100">
      <ContentLayout>
        { page }
      </ContentLayout>
    </ContentFullLayout>
  </HeaderFooterLayout>
};

export async function getStaticProps(context: any) {

  try {
    const notFoundPageData = await getNotFoundPageData();
    const sections = notFoundPageData?.notFoundPage?.data?.attributes?.sections;
    const meta = notFoundPageData?.notFoundPage?.data?.attributes?.seo;
    console.log(sections);
    

    return {
      props: {
        sections,
        meta
      },
    };
  } catch(err) {
    console.log(err);
    
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