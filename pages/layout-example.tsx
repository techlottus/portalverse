import Head from "next/head"
import NextPageWithLayout from "@/types/Layout.types"
import HeaderFooterLayout from "@/layouts/HeaderFooter.layout"
import ContentGenerator from "@/utils/ContentGenerator"
import { getHomePageData } from "@/utils/getHomePageData"
import getLayout from "@/utils/getLayout"

const Layouts = ({ data: { layoutData } }: any) => {
  console.log('layoutData: ', layoutData);
  
  return <>
    <p>hellos world!!</p>
  </>
}

export async function getStaticProps(context: any) {


    const layoutData = await getLayout(1);
    // const sections = homePageData?.homePage?.data?.attributes?.sections;
    // const meta = homePageData?.homePage?.data?.attributes?.seo;

    return {
      props: {
        data: {
          layoutData: layoutData
        },
      },
    };
 
}

export default Layouts;