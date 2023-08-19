import { FC } from "react"
import cn from "classnames"
import OptionPillConfigComponent from "@/types/OptionPilll.types"

const OptionPill: FC<OptionPillConfigComponent> = ({ data, active, onClick }: OptionPillConfigComponent) => {

  const handleClick = () => {
    if (!!data.disabled) return;
    onClick(data.search);
  };

  return <section onClick={handleClick} className={cn("relative flex items-center justify-start py-1 px-[6px] rounded text-sm bg-[#f1f1f1] select-none w-p:p-0 w-p:w-40 w-p:h-10 w-auto border", { "border-transparent": !active, "border-[#b0003c]": active && !data?.disabled, "cursor-not-allowed": data?.disabled, "cursor-pointer": !data?.disabled, })}>
    <div className={cn("radio-option rounded-[50%] w-4 h-4 flex items-center justify-center bg-[#686868] mr-3 ml-4 w-p:hidden", { 'border border-[#b0003c] bg-[#b0003c]': active && !data?.disabled })}>
      <div className={cn("rounded-[50%] w-2 h-2 bg-[#f1f1f1]")}></div>
    </div>
    <span className="my-3 mr-6 w-p:pl-3">{ data.name }</span>
    {data?.disabled && <div className="absolute w-full h-full bg-white top-0 left-0 opacity-50"></div>}
  </section>
}

export default OptionPill