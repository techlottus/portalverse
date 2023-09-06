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
import Image from "@/old-components/Image"
import Button from "@/old-components/Button/Button"

const ThankYouPage: NextPageWithLayout = ({ sections, meta }: any) => {
  const router = useRouter();
  return <>
    <Head>
      <title>{meta.title}</title>
    </Head>
    <HeaderFooterLayout breadcrumbs={false}>
      <section className="col-span-12 w-t:col-span-8 w-p:col-span-4 w-full flex font-Poppins justify-center items-center flex-col mx-auto">
        <h1 className="font-bold text-10 w-t:text-7.5 w-p:text-base leading-8.6 w-t:leading-9.375 w-p:leading-5.2 pt-18 pb-10 w-t:pt-12 w-t:pb-10 w-p:pt-12 w-p:pb-10">{sections?.title}</h1>
        <Image src={sections?.image?.desk?.src} alt={sections?.image?.desk?.alt} classNames="w-96 h-72 w-t:w-135.5 w-t:h-100 w-p:w-78 w-p:h-58.5 aspect-4/3" />
        <p className="text-UNI-066 font-semibold text-5.5 w-t:text-6 w-p:text-base py-6 w-p:pt-6 w-p:pb-4 leading-7.15 w-t:leading-8">{sections?.errorMsj}</p>
        <Button dark data={sections?.button} onClick={() => {
          router.push(sections?.button?.redirect)
        }} />
      </section>
    </HeaderFooterLayout>

  </>;
}

// `getStaticPaths` requires using `getStaticProps`
export async function getStaticProps(context: any) {
  const { sections, meta } = await getDataPageFromJSON('404.json');

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