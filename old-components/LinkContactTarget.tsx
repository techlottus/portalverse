import { FC, useEffect, useState } from "react"
import cn from "classnames"
import LinkContactTargetComponentData from "@/types/LinkContactTarget.types"

const LinkContactTarget: FC<LinkContactTargetComponentData> = ({ type, info, alternativeText, classNames }: LinkContactTargetComponentData) => {

  const [ manage, setManage ] = useState("mailto:")

  useEffect(() => {
    setManage(type === "email" ? "mailto:" : "tel:+")
  }, [type])

  const text = alternativeText ? alternativeText : info;

  return <a className={cn("font-texts font-normal text-base leading-5 text-surface-500", classNames)} target="_blank" rel="noreferrer noopener" href={`${manage}${info}`}>{text}</a>
}

export default LinkContactTarget