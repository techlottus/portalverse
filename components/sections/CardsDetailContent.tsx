import { FC } from "react"
import cn from "classnames";
import parseEditorRawData from "@/utils/parseEditorRawData";
import CardWebsite from "@/old-components/CardWebsite";
import Container from "@/layouts/Container.layout";
import RichtText from "@/old-components/Richtext/Richtext";
import type { CardsDetailContentData } from "@/utils/strapi/sections/CardsDetailContent";

const CardsDetailContent: FC<CardsDetailContentData> = (props: CardsDetailContentData) => {
 const { title, description, links, cards, textPositionCardsDetailGroup } = props
 const formatDescription = parseEditorRawData(description)

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
    <div className={cn('w-d:flex gap-6', { "w-d:flex-row-reverse": textPositionCardsDetailGroup === 'right' })}>
     <div className="w-d:w-1/2 flex flex-col justify-center pb-4">
      {
       title ?
        <div>
         <h3 className="font-headings font-bold text-10 leading-12 w-p:text-6 w-p:leading-7 mb-6">{title}</h3>
        </div>
        : null
      }
      {
       description ?
        <div>
         <RichtText data={{
          content: formatDescription
         }} />
        </div>
        : null
      }
      {
       links?.length > 0
        ? <div>
         {
          links?.map((link, i) => {
           return (
            link?.href && link?.href
             ? <a key={i} href={link?.href} target={link?.target === "blank" ? "_blank" : "_self"} rel={link?.target === "blank" ? "noreferrer" : undefined} className="flex text-bold items-center space-x-2 pb-3">
              {
               link?.iconName && link?.iconPosition === "left"
                ? <span className="material-symbols-outlined select-none font-normal">{link?.iconName}</span>
                : null
              }
              {
               link?.text
                ? <span className="font-bold hover:underline">{link?.text}</span>
                : null
              }
              {
               link?.iconName && link?.iconPosition === "right"
                ? <span className="material-symbols-outlinedselect-none select-none font-normal">{link?.iconName}</span>
                : null
              }
             </a>
             : null
           )
          })
         }
        </div>
        : null
      }
     </div>
     {
      cards ?
       <div className="w-d:w-1/2 flex flex-col justify-center">
        {
         formattedCards?.length > 0 ?
          <div>
           {
            formattedCards?.map((item, i) => <div className="mb-6 w-full" key={`section-statistics-${i}`}>
             <CardWebsite data={item} />
            </div>
            )
           }
          </div>
          : null
        }
       </div>
       : null
     }
    </div>
   </Container>
  </section>
 </>
}

export default CardsDetailContent