import { FC, useEffect, useState } from "react"
import cn from "classnames"
import StepOne from "@/forms/steps/step-one-egresados"
import StepTwo from "@/forms/steps/step-two-egresados"
import EgresadosFormComponentData from "@/types/EgresadosForm.types"
import { getTokenSIUANE } from "@/utils/getTokenSIAUNE"

const BeWantedForm: FC<EgresadosFormComponentData> = ({ classNames, pathThankyou }: EgresadosFormComponentData) => {

  const [ step, setStep ] = useState<number>(1);
  const [ error, setError ] = useState<boolean>(false);
  const [ infoForm, setInfoForm ] = useState<any>({
    step1: {},
    step2: {},
  });
  const [ tokenActive, setTokenActive ] = useState<string>("");

  // const { isLoading, isError, token } = getTokenSIUANE();

  // useEffect(() => {
  //   if (!isLoading && !isError && !!token) {
  //     setTokenActive(token);
  //   }
  // }, [isLoading, isError, token]);

  const handleNextStep = (info: any, step: number) => {
    setInfoForm({ ...infoForm, [`step${step}`]: { ...info } });
    const newStep = step + 1;
    setStep(newStep);
  }

  return <section className={cn("p-6 shadow-15 bg-white", classNames)}>
    <StepOne classNames={cn({ "hidden": step !== 1 })} onNext={(info: any) => handleNextStep(info, 1)} />
    <StepTwo onNext={(info: any) => handleNextStep(info, 2)} path={pathThankyou} enrollment={infoForm.step1.matricula} classNames={cn({ "hidden": step !== 2 })} />
  </section>
}

export default BeWantedForm