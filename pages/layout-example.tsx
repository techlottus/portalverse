import Header from "@/components/sections/Header";
import {getLayout} from "@/utils/getLayout";



const Layouts = ({ data: { layoutData } }: any) => {
  console.log('layoutData: ', layoutData);
  
  
  return <>
    <Header {...layoutData?.attributes?.header?.data?.attributes} />
  </>
}

export async function getStaticProps(context: any) {
    try {
      const layoutData = await getLayout();
      // const sections = homePageData?.homePage?.data?.attributes?.sections;
      // const meta = homePageData?.homePage?.data?.attributes?.seo;

      return {
        props: {
          data: {
            layoutData: layoutData || null
          },
        },
      };
    } catch {
      return {
        notFound: true,
      };
    }
}

export default Layouts;