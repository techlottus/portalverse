import { FC, memo } from "react";
import CardProgramData from "@/types/CardProgram.types";
import Image from "@/old-components/Image";
import Aspect from "@/components/Aspect";
import cn from "classnames";

const CardProgram: FC<CardProgramData> = memo(({ title, subtitle, link, image, classNames, onClick, aspectImg = "aspect-2/1" }: CardProgramData) => {

  return <div className={cn("cardProgram bg-surface-0 border-1 border-solid border border-surface-200 rounded-md flex flex-col hover:shadow-30 overflow-hidden", {
    "cursor-pointer": !!onClick
  }, classNames)} onClick={onClick}>
    <div>
      {
        !!image
          ? <Aspect ratio="2/1">
            <Image classNames="w-full h-full" classNamesImg="w-full h-full object-cover" alt="contact-image" src={image.src} />
          </Aspect>
          : <div className="bg-surface-500 rounded w-22 h-22" />
      }
    </div>
    <div className="flex flex-col h-full">
      {subtitle ?
        <p className="font-texts font-normal text-gray-500 text-base mt-2 mb-1 mx-3">{subtitle}</p>
        : null
      }
      <p className={cn("font-texts font-normal text-4.5 mb-2 mx-3", { "mt-3": !subtitle })}>{title}</p>
      <div className="w-full h-full flex justify-end pb-3 pr-1 font-texts font-bold items-end">
        <div
          onClick={onClick}
          className="flex items-center justify-end font-texts font-bold"
        >
          <span className="mr-1 select-none">Ver más</span>
          <span className="material-symbols-outlined icon select-none">chevron_right</span>
        </div>
      </div>
    </div>
  </div>
})

export default CardProgram