import { FC, memo } from "react"
import CardProgramData from "@/types/CardProgram.types"
import Image from "@/old-components/Image"
import LinkIcons from "@/old-components/LinkLottus"
import Aspect from "@/components/Aspect"
import cn from "classnames"


const CardProgram: FC<CardProgramData> = memo(({ title, subtitle, link, image, classNames , onClick, aspectImg = "aspect-2/1"}: CardProgramData) => {

  return <div className={cn("cardProgram bg-white border-1 border-solid border rounded-md flex flex-col", classNames)}>
      <div>
      {
        !!image
          ? <Aspect ratio="2/1">
              <Image classNames="w-full h-full" classNamesImg="w-full h-full object-cover" alt="contact-image" src={image.src} />
            </Aspect>
          : <div className="bg-[gray] rounded w-22 h-22" />
      }
      </div>
      <div className="flex flex-col h-full">
      {subtitle ? 
        <p className="font-Nunito-Sans font-normal text-gray-500 text-base mt-2 mb-1 mx-3">{subtitle}</p>
      : null
      }
      <p className={cn("font-Nunito-Sans font-normal text-4.5 mb-2 mx-3", {"mt-3": !subtitle})}>{title}</p>
      <div className="w-full h-full flex justify-end pb-2 font-Nunito font-bold items-end">
        <LinkIcons data={link} onClick={onClick}/>
        <span className="material-icons icon">chevron_right</span>
      </div>
      </div>
    </div>
})

export default CardProgram