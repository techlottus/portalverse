import { FC } from "react";
import Container from "@/layouts/Container.layout";
import parseEditorRawData from "@/utils/parseEditorRawData";
import RichtText from "@/old-components/Richtext/Richtext";
import cn from "classnames";
import type { RichTextVideoSection } from "@/utils/strapi/sections/RichTextVideo";
import Aspect from "../Aspect";
import Button from "@/old-components/Button/Button";
import { useRouter } from "next/router";

const RichTextVideo: FC<RichTextVideoSection> = (props: RichTextVideoSection) => {
  const {
    title,
    text,
    videoPosition = "left",
    backgroundColor,
    richTextVideoContentVariant: contentVariant = "dark",
    providerId,
    provider,
    buttons
  } = props;

  const router = useRouter();
  const richTextMarkup = parseEditorRawData(text);

  const renderVideo = () => {
    return (
      <div className="w-full h-full" >
        <Aspect ratio="2/1">
        <iframe 
        className="w-full h-full"
        src={provider==='Youtube'? `https://www.youtube.com/embed/${providerId}`: provider ==='Vimeo'? `https://player.vimeo.com/video/${providerId}`:''} 
        title="YouTube video player" 
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen>
       </iframe></Aspect>
      </div>
    );
  };

  return (
    <section
      style={{ backgroundColor }}
      className={cn({
        "w-p:py-10 w-t:py-6 w-d:py-10": !!backgroundColor,
        "text-white": contentVariant === "light",
      })}
    >
      <Container>
        <div className="flex flex-col space-y-6">
          
          <div className="grid w-p:grid-cols-1 w-t:grid-cols-1 grid-cols-2 gap-6  items-center">
            <div
              className={cn({
                "w-d:hidden": videoPosition !== "left",
                "w-p:hidden w-t:hidden": !!title
              })}
            >
              {renderVideo()}
            </div>
            {
              richTextMarkup
                && ( <div className="dark ">
                  { title && <h3 className="font-headings text-10 pb-4 font-bold leading-tight w-t:text-8.5 w-p:text-6">{title}</h3>}
                   <RichtText font={contentVariant === "light" ? "dark" : "light"} data={{content: richTextMarkup}}/>
                   {
                    buttons && buttons?.length > 0 ?
                    <div className="grid gap-6 w-d:grid-cols-2 w-t:grid-cols-2">
                    {
                      buttons?.map((item, i) => {
                        return (
                          <div key={`richTextVideo-button-${i}`}>
                          <Button dark data={{
                            id: item?.id,
                            type: item?.variant,
                            title: item?.label,
                            size: "small",
                            lyIcon: false,
                            disabled: false,
                            isExpand: true,
                          }}
                            onClick={() => router?.push(item?.CTA)} />
                        </div>
                        )}
                      )
                    }
                  </div>
                    : null
                  }
                  </div>)
            }
            <div 
              className={cn({
                "w-d:hidden": videoPosition !== "right",
                "w-p:hidden w-t:hidden": !title
              })}
            >
              {renderVideo()}
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}

export default RichTextVideo