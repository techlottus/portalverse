import { FC, useState } from "react"
import cn from "classnames"
import StepZero from "@/forms/steps/step-zero-openform"
import StepOtherReason from "@/forms/steps/step-otherreason-openform"
import OpenForm from "@/forms/container/OpenForm"

const ReasonsToContact: FC<any> = ({ classNames, pathThanyouOtherReason, pathThanyouOpenForm, image }: any) => {

  const [ reason, setReason ] = useState<string>("");

  const handleReasonSelected = (value: string) => {
    setReason(value)
  }

  return <section className={cn("shadow-15 bg-white", classNames, { "p-6": reason === "" || reason !== "programs", "p-0": reason === "programs" })}>
    <StepZero step={50} classNames={cn({ "hidden": !!reason })} onNext={(value: string) => handleReasonSelected(value) } />
    <OpenForm classNames={cn({ "hidden": reason === "" || reason !== "programs" })} pathThankyou={pathThanyouOpenForm} image={image} />
    <StepOtherReason pathThankyou={pathThanyouOtherReason} step={90} classNames={cn({ "hidden": reason === "" || reason === "programs" })} />
  </section>
}

export default ReasonsToContact