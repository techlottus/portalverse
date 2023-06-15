import Head from "next/head"
import NextPageWithLayout from "@/types/Layout.types"
import HeaderFooterLayout from "@/layouts/HeaderFooter.layout"
import { getDataPageFromJSON } from "@/utils/getDataPage"
import ContentGenerator from "@/utils/ContentGenerator"
import { getHomePageData } from "@/utils/getHomePageData"

const Home: NextPageWithLayout = ({ data: { sections, meta } }: any) => {

  return <>
    <Head>
      <title>{meta.title}</title>
    </Head>
    <HeaderFooterLayout breadcrumbs={false}>
      <div className="flex flex-col w-p:space-y-12 w-t:space-y-12 w-d:space-y-18 w-d:mt-18">
        {sections?.length > 0 ? (
          <ContentGenerator blocks={sections} />
        ) : null}
      </div>
    </HeaderFooterLayout>
  </>
}

export async function getStaticProps(context: any) {
  const { meta } = await getDataPageFromJSON('home.json');

  const homePageData = await getHomePageData();
  const sections = homePageData?.homePage?.data?.attributes?.sections;

  return {
    props: {
      data: {
        sections,
        meta,
        strapi: { sections },
      },
    },
  };
}

export default Home;