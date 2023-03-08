import { createRef, FC, memo, useEffect } from "react"
import { MosaicData } from "@/types/Mosaic.types"

const Mosaic: FC<MosaicData> = memo(({data, onClick}: MosaicData) => {
  const mosaicPortalverseRef = createRef();

  useEffect(() => {
    (mosaicPortalverseRef.current as any).data = {
      images: data.images || [
        {
          id: '',
          image: '',
          icon: '',
        },
      ],
    }
  }, [data]); // eslint-disable-line react-hooks/exhaustive-deps 

  useEffect(() => {
    let observerRef: any = null;
    if (!!mosaicPortalverseRef.current) {
      observerRef = mosaicPortalverseRef.current;
      (mosaicPortalverseRef.current as any).removeEventListener('onClick', onClick, false);
    }
    (mosaicPortalverseRef.current as any).addEventListener('onClick', onClick, false);
    return () => {
      if (!!observerRef) {
        (observerRef as any).removeEventListener('onClick', onClick, false);
      }
    }
  }, [onClick]); // eslint-disable-line react-hooks/exhaustive-deps

  return <lottus-mosaic-portalverse ref={mosaicPortalverseRef}></lottus-mosaic-portalverse>
});

export default Mosaic