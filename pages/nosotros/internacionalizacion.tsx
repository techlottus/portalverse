import { useEffect, useState } from "react"
import Head from "next/head"
import { useRouter } from "next/router"
import Link from "next/link"
import HeaderFooterLayout from "@/layouts/HeaderFooter.layout"
import ContentFullLayout from "@/layouts/ContentFull.layout"
import ContentLayout from "@/layouts/Content.layout"
import NextPageWithLayout from "@/types/Layout.types"
import Slider from "@/old-components/SliderPortalverse"
import RichtText from "@/old-components/Richtext/Richtext"
import PromoLink from "@/old-components/PromoLink"
import CardWebsite from "@/old-components/CardWebsite"
import { getDataPageFromJSON } from "@/utils/getDataPage"
import Rainbow from "@/old-components/Rainbow"
import Modal from "@/old-components/Modal/Modal"
import ContentInsideLayout from "@/layouts/ContentInside.layout"
import cn from "classnames"
import Video from "@/old-components/Video"

const Internacionalizacion: NextPageWithLayout = ({ sections, meta }: any) => {

  const router = useRouter();
  // Modal functionality begin
  const [isShow, setIsShow] = useState(false);
  const [infoModal, setInfoModal] = useState<any>({});
  const handleVisibilityModal = () => setIsShow(!isShow);
  // Modal functionality end

  const handleOpenModal = (content: any) => {
    setInfoModal({...content})
    handleVisibilityModal();
  };

  return <>
    <Head>
      <title>{ meta.title }</title>
    </Head>
    <Modal isShow={isShow} onClose={handleVisibilityModal} data={{icon: 'close', title: "", tagOnClose: 'testOnClose', wrapper: true,}}>
      <section slot="areaModalContent" className="flex w-t:flex-col w-p:flex-col w-full h-auto">
      <ContentInsideLayout classNames="gap-6">
          <div className="col-span-6 w-t:col-span-8 w-p:col-span-4 bg-[#2B2C34] p-6">
            <p className="text-white font-Poppins font-bold text-6 break-normal mb-16">{infoModal?.title?.title}</p>
            <div className="flex flex-col space-y-12">
              {
                infoModal?.downloadables?.length > 0
                  ? <div>
                      <span className="font-Poppins font-normal text-white mb-6">Descargas</span>
                      {
                        (infoModal?.downloadables as Array<{ label: string; link: string; }>)?.map((redirect, index) => {
                          const children = (
                            <>
                              <span className="font-Nunito-Sans font-normal underline underline-offset-4 mr-auto">{redirect?.label}</span>
                              <span className="material-icons ml-3 mt-1">download</span>
                            </>
                          );

                          if (redirect?.link) {
                            return (
                              <a
                                key={index}
                                href={redirect?.link}
                                rel="noreferrer noopener"
                                target="_blank"
                                className={
                                  cn("flex items-center text-white mt-6")
                                }
                              >
                                {children}
                              </a>
                            )
                          } else {
                            return (
                              <div
                                key={index}
                                className="flex items-center mt-6 text-SC/Blackandgrey/B-60 cursor-not-allowed"
                              >
                                {children}
                              </div>
                            )
                          }
                        })
                      }
                    </div>
                  : null
              }
              {
                infoModal?.redirect?.link  
                ? <div>
                    <span className="font-Poppins font-normal text-white mb-6">Visita el sitio de la universidad</span>
                      <a
                        href={infoModal?.redirect?.link}
                        rel="noreferrer noopener"
                        target="_blank"
                        className={
                          cn("flex items-center text-white mt-6")
                        }
                      >
                        <span className="font-Nunito-Sans font-normal underline underline-offset-4 mr-auto">{infoModal?.redirect?.link}</span>
                        <span className="material-icons ml-3 mt-1">chevron_right</span>
                      </a>
                  </div>
                : null
              }
            </div>
          </div>
          <div className="col-span-6 w-t:col-span-8 w-p:col-span-4 bg-white overflow-y-auto">
            <RichtText data={{
              content: infoModal?.description?.content
            }} />
          </div>
        </ContentInsideLayout>
      </section>
    </Modal>
    <HeaderFooterLayout breadcrumbs={true}>
      <ContentFullLayout classNames="gap-6 w-d:hidden">
        <div className="col-span-12 w-t:col-span-8 w-p:col-span-4">
          <Slider data={{ ...sections.head.slider }} mobile = {true}/>
        </div>
      </ContentFullLayout>
      <ContentLayout>
        <div className="w-t:hidden w-p:hidden col-span-12 w-t:col-span-8 w-p:col-span-4">
          <Slider data={{ ...sections.head.slider, height: "600px" }} mobile = {false}/>
        </div>
      </ContentLayout>
      <ContentLayout classNames="mt-6 w-d:mt-18">
        <div className="col-span-8 w-t:col-span-8 w-p:col-span-4">
          <p className="font-Poppins font-bold text-10 w-t:text.8.5 w-p:text-6 mb-6 leading-[125%] w-t:leading-[111%]">{sections.head.title}</p>
          <p className="font-Poppins font-bold text-5.5 w-t:text-4.5 w-p:text-base mb-6 leading-[130%] w-t:leading-[125%]">{sections.head.subtitle}</p>
          <RichtText classNames="" data={{
            content: sections.head.description
          }} />
        </div>
      </ContentLayout>
      <ContentLayout classNames="hidden w-d:grid mt-12 w-d:mt-18">
        <div className="w-p:hidden col-span-12 w-t:col-span-8 w-p:col-span-4">
          <Rainbow sections={sections.rainbow.sections} title={sections.rainbow.title} />
        </div>
      </ContentLayout>
      <ContentFullLayout classNames="w-d:hidden mt-12 w-d:mt-18">
        <div className="col-span-12 w-t:col-span-8 w-p:col-span-4">
          <Rainbow classNamesTitle="ml-6" sections={sections.rainbow.sections} title={sections.rainbow.title} />
        </div>
      </ContentFullLayout>
      <ContentLayout classNames="mt-12 w-d:mt-18">
        <section className="col-span-12">
          <p className="font-Poppins font-bold text-10 w-t:text-6 w-p:text-6 leading-[125%] mb-6 w-d:mb-">{sections.videoSection.title}</p>
          <div className="grid w-d:grid-cols-2 w-p:grid-cols-1 gap-6">
            {
            sections.videoSection.videos.map((item:any, i:number) => <section key={`section-alliances-${i}`}>
              <Video dimensions={["330px","400px","200px"]} data={ item } />
            </section>)
            }
          </div>
        </section>
      </ContentLayout>
      <ContentLayout classNames="mt-6 w-d:mt-18">
        <div className="col-span-12">
          <p className="font-Poppins font-bold text-10 w-t:text-6 w-p:text-6 leading-[125%] mb-6">{sections.alliances.title}</p>
          <section className="grid w-d:grid-cols-4 gap-6 w-t:grid-cols-2 w-p:grid-cols-1 mb-12 w-t:mb-12 w-p:mb-6">
          {
            sections.alliances.alliances.map((item:any, i:number) => <section key={`section-alliances-${i}`}>
              <PromoLink data={item} onClick={() => {
                handleOpenModal(item.content)
              }}/>
            </section>)
            }
          </section>
          {/*<div className="col-span-12 w-t:col-span-8 w-p:col-span-4 mb-6">
            <p className="font-Poppins font-bold text-10 w-t:text-6 w-p:text-6 leading-[125%]">{sections.articles.title}</p>
          </div>
          <section className="col-span-12 w-t:col-span-8 w-p:col-span-4 grid w-d:grid-cols-2 gap-6 w-t:grid-cols-2 w-p:grid-cols-1">
            {
            sections.articles.articles.map((item:any, i:number) => <section key={`section-alliances-${i}`}>
              <CardWebsite data={item} onClick={()=> router.push(`/voz-uane/blog/${item.redirect}`)}/>
            </section>)
            }
          </section> */}
        </div>
      </ContentLayout>
    </HeaderFooterLayout>
  </>
}

// `getStaticPaths` requires using `getStaticProps`
export async function getStaticProps(context: any) {
  const { sections, meta } = await getDataPageFromJSON('internacionalizacion.json');

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

export default Internacionalizacion;
