import Container from "@/layouts/Container.layout";
import Spotify from "@/old-components/Spotify";
import type { PodcastListSection } from "@/utils/strapi/sections/PodcastList";

const PodcastList = (props: PodcastListSection) => {
  const { title, podcastItems } = props;

  return (
    <section>
      <Container>
        {title ? (
          <h2 className="font-headings font-bold text-10 w-t:text-7.5 w-p:text-7.5 leading-tight mb-6">
            {title}
          </h2>
        ) : null}
        {podcastItems?.length > 0
          ? <div className="flex flex-col space-y-6">
              {
                podcastItems?.map((item, i) => {
                  const attributes = item?.podcastItem?.data?.attributes;
                  const type = attributes?.type;
                  const id = attributes?.providerId;
                  const format = item?.format || "compact";

                  return (
                    <div key={`section-articles-${i}`}>
                      <Spotify
                        data={{
                          config: {
                            type,
                            id,
                            format,
                          },
                        }}
                      />
                    </div>
                  );
                })
              }
            </div>
          : null
        }
      </Container>
    </section>
  );
};

export default PodcastList;