import { FC, memo, useState } from "react" 
import cn from "classnames"
import { NumbersPortalverseData } from "@/types/NumbersPortalverse.types"
import CountUp from "react-countup"
import VisibilitySensor from "react-visibility-sensor"


const NumbersPortalverse: FC<NumbersPortalverseData> = memo(({data, classNames}: NumbersPortalverseData) => {

  const [ finishedCount, setFinishedCount ] = useState<boolean>(false);

  return <>
    <div className={cn("wrapperNumbers", classNames, {
      "shadow-30 rounded-lg bg-white": data.boxShadow,
      "border border-[#CDCDCD]": data.bordered,
      "shadow-pastelBlueShadowLeft rounded-lg": data.isShadowColor === true && data.typeShadowColor === 'blue-pastel-left',
      "shadow-pastelYellowShadowLeft rounded-lg": data.isShadowColor === true && data.typeShadowColor === 'yellow-pastel-left',
      "shadow-pastelRedShadowLeft rounded-lg": data.isShadowColor === true && data.typeShadowColor === 'red-pastel-left',
      "shadow-pastelGrayShadowLeft rounded-lg": data.isShadowColor === true && data.typeShadowColor === 'gray-pastel-left',
      "shadow-blueShadowLeft rounded-lg": data.isShadowColor === true && data.typeShadowColor === 'blue-left',
      "shadow-pastelBlueShadowRight rounded-lg": data.isShadowColor === true && data.typeShadowColor === 'blue-pastel-right',
      "shadow-pastelYellowShadowRight rounded-lg": data.isShadowColor === true && data.typeShadowColor === 'yellow-pastel-right',
      "shadow-pastelRedShadowRight rounded-lg": data.isShadowColor === true && data.typeShadowColor === 'red-pastel-right',
      "shadow-pastelGrayShadowRight rounded-lg": data.isShadowColor === true && data.typeShadowColor === 'gray-pastel-right',
      "shadow-blueShadowRight rounded-lg": data.isShadowColor === true && data.typeShadowColor === 'blue-right'
    })}>
      <div className= {cn("content-number flex justify-center items-center px-4 pt-4 wrapperNumbers", classNames, {
        "pt-0 px-0" : data.isShadowColor === false && data.container === false && data.bordered === false && data.boxShadow === false
      })}>
        <p className="icono material-icons pr-2">{data.icon}</p>
        <p className="font-Poppins text-10 font-bold leading-[125%] pr-2">{data.prefix}</p>
        <CountUp separator="," start={0} end={data.maxNumber} delay={0} onEnd={() => setFinishedCount(true)} >
          {({ countUpRef, start }) => (
            <VisibilitySensor onChange={() => !finishedCount ? start : null} delayedCall>
              <span className="font-Poppins text-10 font-bold leading-[125%] pr-2" ref={countUpRef} />
            </VisibilitySensor>
          )}
        </CountUp>
        <p className="font-Poppins text-10 font-bold leading-[125%] pr-2">{data.suffix}</p>
      </div>
      <div className= {cn("p-4 wrapperNumbers", classNames, {
        "pt-0" : data.isShadowColor === false && data.container === false && data.bordered === false && data.boxShadow === false
    })}>
        <p className="font-Poppins font-semibold text-lg mb-2 w-p:text-center w-t:text-center">{data.title}</p>
        <p className="sub font-Poppins font-normal text-lg">{data.body}</p>
      </div>
    </div>
  </>
})

export default NumbersPortalverse