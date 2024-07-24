import { FC } from "react"
import cn from "classnames"
import Image from "@/old-components/Image"
import NumbersPortalverse from "../NumbersPortalverse/NumbersPortalverse"

const BannerNumeralia: FC<any> = ({ data: { image, title, subtitle, statics, overlay }, classNames }: any) => {
  return <section className="relative flex flex-col col-span-12 w-t:col-span-8 w-p:col-span-4">
    <Image classNames="w-d:aspect-7/2 w-t:aspect-2/1 w-p:aspect-3/4 absolute top-0 w-t:hidden w-p:hidden" classNamesImg="w-full h-full object-cover" src={image?.desktop} alt="imagen" />
    <Image classNames="w-d:aspect-7/2 w-t:aspect-2/1 w-p:aspect-3/4 absolute top-0 w-d:hidden w-p:hidden" classNamesImg="w-full h-full object-cover" src={image?.tablet} alt="imagen" />
    <Image classNames="w-d:aspect-7/2 w-t:aspect-2/1 w-p:aspect-3/4 absolute top-0 w-d:hidden w-t:hidden" classNamesImg="w-full h-full object-cover" src={image?.mobile} alt="imagen" />
    {
      overlay ?
        <div className={cn("absolute w-full h-full", classNames, {
          "bg-surface-0 opacity-50": overlay === "white",
          "bg-surface-950 opacity-50": overlay === "dark"
        })}></div>
        : null
    }
    <section className={cn("w-full numeralia flex flex-col justify-center w-p:justify-start px-6 w-d:py-8 w-t:py-12 w-p:py-8 w-p:h-auto absolute gap-6 text-surface-0", classNames, {
      "text-surface-0": overlay === "dark",
      "text-surface-950" : overlay === "white"
    })}>
      <h3 className="font-headings font-bold w-d:leading-13 w-t:leading-7.5 w-p:leading-7.5 w-d:text-13 w-t:text-8.5 w-p:text-7.5">{title}</h3>
      <p className="font-texts font-normal w-d:text-base w-t:text-6 w-p:text-6 w-d:leading-12.5 w-t:leading-4 w-p:leading-4"><b>{subtitle}</b></p>
      <div className="w-d:flex w-t:flex w-p:grid w-p:grid-cols-2 gap-4 w-p:gap-3">
        {
          statics?.map((item:any, i:number) => <section className={cn("max-w-72", "w-p:mt-6")} key={`section-numbers-${i}`}>
            <NumbersPortalverse data={{...item, iconClassNames: overlay === "white" ? "!text-black" : "text-white"}} />
          </section>)
        }
      </div>
    </section>
  </section>
}

export default BannerNumeralia