import Head from "next/head"
import { useRouter } from "next/router"
import NextPageWithLayout from "@/types/Layout.types"
import HeaderFooterLayout from "@/layouts/HeaderFooter.layout"
import ContentLayout from "@/layouts/Content.layout"
import ContentFullLayout from "@/layouts/ContentFull.layout"
import RichtText from "@/old-components/Richtext/Richtext"
import Image from "@/old-components/Image"
import CardWebsite from "@/old-components/CardWebsite"
import PromoLink from "@/old-components/PromoLink"
import Mosaic from "@/old-components/Mosaic"
import { getDataPageFromJSON } from "@/utils/getDataPage"
import LinkIcons from "@/old-components/LinkLottus"
import Video from "@/old-components/Video"
import NumbersPortalverse from "@/old-components/NumbersPortalverse/NumbersPortalverse"

const SomosUane: NextPageWithLayout = ({ sections, meta }: any) => {

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
          <RichtText data={{
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
        <div className="col-span-12 w-t:col-span-8 w-p:col-span-4 mt-12 w-t:mt-6 w-p:mt-6">
          <p className="font-Poppins font-bold text-10 w-t:text-6 w-p:text-6 leading-[125%]">{sections.history.title}</p>
        </div>
        <div className="col-span-6 w-t:col-span-8 w-p:col-span-4">
          <Image
            alt={ sections.history.image.desk.alt }
            src={ sections.history.image.desk.src }
            classNames="aspect-2/1 w-t:aspect-2/1 w-p:aspect-2/1"
          />
        </div>
        <div className="col-span-6 w-t:col-span-8 w-p:col-span-4">
          <RichtText data={{
            content: sections.history.description
          }} />
        </div>
      </ContentLayout>
      <ContentFullLayout classNames="bg-darkBlue text-white mt-18 w-t:mt-3 w-p:mt-3">
        <ContentLayout classNames="w-d:my-6">
          <div className="col-span-6 w-t:col-span-8 w-p:col-span-4 w-t:mt-6 w-p:mt-6 w-d:my-auto">
            <p className="font-Poppins font-bold text-10 w-t:text-6 w-p:text-6 leading-[125%]">{sections.missionAndVission.title}</p>
            <RichtText font="dark" classNames="w-t:hidden w-p:hidden" data={{
            content: sections.missionAndVission.description
          }} />
          </div>
          <div className="col-span-6 w-t:col-span-8 w-p:col-span-4 w-d:hidden">
            <Image
              alt={ sections.missionAndVission.image.desk.alt }
              src={ sections.missionAndVission.image.desk.src }
              classNames="aspect-2/1 w-t:aspect-2/1 w-p:aspect-2/1"
            />
          </div>
          <div className="col-span-6 w-t:col-span-8 w-p:col-span-4 w-t:hidden w-p:hidden w-d:my-20">
            <Image
              alt={ sections.missionAndVission.image.desk.alt }
              src={ sections.missionAndVission.image.desk.src }
              classNames="aspect-2/1 w-t:aspect-2/1 w-p:aspect-2/1"
            />
          </div>
          <div className="col-span-6 w-t:col-span-8 w-p:col-span-4 w-d:hidden w-t:mb-6 w-p:mb-6">
            <RichtText font="dark" data={{
            content: sections.missionAndVission.description
          }} />
          </div>
        </ContentLayout>
      </ContentFullLayout>
      <ContentLayout classNames="mt-12 w-t:mt-6 w-p:mt-6">
        <div className="col-span-6 w-t:col-span-8 w-p:col-span-4 my-auto">
          <p className="font-Poppins font-bold text-10 w-t:text-6 w-p:text-6 leading-[125%]">{sections.ourValues.title}</p>
          {
            sections.ourValues.values.map((item:any, i:number) => <section className="mt-6" key={`section-values-${i}`}>
             <CardWebsite data={item}/>
            </section>)
          }
        </div>
        <div className="w-d:col-span-6 w-t:col-span-8 w-p:col-span-4 grid content-center">
          <div className="grid w-d:grid-cols-2 gap-6 w-t:grid-cols-2 w-p:grid-cols-1">
            {
              sections.ourValues.numbers.map((item:any, i:number) => <section key={`section-numbers-${i}`}>
                <NumbersPortalverse data={item}/>
              </section>)
            }
          </div>
        </div>
        <div className="col-span-12 w-t:col-span-8 w-p:col-span-4 mt-12 w-t:mt-6 w-p:mt-6">
          <p className="font-Poppins font-bold text-10 w-t:text-6 w-p:text-6 leading-[125%]">{ sections.community.title}</p>
        </div>
        <div className="w-d:col-span-12 w-t:col-span-8 w-p:col-span-4 grid w-d:grid-cols-3 gap-6 w-t:grid-cols-2 w-p:grid-cols-1">
          {
            sections.community.links.map((item:any, i:number) => <section key={`section-community-${i}`}>
              <PromoLink data={item} onClick={()=> router.push(item.redirect)}/>
            </section>)
          }
        </div>
        <div className="col-span-12 w-t:col-span-8 w-p:col-span-4 mt-12 w-t:mt-6 w-p:mt-6">
          <p className="font-Poppins font-bold text-10 w-t:text-6 w-p:text-6 leading-[125%] mb-6">{ sections.experiences.title}</p>
          <Mosaic data={sections.experiences.images}/>
        </div>
        <div className="col-span-12 w-t:col-span-8 w-p:col-span-4 mt-12 w-t:mt-6 w-p:mt-6">
          <p className="font-Poppins font-bold text-10 w-t:text-6 w-p:text-6 leading-[125%] mb-6">{ sections.ourScholarships.title}</p>
        </div>
        <div className="w-d:col-span-12 w-t:col-span-8 w-p:col-span-4 grid w-d:grid-cols-4 gap-6 w-t:grid-cols-2 w-p:grid-cols-1">
          {
            sections.ourScholarships.scholarships.map((item:any, i:number) => <section key={`section-schoolarships-${i}`}>
              <PromoLink data={item} onClick={()=> { router.push(item.redirect.concat(`?type=${item.param}#becas`)) }} typeShadowColor={item.shadowColor}/>
            </section>)
          }
        </div>
        <div className="col-span-12 w-t:col-span-8 w-p:col-span-4 flex justify-end">
          <LinkIcons data={sections.ourScholarships.link} onClick={()=>router.push(sections.ourScholarships.link.redirect)}/>     
          </div>
        <div className="col-span-12 w-t:col-span-8 w-p:col-span-4 mt-12 w-t:mt-6 w-p:mt-6 hidden">
          <p className="font-Poppins font-bold text-10 w-t:text-6 w-p:text-6 leading-[125%]">{ sections.ourConventions.title}</p>          
        </div>
        <div className="w-d:col-span-12 w-t:col-span-8 w-p:col-span-4  w-d:grid-cols-3 gap-6 w-t:grid-cols-2 w-p:grid-cols-1 hidden">
          {
            sections.ourConventions.conventions.map((item:any, i:number) => <section key={`section-conventions-${i}`}>
              <CardWebsite data={item}/>
            </section>)
          }
        </div>
      </ContentLayout>
      <ContentLayout classNames="mt-18 w-t:mt-6 w-p:mt-6">
        <div className="col-span-6 w-t:col-span-8 w-p:col-span-4 my-auto">
          <p className="font-Poppins font-bold text-10 w-t:text-6 w-p:text-6 leading-[125%] mb-6">{ sections.ourCertifications.title}</p>
          <RichtText data={{
            content: sections.ourCertifications.description
          }} />
        </div>
        <div id={sections.ourCertifications.id} className="col-span-6 w-t:col-span-8 w-p:col-span-4">
          {
            sections.ourCertifications.certifications.map((item:any, i:number) => <section className="mt-6" key={`section-values-${i}`}>
             <CardWebsite data={item}/>
            </section>)
          }
        </div>
      </ContentLayout>
      <ContentFullLayout classNames="bg-darkBlue text-white mt-12 w-t:mt-6 w-p:mt-6 mb-12 hidden">
        <ContentLayout>
          <div className="col-span-6 w-t:col-span-8 w-p:col-span-4 my-6">
            <Video dimensions={["330px", "400px", "200px"]} data={ sections.meetYourRector.video} />
          </div>
          <div className="col-span-6 w-t:col-span-8 w-p:col-span-4 my-auto">
            <p className="font-Poppins font-bold text-10 w-t:text-6 w-p:text-6 leading-[125%] mb-6">{sections.meetYourRector.title}</p>
            <RichtText font="light" data={{
            content: sections.meetYourRector.description
          }} />
          </div>
        </ContentLayout>
      </ContentFullLayout>
    </HeaderFooterLayout>
  </>
}

// `getStaticPaths` requires using `getStaticProps`
export async function getStaticProps(context: any) {
  const { sections, meta } = await getDataPageFromJSON('somos-uane.json');

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

export default SomosUane