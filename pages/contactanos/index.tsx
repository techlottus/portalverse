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

const PonteEnContacto: NextPageWithLayout = ({ sections, meta }: any) => {
  const router = useRouter();

  return <>
    <Head>
      <title>{ meta.title }</title>
      <meta property="title" content={meta?.title} />
    </Head>
    <HeaderFooterLayout breadcrumbs={false}>
      <ContentFullLayout>
        <ContentInsideLayout classNames="mb-12">
          <div className="col-span-5 tablet:col-span-8 mobile:col-span-4 bg-surface-800 text-surface-0 tablet:pb-6">
            <ContentInsideLayout classNames="grid-cols-5 tablet:grid-cols-8">
              <div className="col-span-5 col-start-2 col-end-5 tablet:col-span-8 tablet:col-start-2 tablet:col-end-8 mobile:col-start-1 mobile:col-end-5">
                <Breadcrumbs />
              </div>
              <h1 className="col-span-5 col-start-2 col-end-5 tablet:col-span-8 tablet:col-start-2 tablet:col-end-8 mobile:col-start-1 mobile:col-end-5 text-10 mobile:text-7.5 mobile:m-6 font-bold font-headings leading-tight">{ sections.head.title }</h1>
              {
                sections.medios.map((medio: any, i: number) => <p key={`item-media-${i}`} className="col-span-5 col-start-2 col-end-5 tablet:col-start-2 tablet:col-end-8 mobile:col-start-1 text-base font-headings desktop:mt-6 tablet:mt-6 mobile:mt-2 mobile:mx-6 leading-6 tablet:leading-tight mobile:leading-3[130%] flex items-center font-normal"><span className="material-symbols-outlined mr-2 select-none">{ medio.icon }</span>{ medio.text }</p>)
              }
              <section className="col-span-5 col-start-2 col-end-5 tablet:col-start-2 tablet:col-end-8 mobile:col-start-1">
                <p className="text-4.5 tablet:text-6 font-headings font-bold desktop:mt-6 tablet:mt-6 mobile:mt-2 mobile:mx-6 leading-tight">{sections.campus.title}</p>
              </section>
              <section className="col-span-5 col-start-2 col-end-5 tablet:col-start-2 tablet:col-end-8 mobile:col-start-1 desktop:mb-18 mt-6">
                <Button darkOutlined data={sections.campus.button} onClick={()=> router.push(sections.campus.button.redirect)}/>
              </section>
              <p className="col-span-5 col-start-2 col-end-11 tablet:col-start-2 tablet:col-end-8 mobile:col-start-1  text-4.5 font-bold font-headings desktop:mt-12 tablet:mt-18 mobile:mt-16 mobile:ml-6 leading-tight">Síguenos en redes sociales</p>
              <section className="grid desktop:grid-cols-4 tablet:grid-cols- mobile:grid-cols-4 col-start-2 col-end-5 tablet:col-start-2 tablet:col-end-6 mobile:col-start-1 mobile:col-end-4 desktop:mt-10 tablet:mt-10 mobile:my-5 mobile:ml-6 desktop:mb-7 tablet:mb-28 mobile:mb-13">
              {
                sections.sociales.map((social: any, i:number) => <Link key={`span-icons-${i}`} href={social.link} passHref target={"_blank"}>

                  <Icon name={social.icon} className="w-8 h-8 text-surface-0" />

                </Link>)
              }
              </section>
            </ContentInsideLayout>
          </div>
          <div className="col-span-7 tablet:col-span-8 mobile:col-span-4">
            <ContentInsideLayout classNames="tablet:grid-cols-8">
              <div className="col-span-12 tablet:col-span-8 mobile:col-span-4 col-start-3 col-end-11 tablet:col-start-1 tablet:col-end-8 mobile:col-start-1 mobile:col-end-5">
                <div className="mt-18">
                  <ReasonsToContact image={{ src: "https://assets.staging.bedu.org/UTEG/admisiones_pedir_informacion_avatar_6738c707b5.jpg", alt:"image-person" }} pathThanyouOtherReason="/thank-you" pathThanyouOpenForm="/thank-you" />
                </div>
              </div>
            </ContentInsideLayout>
          </div>
        </ContentInsideLayout>
        <ContentFullLayout classNames="desktop:hidden">
          <BannerPortalverse
            data={sections.banner } 
            onClick={ () =>{
              router.push(`${sections.banner.redirect}`)
              } 
            } />
        </ContentFullLayout>
      </ContentFullLayout>
      <ContentLayout classNames="tablet:hidden mobile:hidden">
        <div className="col-span-12 tablet:col-span-8 mobile:col-span-4">
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

    // redirect not avaliable page
    if (!!meta.hidden) {
      return {
        notFound: true,
      }
    }

    return {
      props: { sections, meta }
    }
  } catch {
    return {
      notFound: true,
    };
  }
}

export default PonteEnContacto
