import { FC, useEffect, useState } from "react"
import cn from "classnames"
import TabsComponentConfig from "@/types/TabsFeatured.types"
import Image from "@/old-components/Image"

const TabsFeatured: FC<TabsComponentConfig> = ({ tabs, onActive, active }: TabsComponentConfig) => {

  const [ tabActive, setTabActive ] = useState<number>(0);

  const activeTab = (position: number) => {
    setTabActive(position);
    onActive(position);
  }

  useEffect(() => {
    if(active !== undefined) {
      setTabActive(active)
    }
  }, [active])

  return <section className="w-full overflow-x-auto justify-center mb-4">
    <ul className={cn("flex gap-1 w-d:justify-center items-baseline", { "w-p:justify-start": tabs.length > 1, "w-p:justify-center": tabs.length === 1 })}>
      {
        tabs.map(({ label }: any, i: number) => <li key={`tab-${i}`} className={cn("w-auto  flex flex-col justify-center")} onClick={() => activeTab(i)}>
            <div className={cn("py-4 px-6 flex flex-col justify-center cursor-pointer border border-solid border-b-2 border-surface-200", { "bg-surface-950 text-surface-0 ": tabActive === i, "border-b-primary-500 border-solid": tabActive !== i })}>
              <h4 className="font-headings font-semibold text-center whitespace-nowrap">{ label }</h4>
            </div>
            <div className={cn("flex justify-center relative", { "hidden": tabActive !== i })}>
              <Image src="/images/triangle_tabs.png" alt="triangle" classNames="w-11 h-8 absolute -top-1" />
            </div>
          </li>)
      }
    </ul>
  </section>
}

export default TabsFeatured