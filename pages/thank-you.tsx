import { useEffect, useState } from "react"
import Head from "next/head"
import Link from "next/link"
import { useRouter } from "next/router"
import ContentInsideLayout from "@/layouts/ContentInside.layout"
import HeaderFooterLayout from "@/layouts/HeaderFooter.layout"
import ContentFullLayout from "@/layouts/ContentFull.layout"
import NextPageWithLayout from "@/types/Layout.types"
import { getDataPageFromJSON } from "@/utils/getDataPage"
import Icon from "@/old-components/Icon"
import Video from "@/old-components/Video"
import getLayout from "@/utils/getLayout"

const ThankYouPage: NextPageWithLayout = ({ sections, meta, layoutData }: any) => {

  const router = useRouter()

  const [messages] = useState<any>({
    egresados:{
      title: sections?.titleEgresados,
      subtitle: sections?.subtitleEgresados,
    }, 
    gral:{
      title: sections?.titleGral,
      subtitle: sections?.subtitleGral,
    }
  })

  const [flow, setFlow] = useState<string>('gral')

  useEffect(() => {
    if(!!Object.keys(router.query).length && router.query.hasOwnProperty('type')){
      const {type} = (router.query as any)
      setFlow(type)
      return
    }
    setFlow('gral')
  }, [router, flow])
  return <>
    {/* <script dangerouslySetInnerHTML={{ __html : `fbq('track', 'CompleteRegistration');`}}></script> */}
    <Head>
      <title>{ meta.title }</title>
      <meta property="title" content={meta?.title} />
    </Head>
    <HeaderFooterLayout breadcrumbs={false} layoutData= {layoutData}>
      <ContentFullLayout>
        <ContentInsideLayout>
          <div className="col-span-5 w-t:col-span-8 w-p:col-span-4 bg-surface-800 text-surface-0 w-t:pb-6">
            <ContentInsideLayout>
              <h1 className="col-span-12 col-start-3 col-end-11 w-t:col-span-8 w-t:col-start-2 w-t:col-end-8 w-p:col-start-1 w-p:col-end-5 text-10 w-p:text-7.5 w-p:m-6 font-bold font-headings mt-18 leading-tight">{ messages[flow].title }</h1>
              <p className="col-span-12 col-start-3 col-end-11 w-t:col-start-2 w-t:col-end-8 w-p:col-start-1 text-base font-semibold font-texts w-d:mt-6 w-t:mt-6 w-p:mt-2 w-p:mx-6 leading-6 w-t:leading-tight w-p:leading-3[130%]">{ messages[flow].subtitle }</p>
              <p className="col-span-12 col-start-3 col-end-11 w-t:col-start-2 w-t:col-end-8 w-p:col-start-1  text-4.5 font-semibold font-headings w-d:mt-12 w-t:mt-6 w-p:mt-6 w-p:ml-6 leading-tight">{ sections.agradecimiento.title }</p>
              <section className="grid w-d:grid-cols-4 w-t:grid-cols-4 w-p:grid-cols-4 col-start-3 col-end-11 w-t:col-start-2 w-t:col-end-6 w-p:col-start-1 w-p:col-end-4 w-d:mt-10 w-t:mt-10 w-p:my-5 w-p:ml-6">
                {
                  sections.agradecimiento.social.map((item: any, i: number) => <Link key={`social-${i}`} href={item.link} passHref target={"_blank"}>

                    <Icon name={item.name} className="w-14 h-14 text-surface-0" />

                  </Link>)
                }
              </section>
            </ContentInsideLayout>
          </div>
          <div className="col-span-7 w-t:col-span-12 w-p:col-span-12 h-125">
            <Video data={ sections.video } />
          </div>
        </ContentInsideLayout>
      </ContentFullLayout>
    </HeaderFooterLayout>
  </>;
}

// `getStaticPaths` requires using `getStaticProps`
export async function getStaticProps(context: any) {
  try {
    const { sections, meta } = await getDataPageFromJSON('thank-you.json');
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

export default ThankYouPage