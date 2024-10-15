import Footer from "@/components/Footer";
import getLayout from "@/utils/getLayout";



const Layouts = ({ data: { layoutData } }: any) => {
  console.log('layoutData: ', layoutData);
  
  return <>
    <p>hellos world!!</p>
    <Footer {...layoutData.attributes.footer.data }></Footer>
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