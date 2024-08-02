import { FC } from "react"
import cn from "classnames";
import Container from "@/layouts/Container.layout";
import { IconTextListImage } from "@/utils/strapi/sections/IconTextListImage";
import RichtText from "@/old-components/Richtext/Richtext";
import parseEditorRawData from "@/utils/parseEditorRawData";

const IconTextListImage: FC<IconTextListImage> = (props: IconTextListImage) => {
  const { title, description, iconTextList, imageDesk, tabletImage, mobileImage, positionImage = "right", iconClassNames = "" } = props

  return (
    <section>
      <Container>
        <section className="desktop:hidden">
          {
            title ?
              <div>
                <h3 className="font-headings text-10 font-bold leading-12 tablet:text-8.5 mobile:text-6 desktop:mb-6">{title}</h3>
              </div>
              : null
          }
          {
            description ?
              <div className="desktop:mb-12">
                <RichtText data={{
                  content: parseEditorRawData(description)
                }} />
              </div>
              : null
          }
        </section>
        <section className={cn('flex gap-6 tablet:flex-col-reverse mobile:flex-col-reverse', { "flex-row-reverse": positionImage === "left" })}>
          <div className="desktop:w-1/2 my-auto">
            {
              title ?
                <div className="mobile:hidden tablet:hidden">
                  <h3 className="font-headings text-10 font-bold leading-12 tablet:text-8.5 mobile:text-6 desktop:mb-6">{title}</h3>
                </div>
                : null
            }
            {
              description ?
                <div className="desktop:mb-12 mobile:hidden tablet:hidden">
                  <RichtText data={{
                    content: parseEditorRawData(description)
                  }} />
                </div>
                : null
            }
            {
              iconTextList ?
                iconTextList?.length > 0 ?
                  iconTextList?.map((item: any, i: number) =>
                    <div key={`icon-${i}`} className="flex gap-6">
                      <div className="my-auto">
                        <span className={cn("material-symbols-outlined text-primary-500 !text-16", iconClassNames)}>{item?.icon}</span>
                      </div>
                      <div className="">
                        <p className="font-headings font-bold">{item?.title}</p>
                        <RichtText data={{
                          content: parseEditorRawData(item?.text)
                        }} />
                      </div>
                    </div>
                  )
                  : null
                : null
            }
          </div>
          <div className="desktop:w-1/2">
            {
              imageDesk ?
                <div className={cn("tablet:hidden mobile:hidden flex justify-start", { "justify-end": positionImage === "right" || !positionImage })}>
                  <img
                    alt={""}
                    src={imageDesk?.data?.attributes?.url}
                  />
                </div>
                : null
            }
            {
              tabletImage ?
                <div className="desktop:hidden mobile:hidden">
                  <img
                    alt={""}
                    src={tabletImage?.data?.attributes?.url}
                    className="w-full h-full"
                  />
                </div>
                : null
            }
            {
              mobileImage ?
                <div className="desktop:hidden tablet:hidden">
                  <img
                    alt={""}
                    src={mobileImage?.data?.attributes?.url}
                    className="w-full h-full"
                  />
                </div>
                : null
            }
          </div>
        </section>
      </Container>
    </section>
  );
}

export default IconTextListImage