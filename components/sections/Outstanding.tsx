import { FC } from "react";
import Image from "@/old-components/Image";
import parseEditorRawData from "@/utils/parseEditorRawData";
import RichtText from "@/old-components/Richtext/Richtext";
import cn from "classnames";
import Button from "@/old-components/Button/Button";
import Aspect from "@/components/Aspect";
import { OutstandingSection } from "@/utils/strapi/sections/OutstandingList";

const Outstanding: FC<OutstandingSection> = (props: OutstandingSection) => {

  const title = props?.title || ""
  const content = props?.content || ""
  const outstandingImage = props?.outstandingImage || null
  const outstandingImagePosition = props?.outstandingImagePosition || "right"
  const outstandingContentVariant = props?.outstandingContentVariant || "dark"
  const button = props?.button || null
  const backgroundColor = props?.backgroundColor || ""
  const backgroundWidth = props?.backgroundWidth || "w-full"

  const richTextMarkup = parseEditorRawData(content);

  const hrefRouter = (url: string) => {
    if (!url) return;
    window.location.href = url;
  };

  return (
    <section
      className={cn({
        "text-surface-0": outstandingContentVariant === "light",
        "relative w-full z-0": backgroundWidth === "w_3_4"
      })}
    >
      <section className="relative  max-w-d-base mx-auto w-d-base:px-6 tablet:!p-0">
        <div className="relative flex flex-col space-y-12 py-12 z-10">
          <div className="flex flex-col items-center justify-center desktop:flex-row space-y-6 desktop:space-y-0 desktop:space-x-6 px-6 desktop:px-0">
            {outstandingImagePosition === 'left' && <div className="w-full desktop:w-1/2 max-w-147">
              <Aspect ratio="2/1">
                <Image src={outstandingImage?.data?.attributes?.url} alt="image" classNames="w-full h-full" />
              </Aspect>
            </div>}
            <div className="w-full desktop:w-1/2 flex flex-col space-y-6 desktop:px-12">
              {
                title
                  ? <h4
                    className={cn(
                      "font-headings font-bold",
                      "desktop:leading-15 tablet:leading-7.5 mobile:leading-7.5",
                      "desktop:text-6.5 tablet:text-6 mobile:text-6"
                    )}
                  >
                    {title}
                  </h4>
                  : null
              }
              {
                richTextMarkup ? <div className="dark"><RichtText font={outstandingContentVariant === "light" ? "dark" : "light"} data={{ content: richTextMarkup }} /></div> : null
              }
              {button ? (
                <Button darkOutlined={button.variant === "outlined_negative"} dark={button.variant === "primary"} data={{
                  title: button?.label,
                  type: button?.variant,
                  icon: button?.iconName,
                  isExpand: false,
                }}
                  onClick={() => { hrefRouter(button.CTA) }} />
              ) : null}

            </div>
            {outstandingImagePosition === 'right' && <div className="w-full desktop:w-1/2 max-w-147 desktop:px-6">
              <Aspect ratio="2/1">
                <Image src={outstandingImage?.data?.attributes?.url} alt="image" classNames="w-full h-full" />
              </Aspect>
            </div>}
          </div>
        </div>

        {/* Section's background color */}
        <div className="absolute top-0 left-0 w-full h-full flex bg-surface-0 max-w-d-base mx-auto  mobile:!p-0 tablet:!p-0">
          <div
            className={cn("h-full ", { "w-full": backgroundWidth === "w_full", "desktop:w-3/4 w-full": backgroundWidth === "w_3_4" })}
            style={{ backgroundColor: backgroundColor || "white" }}
          ></div>
        </div>
      </section>
    </section>
  )
}

export default Outstanding