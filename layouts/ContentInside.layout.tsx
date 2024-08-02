import cn from "classnames"
import ContentInsideLayoutProps from "@/types/ContentInsideLayout.types"

export default function ContentInsideLayout({ classNames, children }: ContentInsideLayoutProps) {
  return <section className={cn("grid grid-cols-12 tablet:grid-cols-8 mobile:grid-cols-4", classNames)}>
    { children }
  </section>
};