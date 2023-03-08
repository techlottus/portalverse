import { FC, useEffect, useState } from "react"
import cn from "classnames"
import LinkContactTargetComponentData from "@/types/LinkContactTarget.types"

const LinkContactTarget: FC<LinkContactTargetComponentData> = ({ type, info, classNames }: LinkContactTargetComponentData) => {

  const [ manage, setManage ] = useState("mailto:")

  useEffect(() => {
    setManage(type === "email" ? "mailto:" : "tel:+")
  }, [type])

  return <a className={cn("font-Nunito font-normal text-base leading-5 text-SC/Blackandgrey/B-60", classNames)} target="_blank" rel="noreferrer noopener" href={`${manage}${info}`}>{info}</a>
}

export default LinkContactTarget