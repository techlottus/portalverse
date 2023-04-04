import Head from "next/head"
import { useRouter } from "next/router"
import NextPageWithLayout from "@/types/Layout.types"
import HeaderFooterLayout from "@/layouts/HeaderFooter.layout"
import ContentLayout from "@/layouts/Content.layout"
import ContentFullLayout from "@/layouts/ContentFull.layout"
import ContentInsideLayout from "@/layouts/ContentInside.layout"
import OpenForm from "@/forms/container/OpenForm"
import { getDataPageFromJSON } from "@/utils/getDataPage"
import Video from "@/old-components/Video"
import { getHomePageData } from "@/utils/getHomePageData"
import { ComponentSection } from "@/utils/strapi/queries";
import { SeoData } from "@/utils/strapi/sections/SEO"
import { OverlayCardListSection } from "@/utils/strapi/sections/OverlayCardList"
import { BannerSection } from "@/utils/strapi/sections/Banner"
import { HeroSliderSection } from "@/utils/strapi/sections/HeroSlider"
import { StatisticsCardListSection } from "@/utils/strapi/sections/StatisticsCardList"
import BannerPortalverseWrapper from "@/components/BannerPortalverseWrapper"
import { ListconfigSection } from "@/utils/strapi/sections/Listconfig"
import getBlogPosts, { BlogPostsData } from "@/utils/getBlogPosts"
import { findSection, findSections } from "@/utils/strapi"
import SliderPortalverseWrapper from "@/components/SliderPortalverseWrapper"
import OfertaEducativaWrapper from "@/components/OfertaEducativaWrapper"
import BlogPostCardWrapper from "@/components/BlogPostCardWrapper"
import NumbersPortalverse from "@/old-components/NumbersPortalverse/NumbersPortalverse"

