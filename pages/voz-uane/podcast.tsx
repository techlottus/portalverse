import { useState } from "react"
import Head from "next/head"
import { useRouter } from "next/router"
import HeaderFooterLayout from "@/layouts/HeaderFooter.layout"
import ContentFullLayout from "@/layouts/ContentFull.layout"
import ContentLayout from "@/layouts/Content.layout"
import NextPageWithLayout from "@/types/Layout.types"
import Spotify from "@/old-components/Spotify"
import { getDataPageFromJSON } from "@/utils/getDataPage"
import PaginatorPortalverse from "@/old-components/PaginatorPortalverse"
import BannerPortalverse from "@/old-components/BannerPortalverse"


const Podcast: NextPageWithLayout = ({ sections, meta }: any) => {
  const router = useRouter();

  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 7;

  const onPageChange = (page: any) => {
    setCurrentPage(page);
  };

  const paginate = (items:any, pageNumber:any, pageSize:any) => {
    const startIndex = (pageNumber - 1) * pageSize;
    return items.slice(startIndex, startIndex + pageSize);
  };
  
  const paginatedPost = paginate(sections.allPodcast.items, currentPage, pageSize)

  return <>
    <Head>
      <title>{ meta.title }</title>
    </Head>
    <HeaderFooterLayout breadcrumbs={true}>
      <ContentFullLayout classNames="w-d:hidden">
        <div className="col-span-12 w-t:col-span-8 w-p:col-span-4 mb-12">
          <BannerPortalverse data={sections.head.banner} onClick={() => window.open(sections.head.banner.redirect)}/>
        </div>
      </ContentFullLayout>
      <ContentLayout classNames="">
        <div className="col-span-12 w-t:col-span-8 w-p:col-span-4 w-t:hidden w-p:hidden mb-12">
          <BannerPortalverse data={sections.head.banner} onClick={() => window.open(sections.head.banner.redirect)}/>
        </div>
        <div className="col-span-12 w-t:col-span-8 w-p:col-span-4">
          <p className="font-Poppins font-bold text-10 w-t:text-6.5 w-p:text-7.5 leading-[125%]">{ sections.lastPodcast.title}</p>
        </div>
        <div className="col-span-12 w-t:col-span-8 w-p:col-span-4">
          <Spotify data={sections.lastPodcast.podcast} />
        </div>
        <div className="col-span-12 w-t:col-span-8 w-p:col-span-4">
          <p className="font-Poppins font-bold text-10 w-t:text-6.5 w-p:text-7.5 leading-[125%]">{ sections.allPodcast.title}</p>
        </div>
        <section className="col-span-12 w-t:col-span-8 w-p:col-span-4">
          {
           paginatedPost.map((item:any, i:number) => <section className="mb-6" key={`section-blog-${i}`}>
            <Spotify data={item}/>
           </section>)
          }
        </section>
        <div className="col-span-12 w-t:col-span-8 w-p:col-span-4 flex justify-center">
          <PaginatorPortalverse items={sections.allPodcast.items.length} currentPage={currentPage} pageSize={pageSize} onPageChange={onPageChange} iconNext={"chevron_right"} iconPrevious={"chevron_left"} /> 
        </div>
        <div className="col-span-12 w-t:col-span-8 w-p:col-span-4 w-t:hidden">
          <BannerPortalverse data={sections.vozUane.banner} onClick={() => router.push(sections.vozUane.banner.redirect)}/>
        </div>
      </ContentLayout>
      <ContentFullLayout>
        <div className="col-span-12 w-t:col-span-8 w-p:col-span-4 w-d:hidden w-p:hidden">
          <BannerPortalverse data={sections.vozUane.banner} onClick={() => router.push(sections.vozUane.banner.redirect)}/>
        </div>
      </ContentFullLayout>
      <ContentLayout>
        
      </ContentLayout>

    </HeaderFooterLayout>
  </>
}

// `getStaticPaths` requires using `getStaticProps`
export async function getStaticProps(context: any) {
  const { sections, meta } = await getDataPageFromJSON('podcast.json');

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

export default Podcast