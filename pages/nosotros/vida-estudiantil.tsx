import Head from "next/head"
import { useRouter } from "next/router"
import NextPageWithLayout from "@/types/Layout.types"
import HeaderFooterLayout from "@/layouts/HeaderFooter.layout"
import ContentFullLayout from "@/layouts/ContentFull.layout"
import ContentLayout from "@/layouts/Content.layout"
import RichtText from "@/old-components/Richtext/Richtext"
import Image from "@/old-components/Image"
import Mosaic from "@/old-components/Mosaic"
import CardWebsite from "@/old-components/CardWebsite"
import { getDataPageFromJSON } from "@/utils/getDataPage"
import LinkContactTarget from "@/old-components/LinkContactTarget"
import Video from "@/old-components/Video"


const VidaEstudiantil: NextPageWithLayout = ({ sections, meta }: any) => {
  const router = useRouter()

  return <>
    <Head>
      <title>{ meta.title }</title>
    </Head>
    <HeaderFooterLayout breadcrumbs={true}>
      <ContentLayout>
        <div className="col-span-6 w-t:col-span-8 w-p:col-span-4">
          <p className="font-Poppins font-bold text-13 w-t:text-8.5 w-p:text-7.5 leading-[125%] w-t:leading-[111%] mb-6">{sections.head.title}</p>
          <p className="font-Poppins font-bold text-5.5 mb-6">{sections.head.subtitle}</p>
          <RichtText font="light" data={{
            content: sections.head.description
          }} />
        </div>
        <div className="col-span-6 w-t:col-span-8 w-p:col-span-4">
          <Image
            alt={ sections.head.image.desk.alt }
            src={ sections.head.image.desk.src }
            classNames="aspect-2/1 w-t:aspect-2/1 w-p:aspect-2/1"
          />
        </div>
      </ContentLayout>
      <ContentFullLayout classNames="bg-darkBlue text-white mt-18 w-t:mt-3 w-p:mt-3">
        <ContentLayout classNames="text-white">
          <div className="col-span-6 w-t:col-span-8 w-p:col-span-4 my-6">
            <Video dimensions={["330px", "360px", "200px"]} data={ sections.sportActivities.video} />
          </div>
          <div className="col-span-6 w-t:col-span-8 w-p:col-span-4 my-auto">
            <p className="font-Poppins font-bold text-6.5 w-t:text-6 w-p:text-6 leading-[125%] mb-6">{sections.sportActivities.title}</p>
            <RichtText font="dark" data={{
              content: sections.sportActivities.description
            }} />
            <p>{sections.sportActivities.moreInformation}</p>
            <LinkContactTarget type="email" info={sections.sportActivities.moreInformationLink} />
          </div>
        </ContentLayout>
      </ContentFullLayout>
      <ContentLayout classNames="mt-18">
          <div className="col-span-6 w-t:col-span-8 w-p:col-span-4 my-auto">
            <p className="font-Poppins font-bold text-6.5 w-t:text-6 w-p:text-6 leading-[125%] mb-6">{sections.culturalActivities.title}</p>
            <RichtText font="light" data={{
              content: sections.culturalActivities.description
            }} />
            <p>{sections.culturalActivities.moreInformation}</p>
            <LinkContactTarget type="email" info={sections.culturalActivities.moreInformationLink} />
          </div>
          <div className="col-span-6 w-t:col-span-8 w-p:col-span-4 my-6">
            <Video dimensions={["330px", "360px", "200px"]} data={ sections.culturalActivities.video} />
          </div>
          <div className="col-span-12 w-t:col-span-8 w-p:col-span-4 mt-12 w-t:mt-6 w-p:mt-6">
          <p className="font-Poppins font-bold text-10 w-t:text-6 w-p:text-6 leading-[125%] mb-6">{ sections.lifeUANE.title}</p>
          <Mosaic data={sections.lifeUANE.images}/>
        </div>
      </ContentLayout>
      <ContentFullLayout classNames="bg-SC/Backgrounds/BG-GRAY mt-18">
        <ContentLayout classNames="my-6">
          <div className="col-span-12 w-t:col-span-8 w-p:col-span-4 mt-6">
            <p className="font-Poppins font-bold text-10 w-t:text-6 w-p:text-6 leading-[125%]">{sections.lifeUANEarticles.title}</p>
          </div>
          <section className="col-span-12 w-t:col-span-8 w-p:col-span-4 grid w-d:grid-cols-2 gap-6 w-t:grid-cols-2 w-p:grid-cols-1 mb-6">
            {
             sections.lifeUANEarticles.articles.map((item:any, i:number) => <section key={`section-blog-${i}`}>
              <CardWebsite data={item} onClick={()=>router.push(`blog/${item.redirect}`)}/>
             </section>)
            }
          </section>
        </ContentLayout>
      </ContentFullLayout>
    </HeaderFooterLayout>
  </>
}

// `getStaticPaths` requires using `getStaticProps`
export async function getStaticProps(context: any) {
  const { sections, meta } = await getDataPageFromJSON('vida-estudiantil.json');

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

export default VidaEstudiantil