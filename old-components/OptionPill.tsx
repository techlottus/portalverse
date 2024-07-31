import { FC } from "react"
import cn from "classnames"
import OptionPillConfigComponent from "@/types/OptionPilll.types"

const OptionPill: FC<OptionPillConfigComponent> = ({ data, active, onClick }: OptionPillConfigComponent) => {

  const handleClick = () => {
    if (!!data.disabled) return;
    onClick(data.search);
  };

  return <section onClick={handleClick} className={cn("relative flex items-center justify-start py-1 px-[6px] rounded text-sm bg-surface-100 select-none mobile:p-0 mobile:w-40 mobile:h-10 w-auto border", { "border-transparent": !active, "border-primary-500": active && !data?.disabled, "cursor-not-allowed": data?.disabled, "cursor-pointer": !data?.disabled, })}>
    <div className={cn("radio-option rounded-[50%] w-4 h-4 flex items-center justify-center mr-3 ml-4 mobile:hidden", { 'border border-primary-500 bg-primary-500': active && !data?.disabled, 'bg-surface-500': !active })}>
      <div className={cn("rounded-[50%] w-2 h-2 bg-surface-100")}></div>
    </div>
    <span className="my-3 mr-6 mobile:pl-3">{ data?.name === "Educación Continua" ? "Extensión Universitaria" : data?.name }</span>
    {data?.disabled && <div className="absolute w-full h-full bg-white top-0 left-0 opacity-50"></div>}
  </section>
}

export default OptionPill