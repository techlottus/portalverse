import { useEffect, useState } from "react";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import cn from "classnames";
import Routes from "@/routes/Routes";
import Accordion from "@/old-components/Accordion/Accordion";
import HeaderFooterLayout from "@/layouts/HeaderFooter.layout";
import ContentLayout from "@/layouts/Content.layout";
import NextPageWithLayout from "@/types/Layout.types";
import { getDataPageFromJSON } from "@/utils/getDataPage";
import ContentFullLayout from "@/layouts/ContentFull.layout";
import BannerPortalverse from "@/old-components/BannerPortalverse";

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
      <meta property="title" content={meta?.title} />
    </Head>
    <HeaderFooterLayout>
      <ContentLayout>
        <h1 className="col-span-12 tablet:col-span-8 mobile:col-span-4 font-headings desktop:text-13 tablet:text-8.5 mobile:text-6 tablet:leading-9.435 font-bold leading-16.25">{sections.head.title}</h1>
        <div className="col-span-3 tablet:col-span-8 mobile:col-span-4 flex-grow-0">
          <h2 className="col-span-12 tablet:col-span-8 mobile:col-span-4 font-semibold font-headings leading-7.5 text-6 tablet:text-4.5 mobile:leading-5.625 mt-1 mb-10 tablet:mb-6 mobile:mb-6">{sections.head.subtitle}</h2>
          <div className="col-span-3 tablet:col-span-8 mobile:col-span-4">
            {
              info.map((section: any, i:number) => <Link key={`section-item${i}`} href={`${section.route}`}>

                <li className={cn("font-headings font-bold flex py-2 tablet:py-4 mobile:py-4 tablet:px-6 mobile:px-6 tablet:border-solid border-surface-200 tablet:border mobile:border-solid mobile:border items-center", { "text-primary-500": section.status, "text-surface-950": !section.status })}>
                  <span className="material-symbols-outlined icon pr-3 select-none">{section.icon}</span>
                  <p>{ section.title }</p>
                </li>

              </Link>
              )
            }
          </div>
          
        </div>
        <div className="col-span-9 tablet:col-span-8 mobile:col-span-4 flex-grow overflow-y-auto">
          <h2 className="font-headings font-bold text-6.5 text-primary-500 tablet:text-6 mobile:text-base mobile:my-6">{ sectionTitle }</h2>
          {
            info.map(({ questions }: any, i: number) => {
              if (!!questions.length) {
                return <Accordion key={`question-item-${i}`} data={{items: questions}} />
              }
              return null
            }) 
          }
        </div>
        <div className="col-span-12 tablet:hidden mobile:hidden mobile:col-span-4 mt-18 mobile:mt-12">
         {/* <Banner data={sections.banner} onBtn={()=> handleRedirect(sections.banner.redirect)}/> */}
         <BannerPortalverse data={sections?.banner} onClick={()=> handleRedirect(sections.banner.redirect)} />
        </div>
      </ContentLayout>
      <ContentFullLayout classNames="mt-12">
        <div className="desktop:hidden">
         {/* <Banner data={sections.banner} onBtn={()=> handleRedirect(sections.banner.redirect)}/> */}
         <BannerPortalverse data={sections?.banner} onClick={()=> handleRedirect(sections.banner.redirect)} />
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
  try {
    const { sections, meta } = await getDataPageFromJSON('faq.json');
    const { params: { section } } = context;
    const { questions }: any = sections.temas.filter((tema: any) => tema.id === section)[0]
    const info = sections.temas.reduce((prev: any[], curr: any, i: number) => [ ...prev, { ...curr, questions: section === Routes["faq"][i].params.section ? [ ...questions ] : [], route: Routes["faq"][i].params.section, status: section === Routes["faq"][i].params.section } ], []);
    return {
      props: { sections, meta, info }
    }    
  } catch {
    return {
      notFound: true,
    };
  }
}

export default FAQ