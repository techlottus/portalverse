import { FC } from "react";
import Container from "@/layouts/Container.layout";
import Image from "@/old-components/Image";
import parseEditorRawData from "@/utils/parseEditorRawData";
import RichtText from "@/old-components/Richtext/Richtext";
import cn from "classnames";
import type { RichTextImageSection } from "@/utils/strapi/sections/RichTextImage";
import Button from "@/old-components/Button/Button";
import { useRouter } from "next/router";

const RichTextImage: FC<RichTextImageSection> = (props: RichTextImageSection) => {

  const {
    title,
    image,
    text,
    imagePosition = "right",
    backgroundColor,
    richTextImageContentVariant: contentVariant = "dark",
    buttons
  } = props;

  const router = useRouter();
  const richTextMarkup = parseEditorRawData(text);

  const renderImage = () => {
    return (
      <div>
        <Image
          classNamesImg="!h-auto !static"
          src={image?.data?.attributes?.url}
          alt="imagen"
        />
      </div>
    );
  };

  return (
    <section
      style={{ backgroundColor }}
      className={cn({
        "w-p:py-10 w-t:py-6 w-d:py-10": !!backgroundColor,
        "text-surface-0": contentVariant === "light",
      })}
    >
      <Container>
        <div className="flex flex-col space-y-6">
          {
            title ? <h3 className="font-headings text-10 font-bold leading-tight w-t:text-8.5 w-p:text-6">{title}</h3> : null
          }
          <div className="grid w-p:grid-cols-1 w-t:grid-cols-1 grid-cols-2 gap-6">
            <div
              className={cn("my-auto", {
                "w-d:hidden": imagePosition !== "left",
                "w-p:hidden w-t:hidden": !title
              })}
            >
              {renderImage()}
            </div>
            {
              richTextMarkup
                ?
                <div className="dark my-auto">
                  <RichtText font={contentVariant === "light" ? "dark" : "light"} data={{ content: richTextMarkup }} />
                  {
                    buttons && buttons?.length > 0 ?
                      <div className="grid gap-6 w-d:grid-cols-2 w-t:grid-cols-2">
                        {
                          buttons?.map((item, i) => {
                            return (
                              <div key={`richTextImage-button-${i}`}>
                                <Button dark data={{
                                  id: item?.id,
                                  type: item?.variant,
                                  title: item?.label,
                                  icon: item?.iconName,
                                  size: "small",
                                  lyIcon: false,
                                  disabled: false,
                                  isExpand: true,
                                }}
                                  onClick={() => router?.push(item?.CTA)} />
                              </div>
                            )
                          }
                          )
                        }
                      </div>
                      : null
                  }
                </div>
                : null
            }
            <div
              className={cn("my-auto", {
                "w-d:hidden": imagePosition !== "right",
                "w-p:hidden w-t:hidden": !!title
              })}
            >
              {renderImage()}
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}

export default RichTextImage