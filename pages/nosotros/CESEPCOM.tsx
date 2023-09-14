import { useRouter } from "next/router";
import Head from "next/head";
import ContentLayout from "@/layouts/Content.layout";
import NextPageWithLayout from "@/types/Layout.types";
import HeaderFooterLayout from "@/layouts/HeaderFooter.layout";
import Accordion from "@/old-components/Accordion/Accordion";
import { getDataPageFromJSON } from "utils/getDataPage";
import BannerPortalverse from "@/old-components/BannerPortalverse";

const CESEPCOM: NextPageWithLayout = ({ sections, meta }: any) => {

  const router = useRouter();
  const navigate = (route: string) => router.push(route)

  return <>
    <Head>
      <title>{meta.title}</title>
    </Head>
    <HeaderFooterLayout breadcrumbs={true}>
      <ContentLayout>
        <div className="col-span-6 w-t:col-span-8 w-p:col-span-4">
          <p className="font-headings font-bold text-13 w-t:text-8.5 w-p:text-7.5">{sections.head.title}</p>
        </div>
      </ContentLayout>
      <ContentLayout classNames="">
        <div className="col-span-12 w-t:col-span-8 w-p:col-span-4">
          <p className="font-headings text-10 font-bold leading-tight w-t:text-6 w-p:text-6">{sections.Acordion.title}</p>
        </div>
        <div className="col-span-12 w-t:col-span-8 w-p:col-span-4 flex-grow overflow-y-auto mb-12 w-t:mb-6 w-p:mb-6">
          {
            !!sections.Acordion.items.length
              ? <Accordion data={{ items: sections.Acordion.items }} />
              : null
          }
        </div>
        <div className="col-span-12 w-t:col-span-8 w-p:col-span-4">
            <BannerPortalverse data={ sections.bannerInternacional } onClick={() => router.push(sections.bannerInternacional.redirect)}/>
        </div>
      </ContentLayout>
    </HeaderFooterLayout>
  </>
}

// `getStaticPaths` requires using `getStaticProps`
export async function getStaticProps(context: any) {

  try {
    const { sections, meta } = await getDataPageFromJSON("CESEPCOM.json");

    // redirect not avaliable page
    if (!!meta.hidden) {
      return {
        notFound: true,
      };
    }

    return {
      props: { sections, meta },
    };
  } catch {
    return {
      notFound: true,
    };
  }

}

export default CESEPCOM