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
      data?.type === "vertical"
        ? <div className={cn("rounded-lg flex flex-col h-full overflow-hidden", {
          "border border-surface-200 border-solid": data?.border,
          "cursor-pointer hover:shadow-2xl": !!onClick
        })} onClick={onClick}>
          <div>
            <Aspect ratio="2/1">
              <Image classNames="w-full h-full" classNamesImg="w-full h-full object-cover" src={data?.image} alt="image" />
            </Aspect>
          </div>
          <div className={cn("px-3 flex flex-col h-full", classNames, { "bg-surface-0": data?.background })}>
            <p className="pt-3 mb-2 font-texts font-normal text-surface-500 text-xs">{data?.subtitle?.toLocaleUpperCase()}</p>
            <p className="mb-2 font-texts font-bold text-base">{data?.title}</p>
            <RichtText data={{
              content: data?.text
            }} classNames="mb-2" />
            <div className="flex justify-end h-full items-end mb-3">
              {
                data.isLink === true
                  ? <div
                    onClick={onClick}
                    className="flex items-center justify-end font-texts font-bold"
                  >
                    <span className="mr-1">Ver más</span>
                    <span className="material-symbols-outlined icon select-none">chevron_right</span>
                  </div>
                  : null
              }
            </div>
          </div>
        </div>
        : data.type === "horizontal"
          ? <div className={cn("rounded-lg h-full flex overflow-hidden", {
            "bg-surface-0": data?.background,
            "border border-surface-200 border-solid": data?.border,
            "cursor-pointer hover:shadow-2xl": !!onClick
          })}
            onClick={onClick}
          >
            <Image
              alt={"image"}
              src={data.image}
              classNamesImg="w-full h-full object-cover"
              classNames="w-1/3 h-full"
            />
            {/* <Image classNames="w-full h-full aspect-3/4" src={data.image} alt="image" /> */}
            <div className={cn("px-2 flex flex-col break-words h-auto w-full", classNames)}>
              <p className="pt-3 mb-2 font-texts font-normal text-surface-500 text-xs">{data?.subtitle?.toLocaleUpperCase()}</p>
              <p className="mb-2 font-texts font-bold text-base">{data?.title}</p>
              <RichtText data={{
                content: data?.text
              }} classNames="mb-2 pb-2 text-surface-500" />
              {
                data?.isLink === true
                  ? <div
                    onClick={onClick}
                    className="flex items-center justify-end font-texts font-bold"
                  >
                    <span className="mr-1">Ver más</span>
                    <span className="material-symbols-outlined icon select-none">chevron_right</span>
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
