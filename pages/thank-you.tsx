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
      title: "Gracias por actualizar tus datos",
      subtitle: 'Ahora estás en contacto con toda la información de tu universidad.',
    }, 
    gral:{
      title: "Gracias por tu interés",
      subtitle: 'Nuestro equipo se pondrá en contacto pronto, Te invitamos a seguirnos en redes sociales para mantenerte enterado del mundo UANE.',
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
  }, [router])

  return <>
    <script dangerouslySetInnerHTML={{ __html : `fbq('track', 'CompleteRegistration');`}}></script>
    <Head>
      <title>{ meta.title }</title>
    </Head>
    <HeaderFooterLayout breadcrumbs={false}>
      <ContentFullLayout>
        <ContentInsideLayout>
          <div className="col-span-5 w-t:col-span-8 w-p:col-span-4 bg-darkBlue text-white w-t:pb-6">
            <ContentInsideLayout>
              <h1 className="col-span-12 col-start-3 col-end-11 w-t:col-span-8 w-t:col-start-2 w-t:col-end-8 w-p:col-start-1 w-p:col-end-5 text-10 w-p:text-[30px] w-p:m-6 font-bold font-Poppins mt-[72px] leading-[125%]">{ messages[flow].title }</h1>
              <p className="col-span-12 col-start-3 col-end-11 w-t:col-start-2 w-t:col-end-8 w-p:col-start-1 text-base font-Poppins w-d:mt-6 w-t:mt-6 w-p:mt-2 w-p:mx-6 leading-[24px] w-t:leading-[125%] w-p:leading-3[130%]">{ messages[flow].subtitle }</p>
              <p className="col-span-12 col-start-3 col-end-11 w-t:col-start-2 w-t:col-end-8 w-p:col-start-1  text-4.5 font-bold font-Poppins w-d:mt-12 w-t:mt-6 w-p:mt-6 w-p:ml-6 leading-[125%]">{ sections.agradecimiento.title }</p>
              <section className="grid w-d:grid-cols-4 w-t:grid-cols-4 w-p:grid-cols-4 col-start-3 col-end-11 w-t:col-start-2 w-t:col-end-6 w-p:col-start-1 w-p:col-end-4 w-d:mt-[38px] w-t:mt-[38px] w-p:my-[20px] w-p:ml-6">
                {
                  sections.agradecimiento.social.map((item: any, i: number) => <Link key={`social-${i}`} href={item.link} passHref target={"_blank"}>

                    <Icon name={item.name} className="w-14 h-14 text-white" />

                  </Link>)
                }
              </section>
            </ContentInsideLayout>
          </div>
          <div className="col-span-7 w-t:col-span-12 w-p:col-span-12">
            <Video dimensions={["500px", "430px", "200px"]} data={ sections.video} />
          </div>
        </ContentInsideLayout>
      </ContentFullLayout>
    </HeaderFooterLayout>
  </>;
}

// `getStaticPaths` requires using `getStaticProps`
export async function getStaticProps(context: any) {
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
}

export default ThankYouPage