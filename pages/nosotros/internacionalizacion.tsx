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
import { getDataPageFromJSON } from "@/utils/getDataPage"
import Rainbow from "@/old-components/Rainbow"
import Modal from "@/old-components/Modal/Modal"
import ContentInsideLayout from "@/layouts/ContentInside.layout"
import cn from "classnames"
import Video from "@/old-components/Video"
import BlogPosts from "@/components/sections/BlogPosts"
import { formatBlogPostsSection } from "@/utils/strapi/sections/BlogPosts"
import type { BlogPostsSection } from "@/utils/strapi/sections/BlogPosts"
import Image from "@/old-components/Image";

const Internacionalizacion = ({ sections, meta, blogPostsSection }: {sections: any, meta: any, blogPostsSection: BlogPostsSection}) => {

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
          <div className="col-span-6 w-t:col-span-8 w-p:col-span-4 bg-surface-400 p-6">
            <p className="text-surface-0 font-headings font-bold text-6 break-normal mb-16">{infoModal?.title?.title}</p>
            <div className="flex flex-col space-y-12">
              {
                infoModal?.downloadables?.length > 0
                  ? <div>
                      <span className="font-headings font-normal text-surface-0 mb-6">Descargas</span>
                      {
                        (infoModal?.downloadables as Array<{ label: string; link: string; }>)?.map((redirect, index) => {
                          const children = (
                            <>
                              <span className="font-texts font-normal underline underline-offset-4 mr-auto">{redirect?.label}</span>
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
                                  cn("flex items-center text-surface-0 mt-6")
                                }
                              >
                                {children}
                              </a>
                            )
                          } else {
                            return (
                              <div
                                key={index}
                                className="flex items-center mt-6 text-surface-500 cursor-not-allowed"
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
                    <span className="font-headings font-normal text-surface-0 mb-6">Visita el sitio de la universidad</span>
                      <a
                        href={infoModal?.redirect?.link}
                        rel="noreferrer noopener"
                        target="_blank"
                        className={
                          cn("flex items-center text-surface-0 mt-6")
                        }
                      >
                        <span className="font-texts font-normal underline underline-offset-4 mr-auto">{infoModal?.redirect?.link}</span>
                        <span className="material-icons ml-3 mt-1">chevron_right</span>
                      </a>
                  </div>
                : null
              }
            </div>
          </div>
          <div className="col-span-6 w-t:col-span-8 w-p:col-span-4 bg-surface-0 overflow-y-auto">
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
          <Slider data={{ ...sections?.head.slider }} mobile = {true}/>
        </div>
      </ContentFullLayout>
      <ContentLayout>
        <div className="w-t:hidden w-p:hidden col-span-12 w-t:col-span-8 w-p:col-span-4">
          <Slider data={{ ...sections?.head.slider, height: "600px" }} mobile = {false}/>
        </div>
      </ContentLayout>
      <ContentLayout classNames="mt-6 w-d:mt-18">
        <div className="col-span-8 w-t:col-span-8 w-p:col-span-4">
          <p className="font-headings font-bold text-10 w-t:text.8.5 w-p:text-6 mb-6 leading-tight w-t:semi-tight">{sections?.head.title}</p>
          <p className="font-headings font-bold text-5.5 w-t:text-4.5 w-p:text-base mb-6 leading-tight w-t:leading-tight">{sections?.head.subtitle}</p>
          <RichtText classNames="" data={{
            content: sections?.head.description
          }} />
        </div>
      </ContentLayout>
      <ContentLayout classNames="hidden w-d:grid mt-12 w-d:mt-18">
        <div className="w-p:hidden col-span-12 w-t:col-span-8 w-p:col-span-4">
          <Rainbow sections={sections?.rainbow.sections} title={sections?.rainbow.title} />
        </div>
      </ContentLayout>
      <ContentFullLayout classNames="w-d:hidden mt-12 w-d:mt-18">
        <div className="col-span-12 w-t:col-span-8 w-p:col-span-4">
          <Rainbow classNamesTitle="ml-6" sections={sections?.rainbow.sections} title={sections?.rainbow.title} />
        </div>
      </ContentFullLayout>
      {
        sections?.exchange ?
          <ContentFullLayout classNames="bg-[#247269] w-d:py-12 text-white mt-18 w-t:mt-3 w-p:mt-3">
            <ContentLayout classNames="w-d:my-6 flex items-center">
              <div className="col-span-6 w-t:col-span-8 w-p:col-span-4 w-t:mt-6 w-p:mt-6 w-d:my-auto">
                <p className="font-Poppins font-bold text-10 w-t:text-6 w-p:text-6 leading-[125%]">{sections?.exchange?.title}</p>
                <RichtText font="dark" classNames="w-t:hidden w-p:hidden" data={{
                  content: sections?.exchange?.description
                }} />
                <div className="w-t:hidden w-p:hidden">
                  {
                    sections?.exchange?.downloadables?.length > 0
                      ? <div className="mb-6">
                        <span className="font-Poppins font-normal text-white">Descargas</span>
                        {
                          (sections?.exchange?.downloadables as Array<{ label: string; link: string; }>)?.map((redirect, index) => {
                            const children = (
                              <>
                                <span className="font-Nunito-Sans font-normal underline underline-offset-4 mr-auto">{redirect?.label}</span>
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
                                    cn("flex items-center text-white")
                                  }
                                >
                                  {children}
                                </a>
                              )
                            } else {
                              return (
                                <div
                                  key={index}
                                  className="flex items-center  text-white cursor-not-allowed"
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
                </div>
              </div>
              <div className="col-span-6 w-t:col-span-8 w-p:col-span-4 w-d:hidden">
                <Image
                  alt={sections?.exchange?.image?.desk?.alt}
                  src={sections?.exchange?.image?.desk?.src}
                  classNames="aspect-2/1 w-t:aspect-2/1 w-p:aspect-2/1"
                />
              </div>
              <div className="col-span-6 w-t:col-span-8 w-p:col-span-4 w-t:hidden w-p:hidden w-d:my-20">
                <Image
                  alt={sections?.exchange?.image?.desk?.alt}
                  src={sections?.exchange?.image?.desk?.src}
                  classNames="aspect-2/1 w-t:aspect-2/1 w-p:aspect-2/1"
                />
              </div>
              <div className="col-span-6 w-t:col-span-8 w-p:col-span-4 w-d:hidden">
                <RichtText font="dark" data={{
                  content: sections?.exchange?.description
                }} />
                <div className="w-d:hidden">
                  {
                    sections?.exchange?.downloadables?.length > 0
                      ? <div className="mb-6">
                        <span className="font-Poppins font-normal text-white">Descargas</span>
                        {
                          (sections?.exchange?.downloadables as Array<{ label: string; link: string; }>)?.map((redirect, index) => {
                            const children = (
                              <>
                                <span className="font-Nunito-Sans font-normal underline underline-offset-4 mr-auto">{redirect?.label}</span>
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
                                    cn("flex items-center text-white")
                                  }
                                >
                                  {children}
                                </a>
                              )
                            } else {
                              return (
                                <div
                                  key={index}
                                  className="flex items-center  text-white cursor-not-allowed"
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
                </div>
              </div>
            </ContentLayout>
          </ContentFullLayout>
          : null
      }
      {
        sections?.videoSection && <ContentLayout classNames="mt-12 w-d:mt-18">
          <section className="col-span-12">
            <p className="font-headings font-bold text-10 w-t:text-6 w-p:text-6 leading-tight mb-6 w-d:mb-">{sections?.videoSection.title}</p>
            <div className="grid w-d:grid-cols-2 w-p:grid-cols-1 gap-6">
              {
              sections?.videoSection.videos.map((item:any, i:number) => <section key={`section-alliances-${i}`}>
                <Video dimensions={["330px","400px","200px"]} data={ item } />
              </section>)
              }
            </div>
          </section>
        </ContentLayout>
      }
      <ContentLayout classNames="mt-6 w-d:mt-18">
        <div className="col-span-12">
          <p className="font-headings font-bold text-10 w-t:text-6 w-p:text-6 leading-tight">{sections?.alliances.title}</p>
          <section className="grid w-d:grid-cols-4 gap-6 w-t:grid-cols-2 w-p:grid-cols-1">
          {
            sections?.alliances.alliances.map((item:any, i:number) => <section key={`section-alliances-${i}`}>
              <PromoLink data={item} onClick={() => {
                handleOpenModal(item.content)
              }}/>
            </section>)
            }
          </section>
        </div>
      </ContentLayout>
      <div className="w-p:mt-12 w-t:mt-12 w-d:mt-18">
        <BlogPosts {...blogPostsSection} />
      </div>
    </HeaderFooterLayout>
  </>
}

// `getStaticPaths` requires using `getStaticProps`
export async function getStaticProps(context: any) {
  try {
    const { sections, meta } = await getDataPageFromJSON('internacionalizacion.json');

    /**
     * This is a representation of the section data that will come from Strapi once
     * this page can be fully dynamically generated. This will show the 3 latest blog
     * entries under the "Internacionalziación" category.
     */
    const blogPostsSection: BlogPostsSection = {
      type: "ComponentSectionsBlogPosts",
      title: "Artículos sobre UTEG 360",
      subtitle: "",
      description: "",
      maxEntries: 3,
      sort: "latest",
      category: {
        data: {
          attributes: {
            title: "Internacionalización",
          }
        }
      }
    }

    const formattedBlogPostsSection = await formatBlogPostsSection(blogPostsSection);

    // redirect not avaliable page
    if (!!meta.hidden) {
      return {
        notFound: true,
      }
    }

    return {
      props: { sections, meta, blogPostsSection: formattedBlogPostsSection }
    }
  } catch {
    return {
      notFound: true,
    };
  }
}

export default Internacionalizacion;