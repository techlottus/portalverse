import { FC, memo, useState } from "react" 
import PaginatorPortalverseData from "@/types/PaginatorPortalverse.types"

const PaginatorPortalverse: FC<PaginatorPortalverseData> = memo(({ items, currentPage, pageSize, iconPrevious, iconNext ,onPageChange }: PaginatorPortalverseData) => {

  const [ pagesCount ] = useState<number>(Math.ceil(items / pageSize))
  const [ pageCurrent, setPageCurrent ] = useState<number>(1)
  
  if (pagesCount === 1) return null;
    const pages = Array.from({ length: pagesCount }, (_, i) => i + 1);

  return <div>
    <ul className="flex justify-between items-center">
      <li 
        onClick={() => {
          const currentPage: number = pageCurrent - 1
          if(pages.findIndex((page:number) => page === currentPage ) !== -1){
            setPageCurrent(currentPage)
            onPageChange(currentPage)
          }    
        }}> 
        <div className="flex justify-center items-center w-10 h-10 rounded-lg cursor-pointer m-2 hover:bg-surface-100">
          <span className="material-symbols-outlined select-none">{iconPrevious}</span>
        </div>
      </li>
       {pages.map((page) => (
         <li
            onClick={() => onPageChange(page)}
            key={page}
            className={page === currentPage ? "flex justify-center items-center w-10 h-10 rounded-lg border border-solid border-surface-950 cursor-pointer bg-surface-950 text-surface-0 m-2" : "flex justify-center items-center w-10 h-10 rounded-lg cursor-pointer m-2 hover:bg-surface-100"}
          >
            <a className="cursor-pointer">
              {page}
            </a>
         </li>
       ))}
      <li 
        onClick={() => {
          const currentPage: number = pageCurrent + 1
          if(pages.findIndex((page:number) => page === currentPage ) !== -1){
            setPageCurrent(currentPage)
            onPageChange(currentPage)
          }
        }}>
        <div className="flex justify-center items-center w-10 h-10 rounded-lg cursor-pointer m-2 hover:bg-surface-100">
          <span className="material-symbols-outlined select-none">{iconNext}</span>
        </div>
      </li>
     </ul>

  </div>
})

export default PaginatorPortalverse