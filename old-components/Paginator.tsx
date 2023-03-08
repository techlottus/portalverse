import { createRef, FC, memo, useEffect } from "react"
import PaginatorData from "@/types/Paginator.types"

const Paginator: FC<PaginatorData> = memo(({ data, onClick}: PaginatorData) => {
  const paginatorPortalverseRef = createRef();
  
  useEffect(() => {
    (paginatorPortalverseRef.current as any).data = {
      iconPrevious: data.iconPrevious|| '',
      iconNext: data.iconNext || '',
      size: data.size || '',
      maxNumbers: data.maxNumbers || 10,
    }
  }, [data]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    let observerRef: any = null;
    if(!!paginatorPortalverseRef.current){
      observerRef = paginatorPortalverseRef.current;
      (paginatorPortalverseRef.current as any).removeEventListener('onClick', onClick, false);
    }
    (paginatorPortalverseRef.current as any).addEventListener('onClick', onClick, false);
    return () => {
      if(!!observerRef){
        (observerRef as any).removeEventListener('onClick', onClick, false);
      }
    }
  }, [onClick]); // eslint-disable-line react-hooks/exhaustive-deps

  return <lottus-paginator ref={paginatorPortalverseRef}></lottus-paginator>
});

export default Paginator