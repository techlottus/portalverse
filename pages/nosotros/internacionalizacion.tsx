import { useState } from "react"
import Head from "next/head"
import { useRouter } from "next/router"
import HeaderFooterLayout from "@/layouts/HeaderFooter.layout"
import ContentFullLayout from "@/layouts/ContentFull.layout"
import ContentLayout from "@/layouts/Content.layout"
import Slider from "@/old-components/SliderPortalverse"
import RichtText from "@/old-components/Richtext/Richtext"
import PromoLink from "@/old-components/PromoLink/PromoLink"
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
      <meta property="title" content={meta?.title} />
        <meta name="description" content={meta?.metaDescription} key="desc" />{/* metaDescription */}
        <meta property="image" content={meta?.metaImage?.data?.attributes?.url} />{/* metaImage */}
        {/* metaSocial */}
        {/* ARRAY COULD BRING FACEBOOK OR TWITTER */}
        {
          meta?.metaSocial?.map((metasocial:any) => {
            if (metasocial?.socialNetwork === "Facebook") {
              return (
                <>
                  <meta property="og:title" content={metasocial?.title} />
                  <meta property="og:description" content={metasocial?.description} />
                  <meta property="og:image" content={metasocial?.image?.data?.attributes?.url} />
                </>
              )
            } if (metasocial?.socialNetwork === "Twitter") {
              return (
                <>
                  <meta property="twitter:title" content={metasocial?.title} />
                  <meta property="twitter:description" content={metasocial?.description} />
                  <meta property="twitter:image" content={metasocial?.image?.data?.attributes?.url} />
                </>
              )
            }
          })
        }
        {/* keywords */}
        <meta name="keywords" content={meta?.keywords} />
        {/* metaRobots */}
        <meta name="robots" content={meta?.metaRobots} />
        {/* metaViewport */}
        <meta name="viewport" content={meta?.metaViewport} />
        {/* canonicalURL */}
        <link rel="canonical" href={meta?.canonicalURL} />
        {/* ogURL */}
        <meta property="og:url" content={meta?.canonicalURL} />
        {/* structuredData */}
        <script type="application/ld+json">{JSON.stringify(meta?.structuredData)}</script> 
    </Head>
    <Modal isShow={isShow} onClose={handleVisibilityModal} data={{icon: 'close', title: "", tagOnClose: 'testOnClose', wrapper: true,}}>
      <section slot="areaModalContent" className="flex tablet:flex-col mobile:flex-col w-full h-auto">
      <ContentInsideLayout classNames="gap-6">
          <div className="col-span-6 tablet:col-span-8 mobile:col-span-4 bg-surface-800 p-6">
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
                              <span className="material-symbols-outlined ml-3 mt-1 select-none">download</span>
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
                        <span className="material-symbols-outlined ml-3 mt-1 select-none">chevron_right</span>
                      </a>
                  </div>
                : null
              }
            </div>
          </div>
          <div className="col-span-6 tablet:col-span-8 mobile:col-span-4 bg-surface-0 overflow-y-auto">
            <RichtText data={{
              content: infoModal?.description?.content
            }} />
          </div>
        </ContentInsideLayout>
      </section>
    </Modal>
    <HeaderFooterLayout breadcrumbs={true}>
      <ContentFullLayout classNames="gap-6 desktop:hidden">
        <div className="col-span-12 tablet:col-span-8 mobile:col-span-4">
          <Slider data={{ ...sections?.head.slider }} mobile = {true}/>
        </div>
      </ContentFullLayout>
      <ContentLayout>
        <div className="tablet:hidden mobile:hidden col-span-12 tablet:col-span-8 mobile:col-span-4">
          <Slider data={{ ...sections?.head.slider, height: "600px" }} mobile = {false}/>
        </div>
      </ContentLayout>
      <ContentLayout classNames="mt-6 desktop:mt-18">
        <div className="col-span-8 tablet:col-span-8 mobile:col-span-4">
          <h1 className="font-headings font-bold text-10 tablet:text.8.5 mobile:text-6 mb-6 leading-tight tablet:semi-tight">{sections?.head.title}</h1>
          <h3 className="font-headings font-bold text-5.5 tablet:text-4.5 mobile:text-base mb-6 leading-tight tablet:leading-tight">{sections?.head.subtitle}</h3>
          <RichtText classNames="" data={{
            content: sections?.head.description
          }} />
        </div>
      </ContentLayout>
      <ContentLayout classNames="hidden desktop:grid mt-12 desktop:mt-18">
        <div className="font-headings mobile:hidden col-span-12 tablet:col-span-8 mobile:col-span-4">
          <Rainbow classNamesTitle="font-bold" sections={sections.rainbow.sections} title={sections.rainbow.title} contentVariant={sections?.rainbow?.contentVariant}/>
        </div>
      </ContentLayout>
      <ContentFullLayout classNames="desktop:hidden mt-12 desktop:mt-18">
        <div className="font-headings col-span-12 tablet:col-span-8 mobile:col-span-4">
          <Rainbow classNamesTitle="ml-6" sections={sections.rainbow.sections} title={sections.rainbow.title} contentVariant={sections?.rainbow?.contentVariant} />
        </div>
      </ContentFullLayout>
      {
        sections?.exchange ?
          <ContentFullLayout classNames="bg-primary-500 desktop:py-12 text-white mt-18 tablet:mt-3 mobile:mt-3">
            <ContentLayout classNames="flex items-center">
              <div className="col-span-6 tablet:col-span-8 mobile:col-span-4 tablet:mt-6 mobile:mt-6 desktop:my-auto">
                <h2 className="font-headings font-bold text-10 tablet:text-6 mobile:text-6 leading-[125%]">{sections?.exchange?.title}</h2>
                <RichtText font="dark" classNames="tablet:hidden mobile:hidden" data={{
                  content: sections?.exchange?.description
                }} />
                <div className="tablet:hidden mobile:hidden">
                  {
                    sections?.exchange?.downloadables?.length > 0
                      ? <div className="mb-6">
                        <span className="font-texts font-bold text-white">Descargas</span>
                        {
                          (sections?.exchange?.downloadables as Array<{ label: string; link: string; }>)?.map((redirect, index) => {
                            const children = (
                              <>
                                <span className="font-texts font-bold underline underline-offset-4 mr-auto">{redirect?.label}</span>
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
              <div className="col-span-6 tablet:col-span-8 mobile:col-span-4 desktop:hidden">
                <Image
                  alt={sections?.exchange?.image?.desk?.alt}
                  src={sections?.exchange?.image?.desk?.src}
                  classNames="aspect-2/1 tablet:aspect-2/1 mobile:aspect-2/1"
                />
              </div>
              <div className="col-span-6 tablet:col-span-8 mobile:col-span-4 tablet:hidden mobile:hidden desktop:my-20">
                <Image
                  alt={sections?.exchange?.image?.desk?.alt}
                  src={sections?.exchange?.image?.desk?.src}
                  classNames="aspect-2/1 tablet:aspect-2/1 mobile:aspect-2/1"
                />
              </div>
              <div className="col-span-6 tablet:col-span-8 mobile:col-span-4 desktop:hidden">
                <RichtText font="dark" data={{
                  content: sections?.exchange?.description
                }} />
                <div className="desktop:hidden">
                  {
                    sections?.exchange?.downloadables?.length > 0
                      ? <div className="mb-6">
                        <span className="font-headings font-normal text-white">Descargas</span>
                        {
                          (sections?.exchange?.downloadables as Array<{ label: string; link: string; }>)?.map((redirect, index) => {
                            const children = (
                              <>
                                <span className="font-texts font-normal underline underline-offset-4 mr-auto">{redirect?.label}</span>
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
        sections?.videoSection && <ContentLayout classNames="mt-12 desktop:mt-18">
          <section className="col-span-12">
            <h2 className="font-headings font-bold text-10 tablet:text-6 mobile:text-6 leading-tight mb-6 desktop:mb-">{sections?.videoSection.title}</h2>
            <div className="grid desktop:grid-cols-2 mobile:grid-cols-1 gap-6">
              {
              sections?.videoSection.videos.map((item:any, i:number) => <section className="h-80" key={`section-alliances-${i}`}>
                <Video data={ item } />
              </section>)
              }
            </div>
          </section>
        </ContentLayout>
      }
      <ContentLayout classNames="mt-6 desktop:mt-18">
        <div className="col-span-12">
          <h2 className="font-headings font-bold text-10 tablet:text-6 mobile:text-6 leading-tight">{sections?.alliances.title}</h2>
          <section className="grid desktop:grid-cols-4 gap-6 tablet:grid-cols-2 mobile:grid-cols-1 mt-6">
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
      <div className="mobile:mt-12 tablet:mt-12 desktop:mt-18">
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
      title: sections?.blogPostSection?.title || "",
      subtitle: sections?.blogPostSection?.subtitle || "",
      description: sections?.blogPostSection?.description || "",
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