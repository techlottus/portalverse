import { Fragment, useEffect, useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import ContentInsideLayout from "@/layouts/ContentInside.layout";
import HeaderFooterLayout from "@/layouts/HeaderFooter.layout";
import NextPageWithLayout from "@/types/Layout.types";
import ContentLayout from "@/layouts/Content.layout";
import Image from "@/old-components/Image";
import Feedback from "@/old-components/Feedback";
import NumbersComponent from "@/old-components/NumberPortalverse/NumbersPortalverse";
import OpenForm from "@/forms/container/OpenForm";
import { getDataPageFromJSON } from "@/utils/getDataPage";
import RichtText from "@/old-components/Richtext/Richtext";
import CardWebsitePortalverse from "@/old-components/CardWebsitePortalverse";
import PromoLink from "@/old-components/PromoLink";
import Modal from "@/old-components/Modal/Modal";
import cn from "classnames";
import TabsFeatured from "@/old-components/TabsFeatured";
import DescriptionSection from "@/old-components/DescriptionSection";
import Button from "@/old-components/Button/Button";

const ModeloEducativo: NextPageWithLayout = ({ sections, meta }: any) => {
  const router = useRouter()
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
    if(sections?.becas?.tabs?.items){
      const { contents, ids } = sections.becas.tabs.items.reduce((prev: any, curr: any) => {
        const { content, id } = curr;
        return { ...prev, contents: [...prev.contents, content], ids: [...prev.ids, id] };
      }, { contents: [], ids: [] });
      setContentTabs([...contents]);
      setAllTabsId([...ids]);
    }
  }, [sections.becas.tabs]);// eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (!!Object.keys(router.query).length && router.query.hasOwnProperty('type') && !!allTabsId.length) {
      const { type } = router.query
      setTabByQueryParam(type, allTabsId)
    }
  }, [router.query, allTabsId]);// eslint-disable-line react-hooks/exhaustive-deps


  const [isShow, setIsShow] = useState(false);
  const [infoModal, setInfoModal] = useState<any>({});
  const handleVisibilityModal = () => setIsShow(!isShow);

  const handleOpenModal = (content: any) => {
    setInfoModal({ ...content })
    handleVisibilityModal();
  };

  return <>
    <Head>
      <title>{meta.title}</title>
    </Head>
    <Modal isShow={isShow} onClose={handleVisibilityModal} data={{ icon: 'close', title: "", tagOnClose: 'testOnClose', wrapper: true, }}>
      <section slot="areaModalContent" className="flex w-t:flex-col w-p:flex-col w-full h-auto">
        <ContentInsideLayout classNames="gap-6">
          <div className="col-span-6 w-t:col-span-8 w-p:col-span-4 bg-surface-800 p-6">
            <p className="text-surface-0 font-headings font-bold text-8 leading-10 break-normal mb-16">{infoModal?.title?.title}</p>
            <span className="font-headings font-normal text-surface-0 mb-6">{infoModal?.redirectLabel}</span>
            {
              (infoModal?.redirects as Array<{ label: string; link: string; external?: boolean; }>)?.map((redirect, index) => {
                const children = (
                  <>
                    <span className="font-texts font-normal underline underline-offset-4 mr-auto">{redirect?.label}</span>
                    <span className="material-symbols-outlined ml-3 mt-1">
                      {
                        redirect?.external ?
                          "chevron_right"
                          :
                          "download"
                      }
                    </span>
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
          <div className="col-span-6 w-t:col-span-8 w-p:col-span-4 bg-surface-0 overflow-y-auto">
            <RichtText data={{
              content: infoModal?.description?.content
            }} />
          </div>
        </ContentInsideLayout>
      </section>
    </Modal>
    <HeaderFooterLayout>
      <ContentLayout>
        <div className="col-span-6 w-t:col-span-8 w-p:col-span-4 w-d:mb-12">
          <h1 className="text-13 font-bold font-headings leading-13 w-t:semi-tight w-p:leading-tight w-t:text-8.5 w-p:text-7.5 w-d:mb-6 w-t:mb-4 w-p:mb-3">{sections.head.title}</h1>
          <p className="text-5.5  font-bold font-headings leading-tight w-t:leading-tight w-p:leading-tight w-t:text-4.5 w-p:text-4.5 w-d:mb-6 w-t:mb-4 w-p:mb-3">{sections.head.subtitle}</p>
          <RichtText data={{
            content: sections.head.description
          }} />
        </div>
        <div className="col-span-6 w-t:col-span-8 w-p:col-span-4 w-d:mb-12">
          <Image
            alt={sections.head.image.desk.alt}
            src={sections.head.image.desk.src}
            classNames="aspect-2/1 w-t:aspect-2/1 w-p:aspect-2/1"
          />
        </div>
        <div className="col-span-12 w-t:col-span-8 w-p:col-span-4 w-t:col-start-2 w-t:col-end-8 mb-6 w-t:mb-6 w-p:mb-6">
          <NumbersComponent data={sections.estadisticas} />
        </div>
        {
          sections?.becas?.tabs?.items ?
            <div className="col-span-12 w-t:col-span-8 w-p:col-span-4 mb-12">
              <div id="becas" className="flex justify-center w-d:mb-2">
                <TabsFeatured active={tabActive} tabs={sections.becas.tabs.items} onActive={(active: number) => setTabActive(active)} />
              </div>
              <div className="col-span-12 w-t:col-span-8 w-p:col-span-4">
                <ContentInsideLayout classNames="gap-6">
                  {
                    contentTabs.map(({ image: { src, alt }, content: { title, description, action = null } }: any, i: number) => <Fragment key={`description-beca-${i}`}>
                      <DescriptionSection
                        title={title}
                        description={description}
                        classNames={cn("col-span-7 grid grid-cols-7 gap-6 w-t:col-span-8 w-t:grid-cols-8 w-p:col-span-4 py-[40px] w-t:py-[94px] w-p:flex w-p:flex-col w-p:p-6", { "hidden w-p:hidden": tabActive !== i })}
                        titleStyles="col-start-2 col-end-7 w-t:col-end-8"
                        descriptionStyles="col-start-2 col-end-7 w-t:col-end-8"
                        action={
                          !!action
                            ? <div slot="actionDescription" className="mt-4">
                              <Button data={action} darkOutlined onClick={() => window.open(`${action.route}`)} />
                            </div>
                            : null
                        }
                      />
                      <Image
                        alt={alt}
                        src={src}
                        classNames={cn("aspect-4/3 col-span-5 w-t:col-start-2 w-t:col-end-8 w-p:col-span-4", { "hidden": tabActive !== i })}
                      />
                      {/* <DescriptionSection
                          mode="transparent"
                          title="hola proceso"
                          description="jejeje"
                          classNames={cn("col-span-12 grid grid-cols-12 gap-6 w-t:col-span-8 w-t:grid-cols-8 w-p:col-span-4 py-[40px] w-t:py-[94px] w-p:flex w-p:flex-col w-p:p-6 hidden", { "hidden w-p:hidden": tabActive !== i })}
                          titleStyles="col-start-2 col-end-12 w-t:col-end-8"
                          descriptionStyles="col-start-2 col-end-12 w-t:col-end-8" /> */}
                    </Fragment>)
                  }
                </ContentInsideLayout>
              </div>
            </div>
            : null
        }
      </ContentLayout>
      {
        sections?.becas?.scholarships  ?
        <ContentLayout>
        <div className="col-span-12 w-t:col-span-8 w-p:col-span-4 mb-6 w-t:mb-12 w-p:mb-6">
          <p className="font-headings font-bold text-10 w-t:text-6 w-p:text-6 leading-tight">{sections?.becas?.title}</p>
        </div>
        <section className="col-span-12 w-t:col-span-8 w-p:col-span-4 grid w-d:grid-cols-3 gap-6 w-t:grid-cols-2 w-p:grid-cols-1 mb-12 w-t:mb-12 w-p:mb-6">
          {
            sections?.becas?.scholarships?.map((item: any, i: number) => <section key={`section-scholarships-${i}`}>
              <PromoLink
                data={item}
                onClick={() => { handleOpenModal(item?.content) }}
                shadowColor={item?.shadowColor}
              />
            </section>)
          }
        </section>
      </ContentLayout>
      : null
      }
      <ContentLayout>
        <div className="col-span-12 w-t:col-span-8 w-p:col-span-4 mb-12 w-t:mb-6 w-p:mb-6">
          <Feedback data={sections.feedback.feedback} >
            <h1 className="font-texts font-normal text-base leading-6 text-surface-800 mb-3">{sections.feedback.title}</h1>
            <p className="font-texts font-normal text-sm text-surface-800">{sections.feedback.text}</p>
          </Feedback>
        </div>
        <div className="col-span-7 w-t:col-span-8 w-p:col-span-4">
          <OpenForm pathThankyou={`/thank-you`} image={{ src: "https://assets.staging.bedu.org/UTEG/admisiones_pedir_informacion_avatar_6738c707b5.jpg", alt: "image-person" }} />
        </div>
        <div className="col-span-5 w-t:col-span-8 w-p:col-span-4">
          <p className="font-headings font-bold leading-tight text-5.5 mb-8">{sections.llamanos.title}</p>
          <div>
          <CardWebsitePortalverse data={sections.llamanos.card} />
          </div>
        </div>
      </ContentLayout>
    </HeaderFooterLayout>
  </>
};

// `getStaticPaths` requires using `getStaticProps`
export async function getStaticProps(context: any) {

  try {
    const { sections, meta } = await getDataPageFromJSON("becas.json");

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
};

export default ModeloEducativo;