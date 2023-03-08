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
            <p className="text-white font-Poppins font-bold text-6 break-normal">{infoModal?.title?.title}</p>
            {
              !!infoModal?.redirect?.link  
              ? <div className="flex items-center text-white mt-16">
                <Link passHref legacyBehavior href={infoModal?.redirect?.link} ><a className="font-Poppins font-normal hover:underline hover:underline-offset-8" target="_blank">{infoModal?.redirect?.label}</a></Link> 
                <span className="material-icons">chevron_right</span>
              </div>
              : null
            }
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
      <ContentLayout classNames="w-d:mt-18 w-t:mt-6 w-p:mt-12">
        <div className="col-span-8 w-t:col-span-8 w-p:col-span-4">
          <p className="font-Poppins font-bold text-10 w-t:text.8.5 w-p:text-6 mb-6 leading-[125%] w-t:leading-[111%]">{sections.head.title}</p>
          <p className="font-Poppins font-bold text-5.5 w-t:text-4.5 w-p:text-base mb-6 leading-[130%] w-t:leading-[125%]">{sections.head.subtitle}</p>
          <RichtText classNames="" data={{
            content: sections.head.description
          }} />
        </div>
        <div className="w-p:hidden col-span-12 w-t:col-span-8 w-p:col-span-4 mb-12 w-t:mb-12 w-p:mb-6">
          <Rainbow sections={sections.rainbow.sections} title={sections.rainbow.title} />
        </div>
      </ContentLayout>
      <ContentFullLayout classNames="gap-6 w-d:hidden mb-6">
        <div className="col-span-12 w-t:col-span-8 w-p:col-span-4">
          <Rainbow classNamesTitle="ml-6" sections={sections.rainbow.sections} title={sections.rainbow.title} />
        </div>
      </ContentFullLayout>
      <ContentLayout>
        <div className="col-span-12 w-t:col-span-8 w-p:col-span-4 mb-6 w-t:mb-12 w-p:mb-6">
          <p className="font-Poppins font-bold text-10 w-t:text-6 w-p:text-6 leading-[125%]">{sections.alliances.title}</p>
        </div>
        <section className="col-span-12 w-t:col-span-8 w-p:col-span-4 grid w-d:grid-cols-4 gap-6 w-t:grid-cols-2 w-p:grid-cols-1 mb-12 w-t:mb-12 w-p:mb-6">
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

export default Internacionalizacion