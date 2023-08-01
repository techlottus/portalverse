import { ReactElement } from "react";
import Head from "next/head";
import Link from "next/link";
import Image from "@/old-components/Image";
import HeaderFooterLayout from "@/layouts/HeaderFooter.layout";
import ContentFullLayout from "@/layouts/ContentFull.layout";
import NextPageWithLayout from "@/types/Layout.types";
import ContentLayout from "@/layouts/Content.layout";

const NotFound: NextPageWithLayout = _ => {
  return <>
    <Head>
      <title>Not Found</title>
    </Head>
    <section className="col-span-12 w-t:col-span-8 w-p:col-span-4 w-full flex font-headings justify-center items-center flex-col mx-auto">
      <h1 className="font-bold text-10 w-t:text-7.5 w-p:text-base leading-8.6 w-t:leading-9.375 w-p:leading-5.2 pt-18 pb-10 w-t:pt-12 w-t:pb-10 w-p:pt-12 w-p:pb-10">Lo sentimos</h1>
      <Image src="https://assets.staging.bedu.org/UTEG/404_318781b8aa.jpg" alt="error_image" classNames="w-96 h-72 w-t:w-135.5 w-t:h-100 w-p:w-78 w-p:h-58.5 aspect-4/3" />
      <p className="text-surface-600 font-semibold text-5.5 w-t:text-6 w-p:text-base py-6 w-p:pt-6 w-p:pb-4 leading-7.15 w-t:leading-8">Esta página no está disponible</p>
      <Link
        href={'/'}
        className="font-texts py-4 px-8 w-p:w-full w-p:text-center font-bold w-p:text-5 bg-surface-950 rounded-lg text-surface-0 text-base mb-13.75 w-t:mb-12 w-p:mb-16.5">
        Regresar al inicio
      </Link>
    </section>
  </>;
};

NotFound.getLayout = function getLayout(page: ReactElement) {
  return <HeaderFooterLayout breadcrumbs={false}>
    <ContentFullLayout classNames="bg-SC/Backgrounds/BG-GRAY">
      <ContentLayout>
        { page }
      </ContentLayout>
    </ContentFullLayout>
  </HeaderFooterLayout>
};

export default NotFound;