import { Fragment, useEffect, useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import cn from "classnames";
import ContentInsideLayout from "@/layouts/ContentInside.layout";
import HeaderFooterLayout from "@/layouts/HeaderFooter.layout";
import ContentFullLayout from "@/layouts/ContentFull.layout";
import NextPageWithLayout from "@/types/Layout.types";
import { getDataPageFromJSON } from "@/utils/getDataPage";
import ContentLayout from "@/layouts/Content.layout";
import RichtText from "@/old-components/Richtext/Richtext";
import LinkContactTarget from "@/old-components/LinkContactTarget";
import DescriptionSection from "@/old-components/DescriptionSection";
import Mosaic from "@/old-components/Mosaic";
import TabsFeatured from "@/old-components/TabsFeatured";
import Feedback from "@/old-components/Feedback";
import Icon from "@/old-components/Icon";


const VinculacionEmpresarial: NextPageWithLayout = ({ sections, meta }: any) => {

  const router = useRouter();

  const [tabActive, setTabActive] = useState<number>(0);
  const [contentTabs, setContentTabs] = useState<any>([]);
  const [allTabsId, setAllTabsId] = useState<Array<string>>([]);

  const setTabByQueryParam = (param: any, tabsIds: Array<string>) => {
    if (!!param) {
      const { type } = router.query
      const idTab = tabsIds.findIndex((tab: string) => tab === type)
      setTabActive(idTab === -1 ? 0 : idTab)
    }
  }

  useEffect(() => {
    const { contents, ids } = sections.socialService.tabs.items.reduce((prev: any, curr: any) => {
      const { content, id } = curr;
      return { ...prev, contents: [...prev.contents, content], ids: [...prev.ids, id] };
    }, { contents: [], ids: [] });
    setContentTabs([...contents]);
    setAllTabsId([...ids]);
  }, [sections.socialService.tabs]);

  useEffect(() => {
    if (!!Object.keys(router.query).length && router.query.hasOwnProperty('type') && !!allTabsId.length) {
      const { type } = router.query
      setTabByQueryParam(type, allTabsId)
    }
  }, [router.query, allTabsId])

  return <>
    <Head>
      <title>{meta.title}</title>
    </Head>
    <HeaderFooterLayout breadcrumbs={true}>
      <ContentLayout classNames="gap-12">
        <div className="col-span-6 w-t:col-span-8 w-p:col-span-4">
          <p className="font-headings font-bold text-13 w-t:text-8.5 w-p:text-7.5 w-d:mb-6 w-d:leading-13">{sections.head.title}</p>
          <p className="font-headings font-bold text-5.5 mb-6">{sections.head.subtitle}</p>
          <RichtText font="light" data={{
            content: sections.head.description
          }} classNames="mb-4" />
          <div className="flex sm:gap-2 md:gap-0 md:flex-row md:items-center">
            <p className="font-headings font-bold mr-6">{sections.head.contactText}</p>
            <div className="flex md:items-center">
              <span className="material-icons text-SC/Blackandgrey/B-100 mr-2">mail</span>
              <LinkContactTarget type={"email"} classNames="text-SC/Blackandgrey/B-100 underline" info={sections.head.contactLink} />
            </div>
          </div>
        </div>
        <div className="col-span-6 w-t:col-span-8 w-p:col-span-4">
          <img
            alt={sections.head.image.desk.alt}
            src={sections.head.image.desk.src}
            className="w-full"
          />
        </div>
        <div className="col-span-12 w-t:col-span-8 w-p:col-span-4">
          <p className="font-headings font-bold text-10 w-t:text-6 w-p:text-6 leading-[125%] w-d:mb-6">{sections.alliances.title}</p>
          <div className="w-d:col-span-12 w-t:col-span-8 w-p:col-span-4 grid w-d:grid-cols-4 gap-6 w-t:grid-cols-2 w-p:grid-cols-1 mb-6 ">
            {
              sections?.alliances?.carrousel?.map((item: any, i: number) => <section key={`section-numbers-${i}`}>
                <img
                  alt={item.desk.alt}
                  src={item.desk.src}
                  className="w-full h-full"
                />
              </section>)
            }
          </div>
        </div>
        <div className="w-t:hidden w-p:hidden col-span-12 w-t:col-span-8 w-p:col-span-4 flex justify-center">
          <TabsFeatured active={tabActive} tabs={sections.socialService.tabs.items} onActive={(active: number) => setTabActive(active)} />
        </div>
      </ContentLayout>
      <ContentFullLayout>
        <section className="w-d:hidden">
          <TabsFeatured active={tabActive} tabs={sections.socialService.tabs.items} onActive={(active: number) => setTabActive(active)} />
        </section>
      </ContentFullLayout>
      <ContentFullLayout classNames="bg-white py-6">
        <ContentLayout>
          <div className="col-span-12 w-t:col-span-8 w-p:col-span-4">
            <ContentInsideLayout classNames="gap-6">
              {
                contentTabs.map(({ image: { src, alt }, content: { title, description }, process: { title: titleProcess, description: descripcionProcess, download } }: any, i: number) => <Fragment key={`description-serviceSocial-${i}`}>
                  <DescriptionSection
                    title={title}
                    description={description}
                    classNames={cn(
                      "col-span-7 grid grid-cols-7 gap-6 w-t:col-span-8 w-t:grid-cols-8",
                      "w-p:col-span-4 py-[40px] w-t:py-[94px] w-p:flex w-p:flex-col w-p:p-6",
                      { "hidden w-p:hidden": tabActive !== i }
                    )}
                    titleStyles="col-start-2 col-end-7 w-t:col-end-8 text-[32px] !leading-10"
                    descriptionStyles="col-start-2 col-end-7 w-t:col-end-8"
                  />
                  <img
                    alt={alt}
                    src={src}
                    className={cn("w-full col-span-5 w-t:col-start-2 w-t:col-end-8 w-p:col-span-4", { "hidden": tabActive !== i })}
                  />
                </Fragment>)
              }
            </ContentInsideLayout>
          </div>
        </ContentLayout>
      </ContentFullLayout>
      <ContentLayout>
        <div className="col-span-12 w-t:col-span-8 w-p:col-span-4 flex flex-col my-6">
          <Feedback data={sections.head.feedback}>
            <div slot="areaFeedbackContent">
              <p className="font-normal font-headings text-base mb-6">{sections.head.feedback.title}</p>
              <RichtText data={{
                content: sections.head.feedback.text
              }} classNames="mb-4" />
              <div className="flex align-middle items-center">
                <span className="material-icons text-surface-500 mr-2">mail</span>
                <LinkContactTarget classNames="!font-bold underline" type={"email"} info={sections.head.feedback.contact} />
              </div>
            </div>
          </Feedback>
        </div>
      </ContentLayout>
      <ContentLayout classNames="mt-6">
        <div className="col-span-6 w-t:col-span-8 w-p:col-span-4">
          <p className="font-headings font-bold text-13 w-t:text-8.5 w-p:text-7.5 mb-18 w-p:m-6  w-d:leading-13">{sections.descriptionSection.title}</p>
          {
            sections.descriptionSection.textIcons.map((item: any, i: number) =>
              <div key={`icon-${i}`} className="flex mt-4 gap-6">
                <div className="col-span-2 w-t:col-span-1 w-p:col-span-1">
                  <Icon name={item.name} className="w-14 h-14 text-red-500" />
                </div>
                <div className="col-span-10 w-t:col-span-7 w-p:col-span-3">
                  <RichtText data={{
                    content: item.text
                  }} />
                </div>
              </div>
            )
          }
        </div>
        <div className="col-span-6 w-t:col-span-8 w-p:col-span-4">
          <div className="w-t:hidden w-p:hidden flex justify-end">
            <img
              alt={sections.descriptionSection.image.desk.alt}
              src={sections.descriptionSection.image.desk.src}
            />
          </div>
          <div className="w-d:hidden w-p:hidden">
            <img
              alt={sections.descriptionSection.image.tablet.alt}
              src={sections.descriptionSection.image.tablet.src}
              className="w-full h-full"
            />
          </div>
          <div className="w-d:hidden w-t:hidden">
            <img
              alt={sections.descriptionSection.image.mobile.alt}
              src={sections.descriptionSection.image.mobile.src}
              className="w-full h-full"
            />
          </div>
        </div>
      </ContentLayout>
      <ContentLayout>
        <div className="col-span-12 w-t:col-span-8 w-p:col-span-4 mt-12 w-t:mt-6 w-p:mt-6">
          <p className="font-headings font-bold text-10 w-t:text-6 w-p:text-6 leading-[125%] mb-6">{sections.experiences.title}</p>
          <Mosaic data={sections.experiences.images} />
        </div>
      </ContentLayout>
    </HeaderFooterLayout>
  </>
};

// `getStaticPaths` requires using `getStaticProps`
export async function getStaticProps(context: any) {
  const { sections, meta } = await getDataPageFromJSON('vinculacion-empresarial.json');

  // redirect not avaliable page
  if (!!meta.hidden) {
    return {
      notFound: true,
    }
  }

  return {
    props: { sections, meta }
  }
};

export default VinculacionEmpresarial;