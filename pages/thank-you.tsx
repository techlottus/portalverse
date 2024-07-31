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

const ThankYouPage: NextPageWithLayout = ({ sections, meta }: any) => {

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
    <HeaderFooterLayout breadcrumbs={false}>
      <ContentFullLayout>
        <ContentInsideLayout>
          <div className="col-span-5 tablet:col-span-8 mobile:col-span-4 bg-surface-800 text-surface-0 tablet:pb-6">
            <ContentInsideLayout>
              <h1 className="col-span-12 col-start-3 col-end-11 tablet:col-span-8 tablet:col-start-2 tablet:col-end-8 mobile:col-start-1 mobile:col-end-5 text-10 mobile:text-7.5 mobile:m-6 font-bold font-headings mt-18 leading-tight">{ messages[flow].title }</h1>
              <p className="col-span-12 col-start-3 col-end-11 tablet:col-start-2 tablet:col-end-8 mobile:col-start-1 text-base font-semibold font-texts desktop:mt-6 tablet:mt-6 mobile:mt-2 mobile:mx-6 leading-6 tablet:leading-tight mobile:leading-3[130%]">{ messages[flow].subtitle }</p>
              <p className="col-span-12 col-start-3 col-end-11 tablet:col-start-2 tablet:col-end-8 mobile:col-start-1  text-4.5 font-semibold font-headings desktop:mt-12 tablet:mt-6 mobile:mt-6 mobile:ml-6 leading-tight">{ sections.agradecimiento.title }</p>
              <section className="grid desktop:grid-cols-4 tablet:grid-cols-4 mobile:grid-cols-4 col-start-3 col-end-11 tablet:col-start-2 tablet:col-end-6 mobile:col-start-1 mobile:col-end-4 desktop:mt-10 tablet:mt-10 mobile:my-5 mobile:ml-6">
                {
                  sections.agradecimiento.social.map((item: any, i: number) => <Link key={`social-${i}`} href={item.link} passHref target={"_blank"}>

                    <Icon name={item.name} className="w-14 h-14 text-surface-0" />

                  </Link>)
                }
              </section>
            </ContentInsideLayout>
          </div>
          <div className="col-span-7 tablet:col-span-12 mobile:col-span-12 h-125">
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

    // redirect not avaliable page
    if (!!meta.hidden) {
      return {
        notFound: true,
      }
    }

    return {
      props: { sections, meta }
    }
  } catch {
    return {
      notFound: true,
    };
  }
}

export default ThankYouPage