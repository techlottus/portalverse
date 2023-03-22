import { useState } from "react";
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

const ModeloEducativo: NextPageWithLayout = ({ sections, meta }: any) => {
  const router = useRouter()

  const [allTabsId, setAllTabsId] = useState<Array<string>>([]);

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
          <div className="col-span-6 w-t:col-span-8 w-p:col-span-4 bg-[#2B2C34] p-6">
            <p className="text-white font-Poppins font-bold text-8 leading-10 break-normal mb-16">{infoModal?.title?.title}</p>
            <span className="font-Poppins font-normal text-white mb-6">{infoModal?.redirectLabel}</span>
            {
              (infoModal?.redirects as Array<{ label: string; link: string; external?: boolean; }>)?.map((redirect, index) => {
                const children = (
                  <>
                    <span className="font-Nunito-Sans font-normal underline underline-offset-4 mr-auto">{redirect?.label}</span>
                    <span className="material-icons ml-3 mt-1">
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
          <div className="col-span-6 w-t:col-span-8 w-p:col-span-4 bg-white overflow-y-auto">
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
          <h1 className="text-13 font-bold font-Poppins leading-13 w-t:leading-[111%] w-p:leading-[125%] w-t:text-8.5 w-p:text-7.5 w-d:mb-6 w-t:mb-4 w-p:mb-3">{sections.head.title}</h1>
          <p className="text-5.5  font-bold font-Poppins leading-[130%] w-t:leading-[125%] w-p:leading-[125%] w-t:text-4.5 w-p:text-4.5 w-d:mb-6 w-t:mb-4 w-p:mb-3">{sections.head.subtitle}</p>
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
        <div className="col-span-12 w-t:col-span-8 w-p:col-span-4 w-t:col-start-2 w-t:col-end-8 mb-12 w-t:mb-6 w-p:mb-6">
          <NumbersComponent data={sections.estadisticas} />
        </div>
      </ContentLayout>
      <ContentLayout>
        <div className="col-span-12 w-t:col-span-8 w-p:col-span-4 mb-6 w-t:mb-12 w-p:mb-6">
          <p className="font-Poppins font-bold text-10 w-t:text-6 w-p:text-6 leading-[125%]">{sections?.becas?.title}</p>
        </div>
        <section className="col-span-12 w-t:col-span-8 w-p:col-span-4 grid w-d:grid-cols-4 gap-6 w-t:grid-cols-2 w-p:grid-cols-1 mb-12 w-t:mb-12 w-p:mb-6">
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
      <ContentLayout>
        <div className="col-span-12 w-t:col-span-8 w-p:col-span-4 mb-12 w-t:mb-6 w-p:mb-6">
          <Feedback data={sections.feedback.feedback} >
            <h1 className="font-Nunito-Sans font-normal text-base leading-6 text-SC/Blackandgrey/B-80 mb-3">{sections.feedback.title}</h1>
            <p className="font-Nunito-Sans font-normal text-sm text-SC/Blackandgrey/B-80">{sections.feedback.text}</p>
          </Feedback>
        </div>
        <div className="col-span-7 w-t:col-span-8 w-p:col-span-4">
          <OpenForm pathThankyou={`/thank-you`} image={{ src: "https://drive.google.com/uc?export=view&id=1CxZzCcuuptzexZwBWNtktMbIT5Z9dB6B", alt: "image-person" }} />
        </div>
        <div className="col-span-5 w-t:col-span-8 w-p:col-span-4">
          <p className="font-Poppins font-bold leading-[130%] text-5.5 mb-[30px]">{sections.llamanos.title}</p>
          <CardWebsitePortalverse data={sections.llamanos.card} />
        </div>
      </ContentLayout>
    </HeaderFooterLayout>
  </>
};

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
};

export default ModeloEducativo;