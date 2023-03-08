import { FC, memo } from "react" 
import cn from "classnames"
import BannerPortalverseComponentData from "@/types/BannerPortalverse.types"
import Image from "@/old-components/Image"
import Button from "@/old-components/Button/Button"


const BannerPortalverse: FC<BannerPortalverseComponentData> = memo(({ data, classNames, onClick }: BannerPortalverseComponentData) => {

  return<>
      <div style={{"height": data?.height}} className={cn(`relative flex w-p:hidden`, classNames)} >
        <Image classNames="w-full h-full w-t:hidden w-p:hidden aspect-7/2" src={data.image?.desktop!} alt="image" />
        <Image classNames="w-full h-full w-d:hidden w-p:hidden aspect-7/2" src={data.image?.tablet!} alt="image" />
        <Image classNames="w-full h-full w-d:hidden w-t:hidden aspect-4/3" src={data.image?.mobile!} alt="image" />
        <div className={cn("absolute w-full h-full", classNames, {
          "bg-[#ffffff80]": data.overlayWhite,
          "bg-[#00000080]": data.overlayDak
          })}></div>
        <div className= {cn("absolute w-full h-full flex", classNames, {
          "justify-center text-center" : data.position === "center",
          "justify-end text-right" : data.position === "right",
          "items-center" : data.position === "middle",
          "items-center text-center": data.position === "middle-left",
          "justify-end items-center text-end": data.position === "middle-right",
          "justify-center items-center text-center": data.position === "middle-center",
          "justify-start items-end": data.position === "left-bottom",
          "justify-center items-end text-center": data.position ==="center-bottom",
          "justify-end items-end text-end": data.position === "right-bottom"
          })}
          >
          <div className="p-10">
            <h1 className={cn("font-Poppins font-bold w-d:leading-15 w-t:leading-7.5 w-p:leading-7.5 w-d:text-6.5 w-t:text-6 w-p:text-6", classNames, {"text-white": data.overlayDak || data.font === "light" })}>{ data.title }</h1>
            <h3 className={cn("font-Nunito-Sans font-normal w-d:leading-5 w-t:leading-[17.5px] w-p:leading-[17.5px] w-d:text-base w-t:text-3.5 w-p:text-3.5", classNames, {"text-white": data.overlayDak || data.font === "light"})}>{ data.subtitle }</h3>
            {
              !data.noAction && data.overlayDak
              ? <div className={cn("mt-2 flex", classNames, {
                "justify-end" : data.position=== "right",
                "justify-center" : data.position ==="center",
                "items-center justify-center": data.position === "middle-center",
                "items-center justify-end": data.position === "middle-right",
                "items-end" : data.position === "left-bottom",
                "items-end justify-center": data.position === "center-bottom",
                "items-end justify-end": data.position === "right-bottom"
                })}>
                  <Button darkOutlined data={data?.button} onClick={onClick}/>
                </div>
              : !data.noAction && data.overlayWhite 
              ? <div className={cn("mt-2 flex", classNames, {
                "justify-end" : data.position=== "right",
                "justify-center" : data.position ==="center",
                "items-center justify-center": data.position === "middle-center",
                "items-center justify-end": data.position === "middle-right",
                "items-end" : data.position === "left-bottom",
                "items-end justify-center": data.position === "center-bottom",
                "items-end justify-end": data.position === "right-bottom"
                })}><Button dark data={data.button} onClick={onClick}/></div>
              : !data.noAction && data.font === "light"
              ? <div className={cn("mt-2 flex", classNames, {
                "justify-end" : data.position=== "right",
                "justify-center" : data.position ==="center",
                "items-center justify-center": data.position === "middle-center",
                "items-center justify-end": data.position === "middle-right",
                "items-end" : data.position === "left-bottom",
                "items-end justify-center": data.position === "center-bottom",
                "items-end justify-end": data.position === "right-bottom"
                })}><Button darkOutlined data={data?.button} onClick={onClick}/></div>
              : data.noAction
              ? null : <div className={cn("mt-2 flex", classNames, {
                "justify-end" : data.position=== "right",
                "justify-center" : data.position ==="center",
                "items-center justify-center": data.position === "middle-center",
                "items-center justify-end": data.position === "middle-right",
                "items-end" : data.position === "left-bottom",
                "items-end justify-center": data.position === "center-bottom",
                "items-end justify-end": data.position === "right-bottom"
                })}><Button dark data={data?.button} onClick={onClick}/></div>
            }
          </div>
      </div>
    </div>
    {/**Mobile banner */}
    <div className="w-d:hidden w-t:hidden">
      <div className={cn(`relative flex h-[${data.height}]`, classNames)} >
        <Image classNames="w-full h-full w-t:hidden w-p:hidden aspect-7/2" src={data.image?.desktop!} alt="image" />
        <Image classNames="w-full h-full w-d:hidden w-p:hidden aspect-7/2" src={data.image?.tablet!} alt="image" />
        <Image classNames="w-full h-full w-d:hidden w-t:hidden aspect-4/3" src={data.image?.mobile!} alt="image" />
        <div className={cn("absolute w-full h-full", classNames, {
          "bg-[#ffffff80]": data.overlayWhite,
          "bg-[#00000080]": data.overlayDak
          })}></div>
        <div className= {cn("absolute w-full h-full flex", classNames, {
          "justify-center text-center" : data.position === "center",
          "justify-end text-right" : data.position === "right",
          "items-center" : data.position === "middle",
          "items-center text-center": data.position === "middle-left",
          "justify-end items-center text-end": data.position === "middle-right",
          "justify-center items-center text-center": data.position === "middle-center",
          "justify-start items-end": data.position === "left-bottom",
          "justify-center items-end text-center": data.position ==="center-bottom",
          "justify-end items-end text-end": data.position === "right-bottom"
          })}
          >
          <div className="p-10">
            <h1 className={cn("font-Poppins font-bold w-d:leading-15 w-t:leading-7.5 w-p:leading-7.5 w-d:text-6.5 w-t:text-6 w-p:text-6", classNames, {"text-white": data.overlayDak || data.font === "light"})}>{ data.title }</h1>
            <h3 className={cn("font-Nunito-Sans font-normal w-d:leading-5 w-t:leading-[17.5px] w-p:leading-[17.5px] w-d:text-base w-t:text-3.5 w-p:text-3.5", classNames, {"text-white": data.overlayDak || data.font === "light" })}>{ data.subtitle }</h3>
          </div>
        </div>
      </div>
      <div>
        {
          !data.noAction
          ? <div className="mt-2"><Button dark data={{...data.button, isExpand:true}} onClick={onClick}/></div>
          : null
        }
      </div>
    </div>
  </>
})

export default BannerPortalverse