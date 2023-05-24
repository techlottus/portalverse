import { FC } from "react";
import Container from "@/layouts/Container.layout";
import Image from "@/old-components/Image";
import parseEditorRawData from "@/utils/parseEditorRawData";
import RichtText from "@/old-components/Richtext/Richtext";
import cn from "classnames";
import type { RichTextImageSection } from "@/utils/strapi/sections/RichTextImage";

const RichTextImage: FC<RichTextImageSection> = (props: RichTextImageSection) => {
  const {
    title,
    image,
    text,
    imagePosition = "right",
    backgroundColor,
    richTextImageContentVariant: contentVariant = "dark",
  } = props;

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
        "text-white": contentVariant === "light",
      })}
    >
      <Container>
        <div className="flex flex-col space-y-6">
          {
            title ? <h3 className="font-Poppins text-10 font-bold leading-[125%] w-t:text-8.5 w-p:text-6">{title}</h3> : null
          }
          <div className="grid w-p:grid-cols-1 w-t:grid-cols-1 grid-cols-2 gap-6">
            <div className="w-d:hidden">{renderImage()}</div>
            {
              imagePosition === "left"
                ? <div className="w-p:hidden w-t:hidden">{renderImage()}</div>
                : null
            }
            {
              richTextMarkup
                ? <div className="dark"><RichtText font={contentVariant === "light" ? "dark" : "light"} data={{content: richTextMarkup}}/></div>
                : null
            }
            {
              imagePosition === "right"
                ? <div className="w-p:hidden w-t:hidden">{renderImage()}</div>
                : null
            }
          </div>
        </div>
      </Container>
    </section>
  )
}

export default RichTextImage