import { FC } from "react"
import cn from "classnames";
import Video from "@/old-components/Video";
import Button from "@/old-components/Button/Button";
import CardWebsite from "@/old-components/CardWebsite";
import RichtText from "@/old-components/Richtext/Richtext";
import parseEditorRawData from "@/utils/parseEditorRawData";
import Container from "@/layouts/Container.layout";
import { useRouter } from "next/router";
import type { CardsVideoContentData } from "@/utils/strapi/sections/CardsVideoContent";

const CardsVideoContent: FC<CardsVideoContentData> = (props: CardsVideoContentData) => {
 const { title, subtitle, cards, textPositionCardsVideoContent, videoItem, button } = props
 const formatDescription = parseEditorRawData(subtitle)
 const router = useRouter();

 const formattedCards = cards?.map((item, index) => {
  const card = {
   id: index?.toString(),
   urlImage: item?.image?.data?.attributes?.url,
   subtitle: item?.subtitle,
   title: item?.title,
   text: parseEditorRawData(item?.content),
   type: item?.type,
   border: true,
   allContent: true,
   height: "",
   isShowCardWebsiteContent: true,
   background: true,
   link: true,
   linkText: {
    text: item?.linkText,
    size: "",
    isBold: false,
    disabled: false,
    id: "",
    icon: "",
    href: item?.linkUrl,
    test: ""
   },
   linkIcon: {
    text: "",
    size: "",
    isBold: false,
    disabled: false,
    id: "",
    icon: "",
    href: "",
    test: ""
   },
   wrapper: true
  }
  return card
 })

 return <>
  <section>
   <Container>
    {
     title ?
      <div>
       <h3 className="font-headings font-bold text-10 leading-12 w-p:text-6 w-p:leading-7 mb-6">{title}</h3>
      </div>
      : null
    }
    {
     subtitle ?
      <div>
       <RichtText data={{
        content: formatDescription
       }} />
      </div>
      : null
    }
    <div className={cn('w-d:flex gap-6', { "w-d:flex-row-reverse": textPositionCardsVideoContent === 'right' })}>
     <div className="w-d:w-1/2 flex flex-col justify-center">
      <Video data={{ options: { id: videoItem.providerId, type: 'single', controls: true } }} />
     </div>
     <div className="w-d:w-1/2 flex flex-col justify-center">
      <section className="grid w-d:grid-cols-2 gap-6 w-t:grid-cols-2 w-p:grid-cols-1">
       {
        formattedCards?.map((item: any, i: number) => <section className="w-full mb-6" key={`section-blog-${i}`}>
         <CardWebsite data={item} />
        </section>)
       }
      </section>
      <div className="flex justify-center">
       <Button
        dark
        darkOutlined={button?.variant === "outlined_negative"}
        data={{
         title: button?.label,
         icon: button?.iconName,
         isExpand: false,
        }}
        onClick={() => {
         router.push("egresados");
        }}
       />
      </div>
     </div>
    </div>
   </Container>
  </section>
 </>
}

export default CardsVideoContent