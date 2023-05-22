import RichtText from "@/old-components/Richtext/Richtext"
import Image from "@/old-components/Image"
import { FC } from "react"
import { RichTextImageSection } from "@/utils/strapi/sections/RichTextImage"
import Container from "@/layouts/Container.layout"

const RichTextImage: FC<RichTextImageSection> = (props: RichTextImageSection) => {
  const { title, image, text, imagePosition = "right" } = props;

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
          <div className="grid grid-cols-2 w-t:grid-cols-2 w-p:grid-cols-1 gap-6">
          {
            imagePosition === "left"
              ? renderImage()
              : null
          }
          <div>
            {text}
          </div>
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