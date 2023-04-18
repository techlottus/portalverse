import Head from "next/head"
import { useRouter } from "next/router"
import HeaderFooterLayout from "@/layouts/HeaderFooter.layout"
import NextPageWithLayout from "@/types/Layout.types"
import ContentLayout from "@/layouts/Content.layout"
import { getDataPageFromJSON } from "@/utils/getDataPage"
import RichtText from "@/old-components/Richtext/Richtext"
import CardWebsitePortalverse from "@/old-components/CardWebsitePortalverse"

const SIAAF: NextPageWithLayout = ({ sections, meta }: any) => {
  const router = useRouter();

  return <>
    <Head>
      <title>{ meta.title }</title>
    </Head>
    <HeaderFooterLayout breadcrumbs={true}>
      <ContentLayout>
        <div className="w-d:col-span-7 w-t:col-span-8 w-p:col-span-4 w-d:mb-12 w-t:mb-6 w-p:mb-6">
          <h1 className="text-13 w-t:text-8.25 w-p:text-6 font-Poppins font-bold leading-[125%] w-t:leading-[111%] mb-5">{ sections.head.title }</h1>
          <RichtText data={{
            content: sections.head.description
          }} />
        </div>
        <section className="col-span-12 w-t:col-span-8 w-p:col-span-4 grid w-d:grid-cols-3 gap-6 w-t:grid-cols-2 w-p:grid-cols-1">
          {
           sections.experiencias.cards.map((item:any, i:number) => <section key={`section-blog-${i}`}>
              <CardWebsitePortalverse classNames="h-[230px]" data={item} onClick={() => router.push(item?.redirect)} />
            </section>)
          }
        </section>
      </ContentLayout>
    </HeaderFooterLayout>
  </>
}

// `getStaticPaths` requires using `getStaticProps`
export async function getStaticProps(context: any) {
  const { sections, meta } = await getDataPageFromJSON('SIAAF.json');

  return {
    props: { sections, meta }
  }
}

export default SIAAF;