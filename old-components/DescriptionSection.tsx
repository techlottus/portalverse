import { FC } from "react"
import cn from "classnames"
import RichtText from "@/old-components/Richtext/Richtext"
import DescriptionSectionComponentData from "@/types/DescriptionSection.types"


const DescriptionSection: FC<DescriptionSectionComponentData> = ({ title, description, classNames, titleStyles, descriptionStyles, mode = "dark", action }: DescriptionSectionComponentData) => {
  return <div className={cn("", classNames, {"text-surface-0 bg-surface-950": mode === 'dark', "bg-[#FAFAFA] text-surface-950": mode === 'light', "bg-transparent text-surface-950": mode === 'transparent'})}>
    <h3 className={cn("text-6 font-bold font-headings leading-8", titleStyles)}>{ title }</h3>
    <div className={cn("descriptionSection", descriptionStyles)}>
      <RichtText font={mode} data={{ content: description }} />
      <slot name="actionDescription">{ action }</slot>
    </div>
  </div>
}

export default DescriptionSection