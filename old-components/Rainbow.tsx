import { FC } from "react"
import cn from "classnames"
import RichtText from "@/old-components/Richtext/Richtext"
import Image from "@/old-components/Image"
import RainbowComponentConfig from "@/types/Rainbow.types"
import Aspect from "@/components/Aspect"

const Rainbow: FC<RainbowComponentConfig> = ({ sections, title, classNamesTitle, contentVariant }: RainbowComponentConfig) => {
  const colorVariant = contentVariant === "dark" || contentVariant === undefined ? "dark" : ""
  return (
    <section className="relative w-full z-0">
      <h1
        className={cn(
          "mb-6 font-headings text-10 w-t:text-3xl w-p:text-6",
          classNamesTitle
        )}
      >
        {title}
      </h1>
      {
        sections?.map((section, i) => {
          return (
            <section key={`section-container${i}`} className="relative">
              <div className="relative flex flex-col space-y-18 desktop:mb-18 mb-12 z-10">
                {
                  section?.sections?.map((section, i ) => {
                    const { title, description, image } = section;

                    return (
                      <div className="flex flex-col items-center justify-center w-d:flex-row space-y-6 w-d:space-y-0 w-d:space-x-6 px-12 w-d:px-0" key={`section-detail${i}`}>
                        <div className="w-full w-d:w-1/2 flex flex-col space-y-6 w-d:pl-24">
                          <h3 className={cn("font-headings text-8 w-t:text-3xl w-p:text-6 font-bold", {"text-surface-0" : contentVariant === "dark" || contentVariant === undefined})}>{title}</h3>
                          <RichtText font={colorVariant} classNames="font-headings" data={{ content: description }} />
                        </div>
                        <div className="w-full w-d:w-1/2 max-w-147">
                          <Aspect ratio="2/1">
                            <Image src={image?.src} alt={image?.alt} classNames="w-full h-full" />
                          </Aspect>
                        </div>
                      </div>
                    )
                  })
                }
              </div>

              {/* Section's background color */}
              <div className="absolute top-0 left-0 w-full h-full flex">
                <div
                  className="w-full h-full"
                  style={{ backgroundColor: section?.color || "white" }}
                ></div>
                <div className="w-d:w-1/3 h-full bg-surface-0"></div>
              </div>
            </section>
          );
        })
      }
    </section>
  );
}

export default Rainbow;
