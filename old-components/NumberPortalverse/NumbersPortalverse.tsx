import { FC, memo } from "react"
import cn from "classnames"
import Numbers from "@/old-components/Numbers/Numbers"
import NumbersPortalverse from "../NumbersPortalverse/NumbersPortalverse"

const NumbersComponent: FC<any> = memo(({ data, classNames } : any) => {
    
  return <section className={cn("desktop:col-span-12 tablet:col-span-8 mobile:col-span-4 grid desktop:grid-cols-4 gap-6 tablet:grid-cols-2 mobile:grid-cols-1 desktop:mt-8 ", classNames)}>
    {
      data.map((item:any, i:number) => <NumbersPortalverse key={`section-numbers-${i}`} data={item}/>)
    }
  </section>
})

export default NumbersComponent