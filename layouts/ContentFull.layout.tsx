import cn from "classnames"
import ContentFullLayoutProps from "@/types/ContentFullLayout.types"

export default function ContentFullLayout({ children, classNames } : ContentFullLayoutProps) {
  return <section className={cn("w-full justify-center", classNames)}>
    { children }
  </section>
}