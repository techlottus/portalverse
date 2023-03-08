import { useEffect, useState } from "react"
import Head from "next/head"
import Link from "next/link"
import { useRouter } from "next/router"
import cn from "classnames"
import Routes from "@/routes/Routes"
import Accordion from "@/old-components/Accordion/Accordion"
import HeaderFooterLayout from "@/layouts/HeaderFooter.layout"
import ContentLayout from "@/layouts/Content.layout"
import NextPageWithLayout from "@/types/Layout.types"
import { getDataPageFromJSON } from "@/utils/getDataPage"
import Banner from "@/old-components/Banner"
import ContentFullLayout from "@/layouts/ContentFull.layout"

const FAQ: NextPageWithLayout<any> = ({ info, meta, sections }: any) => {
  const router = useRouter()

  const [ sectionTitle, setSectionTitle ] = useState('Questions') 

  const handleRedirect = (redirect:string) => router.push(redirect)

  useEffect(() => {
    const infoSection = info.filter((section: any) => !!section.questions.length);
    if(!!infoSection.length) {
      setSectionTitle(infoSection[0].title);
      return
    }
    setSectionTitle(meta.title);
  }, [info]);// eslint-disable-line react-hooks/exhaustive-deps

  return <>
    <Head>
      <title>{ meta.title }</title>
    </Head>
    <HeaderFooterLayout>
      <ContentLayout>
        <h1 className="col-span-12 w-t:col-span-8 w-p:col-span-4 font-Poppins w-d:text-13 w-t:text-8.5 w-p:text-6 w-t:leading-9.435 font-bold leading-16.25">{sections.head.title}</h1>
        <div className="col-span-3 w-t:col-span-8 w-p:col-span-4 flex-grow-0">
          <h2 className="col-span-12 w-t:col-span-8 w-p:col-span-4 font-semibold font-Poppins leading-7.5 text-6 w-t:text-4.5 w-p:leading-5.625 mt-1 mb-10 w-t:mb-6 w-p:mb-6">{sections.head.subtitle}</h2>
          <div className="col-span-3 w-t:col-span-8 w-p:col-span-4">
            {
              info.map((section: any, i:number) => <Link key={`section-item${i}`} href={`${section.route}`}>

                <li className={cn("font-Poppins font-bold flex py-2 w-t:py-4 w-p:py-4 w-t:px-6 w-p:px-6 w-t:border-solid w-t:border-[1px] w-p:border-solid w-p:border-[1px] items-center", { "text-Brands/UANE/Primary/UANE-P-00": section.status, "text-black": !section.status })}>
                  <span className="material-icons icon pr-3">{section.icon}</span>
                  <p>{ section.title }</p>
                </li>

              </Link>
              )
            }
          </div>
          
        </div>
        <div className="col-span-9 w-t:col-span-8 w-p:col-span-4 flex-grow overflow-y-auto">
          <h1 className="font-Poppins font-bold text-[32px] text-Brands/UANE/Primary/UANE-P-00 w-t:text-6 w-p:text-base">{ sectionTitle }</h1>
          {
            info.map(({ questions }: any, i: number) => {
              if (!!questions.length) {
                return <Accordion key={`question-item-${i}`} data={{items: questions}} />
              }
              return null
            }) 
          }
        </div>
        <div className="col-span-12 w-t:hidden w-p:hidden w-p:col-span-4 mt-[72px] w-p:mt-12">
         <Banner data={sections.banner} onBtn={()=> handleRedirect(sections.banner.redirect)}/>
        </div>
      </ContentLayout>
      <ContentFullLayout classNames="mt-12">
        <div className="w-d:hidden">
         <Banner data={sections.banner} onBtn={()=> handleRedirect(sections.banner.redirect)}/>
        </div>
      </ContentFullLayout>
    </HeaderFooterLayout>
  </>;
};

export function getStaticPaths() {  
  return {
    paths: Routes["faq"],
    fallback: false,
  }
}

export async function getStaticProps(context: any) {
  const { sections, meta } = await getDataPageFromJSON('faq.json');
  const { params: { section } } = context;
  const { questions }: any = sections.temas.filter((tema: any) => tema.id === section)[0]
  const info = sections.temas.reduce((prev: any[], curr: any, i: number) => [ ...prev, { ...curr, questions: section === Routes["faq"][i].params.section ? [ ...questions ] : [], route: Routes["faq"][i].params.section, status: section === Routes["faq"][i].params.section } ], []);
  return {
    props: { sections, meta, info }
  }
}

export default FAQ