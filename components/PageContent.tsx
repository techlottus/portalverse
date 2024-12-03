import { Fragment } from "react";
import Head from "next/head";
import ContentGenerator from "@/utils/ContentGenerator";
import type { PageData } from "@/utils/getPageDataById";

const PageContent = (props: PageData) => {
  const pageBlocks = props?.attributes?.sections;
  const seo = props?.attributes?.seo;
  return (
    <Fragment>
      <Head>
        <title>{seo?.metaTitle}</title> 
        {/* THIS DATA COMES FROM STRAPI SEO */}
        <meta property="title" content={seo?.metaTitle} />{/* metaTitle */}
        <meta name="description" content={seo?.metaDescription} key="desc" />{/* metaDescription */}
        <meta property="image" content={seo?.metaImage?.data?.attributes?.url} />{/* metaImage */}
        {/* metaSocial */}
        {/* ARRAY COULD BRING FACEBOOK OR TWITTER */}
        {
          seo?.metaSocial?.map((metasocial) => {
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
        <meta name="keywords" content={seo?.keywords} />
        {/* metaRobots */}
        <meta name="robots" content={seo?.metaRobots} />
        {/* metaViewport */}
        <meta name="viewport" content="width=device-width, initial-scale=1.0"/>

        {/* canonicalURL */}
        <link rel="canonical" href={seo?.canonicalURL} />
        {/* ogURL */}
        <meta property="og:url" content={seo?.canonicalURL} />
        {/* structuredData */}
        <script type="application/ld+json">{JSON.stringify(seo?.structuredData)}</script>       
      </Head>
      <div className="flex flex-col mobile:space-y-12 tablet:space-y-12 desktop:space-y-18">
        {pageBlocks?.length > 0 ? (
          <ContentGenerator blocks={pageBlocks} />
        ) : null}
      </div>
    </Fragment>
  );
};

export default PageContent;
