import { createRef, FC, memo, useEffect } from "react"
import cn from "classnames"
import ModalData from "@/types/Modal.types"

const Modal: FC<ModalData> = memo(({ data, isShow, children, className, onBtn, onClose, }: ModalData) => {
  const modalPortalverseRef = createRef();
  
  useEffect(() => {
    (modalPortalverseRef.current as any).data = {
      icon: data.icon || '',
      title: data.title || '',
      tagOnClose: data.tagOnClose || '',
      wrapper: true,
    };
  }, [data]); // eslint-disable-line react-hooks/exhaustive-deps
  
  useEffect(() => {
    (modalPortalverseRef.current as any).isShow = isShow;
  }, [isShow]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    let observerRef: any = null;
    if (!!modalPortalverseRef.current) {
      observerRef = modalPortalverseRef.current;
      (modalPortalverseRef.current as any).removeEventListener('onBtn', onBtn, false);
      (modalPortalverseRef.current as any).removeEventListener('onClose', onClose, false);    
    }
    (modalPortalverseRef.current as any).addEventListener('onBtn', onBtn, false);
    (modalPortalverseRef.current as any).addEventListener('onClose', onClose, false);
    return () => {
      if (!!observerRef) {
        (observerRef as any).removeEventListener('onBtn', onBtn, false);
        (observerRef as any).removeEventListener('onClose', onClose, false);    
      } 
    }
  },[onBtn, onClose]); // eslint-disable-line react-hooks/exhaustive-deps

  return <section>
    <lottus-modal class="overflow-y-auto" ref={modalPortalverseRef}>
      <div slot='areaModalContent' className={cn(className, "overflow-y-auto")}>
        { children }
      </div>
    </lottus-modal>
  </section>
})

export default Modal