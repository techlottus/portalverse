import { FC, useEffect, useState } from "react"
import cn from "classnames"
import OpenFormInit from "@/forms/fixtures/openform"
import Image from "@/old-components/Image"
import ProgressBar from "@/old-components/ProgressBar/ProgressBar"
import configControls from "@/forms/fixtures/controls"
import * as PersonalData from "@/forms/components/PersonalData"
import Link from "next/link"

const StepOne: FC<any> = ({
  classNames,
  data,
  step,
  config: stepOneConfig,
  personalData,
  setPersonalData,
}: any) => {

  const [config, setConfig] = useState<any>(stepOneConfig ? { ...OpenFormInit.stepone, ...stepOneConfig } : { ...OpenFormInit.stepone });
  const [progress, setProgress] = useState<number>(0);
  const [personalDataTouched, setPersonalDataTouched] = useState<{ [key: string]: boolean }>({
    name: false,
    last_name: false,
    phone: false,
    email: false,
  })
  const [personalDataErrors, setPersonalDataErrors] = useState({
    name: false,
    last_name: false,
    phone: false,
    email: false,
  })

  useEffect(() => {
    setConfig({ ...config, ...data });
  }, [data]);

  useEffect(() => {
    setProgress(step);
  }, [step]);

  const validatePersonalDataControl = (control: string, value: string) => {
    if (control === 'email') {
      return !!value.match(configControls.patternEmail)
    }
    if (control === 'phone') {
      return value.trim().length === 10
    }
    return !!value.trim()
  };

  return <section className={cn(classNames)}>
    <div className="flex gap-6">
      <div className="flex flex-col gap-6">
        <h4 className="font-texts font-bold text-5 leading-6">{config.title}</h4>
        <p className="font-texts font-normal text-3.5 leading-4">{config.subtitle}</p>
      </div>
      <div className={cn("w-p:hidden", { "hidden": !config?.image })}>
        <Image classNamesImg="w-full h-full object-cover" classNames="w-28 h-28 rounded-full overflow-hidden" src={config?.image?.src} alt={config?.image?.alt} />
      </div>
    </div>
    <div className="flex align-middle items-center mt-8 mb-6 flex-wrap">
      <p className="text-3.5 leading-5 text-surface-800 font-texts font-normal mr-1 block text-wrap">{config.conditions} <Link href={config?.privacyLink?.link} passHref target={"_blank"}>
        <span className="text-3.5 font-texts font-normal text-sm text-surface-800 underline text-wrap">{config.privacyLink.label}</span>
      </Link></p>
    </div>
    <div className="mb-6">
      <ProgressBar data={{ progress }} />
    </div>
    <form>
      <PersonalData.Root
        personalData={personalData}
        setPersonalData={setPersonalData}
        infoControlsTouched={personalDataTouched}
        setInfoControlsTouched={setPersonalDataTouched}
        errorControls={personalDataErrors}
        setErrorControls={setPersonalDataErrors}
        validateControl={validatePersonalDataControl}
      >
        <div className="mt-6 flex w-p:flex-col gap-6 font-normal">
          <div className="grow">
            <PersonalData.Name />
          </div>
          <div className="grow">
            <PersonalData.SurName />
          </div>
        </div>
        <div className="mt-6">
          <PersonalData.Phone />
        </div>
        <div className="mt-6">
          <PersonalData.Email />
        </div>
      </PersonalData.Root>
    </form>

  </section>
}

export default StepOne