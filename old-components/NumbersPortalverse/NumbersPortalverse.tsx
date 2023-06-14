import { FC, memo, useState } from "react" 
import cn from "classnames"
import { NumbersPortalverseData } from "@/types/NumbersPortalverse.types"
import CountUp from "react-countup"
import VisibilitySensor from "react-visibility-sensor"

const NumbersPortalverse: FC<NumbersPortalverseData> = memo(({data, classNames }: NumbersPortalverseData) => {

  const [ finishedCount, setFinishedCount ] = useState<boolean>(false);

  const customStyles = {
    boxShadow: `5px 5px 0px 0px ${data?.typeShadowColor}`,
  };

  const iconsClassNames = data?.iconClassNames;

  return <>
    <div style={customStyles} className={cn("wrapperNumbers rounded-lg", classNames, {
      "shadow-30 bg-white": data.boxShadow,
      "border border-[#CDCDCD]": data.bordered,
      "rounded-lg": !!data?.isShadowColor,
      "shadow-pastelBlueShadowLeft": data.isShadowColor === true && data.typeShadowColor === 'blue-pastel-left',
      "shadow-pastelYellowShadowLeft": data.isShadowColor === true && data.typeShadowColor === 'yellow-pastel-left',
      "shadow-pastelRedShadowLeft": data.isShadowColor === true && data.typeShadowColor === 'red-pastel-left',
      "shadow-pastelGrayShadowLeft": data.isShadowColor === true && data.typeShadowColor === 'gray-pastel-left',
      "shadow-blueShadowLeft": data.isShadowColor === true && data.typeShadowColor === 'blue-left',
      "shadow-pastelBlueShadowRight": data.isShadowColor === true && data.typeShadowColor === 'blue-pastel-right',
      "shadow-pastelYellowShadowRight": data.isShadowColor === true && data.typeShadowColor === 'yellow-pastel-right',
      "shadow-pastelRedShadowRight": data.isShadowColor === true && data.typeShadowColor === 'red-pastel-right',
      "shadow-pastelGrayShadowRight": data.isShadowColor === true && data.typeShadowColor === 'gray-pastel-right',
      "shadow-blueShadowRight": data.isShadowColor === true && data.typeShadowColor === 'blue-right'
    })}>
      <div className= {cn("content-number flex items-center pt-4 wrapperNumbers", classNames, {
        "pt-0 px-0" : data.isShadowColor === false && data.container === false && data.bordered === false && data.boxShadow === false
      })}>
        {
          data?.icon ?
            <p
              className={cn(
                "icono material-icons pr-2 !text-10 text-SC/Blackandgrey/B-60",
                `!${iconsClassNames}`,
                "w-p:hidden w-p:invisible w-t:invisible w-p:w-0 w-t:w-0"
                )}
            >
              {data.icon}
            </p>
          : null
        }
        {
          data?.prefix ?
            <p className="font-Poppins text-10 w-t:text-6 w-p:text-6 font-bold leading-[125%] pr-2">{data?.prefix}</p>
          : null
        }
        <CountUp separator="," start={0} end={data?.maxNumber} onEnd={() => setFinishedCount(true)} >
          {({ countUpRef, start }) => (
            <VisibilitySensor
              onChange={(isVisible: boolean) => {
                if(!isVisible || finishedCount) return;
                start();
              }}
              delayedCall
            >
              <span className="font-Poppins text-10 w-t:text-6 w-p:text-6 font-semibold leading-[125%] pr-2" ref={countUpRef} />
            </VisibilitySensor>
          )}
        </CountUp>
        <p className="font-Poppins text-10 w-t:text-6 w-p:text-6 font-bold leading-[125%] pr-2">{data.suffix}</p>
      </div>
      <div className= {cn("pb-4 wrapperNumbers", classNames, {
        "pt-0" : data.isShadowColor === false && data.container === false && data.bordered === false && data.boxShadow === false
    })}>
        {
          data?.title ?
            <p className="font-Nunito-Sans font-semibold text-lg leading-5 mb-2">{data?.title}</p>
          : null
        }
        {
          data?.body ?
            <p className="sub font-Poppins font-normal text-base w-t:text-sm w-p:text-sm">{data?.body}</p>
          : null
        }
      </div>
    </div>
  </>
})

export default NumbersPortalverse