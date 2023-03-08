import { FC, SyntheticEvent, useEffect, useState } from "react"
import cn from "classnames"
import CardWebsite from "@/old-components/CardWebsite";

const CarouselCards: FC<any> = ({ data: { items }, classNames, classNameSlide }: any) => {

  const [ active, setActive ] = useState<number>(0);
  const [ countItems, setCountItems ] = useState<number>(0);

  const stylesBaseControls = "material-icons select-none absolute top-[45%] p-1 rounded-lg text-[12px] w-p:hidden";

  useEffect(() => {
    setCountItems((items.length - 1));
  }, [items]);

  const handlerClickControl = ({ target }: SyntheticEvent) => {
    const { ariaLabel } = (target as HTMLElement)
    if (items.length > 1) {
      if ( ariaLabel === "next" ) {
        if ( active === countItems - 1 ) {
          setActive(0);
          return
        }
        if ( active < countItems ) {
          setActive((prevState: number) => prevState+1);
          return
        }
      }
  
      if ( ariaLabel === "prev" ) {
        if ( active === 0 ) {
          setActive(countItems - 1);
          return
        }
        if ( active > 0 ) {
          setActive((prevState: number) => prevState-1);
          return
        }
      }
    }
  }

  return <section className={cn("flex h-full relative w-full", classNames)}>
    <span aria-label="prev" onClick={handlerClickControl} className={cn("z-10 left-0", { "bg-[#808080]": items.length === 1, "bg-white cursor-pointer": items.length > 1 }, stylesBaseControls)}>arrow_back_ios</span>
    <section className="overflow-x-auto flex gap-6 w-d:w-[80%] w-t:w-[95%] w-p:w-[95%] mx-auto">
      {
        items.map((item: any, i: number) => <section key={`card-item-${i}`} className="grow w-full h-10 bg-[red]">
          {/* <CardWebsite key={`card-${i}`} data={item}/> */}
        </section>)
      }
    </section>
    <span aria-label="next" onClick={handlerClickControl} className={cn("right-0", { "bg-[#808080]": items.length === 1, "bg-white cursor-pointer": items.length > 1 }, stylesBaseControls)}>arrow_forward_ios</span>
  </section>
}
export default CarouselCards