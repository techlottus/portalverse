import Header from "@/components/sections/Header";
import {getLayout, Layout} from "@/utils/getLayout";



const Layouts = ({ data: { layoutData } }: any) => {
  console.log('layoutData: ', layoutData);
  
  
  return <>
    <Header {...layoutData.attributes.header.data.attributes} />
    <p>hellos world!!</p>
  </>
}

export async function getStaticProps(context: any) {
    try {
      const layoutData = await getLayout(1);
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