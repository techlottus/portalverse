import Head from "next/head"
import ContentLayout from "@/layouts/Content.layout"
import ContentFullLayout from "@/layouts/ContentFull.layout"
import HeaderFooterLayout from "@/layouts/HeaderFooter.layout"
import NextPageWithLayout from "@/types/Layout.types"
import Image from "@/old-components/Image"
import BeWanted from "@/forms/container/BeWanted"
import CardWebsite from "@/old-components/CardWebsite"
import RichtText from "@/old-components/Richtext/Richtext"
import { getDataPageFromJSON } from "@/utils/getDataPage"
import BannerNumeralia from "@/old-components/BannerNumeralia/BannerNumeralia"
import Cintillo from "@/old-components/Cintillo"
import Video from "@/old-components/Video"
import OpenFormInit from "@/forms/fixtures/openform"

const Empleabilidad: NextPageWithLayout = ({ sections, meta }: any) => {

  return <>
    <Head>
      <title>{meta.title}</title>
    </Head>
    <HeaderFooterLayout breadcrumbs={true}>
      <ContentFullLayout classNames="gap-6 w-d:hidden mb-6">
        <div className="head col-span-12 w-t:col-span-8 w-p:col-span-4">
          <BannerNumeralia data={ sections.head.banner } />
        </div>
      </ContentFullLayout>
      <ContentLayout classNames="gap-6">
        <div className="head col-span-12 w-t:hidden w-p:hidden">
          <BannerNumeralia data={ sections.head.banner } />
        </div>
        <div className="col-span-6 mt-auto mb-auto w-t:col-span-8 w-p:col-span-4 w-t:hidden w-p:hidden">
          <p className="font-Poppins font-bold leading-[125%] text-10 w-t:text-6 w-p:text-6 mb-6"> { sections.descripcion.title}</p>
          <RichtText data={{content: sections.descripcion.text.content}} />
        </div>
        <div className="col-span-6 w-t:col-span-8 w-p:col-span-4">
          <BeWanted pathBeWanted="https://www.bewanted.com/acceso/candidatos" copies={{ ...OpenFormInit.steponebewanted }} pathThankyou={`/thank-you?type=egresados`} classNames="w-full h-auto bg-white bottom-0 rounded-lg" />
        </div>
        <div className="col-span-6 w-t:col-span-8 w-p:col-span-4 w-d:hidden">
          <p className="font-Poppins font-bold leading-[125%] text-10 w-t:text-6 w-p:text-6 mb-6">{ sections.comoFunciona.title }</p>
        </div>
        <div className="col-span-6 w-t:col-span-8 w-p:col-span-4 mt-auto mb-auto">
          <Video dimensions={["330px", "350px", "200px"]} data={ sections.comoFunciona.video }/>
        </div>
        <div className="col-span-6 w-t:col-span-8 w-p:col-span-4 w-t:hidden w-p:hidden my-auto ">
          <p className="font-Poppins font-bold leading-[125%] text-10 w-t:text-6 w-p:text-6 mb-6">{ sections.comoFunciona.title }</p>
          <RichtText data={{content: sections.comoFunciona.description.content}}/>
        </div>
        <div className="w-t:col-span-8 w-p:col-span-4 w-d:hidden">
          <RichtText data={{content: sections.comoFunciona.description.content}}/>
        </div>
        <div className="col-span-12 w-t:col-span-8 w-p:col-span-4 hidden">
          <p className="font-Poppins font-bold leading-[125%] text-10"> { sections.vacantes.title }</p>
        </div>
        <div className="col-span-12 w-t:col-span-8 w-p:col-span-4"></div>
        <div className="col-span-6 w-t:col-span-8 w-p:col-span-4 mt-auto mb-auto">
          <p className="font-Poppins font-bold leading-[125%] text-10 w-t:text-6 w-p:text-6 mb-6">{ sections.vinculacionEmpresas.title }</p>
          <RichtText data={{ content: sections.vinculacionEmpresas.description.content }}/>
        </div>
        <div className="col-span-6 w-t:col-span-8 w-p:col-span-4">
          <Image src={sections.vinculacionEmpresas.image.src} alt={sections.vinculacionEmpresas.image.src} classNames="aspect-1/1"/>
        </div>
      </ContentLayout>
      <ContentFullLayout classNames="bg-darkBlue">
        <ContentLayout>
          <div className="col-span-12 w-t:col-span-8 w-p:col-span-4 mt-4 w-d:hidden">
            <p className="font-Poppins text-white font-bold leading-[125%] text-6.5 w-t:text-6 w-p:text-6">{ sections.historiasExito.title }</p>
          </div>
          <div className="col-span-6 w-t:col-span-8 w-p:col-span-4 w-d:mt-6 mb-6">
            <Video dimensions={["400px", "350px", "200px"]} data={ sections.historiasExito.video }/>
          </div>
          <div className="col-span-6 w-t:col-span-8 w-p:col-span-4 mt-auto mb-auto w-t:hidden w-p:hidden">
            <p className="font-Poppins text-white font-bold leading-[125%] text-6.5 w-t:text-6 w-p:text-6 mb-6">{ sections.historiasExito.title }</p>
            <RichtText font="dark" data={{content: sections.historiasExito.description.content}}/>
          </div>
          <div className="col-span-6 w-t:col-span-8 w-p:col-span-4 mb-6 w-d:hidden">
            <RichtText font="dark" data={{content: sections.historiasExito.description.content}}/>
          </div>
        </ContentLayout>
      </ContentFullLayout>
      <ContentFullLayout classNames="bg-SC/Backgrounds/BG-GRAY mt-[72px] w-t:mt-12 w-p:mt-12">
      {/* <ContentLayout>
        <div className="col-span-12 w-t:col-span-8 w-p:col-span-4 mt-6">
          <p className="font-Poppins font-bold leading-[125%] text-10 w-t:text-6 w-p:text-6">{ sections.noticias.title }</p>
        </div>
        <section className="col-span-12 w-t:col-span-8 w-p:col-span-4 grid w-d:grid-cols-2 gap-6 w-t:grid-cols-2 w-p:grid-cols-1 mb-6">
          {
            sections.noticias.news.map((item:any, i:number) => <section key={`section-blog-${i}`}>
            <CardWebsite data={item}/>
            </section>)
          }
        </section>
      </ContentLayout> */}
      </ContentFullLayout>
      <ContentLayout classNames="w-t:hidden mb-12 w-t:mb-6 w-p:mb-6 mt-[72px]">
        <div className="col-span-12 w-t:col-span-8 w-p:col-span-4 border-solid border-2">
          <Cintillo classNames="h-[200px]" image={sections.contacto.banner.image} title={sections.contacto.banner.title} subtitle={sections.contacto.banner.subtitle} phone={sections.contacto.banner.phone} email={sections.contacto.banner.email}/>
        </div>
      </ContentLayout>
      <ContentFullLayout classNames="w-d:hidden w-p:hidden mb-12 w-t:mb-6 w-p:mb-6 mt-[72px]">
        <div className="col-span-12 w-t:col-span-8 w-p:col-span-4 border-solid border-2 mt-12">
          <Cintillo classNames="h-[200px]" image={sections.contacto.banner.image} title={sections.contacto.banner.title} subtitle={sections.contacto.banner.subtitle} phone={sections.contacto.banner.phone} email={sections.contacto.banner.email}/>
        </div>
      </ContentFullLayout>
    </HeaderFooterLayout>
  </>
}

// `getStaticPaths` requires using `getStaticProps`
export async function getStaticProps(context: any) {
  const { sections, meta } = await getDataPageFromJSON('empleabilidad.json');

  // redirect not avaliable page
  if (!!meta.hidden) {
    return {
      notFound: true,
    }
  }

  return {
    props: { sections, meta }
  }
}

export default Empleabilidad