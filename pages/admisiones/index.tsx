import { Fragment, useEffect, useState } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import cn from "classnames";
import ContentLayout from "@/layouts/Content.layout";
import NextPageWithLayout from "@/types/Layout.types";
import ContentInsideLayout from "@/layouts/ContentInside.layout";
import HeaderFooterLayout from "@/layouts/HeaderFooter.layout";
import ContentFullLayout from "@/layouts/ContentFull.layout";
import Image from "@/old-components/Image";
import Button from "@/old-components/Button/Button";
import DescriptionSection from "@/old-components/DescriptionSection";
import Accordion from "@/old-components/Accordion/Accordion";
import { getDataPageFromJSON } from "utils/getDataPage";
import TabsFeatured from "@/old-components/TabsFeatured";
import Video from "@/old-components/Video";
import BannerPortalverse from "@/old-components/BannerPortalverse";
import RichtText from "@/old-components/Richtext/Richtext";
import CardWebsitePortalverse from "@/old-components/CardWebsitePortalverse";
import Icon from "@/old-components/Icon";
import Container from "@/layouts/Container.layout";
import parseEditorRawData from "@/utils/parseEditorRawData";

const LandindAdmissions: NextPageWithLayout = ({ sections, meta }: any) => {

  const router = useRouter();
  const [tabActive, setTabActive] = useState<number>(0);
  const [contentTabs, setContentTabs] = useState<any>([]);
  const [contentTabsIcons, setContentTabsIcons] = useState<any>([]);
  useEffect(() => {
    const allContents = sections?.requirements?.tabs?.items.reduce((prev: any, curr: any) => {
      const { content } = curr;
      return [...prev, content];
    }, []);
    if (sections?.AtrProgramPerks?.tabs?.items) {
      const allContentsIcons = sections?.AtrProgramPerks?.tabs?.items.reduce((prev: any, curr: any) => {
        const { content } = curr;
        return [...prev, content];
      }, []);
      setContentTabsIcons([...allContentsIcons]);
    }
    setContentTabs([...allContents]);
  }, [sections?.requirements?.tabs, sections?.AtrProgramPerks?.tabs]);

  const navigate = (route: string) => router.push(route)
  return <>
    <Head>
      <title>{meta?.title}</title>
      <meta property="title" content={meta?.title} />
      <meta name="description" content={meta?.metaDescription} key="desc" />{/* metaDescription */}
      <meta property="image" content={meta?.metaImage?.data?.attributes?.url} />{/* metaImage */}
      {/* metaSocial */}
      {/* ARRAY COULD BRING FACEBOOK OR TWITTER */}
      {
        meta?.metaSocial?.map((metasocial: any) => {
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
    <HeaderFooterLayout breadcrumbs={true}>
      <ContentLayout>
        {
          sections?.head?.textIcons ?
            <>
              <div className="col-span-6 tablet:col-span-8 mobile:col-span-4">
                {
                  sections?.head?.textIcons?.map((item: any, i: number) => <div key={`icon-${i}`} className="flex items-center my-6">
                    <div className="w-14 h-14 shrink-0">
                      <Icon name={item?.name} className="w-full h-full" />
                    </div>
                    <p className="font-headings font-semibold text-4.5 mobile:text-base leading-6 ml-6">{item?.text}</p>
                  </div>
                  )
                }
                {
                  sections?.head?.button ?
                    <div className="col-span-12 tablet:col-span-8 mobile:col-span-4 flex justify-center mt-9">
                      <Button dark data={sections?.head?.button} onClick={() => navigate(sections?.head?.button?.redirect)} />
                    </div>
                    : null
                }
              </div>
              <div className="col-span-6 tablet:col-span-8 mobile:col-span-4 desktop:mt-20">
                <Image
                  alt={sections?.head?.image?.desk?.alt}
                  src={sections?.head?.image?.desk?.src}
                  classNames="aspect-2/1 tablet:aspect-2/1 mobile:aspect-2/1"
                />
              </div>
            </>
            : null
        }
        {
          sections?.head?.bannerMaster ?
            <>
              <div className="col-span-12 tablet:col-span-12 mobile:col-span-4">
                <p className="font-headings font-bold text-13 tablet:text-8.5 mobile:text-7.5">{sections?.head?.title}</p>
                <BannerPortalverse data={sections?.head?.bannerMaster} onClick={() => router.push(sections?.head?.bannerMaster?.redirect)} />
              </div>
            </>
            : null
        }
        {/* 
          sections.requirementsIcons ?
            <>
              <div className="col-span-12 tablet:col-span-8 mobile:col-span-4 desktop:mt-7 mobile:my-6 tablet:my-6">
                <p className="font-headings text-10 font-bold leading-tight tablet:text-6 mobile:text-6">{sections?.requirementsIcons?.title}</p>
              </div>
              <div className="desktop:hidden col-span-12 tablet:col-span-12 mobile:col-span-4 tablet:flex tablet:justify-center">
                <div className="">
                  <TabsFeatured tabs={sections?.requirementsIcons?.tabs?.items} onActive={(active: number) => setTabActive(active)} />
                </div>
              </div>
              <div className="tablet:hidden mobile:hidden col-span-12 tablet:col-span-12 mobile:col-span-4 flex justify-center desktop:mb-2">
                <TabsFeatured tabs={sections?.requirementsIcons?.tabs?.items} onActive={(active: number) => setTabActive(active)} />
              </div>
              <div className="col-span-12 tablet:col-span-12 mobile:col-span-4 mobile:mb-6 tablet:mb-12 desktop:mb-12">
                <ContentInsideLayout classNames="gap-5">
                  {
                    contentTabsIcons?.map(({ image: { src, alt }, content: { iconTextList, action = null }, cards }: any, i: number) => <Fragment key={`description-beca-${i}`}>
                      <section className={cn("col-span-7 w-full tablet:col-span-12 mobile:col-span-12 tablet:flex-col-reverse mobile:flex-col-reverse", { "hidden mobile:hidden": tabActive !== i })}>
                        <div className="my-auto">
                          {
                            iconTextList ?
                              iconTextList?.length > 0 ?
                                iconTextList?.map((item: any, i: number) =>
                                  <div key={`icon-${i}`} className="flex gap-6 mb-1">
                                    <div className="my-auto">
                                      <span className={cn("material-symbols-outlined !text-5xl")} style={{ color: item?.colorIcon }}>{item?.icon}</span>
                                    </div>
                                    <div className="my-auto">
                                      <p className="font-headings font-bold">{item?.title}</p>
                                      <p className="font-texts">{item?.text}</p>
                                    </div>
                                  </div>
                                )
                                : null
                              : null
                          }
                        </div>
                      </section>
                      <section className={cn("col-span-5 aspect-4/3 tablet:aspect-4/3 mobile:aspect-4/3 w-full tablet:col-span-12 mx-auto mobile:col-span-12", { "hidden": tabActive !== i })}>
                        <img
                          alt={alt}
                          src={src}
                          className="tablet:col-span-12 w-full tablet:col-start-2 tablet:col-end-8 h-full"
                        />
                      </section>
                      <div className={cn("col-span-7 tablet:col-span-12 mobile:col-span-12 justify-center flex mb-3", { "hidden mobile:hidden": tabActive !== i })}>
                        <Button dark onClick={() => navigate(action?.route)} data={action} />
                      </div>
                      <section className={cn("col-span-12 grid desktop:grid-cols-3 gap-6 tablet:grid-cols-2 mobile:grid-cols-1", { "hidden mobile:hidden": tabActive !== i })}>
                        {
                          cards?.map((item: any, i: number) =>
                            <section key={`section-blog-${i}`}>
                              <CardWebsitePortalverse data={item} onClick={() => { router.push(item?.redirect) }} />
                            </section>
                          )
                        }
                      </section>
                    </Fragment>)
                  }
                </ContentInsideLayout>
              </div>
            </>
            : null
         */
        }
      </ContentLayout>
      {sections?.AtrProgramPerks?.tabs ?
        <>
          <Container classNames="mt-16">
            <div className="col-span-12 flex flex-col gap-1 items-center justify-center mb-4">
              <h3 className="font-headings font-bold text-surface-900 text-7 leading-9 text-center"><span className="text-secondary-500">Requisitos </span> de admisión </h3>
              <p className="font-texts font-normal text-surface-500 text-lg leading-6 text-center">Toda la documentación requerida deberá ser entregada en original, dos copias y en buen estado. </p>
            </div>
            <div className="desktop:hidden col-span-12 tablet:col-span-12 mobile:col-span-4 tablet:flex tablet:justify-center">
              <div className="">
                <TabsFeatured tabs={sections?.AtrProgramPerks?.tabs?.items} onActive={(active: number) => setTabActive(active)} />
              </div>
            </div>
            <div className="tablet:hidden mobile:hidden col-span-12 tablet:col-span-12 mobile:col-span-4 flex justify-center desktop:mb-2">
              <TabsFeatured tabs={sections?.AtrProgramPerks?.tabs?.items} onActive={(active: number) => setTabActive(active)} />
            </div>
          </Container>
          <div className="col-span-12 tablet:col-span-12 mobile:col-span-4 mobile:mb-6 tablet:mb-12 desktop:mb-12">
            <ContentInsideLayout classNames="gap-5">
              {
                contentTabsIcons?.map(({ content: { requirementsList, desktopBgImage, tabletBgImage, mobileBgImage, action = null }, cards }: any, i: number) =>
                  <Fragment key={`description-beca-${i}`}>
                    <section
                      //@ts-ignore
                      style={{ "--image-desk-url": `url(${desktopBgImage})`, "--image-tablet-url": `url(${tabletBgImage})`, "--image-mobile-url": `url(${mobileBgImage})` }}
                      className={cn("col-span-12 w-full justify-center bg-origin-border md:bg-center bg-no-repeat bg-cover py-16", "bg-[image:var(--image-mobile-url)]", "md:bg-[image:var(--image-tablet-url)]", "lg:bg-[image:var(--image-desk-url)]", { "hidden mobile:hidden": tabActive !== i })}
                    >
                      <Container>
                        <div className="flex flex-col gap-12 items-center justify-center">
                          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 grid-flow-row gap-6">
                            {
                              requirementsList?.map((perk: any, i: number) => (
                                <div key={i} className="flex justify-center items-center gap-2 px-2.5 py-3 min-h-20	mobile:min-h-16 bg-white shadow-lg rounded-lg md:max-w-78">
                                  <span className="material-symbols-outlined select-none !text-7" style={{ color: perk?.colorIcon }}>{perk?.icon}</span>
                                  <div className="-mb-5 grow mr-2">
                                    <RichtText data={{ content: parseEditorRawData(perk?.content) }} />
                                  </div>
                                </div>
                              ))
                            }
                          </div>
                          <div className="mobile:w-full bg-black rounded-lg justify-center flex">
                            <Button dark onClick={() => navigate(action?.route)} data={action} />
                          </div>
                        </div>
                      </Container>
                    </section>
                    <section className={cn("col-span-12 max-w-d-base mx-auto w-d-base:px-6 mt-18", { "hidden mobile:hidden": tabActive !== i })}>
                      {
                        sections?.AtrProgramPerks?.titleCards ?
                          <h2 className="font-headings text-10 font-bold leading-tight tablet:text-6 mobile:text-6 mb-6">{sections?.AtrProgramPerks?.titleCards}</h2>
                          : null
                      }
                      <section className="grid desktop:grid-cols-3 gap-6 tablet:grid-cols-2 mobile:grid-cols-1">
                        {
                          cards?.map((item: any, i: number) =>
                            <section key={`section-blog-${i}`}>
                              <CardWebsitePortalverse data={item} onClick={() => { router.push(item?.redirect) }} />
                            </section>
                          )
                        }
                      </section>
                    </section>
                  </Fragment>
                )
              }
            </ContentInsideLayout>
          </div>
        </>
        : sections.requirements ?
          <ContentLayout>
            <div className="col-span-12 tablet:col-span-8 mobile:col-span-4 desktop:mt-18 mobile:my-6 tablet:my-6">
              <h2 className="font-headings text-10 font-bold leading-tight tablet:text-6 mobile:text-6">{sections?.requirements?.title}</h2>
            </div>
            <div className="desktop:hidden col-span-12 tablet:col-span-8 mobile:col-span-4 tablet:flex tablet:justify-center">
              <div className="">
                <TabsFeatured tabs={sections?.requirements?.tabs?.items} onActive={(active: number) => setTabActive(active)} />
              </div>
            </div>
            <div className="tablet:hidden mobile:hidden col-span-12 tablet:col-span-8 mobile:col-span-4 flex justify-center desktop:mb-2">
              <TabsFeatured tabs={sections?.requirements?.tabs?.items} onActive={(active: number) => setTabActive(active)} />
            </div>
            <div className="col-span-12 tablet:col-span-8 mobile:col-span-4 mobile:mb-6 tablet:mb-12 desktop:mb-12">
              <ContentInsideLayout classNames="gap-6">
                {
                  contentTabs?.map(({ image: { src, alt }, content: { title, description, action = null }, cards, titleCards }: any, i: number) => <Fragment key={`description-beca-${i}`}>
                    <DescriptionSection
                      mode="light"
                      title={title}
                      description={description}
                      classNames={cn("col-span-7 grid grid-cols-7 gap-6 tablet:col-span-8 tablet:grid-cols-8 mobile:col-span-4 mobile:flex mobile:flex-col mobile:p-6", { "hidden mobile:hidden": tabActive !== i })}
                      titleStyles="col-start-1 col-end-7 tablet:col-end-8 hidden"
                      descriptionStyles="col-start-1 col-end-7 tablet:col-end-8"
                      action={
                        <div slot="actionDescription" className="tablet:hidden mobile:hidden mt-6 mb-12">
                          <Button dark onClick={() => navigate(action?.route)} data={action} />
                        </div>
                      }
                    />
                    <Image
                      alt={alt}
                      src={src}
                      classNames={cn("aspect-2/1 tablet:aspect-2/1 mobile:aspect-2/1 col-span-5 tablet:col-start-2 tablet:col-end-8 mobile:col-span-4", { "hidden": tabActive !== i })}
                    />
                    {
                      titleCards ?
                        <div className={cn("col-span-12 tablet:col-span-8 mobile:col-span-4", { "hidden": tabActive !== i })}>
                          <h2 className="font-headings text-10 font-bold leading-tight tablet:text-6 mobile:text-6">{titleCards}</h2>
                        </div>
                        : null
                    }
                    <section className={cn("col-span-12 tablet:col-span-8 mobile:col-span-4 grid desktop:grid-cols-3 gap-6 tablet:grid-cols-2 mobile:grid-cols-1", { "hidden mobile:hidden": tabActive !== i })}>
                      {
                        cards.map((item: any, i: number) => <section key={`section-blog-${i}`}>
                          <CardWebsitePortalverse data={item} onClick={() => { router.push(item?.redirect) }} />
                        </section>)
                      }
                    </section>
                  </Fragment>)
                }
              </ContentInsideLayout>
            </div>
          </ ContentLayout>
          : null
      }
      <ContentLayout>
        <div className="col-span-12 tablet:col-span-8 mobile:col-span-4 tablet:hidden">
          <BannerPortalverse data={sections?.internacionalizacion?.banner} onClick={() => router.push(sections?.internacionalizacion?.banner?.redirect)} />
        </div>
        <div className="col-span-6 tablet:col-span-8 mobile:col-span-4 tablet:hidden">
          <BannerPortalverse data={sections?.empleabilidad?.banner} onClick={() => router.push(sections?.empleabilidad?.banner?.redirect)} />
        </div>
        <div className="col-span-6 tablet:col-span-8 mobile:col-span-4 tablet:hidden">
          <BannerPortalverse data={sections.becas.banner} onClick={() => router.push(sections.becas.banner.redirect)} />
        </div>
      </ContentLayout>
      <ContentFullLayout classNames="desktop:hidden mobile:hidden flex flex-col space-y-6">
        <div className="col-span-12 tablet:col-span-8 mobile:col-span-4">
          <BannerPortalverse data={sections?.internacionalizacion?.banner} onClick={() => router.push(sections?.internacionalizacion?.banner?.redirect)} />
        </div>
        <div className="col-span-12 tablet:col-span-8 mobile:col-span-4">
          <BannerPortalverse data={sections?.empleabilidad?.banner} onClick={() => router.push(sections?.empleabilidad.banner?.redirect)} />
        </div>
        <div className="col-span-12 tablet:col-span-8 mobile:col-span-4">
          <BannerPortalverse data={sections?.becas?.banner} onClick={() => router.push(sections?.becas?.banner?.redirect)} />
        </div>
      </ContentFullLayout>
      <ContentLayout classNames="mt-12 desktop:mt-18">
        <div className="col-span-12 tablet:col-span-8 mobile:col-span-4">
          <h2 className="font-headings text-10 font-bold leading-tight tablet:text-6 mobile:text-6 mb-6">{sections?.egresados?.title}</h2>
          <RichtText data={{
            content: sections?.egresados?.description
          }} />
        </div>
        <div className="col-span-6 tablet:col-span-8 mobile:col-span-4 desktop:hidden h-80">
          <Video data={sections?.egresados?.video} />
        </div>
        {
          sections?.egresados?.testimonyImages ?
            <>
              <div className="col-span-6 tablet:col-span-8 mobile:col-span-4 flex items-center">
                <section className="grid desktop:grid-cols-2 gap-6 tablet:grid-cols-2 mobile:grid-cols-1">
                  {
                    sections?.egresados?.testimonyImages?.map((item: any, i: number) => <section key={`section-blog-${i}`}>
                      <img className="w-full select-none" src={item?.image} />
                    </section>)
                  }
                </section>
              </div>
            </>
            : null
        }
        {
          sections?.egresados?.cards ?
            <>
              <div className="col-span-6 tablet:col-span-8 mobile:col-span-4">
                <section className="grid desktop:grid-cols-2 gap-6 tablet:grid-cols-2 mobile:grid-cols-1">
                  {
                    sections?.egresados?.cards?.map((item: any, i: number) => <section key={`section-blog-${i}`}>
                      <CardWebsitePortalverse data={item} />
                    </section>)
                  }
                </section>
                <div className="col-span-12 tablet:col-span-8 mobile:col-span-4 object-center mt-6 flex justify-center mb-12 tablet:mb-6 mobile:mb-6">
                  <Button dark data={sections?.egresados?.button} onClick={() => router.push(sections?.egresados?.button?.redirect)} />
                </div>
              </div>
            </>
            : null
        }
        <div className="col-span-6 tablet:col-span-8 mobile:col-span-4 mobile:hidden tablet:hidden h-80">
          <Video data={sections?.egresados?.video} />
        </div>
        {
          sections?.egresados?.testimonyImages ?
            <div className="col-span-12 tablet:col-span-8 mobile:col-span-4 object-center flex justify-center mb-18 tablet:mb-6 mobile:mb-6">
              <Button dark data={sections?.egresados?.button} onClick={() => router.push(sections?.egresados?.button?.redirect)} />
            </div>
            : null
        }
        <div className="col-span-12 tablet:col-span-8 mobile:col-span-4">
          <h2 className="font-headings text-10 font-bold leading-tight tablet:text-6 mobile:text-6">{sections?.FAQ?.title}</h2>
        </div>
        {
          sections?.FAQ?.faqImage ?
            <>
              <div className="col-span-6 tablet:col-span-8 mobile:col-span-4 mb-12 tablet:mb-6 mobile:mb-6 tablet:hidden mobile:hidden">
                <img className="w-full tablet:hidden mobile:hidden select-none" src={sections?.FAQ?.faqImage} />
              </div>
              <div className="col-span-6 tablet:col-span-8 mobile:col-span-4 mb-12 tablet:mb-6 mobile:mb-6">
                {
                  !!sections?.FAQ?.questions?.length
                    ? <Accordion data={{ items: sections?.FAQ?.questions }} />
                    : null
                }
              </div>
            </>
            :
            <div className="col-span-12 tablet:col-span-8 mobile:col-span-4 flex-grow overflow-y-auto mb-12 tablet:mb-6 mobile:mb-6">
              {
                !!sections?.FAQ?.questions?.length
                  ? <Accordion data={{ items: sections?.FAQ?.questions }} />
                  : null
              }
            </div>
        }
        <div className="col-span-12 tablet:col-span-8 mobile:col-span-4 flex justify-center">
          <Button dark data={sections?.FAQ?.button}
            onClick={() => {
              router.push(sections?.FAQ?.button?.redirect)
            }}
          />
        </div>
      </ContentLayout>
    </HeaderFooterLayout>
  </>
}

// `getStaticPaths` requires using `getStaticProps`
export async function getStaticProps(context: any) {

  try {
    const { sections, meta } = await getDataPageFromJSON(
      "landing-admisiones.json"
    );

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
    // console.log("inside catch block");
    return {
      //@ts-ignore
      notFound: true,
    };
  }

}

export default LandindAdmissions