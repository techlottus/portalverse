import { FC } from "react";
import Container from "@/layouts/Container.layout";
import { BannerCardsData } from "@/utils/strapi/sections/BannerCards";
import ContentFullLayout from "@/layouts/ContentFull.layout";
import Aspect from "../Aspect";
import ContentInsideLayout from "@/layouts/ContentInside.layout";
import RichtText from "@/old-components/Richtext/Richtext";
import parseEditorRawData from "@/utils/parseEditorRawData";


const BannerCardsSection: FC<BannerCardsData> = (props: BannerCardsData) => {
  const { deskImage, tabletImage, mobileImage, overlayBannerCards, cardIconItems } = props;
  console.log(props)

  const cardIcon = (cardIconItem?: any, i?: number) =>(
    <div key={i} className="flex gap-2 items-center px-2.5 tablet:px-2 py-3 min-h-20	mobile:min-h-16 tablet:max-w-78 shadow-lg rounded-lg bg-white ">
      <span className={`material-symbols-outlined select-none !text-7 text-[${cardIconItem?.IconColor}]`}>{cardIconItem?.IconName}</span>
      <div className="-mb-5 grow ">
        <RichtText data={{ content: parseEditorRawData(cardIconItem.RichText || "") }} />
      </div>
    </div>)

  return (
    <section>
      <ContentFullLayout classNames="">
        <Aspect ratio="2/1">
        <div className="w-full h-full">
          <div className="relative flex">
              <img src={deskImage?.data?.attributes?.url} className="w-full h-full" />
              <section className="absolute w-full h-full flex  py-20 px-45">
                <div className="flex flex-col gap-12 items-center justify-center">
                  <div className="grid grid-cols-1 tablet:grid-cols-2 desktop:grid-cols-3 grid-flow-row gap-6">
                    {cardIconItems?.map((cardIconItem, i) => cardIcon(cardIconItem, i))}
                  </div></div>
              </section>
          </div>
          
        </div>
        </Aspect>
      </ContentFullLayout>
    </section>
  );
}

export default BannerCardsSection