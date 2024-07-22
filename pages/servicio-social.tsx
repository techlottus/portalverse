import Head from "next/head";
import { useState } from "react";
import { getDataPageFromJSON } from "@/utils/getDataPage";
import ContentLayout from "@/layouts/Content.layout";
import HeaderFooterLayout from "@/layouts/HeaderFooter.layout";
import ContentInsideLayout from "@/layouts/ContentInside.layout";
import ContentFullLayout from "@/layouts/ContentFull.layout";
import RichtText from "@/old-components/Richtext/Richtext";
import Aspect from "@/components/Aspect";
import Image from "@/old-components/Image";
import TabsFeatured from "@/old-components/TabsFeatured";
import Feedback from "@/old-components/Feedback";
import CardWebsitePortalverse from "@/old-components/CardWebsitePortalverse";
import type { CardWebsitePortalverseConfig } from "@/types/CardWebsitePortalverse.types";
import Cintillo from "@/old-components/Cintillo";

const ServicioSocial = ({ sections, meta }: any) => {

  const [tabActive, setTabActive] = useState<number>(0);

  const testTabs = sections?.socialServices?.tabs?.items;
  const selectedTab = testTabs[tabActive];

  return (
    <>
      <Head>
        <title>{meta?.title}</title>
      </Head>
      <HeaderFooterLayout>
        <ContentLayout classNames="gap-y-12 desktop:gap-y-18">
          <section className="col-span-6 w-t:col-span-8 w-p:col-span-4">
            <h3 className="text-13 font-bold font-headings leading-13 w-t:semi-tight w-p:leading-tight w-t:text-8.5 w-p:text-7.5 mb-6">{sections?.head?.title}</h3>
            <p className="text-5.5 font-semibold font-headings leading-tight w-t:leading-tight w-p:leading-tight w-t:text-4.5 w-p:text-4.5 w-d:mb-6 w-t:mb-4 w-p:mb-3">{sections?.head?.subtitle}</p>
            <RichtText data={{
              content: sections?.head?.description
            }} />
          </section>
          <section className="col-span-6 w-t:col-span-8 w-p:col-span-4">
            <Image
              alt={sections?.head?.image?.alt}
              src={sections?.head?.image?.src}
              classNames="aspect-2/1 w-t:aspect-2/1 w-p:aspect-2/1"
            />
          </section>
          <section className="col-span-12 w-t:col-span-8 w-p:col-span-4">
            <div className="flex justify-center">
              <p className="font-headings font-semibold text-6 leading-9 mb-6">{sections?.socialServices?.tabs?.title}</p>
            </div>
            {
              sections?.socialServices?.tabs?.items ?
                <div className="col-span-12 w-t:col-span-8 w-p:col-span-4 w-t:hidden w-p:hidden">
                  <div className="flex justify-center w-d:mb-2">
                    <TabsFeatured active={tabActive} tabs={sections.socialServices.tabs.items} onActive={(active: number) => setTabActive(active)} />
                  </div>
                </div>
                : null
            }
          </section>
        </ContentLayout>
        <ContentFullLayout classNames="w-d:hidden">
          {
            sections?.socialServices?.tabs?.items ?
              <div className="col-span-12 w-t:col-span-8 w-p:col-span-4">
                <div className="flex justify-center w-d:mb-2">
                  <TabsFeatured active={tabActive} tabs={sections.socialServices.tabs.items} onActive={(active: number) => setTabActive(active)} />
                </div>
              </div>
              : null
          }
        </ContentFullLayout>
        <ContentLayout classNames="gap-y-12 desktop:gap-y-18">
          <div className="col-span-12 w-t:col-span-8 w-p:col-span-4">
            {
              selectedTab?.steps?.length > 0 ?
                <div className="rounded-lg shadow-15 bg-surface-100">
                  <ContentInsideLayout classNames="gap-6 flex w-p:flex-col mb-12 desktop:mb-18">
                    {
                      selectedTab?.image ?
                        <div className="col-span-6 w-t:col-span-8 w-p:col-span-4 px-6 my-auto pt-6">
                          <Aspect ratio={"2/1"}>
                            <Image
                              alt={""}
                              src={selectedTab?.image?.src}
                              classNamesImg="w-full h-full object-cover rounded-lg"
                              classNames="w-full h-full"
                            />
                          </Aspect>
                        </div>
                        : null
                    }
                    <div className="col-span-6 w-t:col-span-8 w-p:col-span-4 px-6 w-d:pt-12">
                      {
                        selectedTab?.title ?
                          <h3 className="text-10 w-t:text-6 w-p:text-6 font-bold font-headings">{selectedTab?.title}</h3>
                          : null
                      }
                      {
                        selectedTab?.subtitle ?
                          <p className="text-5.5  font-semibold font-headings leading-tight w-t:leading-tight w-p:leading-tight w-t:text-4.5 w-p:text-4.5 w-d:my-6 w-t:my-4 w-p:my-3">{selectedTab?.subtitle}</p>

                          : null
                      }
                      <RichtText data={{
                        content: selectedTab?.description
                      }} />
                    </div>
                    {
                      selectedTab?.feedback ?
                        <div className="col-span-12 w-t:col-span-8 w-p:col-span-4 px-6">
                          <Feedback data={selectedTab?.feedback}>
                            <div slot="areaFeedbackContent">
                              <p className="font-normal font-texts text-base mb-6">{selectedTab?.feedback?.title}</p>
                              <RichtText data={{
                                content: selectedTab?.feedback?.text
                              }} classNames="mb-4" />
                            </div>
                          </Feedback>

                        </div>
                        : null
                    }
                    {
                      selectedTab?.steps?.length > 0 ?
                        <div className="col-span-12 w-t:col-span-8 w-p:col-span-4">
                          {
                            selectedTab?.steps?.map((item: { title: string, subtitle: string, description: string, image: { src: string } }, i: number) => {
                              return <section key={`section-steps-${i}`} className="grid grid-cols-1 mb-2 bg-slate-50">
                                <div className="flex w-p:flex-col w-t:flex-col gap-6">
                                  <div className="w-d:w-1/2 my-auto px-6 w-d:py-8 w-t:py-6 w-p:py-6">
                                    <p className="font-headings font-bold text-6.5 w-p:text-6 leading-10 mb-2">{item?.title}</p>
                                    <RichtText data={{
                                      content: item?.description
                                    }} />
                                  </div>
                                  <div className="w-d:w-1/2 my-auto px-6 w-d:py-8 w-p:py-6">
                                    <Aspect ratio={"2/1"}>
                                      <Image
                                        alt={""}
                                        src={item?.image?.src}
                                        classNamesImg="w-full h-full object-cover rounded-lg"
                                        classNames="w-full h-full"
                                      />
                                    </Aspect>

                                  </div>
                                </div>

                              </section>
                            })
                          }
                        </div>
                        : null
                    }
                  </ContentInsideLayout>
                </div>
                : null
            }
            {
              selectedTab?.alerts?.length > 0 ?
                <div className="col-span-12 w-t:col-span-8 w-p:col-span-4">
                  {
                    selectedTab?.alerts?.map((item: { title: string, text: string }, i:number) => <section key={`section-alerts-${i}`} className="grid grid-cols-1 desktop:mb-18 mb-12">
                      <Feedback data={selectedTab?.feedback}>
                        <div slot="areaFeedbackContent">
                          <p className="font-normal font-texts text-base mb-6">{item?.title}</p>
                          <RichtText data={{
                            content: item?.text
                          }} />
                        </div>
                      </Feedback>
                    </section>)
                  }
                </div>
                : null
            }
            {
              selectedTab?.banner ? 
              <div className="col-span-12 w-t:col-span-8 w-p:col-span-4">
                <Cintillo {...selectedTab?.banner} />
              </div>
              : null
            }
          </div>
        </ContentLayout>
        {
          selectedTab?.textCards ?
            <ContentFullLayout classNames="bg-secondary-50">
              <ContentLayout>
                {
                  selectedTab?.textCards?.cards.length > 0 ?
                    <div className="col-span-12 w-t:col-span-8 w-p:col-span-4">
                      <div className="flex justify-center w-d:pt-12 pt-6 pb-6">
                        <p className="font-headings font-bold text-6 leading-9">{selectedTab?.textCards?.title}</p>
                      </div>
                      {
                        <section className="col-span-12 w-t:col-span-8 w-p:col-span-4 grid w-d:grid-cols-3 gap-6 w-t:grid-cols-2 w-p:grid-cols-1 w-d:pb-12 pb-6">
                          {
                            selectedTab?.textCards?.cards?.map((item: CardWebsitePortalverseConfig, i: number) => <section key={`section-contacts-${i}`}>
                              <CardWebsitePortalverse data={item} />
                            </section>)
                          }
                        </section>
                      }
                    </div>
                    : null
                }
              </ContentLayout>
            </ContentFullLayout>
            : null
        }
      </HeaderFooterLayout>
    </>
  );
};

// `getStaticPaths` requires using `getStaticProps`
export async function getStaticProps(context: any) {

  try {
    const { sections, meta } = await getDataPageFromJSON("servicio-social.json");

    return {
      props: { sections, meta },
    };
  } catch {
    return {
      notFound: true,
    };
  }

};

export default ServicioSocial;
