import Head from "next/head"
import Link from "next/link"
import { useRouter } from "next/router"
import ContentInsideLayout from "@/layouts/ContentInside.layout"
import HeaderFooterLayout from "@/layouts/HeaderFooter.layout"
import ContentFullLayout from "@/layouts/ContentFull.layout"
import NextPageWithLayout from "@/types/Layout.types"
import Button from "@/old-components/Button/Button"
import ReasonsToContact from "@/forms/container/ReasonsToContact"
import Breadcrumbs from "@/old-components/Breadcrumbs/BreadcrumbPortalverse"
import { getDataPageFromJSON } from "@/utils/getDataPage"
import Icon from "@/old-components/Icon"
import BannerPortalverse from "@/old-components/BannerPortalverse"
import ContentLayout from "@/layouts/Content.layout"
import getLayout from "@/utils/getLayout"

const PonteEnContacto: NextPageWithLayout = ({ sections, meta, layoutData }: any) => {
  const router = useRouter();

  return <>
    <Head>
      <title>{ meta.title }</title>
      <meta property="title" content={meta?.title} />
    </Head>
    <HeaderFooterLayout breadcrumbs={false} layoutData={layoutData}>
      <ContentFullLayout>
        <ContentInsideLayout classNames="mb-12">
          <div className="col-span-5 w-t:col-span-8 w-p:col-span-4 bg-surface-800 text-surface-0 w-t:pb-6">
            <ContentInsideLayout classNames="grid-cols-5 w-t:grid-cols-8">
              <div className="col-span-5 col-start-2 col-end-5 w-t:col-span-8 w-t:col-start-2 w-t:col-end-8 w-p:col-start-1 w-p:col-end-5">
                <Breadcrumbs />
              </div>
              <h1 className="col-span-5 col-start-2 col-end-5 w-t:col-span-8 w-t:col-start-2 w-t:col-end-8 w-p:col-start-1 w-p:col-end-5 text-10 w-p:text-7.5 w-p:m-6 font-bold font-headings leading-tight">{ sections.head.title }</h1>
              {
                sections.medios.map((medio: any, i: number) => <p key={`item-media-${i}`} className="col-span-5 col-start-2 col-end-5 w-t:col-start-2 w-t:col-end-8 w-p:col-start-1 text-base font-headings w-d:mt-6 w-t:mt-6 w-p:mt-2 w-p:mx-6 leading-6 w-t:leading-tight w-p:leading-3[130%] flex items-center font-normal"><span className="material-symbols-outlined mr-2 select-none">{ medio.icon }</span>{ medio.text }</p>)
              }
              <section className="col-span-5 col-start-2 col-end-5 w-t:col-start-2 w-t:col-end-8 w-p:col-start-1">
                <p className="text-4.5 w-t:text-6 font-headings font-bold w-d:mt-6 w-t:mt-6 w-p:mt-2 w-p:mx-6 leading-tight">{sections.campus.title}</p>
              </section>
              <section className="col-span-5 col-start-2 col-end-5 w-t:col-start-2 w-t:col-end-8 w-p:col-start-1 w-d:mb-18 mt-6">
                <Button darkOutlined data={sections.campus.button} onClick={()=> router.push(sections.campus.button.redirect)}/>
              </section>
              <p className="col-span-5 col-start-2 col-end-11 w-t:col-start-2 w-t:col-end-8 w-p:col-start-1  text-4.5 font-bold font-headings w-d:mt-12 w-t:mt-18 w-p:mt-16 w-p:ml-6 leading-tight">Síguenos en redes sociales</p>
              <section className="grid w-d:grid-cols-4 w-t:grid-cols- w-p:grid-cols-4 col-start-2 col-end-5 w-t:col-start-2 w-t:col-end-6 w-p:col-start-1 w-p:col-end-4 w-d:mt-10 w-t:mt-10 w-p:my-5 w-p:ml-6 w-d:mb-7 w-t:mb-28 w-p:mb-13">
              {
                sections.sociales.map((social: any, i:number) => <Link key={`span-icons-${i}`} href={social.link} passHref target={"_blank"}>

                  <Icon name={social.icon} className="w-8 h-8 text-surface-0" />

                </Link>)
              }
              </section>
            </ContentInsideLayout>
          </div>
          <div className="col-span-7 w-t:col-span-8 w-p:col-span-4">
            <ContentInsideLayout classNames="w-t:grid-cols-8">
              <div className="col-span-12 w-t:col-span-8 w-p:col-span-4 col-start-3 col-end-11 w-t:col-start-1 w-t:col-end-8 w-p:col-start-1 w-p:col-end-5">
                <div className="mt-18">
                  <ReasonsToContact image={{ src: "https://assets.staging.bedu.org/UTEG/admisiones_pedir_informacion_avatar_6738c707b5.jpg", alt:"image-person" }} pathThanyouOtherReason="/thank-you" pathThanyouOpenForm="/thank-you" />
                </div>
              </div>
            </ContentInsideLayout>
          </div>
        </ContentInsideLayout>
        <ContentFullLayout classNames="w-d:hidden">
          <BannerPortalverse
            data={sections.banner } 
            onClick={ () =>{
              router.push(`${sections.banner.redirect}`)
              } 
            } />
        </ContentFullLayout>
      </ContentFullLayout>
      <ContentLayout classNames="w-t:hidden w-p:hidden">
        <div className="col-span-12 w-t:col-span-8 w-p:col-span-4">
        <BannerPortalverse
            data={sections.banner } 
            onClick={ () =>{
              router.push(`${sections.banner.redirect}`)
              } 
            } />
        </div>
      </ContentLayout>
    </HeaderFooterLayout>
  </>;
}

// `getStaticPaths` requires using `getStaticProps`
export async function getStaticProps(context: any) {
  try {
    const { sections, meta } = await getDataPageFromJSON('ponte-en-contacto.json');
    const layoutData = await getLayout()

    // redirect not avaliable page
    if (!!meta.hidden) {
      return {
        notFound: true,
      }
    }

    return {
      props: { sections, meta, layoutData }
    }
  } catch {
    return {
      notFound: true,
    };
  }
}

export default PonteEnContacto
