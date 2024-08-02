import { FC } from "react";
import Container from "@/layouts/Container.layout";
import parseEditorRawData from "@/utils/parseEditorRawData";
import RichtText from "@/old-components/Richtext/Richtext";
import Aspect from "@/components/Aspect";
import type { VideosSectionData } from "@/utils/strapi/sections/Videos";

const VideoSection: FC<VideosSectionData> = (props: VideosSectionData) => {
  const { title, description, videos } = props;

  const formattedDescription = parseEditorRawData(description);

  return (
    <section>
      <Container>
        {
          title ?
            <p className="font-headings font-bold text-10 tablet:text-6 mobile:text-6 leading-tight mb-6">{title}</p>
          : null
        }
        {
          description ?
            <div className="mb-6">
              <RichtText data={{
                content: formattedDescription
              }} />
            </div>
          : null
        }
        {
          videos ?
            <div className="grid desktop:grid-cols-2 tablet:grid-cols-1 gap-6 mobile:grid-cols-1 mobile:gap-7">
              {
                videos?.length > 0 ?
                  videos?.map((item, i) => {
                    return (
                      <div key={`section-videos-${i}`} className="w-full h-full" >
                        <Aspect ratio="2/1">
                          <iframe
                            className="w-full h-full"
                            src={item?.provider === 'youtube' ? `https://www.youtube.com/embed/${item?.providerId}` : item?.provider === 'vimeo' ? `https://player.vimeo.com/video/${item?.providerId}` : ''}
                            title="YouTube video player"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            allowFullScreen>
                          </iframe></Aspect>
                      </div>
                    )
                  })
                : null
              }
            </div>
          : null
        }
      </Container>
    </section>
  )

}
export default VideoSection

