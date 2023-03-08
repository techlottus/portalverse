import Head from "next/head"
import { useRouter } from "next/router"
import HeaderFooterLayout from "@/layouts/HeaderFooter.layout"
import ContentLayout from "@/layouts/Content.layout"
import NextPageWithLayout from "@/types/Layout.types"
import Routes from "@/routes/Routes"
import Ofertas from "@/old-components/OfertaEducativa"
import { getDataPageFromJSON } from "utils/getDataPage"
import RichtText from "@/old-components/Richtext/Richtext"
import CardWebsite from "@/old-components/CardWebsite"
import ContentFullLayout from "@/layouts/ContentFull.layout"
import PromoLink from "@/old-components/PromoLink"
import BannerPortalverse from "@/old-components/BannerPortalverse"

const OfertaEducativa: NextPageWithLayout<any> = ({ data: { oferta, level }, sections, meta }: any) => {
  const router = useRouter()

  return <>
    <Head>
      <title>{ meta.title }</title>
    </Head>
    <HeaderFooterLayout>
      <ContentLayout>
        <section className="mx-auto mt-6 w-full col-span-7 w-t:colspan-7 w-p:col-span-4">
          <h1 className="font-Poppins font-bold text-13 w-t:text-8.5 w-p:text-6 leading-16.25 text-black">{ sections.head.title }</h1>
          <RichtText data={{
            content: sections.head.description
          }} />
        </section>
        <section className="w-d:col-span-12 w-t:col-span-8 w-p:col-span-4 text-10 w-t:text-8.5 w-p:text-6 font-Poppins font-bold">
          <p>{sections.offers.title}</p>
        </section>
        <section className="w-d:col-span-12 w-t:col-span-8 w-p:col-span-4">
          <Ofertas classNames="mb-6 mt-4 opacity-80" data={oferta} />
        </section>
        <section className="col-span-12 w-t:col-span-8 w-p:col-span-4">
          <p className="text-10 w-t:text-8.5 w-p:text-6 font-Poppins font-bold">{sections.modalities.title }</p>
        </section>
        <section className="col-span-12 w-t:col-span-8 w-p:col-span-4 grid w-d:grid-cols-3 gap-6 w-t:grid-cols-2 w-p:grid-cols-1">
          {
           sections.modalities.modalities.map((item:any, i:number) => <section key={`section-blog-${i}`}>
            <CardWebsite data={item}/>
           </section>)
          }
        </section>
        <section className="col-span-12 w-t:col-span-8 w-p:col-span-4">
          <p className="text-10 w-t:text-8.5 w-p:text-6 font-Poppins font-bold">{sections.knowledges.title }</p>
        </section>
        <div className="w-d:col-span-12 w-t:col-span-8 w-p:col-span-4 grid w-d:grid-cols-4 gap-6 w-t:grid-cols-2 w-p:grid-cols-1">
          {/* {
            sections.knowledges.knowledges.map((item:any, i:number) => <section key={`section-schoolarships-${i}`}>
              <PromoLink data={item} onClick={()=> router.push(item.redirect)} typeShadowColor={item.shadowColor}/>
            </section>)
          } */}
          {
            sections.areasConocimiento.map((item:any, i:number) => <section className="border-[1px] border-gray-400 shadow-blueShadowLeft rounded-md" key={`section-schoolarships-${i}`}>
              <p className="pt-4 pb-10 px-6">{item.title}</p>
            </section>)
          }
        </div>
        {/* <section className="col-span-6 w-t:col-span-8 w-p:col-span-4 w-d:mt-[72px] w-p:mt-10 w-t:hidden">
          <BannerPortalverse data={sections.bannerTest.banner} onClick={()=>{window.open(sections.bannerTest.banner.redirect)}} />
        </section> */}
        <section className="col-span-12 w-t:col-span-8 w-p:col-span-4 w-d:mt-[72px] w-t:hidden">
          <BannerPortalverse data={sections.bannerInternacionalizacion.banner} onClick={()=>router.push(sections.bannerInternacionalizacion.banner.redirect)}/>
        </section>
      </ContentLayout>
      <ContentFullLayout classNames="gap-6 w-d:hidden w-p:hidden">
        {/* <section className="mt-6">
          <BannerPortalverse data={sections.bannerTest.banner} onClick={()=>{window.open(sections.bannerTest.banner.redirect)}} />
        </section> */}
        <section className="my-6">
          <BannerPortalverse data={sections.bannerInternacionalizacion.banner} onClick={()=>router.push(sections.bannerInternacionalizacion.banner.redirect)} />
        </section>
      </ContentFullLayout>
    </HeaderFooterLayout>
  </>
}

export async function getStaticProps(context: any) {
  const oferta = Routes["oferta-educativa"].reduce((prev: any, { params: { levelRoute: level, config: { title, promo } } }: any) => [ ...prev, ({ level, title, promo:{...promo, text: title} })], []);
  
  const { sections, meta } = await getDataPageFromJSON('/oferta-educativa/oferta-educativa.json');
  
  // Educación continua promolink
  const { level, config: { title, promo } } = Routes["extension-universitaria"].params;

  return {
    props: {  data: { oferta: [ ...oferta, { level, title, promo: { ...promo, text: title } } ], level:'oferta-educativa/' }, sections, meta }
  }
}

export default OfertaEducativa

   