const Home: NextPageWithLayout = ({ data: { sections, meta, strapi } }: any) => {
  const router = useRouter();

  const strapiSections = strapi?.sections as Array<ComponentSection>;
  const strapiSeo = strapi?.seo as SeoData;

  const blogListConfig = findSection<ListconfigSection>(strapiSections, "ComponentSectionsListconfig");
  const blogPostsData = strapi?.blogPostsData as BlogPostsData;


  const slider = findSection<HeroSliderSection>(
    strapiSections,
    "ComponentSectionsHeroSlider"
  );

  const overlayCardsSection = findSection<OverlayCardListSection>(
    strapiSections,
    "ComponentSectionsOverlayCardList"
  );

  const banners = findSections<BannerSection>(
    strapiSections,
    "ComponentSectionsBanner"
  );
  const banner1 = banners[0];
  const banner2 = banners[1];

  // TODO: Uncomment when Strapi support for custom statistics card color is added.
  // const statisticsCardsSection = findSection<StatisticsCardListSection>(
  //   strapiSections,
  //   "ComponentSectionsStatisticsCardList"
  // );

  return <>
    <Head>
      <title>{meta.title}</title>
    </Head>
    <HeaderFooterLayout breadcrumbs={false}>
      <ContentFullLayout classNames="gap-6 w-d:hidden">
        <div className="col-span-12 w-t:col-span-8 w-p:col-span-4 mt-3">
          <SliderPortalverseWrapper data={{ ...slider }} mobile = {true}/>
        </div>
      </ContentFullLayout>
      <ContentLayout>
        <div className="w-t:hidden w-p:hidden col-span-12 w-t:col-span-8 w-p:col-span-4 mt-3">
          <SliderPortalverseWrapper data={{ ...slider, height: "600px" }} mobile = {false}/>
        </div>
        <div className="col-span-12 w-t:col-span-8 w-p:col-span-4 w-d:mt-12 w-t:mt-6 w-p:mt-6">
          <p className="ac-type-h3-bold-solid-poppins-desktop w-t:ac-type-h3-bold-solid-poppins-tablet w-p:ac-type-h3-bold-solid-poppins-tablet">{ overlayCardsSection?.title }</p>
        </div>
        <div className="col-span-12 w-t:col-span-8 w-p:col-span-4 mb-12 w-t:mb-6 w-p:mb-6">
          <OfertaEducativaWrapper data={{...overlayCardsSection}} classNames="opacity-80 w-d:mb-8"/>
        </div>
      </ContentLayout>
      <ContentFullLayout classNames="w-d:hidden w-p:hidden my-6">
        <ContentInsideLayout classNames="gap-6">
        <div className="col-span-8">
          <BannerPortalverseWrapper data={{...banner1, height: "auto"}} onClick={ () => router.push(`${banner1?.ctaUrl}`)}/>
        </div>
        </ContentInsideLayout>
      </ContentFullLayout>
      <ContentLayout classNames="">
        <div className="col-span-12 w-t:col-span-8 w-p:col-span-4 w-t:hidden">
          <BannerPortalverseWrapper data={{...banner1, height: "auto"}} onClick={ () => router.push(`${banner1?.ctaUrl}`)}/>
        </div>
        <div className="w-d:col-span-12 w-t:col-span-8 w-p:col-span-4 grid w-d:grid-cols-4 gap-6 w-t:grid-cols-2 w-p:grid-cols-1 w-d:mt-8 ">
          {/* Use data from JSON */}
          {/* {
            statisticsCardsSection?.cards?.map((item, i:number) => <section key={`section-numbers-${i}`}>
              <NumbersPortalverseWrapper data={item}/>
            </section>)
          } */}
          {
            sections.numbers.map((item:any, i:number) => <section key={`section-numbers-${i}`}>
              <NumbersPortalverse data={item}/>
            </section>)
          }
        </div>
      </ContentLayout>
      <ContentLayout>
        <section className="col-span-12 w-t:col-span-8 w-p:col-span-4 w-d:mt-[72px] mt-[72px]">
          <p className="ac-type-h3-bold-solid-poppins-desktop w-p:ac-type-h3-bold-solid-poppins-tabmob">{ blogListConfig?.title }</p>
        </section>
        <section className="col-span-12 w-t:col-span-8 w-p:col-span-4 grid w-d:grid-cols-3 gap-6 w-t:grid-cols-2 w-p:grid-cols-1 mb-12 w-t:mb-6 w-p:mb-6">
          {
            blogPostsData?.blogPosts?.data.map((blogPost, i:number) => <section key={`section-blog-${i}`}>
             <BlogPostCardWrapper data={blogPost} onClick={() => router.push(`voz-uane/blog/${blogPost?.attributes?.slug}`)}/>
            </section>)
          }
        </section>
      </ContentLayout>
      <ContentFullLayout classNames="w-d:hidden w-p:hidden gap-6 my-6">
        <ContentInsideLayout classNames="gap-6">
        <div className="w-t:col-span-8 w-p:col-span-4">
          <BannerPortalverseWrapper data={{...banner2, height: "auto"}} onClick={ () => router.push(`${banner2?.ctaUrl}`)}/>
        </div>
        </ContentInsideLayout>
      </ContentFullLayout>
      <ContentLayout classNames="w-t:hidden my-6">
        <div className="col-span-12 w-p:col-span-4">
          <BannerPortalverseWrapper data={{...banner2, height: "auto"}} onClick={ () => router.push(`${banner2?.ctaUrl}`)}/>
        </div>
      </ContentLayout>
      <ContentLayout>
          <div className="col-span-6 w-t:col-span-8 w-p:col-span-4 w-d:mt-8">
            <OpenForm pathThankyou={`/thank-you`} image={{ src: "https://assets.staging.bedu.org/UTEG/admisiones_pedir_informacion_avatar_6738c707b5.jpg", alt:"image-person" }} />
          </div>
          <div className="col-span-6 w-t:col-span-8 w-p:col-span-4 w-d:mt-8">
            <p className="mb-6 text-Poppins font-semibold text-[22px] w-p:text-6">{sections.descubre.title}</p>
            {
              <Video dimensions={["330px","400px","200px"]} data={ sections.descubre } />
            }
          </div>
      </ContentLayout>
    </HeaderFooterLayout>
  </>
}

export async function getStaticProps(context: any) {
  const { sections, meta } = await getDataPageFromJSON('home.json');

  const homePageData = await getHomePageData();
  const attributes = homePageData?.homePage?.data?.attributes;

  const strapiSections = attributes?.sections;
  const strapiSeo = attributes?.seo;

  const listConfig = findSection<ListconfigSection>(
    strapiSections,
    "ComponentSectionsListconfig"
  );

  const blogPostsData = await getBlogPosts({
    pageSize: listConfig?.maxentries,
    sort:
      listConfig?.sortdate === "latest"
        ? "publication_date:desc"
        : "publication_date:asc",
  });

  return {
    props: {
      data: {
        sections,
        meta,
        strapi: { sections: strapiSections, seo: strapiSeo, blogPostsData },
      },
    },
  };
}

export default Home;