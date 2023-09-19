import { FC } from "react";
import Container from "@/layouts/Container.layout";
import Image from "@/old-components/Image";
import parseEditorRawData from "@/utils/parseEditorRawData";
import RichtText from "@/old-components/Richtext/Richtext";
import cn from "classnames";
import type { OutstandingSection } from "@/utils/strapi/sections/Outstanding";
import Button from "@/old-components/Button/Button";
import Aspect from "../Aspect";

const Outstanding: FC<OutstandingSection> = (props: OutstandingSection) => {
  const {
    title,
    content,
    contentVariant = "dark",
    image,
    imagePosition = "right",
    button,
    backgroundColor,
    backgroundWidth
  } = props;

  const richTextMarkup = parseEditorRawData(content);


  const myhref = (web: string) => {
    if (!web) return;
    window.location.href = web;
  };

  return (
    <section
      className={cn({
        "w-p:py-10 w-t:py-6 w-d:py-10": !!backgroundColor,
        "text-surface-0": contentVariant === "light",
        "relative w-full z-0": backgroundWidth === "rainbow"
      })}
    >
      <h1
        className={cn(
          "mb-6 ac-type-h3-bold-solid-poppins-desktop w-t:ac-type-h2-bold-solid-poppins-mobile w-p:ac-type-h3-bold-solid-poppins-tabmob",
        )}
      >
        {title}
      </h1>
      <section className="relative">
        <div className="relative flex flex-col space-y-12 py-12 z-10">
          <div className={cn("flex flex-col items-center justify-center w-d:flex-row space-y-6 w-d:space-y-0 w-d:space-x-6 px-12 w-d:px-0", { "flex-col-reverse": imagePosition === 'left' })}>
            <div className="w-full w-d:w-1/2 flex flex-col space-y-6 w-d:pl-24">
              <h3 className="ac-type-h3-bold-solid-poppins-desktop w-t:ac-type-h2-negative-bold-solid-poppins-mobile w-p:ac-type-h3-negative-bold-solid-poppins-tabmob text-surface-0">{title}</h3>
              {
                richTextMarkup && <div className="dark"><RichtText font={contentVariant === "light" ? "dark" : "light"} data={{ content: richTextMarkup }} /></div>
              }
              {button && (
                <Button darkOutlined={button.variant === "outlined_negative"} dark={button.variant === "primary"} data={{
                  title: button?.label,
                  type: button?.variant,
                  icon: button?.iconName,
                  isExpand: false,
                }}
                  onClick={() => { myhref(button.CTA) }} />
              )}

            </div>
            <div className="w-full w-d:w-1/2 max-w-147">
              <Aspect ratio="2/1">
                <Image src={image?.data?.attributes?.url} alt="image" classNames="w-full h-full" />
              </Aspect>
            </div>
          </div>
        </div>

        {/* Section's background color */}
        <div className="absolute top-0 left-0 w-full h-full flex">
          <div
            className="w-full h-full"
            style={{ backgroundColor: backgroundColor || "white" }}
          ></div>
          <div className={cn("h-full bg-surface-0", { "w-d:w-1/3 ": backgroundWidth === "rainbow", "w-full": backgroundWidth === "outstanding" })}></div>
        </div>
      </section>

    </section>
  )
}

export default Outstanding