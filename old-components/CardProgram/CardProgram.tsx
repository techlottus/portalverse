import { FC, memo } from "react"
import cn from "classnames"
import CardProgramData from "@/types/CardProgram.types"
import Image from "@/old-components/Image"
import LinkIcons from "@/old-components/LinkLottus"


const CardProgram: FC<CardProgramData> = memo(({ title, link, image, classNames , onClick, aspectImg = "aspect-2/1"}: CardProgramData) => {

  return <div className={cn("cardProgram bg-white border-1 border-solid border rounded-md flex flex-col h-[200px]", classNames)}>
      <div>
      {
        !!image
          ? <Image classNames={cn("w-full", aspectImg)} alt="contact-image"  src={image.src} />
          : <div className="bg-[gray] rounded w-22 h-22" />
      }
      </div>
      <div className="flex flex-col h-full">
      <p className="font-Nunito-Sans font-normal text-4.5 mt-3 mb-2 mx-3">{title}</p>
      <div className="w-full h-full flex justify-end pb-2 font-Nunito font-bold items-end">
        <LinkIcons data={link} onClick={onClick}/>
        <span className="material-icons icon">chevron_right</span>
      </div>
      </div>
    </div>
})

export default CardProgram