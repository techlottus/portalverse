import RichtText from "@/old-components/Richtext/Richtext"
import Image from "@/old-components/Image"
import { FC } from "react"
import { RichTextImageSection } from "@/utils/strapi/sections/RichTextImage"

const RichTextImage: FC<RichTextImageSection> = ({ image, text }: RichTextImageSection) => {

  
  return <>
  <div className="grid grid-cols-2 w-t:grid-cols-2 w-p:grid-cols-1 gap-6">
    <div>
      <RichtText data={{
          content: text
        }} />
    </div>
    <div>
    <Image classNamesImg="!h-auto !static" src={image?.data?.attributes?.url} alt="imagen" />
    </div>
  </div>
  </>
  
}

export default RichTextImage