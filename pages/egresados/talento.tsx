import Head from "next/head"
import { useState } from "react"
import HeaderFooterLayout from "@/layouts/HeaderFooter.layout"
import NextPageWithLayout from "@/types/Layout.types"
import ContentLayout from "@/layouts/Content.layout"
import CardWebsite from "@/old-components/CardWebsite"
import ContentFullLayout from "@/layouts/ContentFull.layout"
import Modal from "@/old-components/Modal/Modal"
import Youtube from "@/old-components/Youtube"
import { YoutubeOptions } from "@/types/Youtube.types"
import { getDataPageFromJSON } from "@/utils/getDataPage"
import RichtText from "@/old-components/Richtext/Richtext"
import Cintillo from "@/old-components/Cintillo"
import CardWebsitePortalverse from "@/old-components/CardWebsitePortalverse"
import Link from "next/link"
import Icon from "@/old-components/Icon"
import ContentInsideLayout from "@/layouts/ContentInside.layout"

const ThankYouPage: NextPageWithLayout = ({ sections, meta }: any) => {

  const [youtubeConfig, setYoutubeConfig] = useState<YoutubeOptions>({
    id: '',
    type: 'single',
    controls: true,
  });

  // Modal functionality begin
  const [isShow, setIsShow] = useState(false);
  const handleVisibilityModal = (action = 'open') => {
    setIsShow(!isShow);
    if (action === 'close') {
      setYoutubeConfig({ ...youtubeConfig, id: '' });
    }
  };
  // Modal functionality end

  const handleClickTalent = (id: string) => {
    setYoutubeConfig({ ...youtubeConfig, id });
    handleVisibilityModal()
  }

  return <>
    <Head>
      <title>{meta.title}</title>
    </Head>
    <HeaderFooterLayout breadcrumbs={true}>
      <ContentLayout>
        {/* <div className="col-span-8 w-p:col-span-4 w-d:mb-12 w-t:mb-6 w-p:mb-6">
          <h1 className="text-13 w-t:text-8.25 w-p:text-6 font-headings font-bold leading-tight w-t:semi-tight ">{sections.head.title}</h1>
          <RichtText data={{
            content: sections.head.description
          }} />
        </div> */}
        <div className="col-span-12">
          <ContentInsideLayout classNames="gap-y-12 desktop:gap-y-18">
            <div className="col-span-8 w-p:col-span-4">
              <h1 className="text-13 w-t:text-8.25 w-p:text-6 font-headings font-bold leading-tight w-t:semi-tight mb-4">{sections.head.title}</h1>
              <RichtText data={{
                content: sections.head.description
              }} />
            </div>
            {
              <section className="col-span-12 w-t:col-span-8 w-p:col-span-4 grid w-d:grid-cols-3 gap-6 w-t:grid-cols-2 w-p:grid-cols-1">
                {
                  sections.experiencias.cards.map((item: any, i: number) => <section key={`section-blog-${i}`}>
                    <CardWebsitePortalverse classNames="h-59" data={item} onClick={item?.video ? () => handleClickTalent(item.video) : undefined} />
                  </section>)
                }
              </section>
            }
            <div className="col-span-12 w-t:col-span-8 w-p:col-span-4">
              <Cintillo
                classNames="auto"
                {...sections?.aplica?.banner}
                actionLink={
                  sections?.aplica?.banner?.icon ?
                    <div slot="areaAction" className="flex align-middle items-center">
                      <Icon name={sections.aplica.banner.icon} className="w-6 h-6 mr-2 text-surface-0" /><Link className="font-texts font-normal text-base" href={sections.aplica.banner.redirecActionLink} passHref target={"_blank"}>{sections.aplica.banner.actionLink}</Link>
                    </div>
                    : null
                }
              />
            </div>
          </ContentInsideLayout>
        </div>
        <Modal isShow={isShow} onClose={() => handleVisibilityModal('close')} data={{ icon: 'close', title: 'Video de egresado', tagOnClose: 'testOnClose', wrapper: true, }}>
          <Youtube data={{ options: { ...youtubeConfig }, dimensions: { height: "383px" } }} />
        </Modal>
        {/* <section className="col-span-12 w-t:col-span-8 w-p:col-span-4 grid w-d:grid-cols-3 gap-6 w-t:grid-cols-2 w-p:grid-cols-1">
          {
            sections.experiencias.cards.map((item: any, i: number) => <section key={`section-blog-${i}`}>
              <CardWebsitePortalverse classNames="h-59" data={item} onClick={item?.video ? () => handleClickTalent(item.video) : undefined} />
            </section>)
          }
        </section> */}
      </ContentLayout>
    </HeaderFooterLayout>
  </>
}

// `getStaticPaths` requires using `getStaticProps`
export async function getStaticProps(context: any) {

  try {
    const { sections, meta } = await getDataPageFromJSON(
      "egresados-talento.json"
    );

    return {
      props: { sections, meta },
    };
  } catch {
    return {
      notFound: true,
    };
  }

}

export default ThankYouPage