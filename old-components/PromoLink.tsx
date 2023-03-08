import { createRef, FC, memo, useEffect } from "react"
import cn from "classnames"
import { PromoLinkData } from "@/types/Promolink.types"

const PromoLink: FC<PromoLinkData> = memo(({ data, classNames, typeShadowColor="",  onClick } : PromoLinkData) => {
  const promoLinkPortalverseRef = createRef();

  useEffect(() => {
    (promoLinkPortalverseRef.current as any).data = {
      urlImage: data.urlImage || {
        mobile: '',
        desktop: '',
      },
      text: data.text || '',
      icon: data.icon || '',
      color: data.color || '',
      opacity: data.opacity || '',
      height: data.height || '',
      enable: data.enable || false,
      nobackground: data.nobackground || false,
      isShadowColor: data.isShadowColor || false,
    }
  }, [data]);// eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    let observerRef: any = null;
    if (!!promoLinkPortalverseRef.current) {
      observerRef = promoLinkPortalverseRef.current;
      (promoLinkPortalverseRef.current as any).removeEventListener('onClick', onClick, false);
    }
    (promoLinkPortalverseRef.current as any).addEventListener('onClick', onClick, false);
    () => {
      if (!!observerRef) {
        (observerRef as any).removeEventListener('onClick', onClick, false);
      }
    }
  }, [onClick]);// eslint-disable-line react-hooks/exhaustive-deps

  return <>
    <div className={cn(classNames, {
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
      <lottus-promo-link-portalverse ref={promoLinkPortalverseRef}></lottus-promo-link-portalverse>
    </div>
  </>
})

export default PromoLink;