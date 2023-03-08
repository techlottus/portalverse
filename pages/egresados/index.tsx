import Head from "next/head"
import { useRouter } from "next/router"
import HeaderFooterLayout from "@/layouts/HeaderFooter.layout"
import ContentLayout from "@/layouts/Content.layout"
import ContentFullLayout from "@/layouts/ContentFull.layout"
import NextPageWithLayout from "@/types/Layout.types"
import Button from "@/old-components/Button/Button"
import CardWebsite from "@/old-components/CardWebsite"
import BannerNumeralia from "@/old-components/BannerNumeralia/BannerNumeralia"
import BeWantedForm from "@/forms/container/Egresados"
import { getDataPageFromJSON } from "@/utils/getDataPage"
import RichtText from "@/old-components/Richtext/Richtext"
import Cintillo from "@/old-components/Cintillo"
import Video from "@/old-components/Video"
import BannerPortalverse from "@/old-components/BannerPortalverse"

const Egresados: NextPageWithLayout = ({ sections, meta }: any) => {
  const router = useRouter();

  return <>
    <Head>
      <title>{ meta.title }</title>
    </Head>
    <HeaderFooterLayout>
      <ContentFullLayout classNames="gap-6 w-d:hidden mb-6">
        <div className="head col-span-12 w-t:col-span-8 w-p:col-span-4">
          <BannerNumeralia data={ sections.head.banner } />
        </div>
      </ContentFullLayout>
      <ContentLayout>
        <div className="head col-span-12 w-t:col-span-8 w-p:col-span-4 border-solid border-2 w-t:hidden w-p:hidden">
          <BannerNumeralia data={ sections.head.banner } />
        </div>
        <div className="col-span-6 w-t:col-span-8 w-p:col-span-4 w-p:order-2">
          <p className="font-Poppins font-bold leading-[125%] text-10 w-t:text-6 w-p:text-6 mb-6"> { sections.introduccion.title}</p>
          <RichtText data={{
            content: sections.introduccion.descripcion
          }} />
        </div>
        <div className="col-span-6 w-t:col-span-4 w-p:col-span-4 w-p:order-1 relative">
          {/* <BeWantedForm pathThankyou={`/thank-you?type=egresados`} classNames="absolute w-full h-auto bg-white bottom-0 rounded-lg" /> */}
        </div>
        <div className="col-span-6 w-t:col-span-8 w-p:col-span-4">
          <Video dimensions={["330px","400px","200px"]} data={ sections.video.video }/>
        </div>
        <div className="col-span-6 w-t:col-span-8 w-p:col-span-4">
          <p className="font-Poppins font-bold leading-[125%] text-10 w-t:text-6 w-p:text-6 mb-6"> { sections.video.title }</p>
          <RichtText data={{
            content: sections.video.descripcion
          }} />
          <Button dark data={ sections.video.accion } onClick={()=>{
            router.push(`${router.pathname}/talento`)
          }}/>
        </div>
        <div className="col-span-12 w-t:col-span-8 w-p:col-span-4 w-t:hidden">
          <BannerPortalverse data={ sections.bannerEmpleabilidad }
            onClick={ () => {
              router.push(`${sections.bannerEmpleabilidad.redirect}`)
            }}
          />
        </div>
        <div className="col-span-6 w-t:col-span-8 w-p:col-span-4 w-t:hidden">
          <BannerPortalverse data={ sections.bannerOfertaEducativa }
            onClick={ () => {
              router.push(`${sections.bannerOfertaEducativa.redirect}`)
            }}
          />
        </div>
        <div className="col-span-6 w-t:col-span-8 w-p:col-span-4 w-t:hidden">
        <BannerPortalverse data={ sections.bannerTramites}
            onClick={ () => {
              window.open(`${sections.bannerTramites.redirect}`)
            }}
          />  
        </div>
      </ContentLayout>
      <ContentFullLayout classNames="gap-6">
        <div className="col-span-12 w-t:col-span-8 w-p:col-span-4 w-d:hidden w-p:hidden my-6">
          <BannerPortalverse data={ sections.bannerEmpleabilidad }
            onClick={ () => {
              router.push(`${sections.bannerEmpleabilidad.redirect}`)
            }}/>
        </div>
        <div className="col-span-12 w-t:col-span-8 w-p:col-span-4 w-d:hidden w-p:hidden mb-6">
          <BannerPortalverse data={ sections.bannerOfertaEducativa }
            onClick={ () => {
              router.push(`${sections.bannerOfertaEducativa.redirect}`)
            }}
          />
        </div>
        <div className="col-span-12 w-t:col-span-8 w-p:col-span-4 w-d:hidden w-p:hidden">
          <BannerPortalverse data={ sections.bannerTramites}
              onClick={ () => {
                window.open(`${sections.bannerTramites.redirect}`)
              }}
            /> 
        </div>
      </ContentFullLayout>
      {/* <ContentFullLayout classNames="bg-SC/Backgrounds/BG-GRAY w-t:bg-SC/Actions/AC-300 w-p:bg-SC/Actions/AC-300 mt-12">
        <ContentLayout>
          <div className="col-span-12 pt-6 pb-[53px]">
            <p className="font-Poppins font-bold leading-[125%] text-10 w-t:text-6 w-p:text-6 mb-6">{ sections.noticias.title }</p>
            {
              <section className="col-span-12 w-t:col-span-8 w-p:col-span-4 grid w-d:grid-cols-2 gap-6 w-t:grid-cols-2 w-p:grid-cols-1">
              {
               sections.noticias.news.map((item:any, i:number) => <section key={`section-blog-${i}`}>
                <CardWebsite data={item}/>
               </section>)
              }
            </section>
            }
          </div>
        </ContentLayout>
      </ContentFullLayout> */}
      <ContentLayout classNames="mt-[72px] w-t:my-6 w-p:my-6">
        <div className="col-span-12 w-t:col-span-8 w-p:col-span-4">
          <Cintillo classNames="h-[200px]" image={sections.dudas.banner.image} title={sections.dudas.banner.title} subtitle={sections.dudas.banner.subtitle} whatsApp={sections.dudas.banner.whatsApp} email={sections.dudas.banner.email} phone={""}/>
        </div>
      </ContentLayout>
    </HeaderFooterLayout>
  </>

}

export async function getStaticProps(context: any) {
  const { sections, meta } = await getDataPageFromJSON('egresados.json');

  return {
    props: { sections, meta }
  }
}


export default Egresados