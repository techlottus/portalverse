import { FC } from "react"
import Container from "@/layouts/Container.layout"
import Image from "@/old-components/Image"
import parseEditorRawData from "@/utils/parseEditorRawData"
import RichtText from "@/old-components/Richtext/Richtext"
import type { RichTextImageSection } from "@/utils/strapi/sections/RichTextImage"

const RichTextImage: FC<RichTextImageSection> = (props: RichTextImageSection) => {
  const { title, image, text, imagePosition = "right" } = props;
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
    <section>
      <Container>
        <div className="flex flex-col space-y-6">
          {
            title ? <h3 className="font-Poppins text-10 font-bold leading-[125%] w-t:text-8.5 w-p:text-6">{title}</h3> : null
          }
          <div className="grid w-p:grid-cols-1 w-t:grid-cols-1 grid-cols-2 gap-6">
            {
              imagePosition === "left"
                ? renderImage()
                : null
            }
            {
              richTextMarkup
                ? <RichtText data={{content: richTextMarkup}}/>
                : null
            }
            {
              imagePosition === "right"
                ? renderImage()
                : null
            }
          </div>
        </div>
      </Container>
    </section>
  )
}

export default RichTextImage