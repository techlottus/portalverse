import { createRef, FC, memo, useEffect } from "react"
import LinkLottusComponentData from "@/types/LinkLottus.types"

const LinkIcons: FC<LinkLottusComponentData> = memo(({ data, onClick }: LinkLottusComponentData)  => {
  const linkIconsRef = createRef();

  useEffect(() => {
    (linkIconsRef.current as any).data = {
      text: data.text || '',
      size: data.size || '',
      isUnderline: data.isUnderline || false,
      isBold: data.isBold || false,
      disabled: data.disabled || false,
      id: data.id || '',
      iconFirst: data.iconFirst || '',
      iconSecond: data.iconSecond || '',
    }
  },[data]);// eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    let observerRef: any = null;
    if (!!linkIconsRef.current) {
      observerRef = linkIconsRef.current;
      (linkIconsRef.current as any).removeEventListener('onClick', onClick, false);
    }
    (linkIconsRef.current as any).addEventListener('onClick', onClick, false);
    return () => {
      if (!!observerRef) {
        (observerRef as any).removeEventListener('onClick', onClick, false);
      }
    }
  }, [onClick]);// eslint-disable-line react-hooks/exhaustive-deps

  return <lottus-link-icons ref={linkIconsRef}></lottus-link-icons>
});

export default LinkIcons