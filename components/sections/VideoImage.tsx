import React from 'react'
import { VideoImageData } from "../../utils/strapi/sections/VideoImageSection";
import Aspect from "../Aspect";
import Button from "@/old-components/Button/Button";
import { useRouter } from "next/router";
import ContentLayout from "@/layouts/Content.layout";
import RichtText from '@/old-components/Richtext/Richtext';
import cn from "classnames";

const VideoImage: React.FC<VideoImageData> = (props: VideoImageData) => {
  const {
    title,
    subtitle,
    images,
    video,
    button
  } = props;

  const router = useRouter();

  return <>
    <ContentLayout classNames="w-full">
      <div className="col-span-12 w-t:col-span-8 w-p:col-span-4">
        <h2 className="font-headings text-10 font-bold leading-tight w-t:text-6 w-p:text-6 mb-6">{title}</h2>
        <RichtText data={{
          content: subtitle
        }} />
      </div>
      {
        images.length > 0
          ? <>
            <div className="col-span-6 w-t:col-span-8 w-p:col-span-4 flex items-center mx-auto my-auto">
              <section className={cn("grid w-d:grid-cols-2 gap-6 w-t:grid-cols-2 w-p:grid-cols-1", { "!grid-cols-1": images.length <= 1 })}>
                {
                  images?.map((image: any, i: number) =>
                    <section key={`section-blog-${i}`}>
                      <img className="h-auto max-h-72" src={image?.image?.data?.attributes?.url} alt={image?.image?.data?.attributes?.alternativeText} />
                    </section>)
                }
              </section>
            </div>
          </>
          : null
      }
      {
        video
          ? <div className="col-span-6 w-t:col-span-8 w-p:col-span-4 max-h-72 my-auto">
            <Aspect ratio="2/1">
              <iframe
                className="w-full h-full"
                src={video?.provider === 'youtube' ? `https://www.youtube.com/embed/${video?.providerId}` : video?.provider === 'vimeo' ? `https://player.vimeo.com/video/${video?.providerId}` : ''}
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen>
              </iframe></Aspect>
          </div>
          : null
      }

      {
        button
          ? <div className="col-span-12 w-t:col-span-8 w-p:col-span-4 object-center flex justify-center tablet:mt-18">
            <Button dark data={{
              type: button?.variant,
              title: button?.label,
              icon: button?.iconName,
              size: "small",
              lyIcon: false,
              disabled: false,
              isExpand: true,
            }}
              onClick={() => router?.push(button?.CTA)} />
          </div>
          : null
      }
    </ContentLayout>
  </>
};

export default VideoImage;