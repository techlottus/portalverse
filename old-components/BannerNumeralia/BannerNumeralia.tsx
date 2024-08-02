import { FC } from "react"
import cn from "classnames"
import Image from "@/old-components/Image"
import NumbersPortalverse from "../NumbersPortalverse/NumbersPortalverse"

const BannerNumeralia: FC<any> = ({ data: { image, title, subtitle, statics, overlay }, classNames }: any) => {
  return <section className="relative flex flex-col col-span-12 tablet:col-span-8 mobile:col-span-4">
    <Image classNames="desktop:aspect-7/2 tablet:aspect-2/1 mobile:aspect-3/4 absolute top-0 tablet:hidden mobile:hidden" classNamesImg="w-full h-full object-cover" src={image?.desktop} alt="imagen" />
    <Image classNames="desktop:aspect-7/2 tablet:aspect-2/1 mobile:aspect-3/4 absolute top-0 desktop:hidden mobile:hidden" classNamesImg="w-full h-full object-cover" src={image?.tablet} alt="imagen" />
    <Image classNames="desktop:aspect-7/2 tablet:aspect-2/1 mobile:aspect-3/4 absolute top-0 desktop:hidden tablet:hidden" classNamesImg="w-full h-full object-cover" src={image?.mobile} alt="imagen" />
    {
      overlay ?
        <div className={cn("absolute w-full h-full", classNames, {
          "bg-surface-0 opacity-50": overlay === "white",
          "bg-surface-950 opacity-50": overlay === "dark"
        })}></div>
        : null
    }
    <section className={cn("w-full numeralia flex flex-col justify-center mobile:justify-start px-6 desktop:py-8 tablet:py-12 mobile:py-8 mobile:h-auto absolute gap-6 text-surface-0", classNames, {
      "text-surface-0": overlay === "dark",
      "text-surface-950" : overlay === "white"
    })}>
      <h3 className="font-headings font-bold desktop:leading-13 tablet:leading-7.5 mobile:leading-7.5 desktop:text-13 tablet:text-8.5 mobile:text-7.5">{title}</h3>
      <p className="font-texts font-normal desktop:text-base tablet:text-6 mobile:text-6 desktop:leading-12.5 tablet:leading-4 mobile:leading-4"><b>{subtitle}</b></p>
      <div className="desktop:flex tablet:flex mobile:grid mobile:grid-cols-2 gap-4 mobile:gap-3">
        {
          statics?.map((item:any, i:number) => <section className={cn("max-w-72", "mobile:mt-6")} key={`section-numbers-${i}`}>
            <NumbersPortalverse data={{...item, iconClassNames: overlay === "white" ? "!text-black" : "text-white"}} />
          </section>)
        }
      </div>
    </section>
  </section>
}

export default BannerNumeralia