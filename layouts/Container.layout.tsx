import cn from "classnames"
import ContentLayoutProps from "@/types/ContentLayout.types"

export default function Container({ children, classNames } : ContentLayoutProps) {
  return <div className={cn("max-w-d-base mx-auto w-d-base:px-6", classNames)}>
    { children }
  </div>
}