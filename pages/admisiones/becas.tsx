import { Fragment, useEffect, useState } from "react"
import Head from "next/head"
import { useRouter } from "next/router"
import cn from "classnames"
import ContentInsideLayout from "@/layouts/ContentInside.layout"
import HeaderFooterLayout from "@/layouts/HeaderFooter.layout"
import NextPageWithLayout from "@/types/Layout.types"
import ContentLayout from "@/layouts/Content.layout"
import Image from "@/old-components/Image"
import Feedback from "@/old-components/Feedback"
import CardWebsite from "@/old-components/CardWebsite"
import NumbersComponent from "@/old-components/NumberPortalverse/NumbersPortalverse"
import DescriptionSection from "@/old-components/DescriptionSection"
import OpenForm from "@/forms/container/OpenForm"
import { getDataPageFromJSON } from "@/utils/getDataPage"
import RichtText from "@/old-components/Richtext/Richtext"
import TabsFeatured from "@/old-components/TabsFeatured"
import ContentFullLayout from "@/layouts/ContentFull.layout"
import Button from "@/old-components/Button/Button"
import CardWebsitePortalverse from "@/old-components/CardWebsitePortalverse"

const ModeloEducativo: NextPageWithLayout = ({ sections, meta }: any) => {
  const router = useRouter()

  const [ tabActive, setTabActive ] = useState<number>(0);
  const [ contentTabs, setContentTabs ] = useState<any>([]);
  const [ allTabsId , setAllTabsId ] = useState<Array<string>>([]);

  const setTabByQueryParam = (param: any, tabsIds:Array<string>) => {
    if(!!param){
      const {type} = router.query
      const idTab = tabsIds.findIndex((tab: string) => tab === type)
      setTabActive(idTab === -1 ? 0 : idTab)
    }
  }

  useEffect(() => {
    const {contents, ids} = sections.becas.tabs.items.reduce((prev: any, curr: any) => { 
      const { content, id } = curr;
      return  {...prev, contents: [...prev.contents, content], ids:[ ...prev.ids, id ] };
    }, {contents: [], ids:[]});
    setContentTabs([...contents]);
    setAllTabsId([...ids]);
  }, [sections.becas.tabs]);// eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if(!!Object.keys(router.query).length && router.query.hasOwnProperty('type') && !!allTabsId.length){
      const {type} = router.query
      setTabByQueryParam(type, allTabsId)
    }
  }, [router.query, allTabsId]);// eslint-disable-line react-hooks/exhaustive-deps


  return <>
    <Head>
      <title>{ meta.title }</title>
    </Head>
    <HeaderFooterLayout>
      <ContentLayout>
        <div className="col-span-6 w-t:col-span-8 w-p:col-span-4 w-d:mb-12">
          <h1 className="text-13 font-bold font-Poppins leading-13 w-t:leading-[111%] w-p:leading-[125%] w-t:text-8.5 w-p:text-7.5 w-d:mb-6 w-t:mb-4 w-p:mb-3">{ sections.head.title }</h1>
          <p className="text-5.5  font-bold font-Poppins leading-[130%] w-t:leading-[125%] w-p:leading-[125%] w-t:text-4.5 w-p:text-4.5 w-d:mb-6 w-t:mb-4 w-p:mb-3">{ sections.head.subtitle }</p>
          <RichtText data={{
            content: sections.head.description
          }} />
        </div>
        <div className="col-span-6 w-t:col-span-8 w-p:col-span-4 w-d:mb-12">
          <Image
            alt={ sections.head.image.desk.alt }
            src={ sections.head.image.desk.src }
            classNames="aspect-2/1 w-t:aspect-2/1 w-p:aspect-2/1"
          />
        </div>
        <div className="col-span-12 w-t:col-span-8 w-p:col-span-4 w-t:col-start-2 w-t:col-end-8 mb-12 w-t:mb-6 w-p:mb-6">
          <NumbersComponent data={ sections.estadisticas } />
        </div>
        <div id="becas" className="w-t:hidden w-p:hidden col-span-12 w-t:col-span-8 w-p:col-span-4 flex justify-center w-d:mb-2">
          <TabsFeatured active={tabActive} tabs={sections.becas.tabs.items} onActive={(active: number) => setTabActive(active)} />
        </div>
      </ContentLayout>
      <ContentFullLayout classNames="w-d:hidden">
        <TabsFeatured active={tabActive} tabs={sections.becas.tabs.items} onActive={(active: number) => setTabActive(active)} />
      </ContentFullLayout>
      <ContentLayout>
        <div className="col-span-12 w-t:col-span-8 w-p:col-span-4">
          <ContentInsideLayout classNames="gap-6">
            {
              contentTabs.map(({ image: { src, alt }, content: { title, description, action=null } }: any, i: number) => <Fragment key={`description-beca-${i}`}>
                  <DescriptionSection
                    title={title}
                    description={description}
                    classNames={cn("col-span-7 grid grid-cols-7 gap-6 w-t:col-span-8 w-t:grid-cols-8 w-p:col-span-4 py-[40px] w-t:py-[94px] w-p:flex w-p:flex-col w-p:p-6", { "hidden w-p:hidden": tabActive !== i })}
                    titleStyles="col-start-2 col-end-7 w-t:col-end-8"
                    descriptionStyles="col-start-2 col-end-7 w-t:col-end-8"
                    action={
                      !!action 
                        ? <div slot="actionDescription" className="mt-4">
                          <Button data={action} darkOutlined onClick={() => window.open(`${action.route}`)}/>
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
        {/* <div className="col-span-12 w-t:col-span-8 w-p:col-span-4 w-d:mt-[73px] w-t:mt-6 w-p:mt-6 mb-12 w-t:mb-6 w-p:mb-6">
          <p className="font-bold font-Poppins text-10">{ sections.proceso.title }</p>
          <Image
            alt={sections.proceso.image.alt}
            src={sections.proceso.image.src}
            classNames={cn("aspect-4/3 w-t:aspect-3/4 m-p:aspect-1/2")}
          />
        </div> */}
        <div className="col-span-12 w-t:col-span-8 w-p:col-span-4 mb-12 w-t:mb-6 w-p:mb-6">
          <Feedback data={ sections.feedback.feedback} >
            <h1>{ sections.feedback.title }</h1>
            <p>{ sections.feedback.text }</p>
          </Feedback>
        </div>
        <div className="col-span-7 w-t:col-span-8 w-p:col-span-4">
          <OpenForm pathThankyou={`/thank-you`} image={{ src: "https://drive.google.com/uc?export=view&id=1CxZzCcuuptzexZwBWNtktMbIT5Z9dB6B", alt:"image-person" }} />
        </div>
        <div className="col-span-5 w-t:col-span-8 w-p:col-span-4">
          <p className="font-Poppins font-bold leading-[130%] text-5.5 mb-[30px]">{ sections.llamanos.title }</p>
          <CardWebsitePortalverse data={ sections.llamanos.card }/>
        </div>
      </ContentLayout> 
    </HeaderFooterLayout>
  </>
}

// `getStaticPaths` requires using `getStaticProps`
export async function getStaticProps(context: any) {
  const { sections, meta } = await getDataPageFromJSON('becas.json');

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

export default ModeloEducativo