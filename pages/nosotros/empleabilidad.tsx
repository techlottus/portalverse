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
import CardWebsitePortalverse from "@/old-components/CardWebsitePortalverse"
import Slider from "@/old-components/SliderPortalverse"
import Button from "@/old-components/Button/Button"
import { useRouter } from "next/router"
import RichTextImageBgImage from "@/components/sections/RichTextImageBgImage"
import data from "@/dummy/licenciatura"
import ContentInsideLayout from "@/layouts/ContentInside.layout"

const Empleabilidad: NextPageWithLayout = ({ sections, meta }: any) => {
  const router = useRouter();
  console.log(sections?.RichTextImageBgImage?.desktopBgImage?.data?.attributes?.url);
  return <>
    <Head>
      <title>{meta.title}</title>
    </Head>
    <HeaderFooterLayout breadcrumbs={true}>
      <ContentFullLayout classNames="gap-6 w-d:hidden mb-6">
        <div className="head col-span-12 w-t:col-span-8 w-p:col-span-4">
          <BannerNumeralia data={sections.head.banner} />
        </div>
      </ContentFullLayout>
      <ContentLayout classNames="gap-6">
        <div className="head col-span-12 w-t:hidden w-p:hidden">
          <BannerNumeralia data={sections.head.banner} />
        </div>
        <div className="col-span-6 mt-auto mb-auto w-t:col-span-8 w-p:col-span-4 w-t:hidden w-p:hidden">
          <p className="font-headings font-bold leading-tight text-10 w-t:text-6 w-p:text-6 mb-6"> {sections.descripcion.title}</p>
          <RichtText data={{ content: sections.descripcion.text.content }} />
          {
            <div className="mt-18 w-t:mt-12 w-p:mt-6">
              {
                sections?.descripcion?.button ?
                  <Button dark data={sections?.descripcion?.button} onClick={() => {
                    router.push(sections?.descripcion?.button?.redirect)
                  }} />
                  : null
              }
            </div>
          }
        </div>
        <div className="col-span-6 w-t:col-span-8 w-p:col-span-4">
          <BeWanted pathBeWanted="https://www.bewanted.com/acceso/candidatos" copies={{ ...OpenFormInit.steponebewanted }} pathThankyou={`/thank-you?type=egresados`} classNames="w-full h-auto bg-surface-0 bottom-0 rounded-lg" />
        </div>
        {
          sections?.comoFunciona ?
            <div className="col-span-6 w-t:col-span-8 w-p:col-span-4 w-d:hidden">
              <p className="font-headings font-bold leading-tight text-10 w-t:text-6 w-p:text-6 mb-6">{sections?.comoFunciona?.title}</p>
            </div>
            : null
        }
        {
          sections?.comoFunciona ?
            <div className="col-span-6 w-t:col-span-8 w-p:col-span-4 mt-auto mb-auto h-80">
              <Video data={sections?.comoFunciona?.video} />
            </div>
            : null
        }
        {
          sections?.comoFunciona ?
            <div className="col-span-6 w-t:col-span-8 w-p:col-span-4 w-t:hidden w-p:hidden my-auto ">
              <p className="font-headings font-bold leading-tight text-10 w-t:text-6 w-p:text-6 mb-6">{sections.comoFunciona.title}</p>
              <RichtText data={{ content: sections.comoFunciona.description.content }} />
            </div>
            : null
        }
        {
          sections?.comoFunciona ?
            <div className="w-t:col-span-8 w-p:col-span-4 w-d:hidden">
              <RichtText data={{ content: sections.comoFunciona.description.content }} />
            </div>
            : null
        }
        {
          sections?.someVacancies ?
            <div className="col-span-12 w-t:col-span-8 w-p:col-span-4 mt-18">
              <p className="font-headings font-bold leading-tight text-10"> {sections?.someVacancies?.title}</p>
            </div>
            : null
        }
        {
          sections?.someVacancies ?
            <section className="col-span-12 w-t:col-span-8 w-p:col-span-4 grid w-d:grid-cols-3 gap-6 w-t:grid-cols-2 w-p:grid-cols-1 mb-12 w-t:mb-6 w-p:mb-6">
              {
                sections?.someVacancies?.vacancies.map((item: any, i: number) => <section key={`section-blog-${i}`}>
                  <CardWebsitePortalverse data={item} onClick={item?.redirect ? () => window.open(item.redirect, "_blank") : undefined} />
                </section>)
              }
            </section>
            : null
        }
        {
          sections?.sliderNotices ?
            <div className="col-span-12 w-t:col-span-8 w-p:col-span-4">
              {
                sections?.sliderNotices?.title ?
                  <p className="w-d:mb-6 font-headings text-6 w-d:text-10 leading-13 font-bold">{sections?.sliderNotices?.title}</p>
                  : null
              }
              <Slider data={{ ...sections?.sliderNotices }} mobile={true} />
            </div>
            : null
        }
        {
          sections?.vinculacionEmpresas ?
            <ContentInsideLayout classNames="col-span-12 w-t:col-span-8 w-p:col-span-4">
              <div className="col-span-6 w-t:col-span-8 w-p:col-span-4 mt-auto mb-auto">
                <p className="font-headings font-bold leading-tight text-10 w-t:text-6 w-p:text-6 mb-6">{sections.vinculacionEmpresas.title}</p>
                <RichtText data={{ content: sections.vinculacionEmpresas.description.content }} />
              </div>
              <div className="col-span-6 w-t:col-span-8 w-p:col-span-4">
                <Image src={sections.vinculacionEmpresas.image.src} alt={sections.vinculacionEmpresas.image.src} classNames="aspect-1/1" />
              </div>
            </ContentInsideLayout>
            : null
        }
      </ContentLayout>
      {
        sections?.RichTextImageBgImage ?
          <ContentFullLayout classNames="my-18 w-t:my-6 w-p:my-6">
            <RichTextImageBgImage type={"ComponentSectionsRichTextImageBgImage"} desktopBgImage={{ data: { attributes: { url: sections?.RichTextImageBgImage?.desktopBgImage?.data?.attributes?.url } } }} tabletBgImage={{ data: { attributes: { url: sections?.RichTextImageBgImage?.tabletBgImage?.data?.attributes?.url } } }} mobileBgImage={{ data: { attributes: { url: sections?.RichTextImageBgImage?.tabletBgImage?.data?.attributes?.url } } }} RichTextImageComponent={{
              type: "ComponentSectionsRichTextImage",
              title: sections?.RichTextImageBgImage?.RichTextImage?.title,
              image: {
                data: {
                  attributes: {
                    url: sections?.RichTextImageBgImage?.RichTextImage?.image?.data?.attributes?.url,
                    alternativeText: ""
                  }
                }
              },
              text: sections?.RichTextImageBgImage?.RichTextImage?.text,
              imagePosition: sections?.RichTextImageBgImage?.RichTextImage?.imagePosition,
              backgroundColor: sections?.RichTextImageBgImage?.RichTextImage?.backgroundColor,
              richTextImageContentVariant: sections?.RichTextImageBgImage?.RichTextImage?.contentVariant
            }} />
          </ContentFullLayout>
          : null
      }
      {
        sections?.historiasExito ?
          <ContentFullLayout classNames="bg-surface-800">
            <ContentLayout>
              <div className="col-span-12 w-t:col-span-8 w-p:col-span-4 mt-4 w-d:hidden">
                <p className="font-headings text-surface-0 font-bold leading-tight text-6.5 w-t:text-6 w-p:text-6">{sections.historiasExito.title}</p>
              </div>
              <div className="col-span-6 w-t:col-span-8 w-p:col-span-4 mt-auto mb-auto w-t:hidden w-p:hidden">
                <p className="font-headings text-surface-0 font-bold leading-tight text-6.5 w-t:text-6 w-p:text-6 mb-6">{sections.historiasExito.title}</p>
                <RichtText font="dark" data={{ content: sections.historiasExito.description.content }} />
              </div>
              <div className="col-span-6 w-t:col-span-8 w-p:col-span-4 mb-6 w-d:hidden">
                <RichtText font="dark" data={{ content: sections.historiasExito.description.content }} />
              </div>
              <div className="col-span-6 w-t:col-span-8 w-p:col-span-4 w-d:mt-6 mb-6 h-80">
                <Video data={sections.historiasExito.video} />
              </div>
            </ContentLayout>
          </ContentFullLayout>
          : null
      }
      <ContentFullLayout classNames="bg-surface-100 mt-18 w-t:mt-12 w-p:mt-12">
        {/* <ContentLayout>
        <div className="col-span-12 w-t:col-span-8 w-p:col-span-4 mt-6">
          <p className="font-headings font-bold leading-tight text-10 w-t:text-6 w-p:text-6">{ sections.noticias.title }</p>
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
      <ContentLayout classNames="mb-12 w-t:mb-6 w-p:mb-6 w-d:mt-18 w-t:mt-8 w-p:mt-12">
        <div className="col-span-12 w-t:col-span-8 w-p:col-span-4">
          <Cintillo
            classNames="h-auto"
            {...sections?.contacto?.banner}
            contentVariant={sections.contacto.banner.contentVariant}
            image={sections.contacto.banner.image}
            title={sections.contacto.banner.title}
            subtitle={sections.contacto.banner.subtitle}
            phone={sections.contacto.banner.phone}
            email={sections.contacto.banner.email}
          />
        </div>
      </ContentLayout>
    </HeaderFooterLayout>
  </>
}

// `getStaticPaths` requires using `getStaticProps`
export async function getStaticProps(context: any) {

  try {
    const { sections, meta } = await getDataPageFromJSON("empleabilidad.json");

    // redirect not avaliable page
    if (!!meta.hidden) {
      return {
        notFound: true,
      };
    }

    return {
      props: { sections, meta },
    };
  } catch {
    return {
      notFound: true,
    };
  }

}

export default Empleabilidad