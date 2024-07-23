import { useState } from "react";
import Container from "@/layouts/Container.layout";
import PaginatorPortalverse from "@/old-components/PaginatorPortalverse";
import Spotify from "@/old-components/Spotify";
import type { ListconfigSection } from "@/utils/strapi/sections/Listconfig";
import type { PodcastEpisode } from "@/utils/getPodcastEpisodes";

const ListconfigPodcastItems = (props: ListconfigSection) => {
  const { title, relatesto, data } = props;

  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 7;

  const onPageChange = (page: any) => {
    setCurrentPage(page);
  };

  if (relatesto !== "podcasts") return null;

  const podcastEpisodes = data as Array<PodcastEpisode>;

  const paginate = <T,>(items: Array<T>, pageNumber: number, pageSize: number) => {
    const startIndex = (pageNumber - 1) * pageSize;
    return items?.slice(startIndex, startIndex + pageSize);
  };

  const paginatedItems = paginate(
    podcastEpisodes,
    currentPage,
    pageSize
  );

  return (
    <section>
      <Container>
        <div className="flex flex-col space-y-6">
          {
            title
              ? <div className="col-span-12 w-t:col-span-8 w-p:col-span-4">
                  <h2 className="font-headings font-bold text-8.5 w-t:text-6 w-p:text-6 semi-tight w-t:leading-tight w-p:leading-tight">
                    {title}
                  </h2>
                </div>
              : null
          }
          {
            paginatedItems?.map((item, i) => (
              <section className="mb-6" key={`section-blog-${i}`}>
                <Spotify
                  data={{
                    config: {
                      type: item?.attributes?.type,
                      id: item?.attributes?.providerId,
                      format: "compact",
                    },
                  }}
                />
              </section>
            ))
          }
          <div className="col-span-12 w-t:col-span-8 w-p:col-span-4 flex justify-center w-p:hidden">
            <PaginatorPortalverse items={podcastEpisodes?.length} currentPage={currentPage} pageSize={pageSize} onPageChange={onPageChange} iconNext={"chevron_right"} iconPrevious={"chevron_left"} /> 
          </div>
        </div>
      </Container>
    </section>
  );
};

export default ListconfigPodcastItems;
