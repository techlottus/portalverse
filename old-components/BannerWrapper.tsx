import { FC, memo } from "react" 
import Aspect from "@/components/Aspect"
import BannerWrapperData from "@/types/BannerWrapper.types"
import Banner from "@/old-components/Banner"
import Button from "@/old-components/Button/Button"
import RichtText from "@/old-components/Richtext/Richtext"
import Image from "@/old-components/Image"
import cn from "classnames"

const BannerWrapper: FC<BannerWrapperData> = memo(({ data: { urlImage, title, subtitle,description, action, overlayDark, overlayWhite }, classNames, typeBanner="banner", banner, font = "light", onBtn}: BannerWrapperData) => {
  return <>
    {
      typeBanner === "sm"
        ? <>
        <div className={cn("w-full h-full relative flex flex-col grow")}>
          <div className="w-t:hidden w-p:hidden">
            <Aspect ratio="4/3">
              <Image classNames="w-full h-full" classNamesImg="w-full h-full object-cover" alt="image" src={urlImage.desktop} />
            </Aspect>
          </div>
          <div className="w-d:hidden w-t:hidden">
            <Aspect ratio="4/3">
              <Image classNames="w-full h-full" classNamesImg="w-full h-full object-cover" alt="image" src={urlImage.mobile}/>
            </Aspect>
          </div>
          <div className="w-d:hidden w-p:hidden">
            <Aspect ratio="4/3">
              <Image classNames="w-full h-full" classNamesImg="w-full h-full object-cover" alt="image" src={urlImage.mobile}/>
            </Aspect>
          </div>
          <div className={cn("absolute w-full h-full z-10 p-6", classNames, {
            "text-white": font === "light",
            "text-black": font === "dark" ,
            })}>
              <h1 className="font-Poppins font-bold w-d:leading-15 w-t:leading-7.5 w-p:leading-7.5 w-d:text-6 w-t:text-6 w-p:text-6">{ title }</h1>
              <h3 className="font-Nunito font-normal w-d:leading-5 w-t:leading-[17.5px] w-p:leading-[17.5px] w-d:text-base w-t:text-3.5 w-p:text-3.5">{ subtitle }</h3>
              {
                description && description !== "" ?
                <RichtText classNames="mt-6" font="dark" data={{
                  content: description
                }} /> :
                null
              }
            </div>
            <div className={cn("absolute w-full h-full", classNames, {
          "bg-[#ffffff80]": overlayWhite,
          "bg-[#00000080]": overlayDark
          })}></div>
        </div>
        <div className="mt-6">
            <Button dark data={{...action, isExpand: true}} onClick={onBtn} />
          </div>
        
          {/* <div style={{"backgroundImage":`url(${urlImage?.desktop})`}} className={cn("mt-6 col-span-12 w-t:col-span-8 w-p:col-span-4 bg-cover p-10 relative" , classNames)}>
            <div className={cn("relative", classNames, {
            "text-white": font === "light",
            "text-black": font === "dark" ,
            })}>
              <h1 className="font-Poppins font-bold w-d:leading-15 w-t:leading-7.5 w-p:leading-7.5 w-d:text-6 w-t:text-6 w-p:text-6">{ title }</h1>
              <h3 className="font-Nunito font-normal w-d:leading-5 w-t:leading-[17.5px] w-p:leading-[17.5px] w-d:text-base w-t:text-3.5 w-p:text-3.5">{ subtitle }</h3>
              {
                description && description !== "" ?
                <RichtText classNames="mt-6" font="dark" data={{
                  content: description
                }} /> :
                null
              }
            </div>
          </div>
          <div className="mt-6">
            <Button dark data={{...action, isExpand: true}} onClick={onBtn} />
          </div> */}
        </>
        : <Banner data={banner}/>    
    }
  </>
})
export default BannerWrapper