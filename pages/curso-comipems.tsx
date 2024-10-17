import Head from "next/head"
import { useRouter } from "next/router"
import { getDataPageFromJSON } from "@/utils/getDataPage"
import parseEditorRawData from "@/utils/parseEditorRawData"
import HeaderFooterLayout from "@/layouts/HeaderFooter.layout"
import ContentLayout from "@/layouts/Content.layout"
import Container from "@/layouts/Container.layout";
import ContentFullLayout from "@/layouts/ContentFull.layout"
import cn from "classnames";
import Video from "@/old-components/Video"
import IntroductionProgram from "@/old-components/IntroducctionProgram"
import Button from "@/old-components/Button/Button"
import RichtText from "@/old-components/Richtext/Richtext"
import RichTextVideo from "@/components/sections/RichTextVideo"
import RichTextImage from "@/components/sections/RichTextImage"
import Image from "@/old-components/Image"
import type NextPageWithLayout from "@/types/Layout.types"
import getLayout from "@/utils/getLayout"

const CursoComipems: NextPageWithLayout = ({ sections, meta, layoutData }: any) => {

  const router = useRouter()

  return <>
    {/* <script dangerouslySetInnerHTML={{ __html : `fbq('track', 'CompleteRegistration');`}}></script> */}
    <Head>
      <title>{meta.title}</title>
    </Head>
    <HeaderFooterLayout breadcrumbs={true} layoutData = {layoutData}>
      <ContentLayout>
        <div className="col-span-12 w-t:col-span-8 w-p:col-span-4">
          <IntroductionProgram {...sections?.IntroductionProgram} />
        </div>
      </ContentLayout>
      <ContentFullLayout>
        <section
          //@ts-ignore
          style={{ "--image-desk-url": `url(${sections?.bgImageSection?.desktopBgImage})`, "--image-tablet-url": `url(${sections?.bgImageSection?.tabletBgImage})`, "--image-mobile-url": `url(${sections?.bgImageSection?.mobileBgImage})` }}
          className={cn("mb-12 desktop:mb-18 col-span-12 w-full justify-center bg-origin-border md:bg-center bg-no-repeat bg-cover py-16", "bg-[image:var(--image-mobile-url)]", "md:bg-[image:var(--image-tablet-url)]", "lg:bg-[image:var(--image-desk-url)]")}
        >
          <Container>
            <div className="flex flex-col w-d:gap-12 gap-6 items-center justify-center">
              <div className="text-center">
                <h3 className="font-headings font-semibold text-7 w-p:text-8"><span className="font-headings font-semibold text-7 w-p:text-8 text-secondary-500 mr-2">{sections?.bgImageSection?.colorTitle}</span>{sections?.bgImageSection?.title}</h3>
                <RichtText data={{
                  content: sections?.bgImageSection?.subtitle
                }} />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 grid-flow-row gap-6">
                {
                  sections?.bgImageSection?.cards?.map((perk: any, i: number) => (
                    <div key={i} className="flex justify-center items-center gap-2 px-2.5 py-3 min-h-20	w-p:min-h-16 bg-white shadow-lg rounded-lg md:max-w-78">
                      <span className="material-symbols-outlined select-none !text-7" style={{ color: perk?.colorIcon }}>{perk?.icon}</span>
                      <div className="-mb-5 grow mr-2">
                        <RichtText data={{ content: parseEditorRawData(perk?.content) }} />
                      </div>
                    </div>
                  ))
                }
              </div>
              <div className="w-p:w-full bg-black rounded-lg justify-center flex">
                <Button dark onClick={() => window.open(sections?.bgImageSection?.button?.redirect)} data={sections?.bgImageSection?.button} />
              </div>
            </div>
          </Container>
        </section>
        <div className="col-span-12 w-t:col-span-8 w-p:col-span-4 mb-12 desktop:mb-18">
          <RichTextImage {...sections?.RichTextImageAulaSection} />
        </div>
      </ContentFullLayout>
      <ContentLayout>
        <div className="col-span-12 w-t:col-span-8 w-p:col-span-4 mb-12 desktop:mb-18">
          <p className="font-headings font-bold text-10 w-t:text-6 w-p:text-6 leading-tight mb-6 ">{sections?.videosCourseSection.title}</p>
          <div className="grid w-d:grid-cols-2 w-p:grid-cols-1 gap-6">
            {
              sections?.videosCourseSection.videos.map((item: any, i: number) => <div key={`section-videoCourses-${i}`}>
                {
                  item?.options?.id ?
                    <div className="h-80">
                      <Video data={item} />
                    </div>
                    : item?.src ?
                      <div className="h-80">
                        <Image
                          alt={item?.alt}
                          src={item?.src}
                          classNames="w-full h-full"
                          classNamesImg="w-full h-full object-cover"
                        />
                      </div>
                      : null
                }
                <p className="text-base mt-4 font-headings font-semibold">{item?.title}</p>
                <RichtText data={{
                  content: item?.subtitle
                }} />
              </div>)
            }
          </div>
        </div>
      </ContentLayout>
      <ContentFullLayout>
        <div className="col-span-12 w-t:col-span-8 w-p:col-span-4 mb-12 desktop:mb-18">
          <RichTextVideo {...sections?.richTextVideoOpinionsSection} />
        </div>
        <div className="col-span-12 w-t:col-span-8 w-p:col-span-4 mb-12 desktop:mb-18">
          <RichTextImage {...sections?.RichTextImageHowDoYouHelpSection} />
        </div>
        <div className="col-span-12 w-t:col-span-8 w-p:col-span-4">
          <RichTextVideo {...sections?.richTextVideoEncourageYourselfSection} />
        </div>
      </ContentFullLayout>
    </HeaderFooterLayout>
  </>;
}

// `getStaticPaths` requires using `getStaticProps`
export async function getStaticProps(context: any) {
  try {
    const { sections, meta } = await getDataPageFromJSON('curso-comipems.json');
    const layoutData = await getLayout()

    // redirect not avaliable page
    if (!!meta.hidden) {
      return {
        notFound: true,
      }
    }

    return {
      props: { sections, meta, layoutData }
    }
  } catch {
    return {
      notFound: true,
    };
  }
}

export default CursoComipems