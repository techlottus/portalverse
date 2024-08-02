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
      <meta property="title" content={meta?.title} />
    </Head>
    <HeaderFooterLayout>
      <ContentLayout>
        <h1 className="col-span-12 tablet:col-span-8 mobile:col-span-4 desktop:col-start-3 desktop:col-end-11 text-13.5 tablet:text-8.5 mobile:text-6 font-headings font-bold leading-tight tablet:semi-tight">{ sections.head.title }</h1>
        <div className="col-span-12 tablet:col-span-8 mobile:col-span-4 desktop:col-start-3 desktop:col-end-11 text-base tablet:text-3.5 mobile:text-3.5 font-texts leading-tight">
          <RichtText data={{
            content: sections.head.description
          }} />
        </div>
        <section className="col-span-12 tablet:col-span-8 mobile:col-span-4 desktop:col-start-3 desktop:col-end-11">
          <OpenForm data={sections.form} pathThankyou={`/thank-you`} image={{ src: "https://assets.staging.bedu.org/UTEG/admisiones_pedir_informacion_avatar_6738c707b5.jpg", alt:"image-person" }} />
        </section>
        <section className="col-span-12 tablet:col-span-8 mobile:col-span-4 desktop:col-start-3 desktop:col-end-11 h-100">
          <Video data={sections.video}/>
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