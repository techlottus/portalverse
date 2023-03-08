import { createRef, FC, memo, useEffect, useState } from "react"
import cn from "classnames"
import BannerComponentData from "@/types/Banner.types"
import Button from "@/old-components/Button/Button"

const Banner: FC<BannerComponentData> = memo(({ data, noAction = false, onBtn }: BannerComponentData) => {
  const bannerPortalverseRef = createRef();

  const [configButton, setConfigButton] = useState({});

  useEffect(() => {
    (bannerPortalverseRef.current as any).data = {
      title: data.title || '',
      subtitle: data.subtitle || '',
      state: data.state || '',
      size: data.size || '',
      middle: data.middle || false,
      center: data.center || false,
      bottom: data.bottom || false,
      left: data.left || false,
      urlImage: data.urlImage || {
        mobile: '',
        desktop: '',
      },
      overlay: data.overlay || '',
      height: data.height || '',
      action: data.action || {},
      wrapper: data.wrapper || false
      };

    setConfigButton((state) => {
      return {...state, ...data.action}
    })
  }, [data]);// eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    let observerRef: any = null;
    if (!!bannerPortalverseRef.current) {
      observerRef = bannerPortalverseRef.current;
      (bannerPortalverseRef.current as any).removeEventListener('onBtn', onBtn, false);
    }
    (bannerPortalverseRef.current as any).addEventListener('onBtn', onBtn, false);
    return () => {
      if (!!observerRef) {
        (observerRef as any).removeEventListener('onBtn', onBtn, false);
      }
    }
  }, [onBtn]);// eslint-disable-line react-hooks/exhaustive-deps

  return <lottus-banner-portalverse ref={bannerPortalverseRef}>
    <div slot="areaBannerButtonDesk" className={cn({"hidden": noAction})}>
      {
        data.action?.type === "primary" 
          ? <Button dark data={{...data.action}} onClick={ onBtn }/> 
          : <Button darkOutlined data={{...data.action}} onClick={ onBtn }/> 
      }
    </div>
    <div slot="areaBannerButtonMobile" className={cn({"hidden": noAction})}>
      {
        data.action?.type === "primary" 
          ? <Button dark data={{...data.action, isExpand: true}} onClick={ onBtn } />
          : <Button dark data={{...data.action, isExpand: true}} onClick={ onBtn } /> 
      }
    </div>
  </lottus-banner-portalverse>
});

export default Banner