import { FC, useEffect, useState } from "react"
import cn from "classnames"
import BeWantedInit from "@/forms/fixtures/bewanted"
import Input from "@/old-components/Input/Input"
import RichtText from "@/old-components/Richtext/Richtext"
import Button from "@/old-components/Button/Button"
import configControls from "@/forms/fixtures/controls"
import EgresadosStepComponentData from "@/types/EgresadosStep.types"

const StepOne: FC<EgresadosStepComponentData> = ({ data, classNames, onNext }: EgresadosStepComponentData) => {

  const { inputConfig, buttonConfigStepOne: buttonConfig } = configControls;
  const [ infoControls, setInfoControls ] = useState<any>({
    matricula: "",
  });
  const [ infoControlsTouched, setInfoControlsTouched ] = useState<any>({
    matricula: false,
  });
  const [ errorControls, setErrorControls ] = useState<any>({
    matricula: false,
  });

  const [ config, setConfig ] = useState<any>({ ...BeWantedInit });

  useEffect(() => {
    setConfig({ ...config, ...data });
  }, [data]);

  const handleNext = () => {
    if (!!onNext) {
      setInfoControlsTouched({
        matricula: true,
      });
      const newValidation = {
        matricula: validateControl("matricula", infoControls.matricula, true),
      };
      setErrorControls({ ...newValidation });
      console.log(newValidation)
      if (validateControls()) {
        onNext(infoControls)
      }
    }
  }

  const validateControls = () => !Object.entries(infoControls).map((value: any) => {
    return !!value[1].trim();
  }).includes(false)

  const validateControl = (control: string, value: string, touched: boolean) => {
    return touched ? !value.trim() : false;
  };

  const handleKeyPress = (e: CustomEvent, control: string) => {
    const { detail: { value } } = e;
    setInfoControls({ ...infoControls, matricula: value });
    setErrorControls({ ...errorControls, [control]: validateControl(control, value, infoControlsTouched[control])});
  }

  const handleTouchedControl = (control: string) => {
    setInfoControlsTouched({ ...infoControlsTouched, [control]: true });
    setErrorControls({ ...errorControls, [control]: validateControl(control, infoControls[control], infoControlsTouched[control])});
  }

  return <section className={cn(classNames)}>
    <h1 className="font-Poppins font-semibold text-[22px] leading-7">{ config.title }</h1>
    <p className="font-Nunito-Sans font-normal text-base leading-4 mt-6">{ config.subtitle }</p>
    <div className="mt-6">
      <Input errorMessage={configControls.errorMessagesFormEgresados.matricula} hasError={errorControls.matricula} data={ inputConfig } eventFocus={() => handleTouchedControl("matricula")} eventKeyPress={(e: CustomEvent) => handleKeyPress(e, "matricula")} />
    </div>
    <div className="mt-6">
      <RichtText data={{ content: config.message }} />
    </div>
    <div className="flex mt-8">
      <Button dark onClick={handleNext} data={ buttonConfig } />
    </div>
  </section>
}

export default StepOne