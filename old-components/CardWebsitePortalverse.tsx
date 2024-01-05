import { FC } from "react";
import Aspect from "@/components/Aspect";
import Image from "@/old-components/Image";
import LinkIcons from "@/old-components/LinkLottus";
import RichtText from "@/old-components/Richtext/Richtext";
import cn from "classnames";
import type { CardWebsitePortalverseData } from "@/types/CardWebsitePortalverse.types";

const CardWebsitePortalverse: FC<CardWebsitePortalverseData> = ({ data, classNames, onClick }: CardWebsitePortalverseData) => {
  return <>
    {
      data.type === "vertical"
        ? <div className={cn("rounded-b-lg flex flex-col h-full ",{
          "cursor-pointer hover:shadow-2xl": !!onClick
        })} onClick={onClick}>
          <div>
            <Aspect ratio="2/1">
              <Image classNames="w-full h-full" classNamesImg="w-full h-full object-cover" src={data.image} alt="image" />
            </Aspect>
          </div>
          <div className={cn("px-3 flex flex-col h-full", classNames, { "border-l border-r border-b rounded-b-lg border-surface-300 border-solid": data.border, "bg-surface-0": data.background })}>
            <p className="pt-3 mb-2 font-texts font-normal text-surface-500 text-xs">{data.subtitle?.toLocaleUpperCase()}</p>
            <p className="mb-2 font-texts font-bold text-base">{data.title}</p>
            <RichtText data={{
              content: data.text
            }} classNames="mb-2" />
            <div className="flex justify-end h-full items-end mb-3">
              {
                data.isLink === true
                  ? <LinkIcons data={data.link} onClick={onClick} />
                  : null
              }
            </div>
          </div>
        </div>
        : data.type === "horizontal"
          ? <div className={cn("rounded-b-lg h-full flex cursor-pointer", {"cursor-pointer hover:shadow-2xl": !!onClick})} onClick={onClick}>
            <Image
              alt={"image"}
              src={data.image}
              classNamesImg="w-full h-full object-cover"
              classNames="w-1/3 h-full"
            />
            {/* <Image classNames="w-full h-full aspect-3/4" src={data.image} alt="image" /> */}
            <div className={cn("px-2 flex flex-col break-words h-auto w-full", classNames, { "border-r border-b border-t rounded-r-lg": data.border, "bg-surface-0": data.background })}>
              <p className="pt-3 mb-2 font-texts font-normal text-surface-500 text-xs">{data.subtitle?.toLocaleUpperCase()}</p>
              <p className="mb-2 font-texts font-bold text-base">{data.title}</p>
              <RichtText data={{
                content: data.text
              }} classNames="mb-2 pb-2 text-surface-500" />
              {
                data.isLink === true
                  ? <div className="flex justify-end h-full pb-2 items-end">
                    <LinkIcons data={data?.link} onClick={onClick} />
                  </div>
                  : null
              }
            </div>
          </div>
          : null
    }
  </>
};

export default CardWebsitePortalverse;
