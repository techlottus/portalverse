import Head from "next/head"
import HeaderFooterLayout from "@/layouts/HeaderFooter.layout"
import NextPageWithLayout from "@/types/Layout.types"
import ContentLayout from "@/layouts/Content.layout"
import OpenForm from "@/forms/container/OpenForm"
import { getDataPageFromJSON } from "@/utils/getDataPage"
import PedirInformacionPage from "@/types/PedirInformacion.types"
import RichtText from "@/old-components/Richtext/Richtext"
import Video from "@/old-components/Video"

const PedirInformacion: NextPageWithLayout<PedirInformacionPage> = ({ sections, meta }: PedirInformacionPage) => {
  return <>
    <Head>
      <title>{ meta.title }</title>
    </Head>
    <HeaderFooterLayout>
      <ContentLayout>
        <section className="col-span-12 w-t:col-span-8 w-p:col-span-4 w-d:col-start-3 w-d:col-end-11 text-13.5 w-t:text-8.5 w-p:text-6 font-headings font-bold leading-tight w-t:semi-tight">{ sections.head.title }</section>
        <div className="col-span-12 w-t:col-span-8 w-p:col-span-4 w-d:col-start-3 w-d:col-end-11 text-base w-t:text-3.5 w-p:text-3.5 font-texts leading-tight">
          <RichtText data={{
            content: sections.head.description
          }} />
        </div>
        <section className="col-span-12 w-t:col-span-8 w-p:col-span-4 w-d:col-start-3 w-d:col-end-11">
          <OpenForm data={sections.form} pathThankyou={`/thank-you`} image={{ src: "https://assets.staging.bedu.org/UTEG/admisiones_pedir_informacion_avatar_6738c707b5.jpg", alt:"image-person" }} />
        </section>
        <section className="col-span-12 w-t:col-span-8 w-p:col-span-4 w-d:col-start-3 w-d:col-end-11">
          <Video data={sections.video} dimensions={["450px", "400px", "200px"]} />
        </section>
      </ContentLayout>
    </HeaderFooterLayout>
  </>
}

// `getStaticPaths` requires using `getStaticProps`
export async function getStaticProps(context: any) {
  try {
    const { sections, meta } = await getDataPageFromJSON('pedir-informacion.json');
  
    // redirect not avaliable page
    if (!!meta.hidden) {
      return {
        notFound: true,
      }
    }
  
    return {
      props: { sections, meta }
    }
  } catch {
    return {
      notFound: true,
    };
  }
}

export default PedirInformacion