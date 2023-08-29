import { FC } from "react"
import cn from "classnames"
import RichtText from "@/old-components/Richtext/Richtext"
import DescriptionSectionComponentData from "@/types/DescriptionSection.types"


const DescriptionSection: FC<DescriptionSectionComponentData> = ({ title, description, classNames, titleStyles, descriptionStyles, mode = "dark", action }: DescriptionSectionComponentData) => {
  return <div className={cn("", classNames, {"text-white bg-black": mode === 'dark', "bg-white text-black": mode === 'light', "bg-transparent text-black": mode === 'transparent'})}>
    <h1 className={cn("text-6 font-bold font-Poppins leading-[30px]", titleStyles)}>{ title }</h1>
    <div className={cn("descriptionSection", descriptionStyles)}>
      <RichtText font={mode} data={{ content: description }} />
      <slot name="actionDescription">{ action }</slot>
    </div>
  </div>
}

export default DescriptionSection