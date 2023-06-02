import Container from "@/layouts/Container.layout";
import Spotify from "@/old-components/Spotify";
import { PodcastEpisode } from "@/utils/getPodcastEpisodes";
import { ListconfigSection } from "@/utils/strapi/sections/Listconfig";
import { useRouter } from "next/router";
import React, { useState } from "react";

const ListConfigPodcastItems = (props: ListconfigSection) => {
  const { title, relatesto, data } = props;

  console.log("props", props);

  const podcastItems = data as Array<PodcastEpisode>;

  const router = useRouter();

  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 7;

  const onPageChange = (page: any) => {
    setCurrentPage(page);
  };

  const paginate = (items: any, pageNumber: any, pageSize: any) => {
    const startIndex = (pageNumber - 1) * pageSize;
    return items?.slice(startIndex, startIndex + pageSize);
  };

  const paginatedItems: Array<PodcastEpisode> = paginate(
    podcastItems,
    currentPage,
    pageSize
  );

  if (relatesto !== "podcasts") return null;

  return (
    <section>
      <Container>
        <div className="flex flex-col space-y-6">
          {title ? (
            <div className="col-span-12 w-t:col-span-8 w-p:col-span-4">
              <p className="font-Poppins font-bold text-8.5 w-t:text-6 w-p:text-6 leading-[111%] w-t:leading-[125%] w-p:leading-[125%]">
                {title}
              </p>
            </div>
          ) : null}
          {paginatedItems?.map((item, i) => (
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
          ))}
        </div>
      </Container>
    </section>
  );
};

export default ListConfigPodcastItems;
