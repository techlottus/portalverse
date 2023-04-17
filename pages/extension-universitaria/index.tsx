import Head from "next/head"
import { useRouter } from "next/router"
import Routes from "@/routes/Routes"
import HeaderFooterLayout from "@/layouts/HeaderFooter.layout"
import ContentFullLayout from "@/layouts/ContentFull.layout"
import ContentLayout from "@/layouts/Content.layout"
import NextPageWithLayout from "@/types/Layout.types"
import Image from "@/old-components/Image"
import RichtText from "@/old-components/Richtext/Richtext"
import Ofertas from "@/old-components/OfertaEducativa"
import CardProgram from "@/old-components/CardProgram/CardProgram"
import { getDataPageFromJSON } from "@/utils/getDataPage"
import cn from "classnames"
import classNames from "classnames"



const EducacionContinua: NextPageWithLayout = ({ data: { oferta, level }, sections, meta }: any) => {
  const router = useRouter()

  return <>
    <Head>
      <title>{ meta.title }</title>
    </Head>
    <HeaderFooterLayout breadcrumbs={true}>
      <ContentLayout>
        <div className="col-span-6 w-t:col-span-8 w-p:col-span-4 w-d:mb-[72px]">
          <p className="font-Poppins font-bold text-13 w-t:text-8.5 w-p:text-7.5 leading-[60px] w-p:leading-[125%] w-t:leading-[111%]">{sections.head.title}</p>
          <p className="font-Poppins font-semibold text-5.5 w-t:text-base w-p:text-base leading-[130%] my-6">{sections.head.subtitle}</p>
          <RichtText data={{
            content: sections.head.description
          }} />
        </div>
        <div className="col-span-6 w-t:col-span-8 w-p:col-span-4">
          <Image
            alt={ sections.head.image.desk.alt }
            src={ sections.head.image.desk.src }
            classNames="aspect-2/1 w-t:aspect-2/1 w-p:aspect-2/1"
          />
        </div>
        <section className="col-span-12 w-t:col-span-8 w-p:col-span-4">
          {
            sections.extension.sections.map((item:any, i:number) => <>
              <ContentLayout>
                <div className="col-span-12 w-t:col-span-8 w-p:col-span-4">
                <p className="font-Poppins font-bold text-10 w-t:text-6 w-p:text-6 leading-[125%]">{item.title}</p>
                </div>
                <section className="col-span-12 w-t:col-span-8 w-p:col-span-4 grid w-d:grid-cols-4 gap-6 w-t:grid-cols-2 w-p:grid-cols-2 w-d:mb-[72px]">
          {
           item.cursos.map((item:any, i:number) => <section className={cn("w-p:col-span-2", {"hidden": item.hidden})} key={`section-courses-${i}`}>
            <CardProgram classNames="hover:shadow-15 h-full" image={item.image.desk} title={item.title} link={item.link} onClick={()=> router.push(`${router.pathname}/${item.redirect}`)}/>
           </section>)
          }
        </section>
              </ContentLayout>
            </>)
          }
        </section>
      </ContentLayout>
      <ContentFullLayout classNames="bg-SC/Backgrounds/BG-GRAY hidden">
        <ContentLayout classNames="w-d:py-12 w-t:py-6 w-p:py-6">
          <div className="col-span-12 w-t:col-span-8 w-p:col-span-4">
            <p className="font-Poppins font-bold text-10 w-t:text-6 w-p:text-6 leading-[125%]">{sections.nextCourses.title}</p>
          </div>
          <section className="col-span-12 w-t:col-span-8 w-p:col-span-4 grid w-d:grid-cols-4 gap-6 w-t:grid-cols-2 w-p:grid-cols-2 w-d:mb-[72px]">
            {
             sections.nextCourses.nextCourses.map((item:any, i:number) => <section key={`section-nextCourses-${i}`}>
              <CardProgram image={item.image.desk} title={item.title} link={item.link} onClick={()=> router.push(`${router.pathname}/${item.redirect}`)}/>
             </section>)
            }
          </section>
        </ContentLayout>
      </ContentFullLayout>
      <ContentLayout classNames="w-d:mt-[72px] w-t:mt-12 w-p:mt-6">
        <section className="w-d:col-span-12 w-t:col-span-8 w-p:col-span-4 text-10 w-t:text-8.5 w-p:text-6 font-Poppins font-bold">
          <p>{sections.oferta.title}</p>
        </section>
        <section className="w-d:col-span-12 w-t:col-span-8 w-p:col-span-4">
          <Ofertas classNames="mt-4 opacity-80" data={oferta} level={ level } />
        </section>
      </ContentLayout>

    </HeaderFooterLayout>
  </>
}

// `getStaticPaths` requires using `getStaticProps`
export async function getStaticProps(context: any) {
  const oferta = Routes["oferta-educativa"].reduce((prev: any, { params: { level, config: { title, promo } } }: any) => [ ...prev, ({ level,title, url: `oferta-educativa/${level}`, promo:{...promo, text: title} })], []);

  const { sections, meta } = await getDataPageFromJSON('extension-universitaria/extension-universitaria.json');

  return {
    props: {data: { oferta, level:'oferta-educativa/' }, sections, meta }
  }
}

export default EducacionContinua