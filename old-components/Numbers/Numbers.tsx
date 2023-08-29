import { createRef, FC, memo, useEffect } from "react"
import cn from "classnames"
import { NumbersData } from "@/types/Numbers.types"


const Numbers: FC<NumbersData> = memo(({ data, classNames, typeShadowColor="" }: NumbersData) => {
  const numbersPortalverseRef = createRef();

  useEffect(() => {
    (numbersPortalverseRef.current as any).data = {
      icon: data.icon || '',
      prefix: data.prefix || '',
      number: data.number || '',
      suffix: data.suffix || '',
      title: data.title || '',
      body: data.body || '',
      container: data.container || false,
      shadowColor: data.isShadowColor || false
    }
  }, [data]);// eslint-disable-line react-hooks/exhaustive-deps
  
  return <div className={cn("wrapperNumbers", classNames, {
      "border border-[#CDCDCD]": data.bordered,
      "shadow-pastelBlueShadowLeft rounded": data.isShadowColor === true && typeShadowColor === 'blue-pastel-left',
      "shadow-pastelYellowShadowLeft rounded": data.isShadowColor === true && typeShadowColor === 'yellow-pastel-left',
      "shadow-pastelRedShadowLeft rounded": data.isShadowColor === true && typeShadowColor === 'red-pastel-left',
      "shadow-pastelGrayShadowLeft rounded": data.isShadowColor === true && typeShadowColor === 'gray-pastel-left',
      "shadow-blueShadowLeft rounded": data.isShadowColor === true && typeShadowColor === 'blue-left',
      "shadow-pastelBlueShadowRight rounded": data.isShadowColor === true && typeShadowColor === 'blue-pastel-right',
      "shadow-pastelYellowShadowRight rounded": data.isShadowColor === true && typeShadowColor === 'yellow-pastel-right',
      "shadow-pastelRedShadowRight rounded": data.isShadowColor === true && typeShadowColor === 'red-pastel-right',
      "shadow-pastelGrayShadowRight rounded": data.isShadowColor === true && typeShadowColor === 'gray-pastel-right',
      "shadow-blueShadowRight rounded": data.isShadowColor === true && typeShadowColor === 'blue-right'
    })}>
      <lottus-numbers-portalverse ref={numbersPortalverseRef}></lottus-numbers-portalverse>
    </div>
});

export default Numbers