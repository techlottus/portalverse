import Head from "next/head"
import { useRouter } from "next/router"
import HeaderFooterLayout from "@/layouts/HeaderFooter.layout"
import ContentLayout from "@/layouts/Content.layout"
import ContentFullLayout from "@/layouts/ContentFull.layout"
import NextPageWithLayout from "@/types/Layout.types"
import Button from "@/old-components/Button/Button"
import BannerNumeralia from "@/old-components/BannerNumeralia/BannerNumeralia"
import GraduatesForm from "@/forms/container/GraduatesForm"
import { getDataPageFromJSON } from "@/utils/getDataPage"
import RichtText from "@/old-components/Richtext/Richtext"
import Cintillo from "@/old-components/Cintillo"
import Video from "@/old-components/Video"
import BannerPortalverse from "@/old-components/BannerPortalverse"

const Egresados: NextPageWithLayout = ({ sections, meta }: any) => {
  const router = useRouter();

  return <>
    <Head>
      <title>{meta.title}</title>
    </Head>
    <HeaderFooterLayout>
      <ContentFullLayout classNames="gap-y-12 w-d:hidden mb-12">
        <div className="head col-span-12 w-t:col-span-8 w-p:col-span-4">
          <BannerNumeralia data={sections.head.banner} />
        </div>
      </ContentFullLayout>
      <ContentLayout classNames="desktop:gap-y-18 gap-y-12">
        <div className="head col-span-12 w-t:col-span-8 w-p:col-span-4 w-t:hidden w-p:hidden">
          <BannerNumeralia data={sections.head.banner} />
        </div>
        <div className="col-span-12 w-t:col-span-8 w-p:col-span-4 grid grid-cols-2 w-p:gap-12 gap-6">
          <div className="w-p:col-span-2 w-p:order-2">
            <p className="font-headings font-bold leading-tight text-10 w-t:text-6 w-p:text-6 mb-6"> {sections.introduccion.title}</p>
            <RichtText data={{
              content: sections.introduccion.descripcion
            }} />
          </div>
          {
            !sections?.form?.hidden && (
              <div className="w-p:col-span-2 w-p:order-1">
                <div className="w-p:-mt-56 -mt-40 w-t:mr-6 w-d:mr-6">
                  <GraduatesForm />
                </div>
              </div>
            )
          }
        </div>
        <div className="desktop:col-span-6 col-span-12 h-80">
          <Video data={sections.video.video} />
        </div>
        <div className="desktop:col-span-6 col-span-12">
          <p className="font-headings font-bold leading-tight text-10 w-t:text-6 w-p:text-6 mb-6"> {sections.video.title}</p>
          <RichtText data={{
            content: sections.video.descripcion
          }} />
          {sections?.video?.button ?
            <Button dark data={sections.video.button} onClick={() => {
              router.push(`${router.pathname}/talento`)
            }} />
            : null
          }
        </div>
        <div className="col-span-12 grid gap-6">
          <div className="col-span-12 w-t:col-span-8 w-p:col-span-4 w-t:hidden">
            <BannerPortalverse data={sections.bannerEmpleabilidad}
              onClick={() => {
                router.push(`${sections.bannerEmpleabilidad.redirect}`)
              }}
            />
          </div>
          <div className="col-span-6 w-t:col-span-8 w-p:col-span-4 w-t:hidden">
            <BannerPortalverse data={sections.bannerOfertaEducativa}
              onClick={() => {
                router.push(`${sections.bannerOfertaEducativa.redirect}`)
              }}
            />
          </div>
          <div className="col-span-6 w-t:col-span-8 w-p:col-span-4 w-t:hidden">
            <BannerPortalverse data={sections.bannerTramites}
              onClick={() => {
                window.open(`${sections.bannerTramites.redirect}`)
              }}
            />
          </div>
        </div>
      </ContentLayout>
      <ContentFullLayout classNames="gap-6">
        <div className="col-span-12 w-t:col-span-8 w-p:col-span-4 w-d:hidden w-p:hidden my-6">
          <BannerPortalverse data={sections.bannerEmpleabilidad}
            onClick={() => {
              router.push(`${sections.bannerEmpleabilidad.redirect}`)
            }} />
        </div>
        <div className="col-span-12 w-t:col-span-8 w-p:col-span-4 w-d:hidden w-p:hidden mb-6">
          <BannerPortalverse
            data={sections.bannerOfertaEducativa}
            onClick={() => {
              router.push(`${sections.bannerOfertaEducativa.redirect}`)
            }}
          />
        </div>
        <div className="col-span-12 w-t:col-span-8 w-p:col-span-4 w-d:hidden w-p:hidden">
          <BannerPortalverse
            data={sections.bannerTramites}
            onClick={() => {
              window.open(`${sections.bannerTramites.redirect}`)
            }}
          />
        </div>
      </ContentFullLayout>
      {/* <ContentFullLayout classNames="bg-surface-100 w-t:bg-surface-200 w-p:bg-surface-200 mt-12">
        <ContentLayout>
          <div className="col-span-12 pt-6 pb-14">
            <p className="font-headings font-bold leading-tight text-10 w-t:text-6 w-p:text-6 mb-6">{ sections.noticias.title }</p>
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
      <ContentLayout classNames="desktop:mt-18 mt-12">
        <div className="col-span-12 w-t:col-span-8 w-p:col-span-4">
          <Cintillo
            classNames="h-auto"
            {...sections.dudas.banner}
            tabletRatio="768/219"
            image={sections.dudas.banner.image}
            title={sections.dudas.banner.title}
            subtitle={sections.dudas.banner.subtitle}
            whatsApp={sections.dudas.banner.whatsApp}
            email={sections.dudas.banner.email}
            phone={sections.dudas.banner.phone}
            contentVariant={sections.dudas.banner.font}
          />
        </div>
      </ContentLayout>
    </HeaderFooterLayout>
  </>

}

export async function getStaticProps(context: any) {
  try {
    const { sections, meta } = await getDataPageFromJSON("egresados.json");

    return {
      props: { sections, meta },
    };
  } catch {
    return {
      notFound: true,
    };
  }
}


export default Egresados