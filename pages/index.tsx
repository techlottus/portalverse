import Head from "next/head"
import NextPageWithLayout from "@/types/Layout.types"
import HeaderFooterLayout from "@/layouts/HeaderFooter.layout"
import ContentGenerator from "@/utils/ContentGenerator"
import { getHomePageData } from "@/utils/getHomePageData"
import getLayout from "@/utils/getLayout"

const Home: NextPageWithLayout = ({ data: { sections, meta , layoutData} }: any) => {
  console.log('layoutData: ', layoutData);
  return <>
    <Head>
      <title>{meta?.metaTitle}</title>
      <meta property="title" content={meta?.metaTitle} />
      <meta name="description" content={meta?.metaDescription} key="desc" />
      <meta property="image" content={meta?.metaImage?.data?.attributes?.url} />
      {
          meta?.metaSocial?.map((metasocial:any) => {
            if (metasocial?.socialNetwork === "Facebook") {
              return (
                <>
                  <meta property="og:title" content={metasocial?.title} />
                  <meta property="og:description" content={metasocial?.description} />
                  <meta property="og:image" content={metasocial?.image?.data?.attributes?.url} />
                </>
              )
            } if (metasocial?.socialNetwork === "Twitter") {
              return (
                <>
                  <meta property="twitter:title" content={metasocial?.title} />
                  <meta property="twitter:description" content={metasocial?.description} />
                  <meta property="twitter:image" content={metasocial?.image?.data?.attributes?.url} />
                </>
              )
            }
          })
        }
        {/* keywords */}
        <meta name="keywords" content={meta?.keywords} />
        {/* metaRobots */}
        <meta name="robots" content={meta?.metaRobots} />
        {/* metaViewport */}
        <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
        {/* canonicalURL */}
        <link rel="canonical" href={meta?.canonicalURL} />
        {/* ogURL */}
        <meta property="og:url" content={meta?.canonicalURL} />
        {/* structuredData */}
        <script type="application/ld+json">{meta?.structuredData}</script>
    </Head>
    <HeaderFooterLayout breadcrumbs={false} layoutData={layoutData} >
      <div className="flex flex-col w-p:space-y-12 w-t:space-y-12 w-d:space-y-18 w-d:mt-18">
        {sections?.length > 0 ? (
          <ContentGenerator blocks={sections} />
        ) : null}
      </div>
    </HeaderFooterLayout>
  </>
}

export async function getStaticProps(context: any) {

  try {
    const homePageData = await getHomePageData();
    const sections = homePageData?.homePage?.data?.attributes?.sections;
    const meta = homePageData?.homePage?.data?.attributes?.seo;    
    const layoutData = await getLayout(1);

    return {
      props: {
        data: {
          sections,
          meta,
          layoutData: layoutData || null
        },
      },
    };
  } catch {
    return {
      notFound: true,
    };
  }
}

export default Home;