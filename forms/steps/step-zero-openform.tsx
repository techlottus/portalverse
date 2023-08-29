import { FC, useEffect, useState } from "react"
import cn from "classnames"
import Button from "@/old-components/Button/Button"
import ProgressBar from "@/old-components/ProgressBar"
import OpenFormInit, { QuestionStepZero } from "@/forms/fixtures/openform"
import configControls from "@/forms/fixtures/controls"
import Select from "@/old-components/Select"
import { SelectInit } from "@/old-components/fixture"

const StepZero: FC<any> = ({ classNames, step, onNext }: any) => {

  const [ config ] = useState<any>({ ...OpenFormInit.stepzero });
  const [ options, setOptions ] = useState<Array<any>>([])
  const [ progress, setProgress ] = useState<number>(0);
  const [ reason, setReason ] = useState<string>("");

  useEffect(() => {
    setOptions([ ...QuestionStepZero ]);
  }, []);

  useEffect(() => {
    setProgress(step);
  }, [step]);

  const handleNext = () => {
    if (!!onNext) {
      onNext(reason);
    }
  }

  const handleSelectedOption = (option: CustomEvent) => {
    const { detail } = option;
    setReason(detail);
    setOptions(options.map((item: any) => ({ ...item, active: item.value === detail })))
  }

  return <section className={cn(classNames)}>
    <h1 className="font-Poppins font-semibold text-[22px] leading-7">{ config.title }</h1>
    <p className="font-Nunito-Sans font-normal text-base leading-4 my-6">{ config.subtitle }</p>
    <div className="mb-6">
        <ProgressBar data={{ progress }} />
      </div>
    <div className="mt-6">
      <Select onClick={(option: CustomEvent) => handleSelectedOption(option)} options={[...options]} data={{ ...SelectInit, textDefault: "Elige una opción" }}  />
    </div>
    <div className="flex mt-8">
      <Button dark onClick={handleNext} data={ configControls.buttonConfigOpenFormStepOne } />
    </div>
  </section>
}

export default StepZero