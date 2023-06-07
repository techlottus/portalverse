import { FC, memo } from "react"
import Imagen from "next/image"
import cn from "classnames"
import ImageComponentData from "@/types/Image.types"

const Image: FC<ImageComponentData> = memo(({ alt, src, classNames, classNamesImg }: ImageComponentData) => {
  return <div className={cn("relative", classNames)}>
    {
      !!src
        ? <Imagen priority className={cn(classNamesImg)} src={src} alt={alt || ""} layout="fill" /> 
        : <div className={cn("bg-gray-600", classNamesImg)} />
    }
  </div>
});

export default Image