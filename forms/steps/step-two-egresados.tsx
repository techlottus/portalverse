import { FC, SyntheticEvent, useEffect, useState } from "react"
import cn from "classnames"
import BeWantedInit from "@/forms/fixtures/bewanted"
import Input from "@/old-components/Input/Input"
import Button from "@/old-components/Button/Button"
import configControls from "@/forms/fixtures/controls"
import EgresadosStepComponentData from "@/types/EgresadosStep.types"


const StepTwo: FC<EgresadosStepComponentData> = ({ data, classNames, enrollment, onNext }: EgresadosStepComponentData) => {
  const { inputMailConfig, inputPhoneConfig, inputCompanyConfig, buttonConfigStepTwo: buttonConfig } = configControls;
  const [ infoControls, setInfoControls ] = useState<any>({
    email: "",
    phone: "",
    company: "",
  });
  const [ infoControlsTouched, setInfoControlsTouched ] = useState<any>({
    email: false,
    phone: false,
    company: false,
    activeCompany: false
  });
  const [ errorControls, setErrorControls ] = useState<any>({
    email: false,
    phone: false,
    company: false,
    activeCompany: false
  });
  const [ config, setConfig ] = useState<any>({ ...BeWantedInit });
  const [ activeCompany, setActiveCompany ] = useState<boolean | null>(null);
  
  useEffect(() => {
    setConfig({ ...config, ...data });
  }, [data]);

  const handleNext = () => {
    if (!!onNext){
      setInfoControlsTouched({
        email: true,
        phone: true,
        company: true,
        activeCompany: true
      });
      const newValidation = {
        email: validateControl("email", infoControls.email, true),
        phone: validateControl("phone", infoControls.phone, true),
        company: activeCompany ? validateControl("company", infoControls.company, true) : true,
        activeCompany: activeCompany === null && !true
      };
      console.log(newValidation)
      setErrorControls({ ...newValidation });
      if (validateControls()) {
        onNext(infoControls)
      }
    }
  }

  const validateControls = () => !Object.entries(infoControls).map((value: any) => {
    if (value[0] === 'company') {
      return activeCompany ? !!value[1].trim() : true;
    }
    return !!value[1].trim();
  }).includes(false)

  const validateControl = (control: string, value: string, touched: boolean) => {
    if (control === 'company') {
      return touched
        ? activeCompany
          ? !value.trim()
          : true
        : true
    }
    return touched ? !value.trim() : false;
  };

  const handleActiveCompany = (e: SyntheticEvent) => {
    const { defaultValue } = (e.target as HTMLInputElement);
    setActiveCompany(defaultValue === "si" ? true : false)
    setErrorControls({ ...errorControls, activeCompany: activeCompany === null});
  }

  const handleTouchedControl = (control: string) => {
    setInfoControlsTouched({ ...infoControlsTouched, [control]: true });
    setErrorControls({ ...errorControls, [control]: validateControl(control, infoControls[control], infoControlsTouched[control])});
  }

  const handleKeyPress = (e: CustomEvent, control: string) => {
    const { detail: { value } } = e;
    setInfoControls({ ...infoControls, matricula: value });
    setErrorControls({ ...errorControls, [control]: validateControl(control, value, infoControlsTouched[control])});
  }

  return <section className={cn(classNames)}>
    <h1 className="font-Poppins font-semibold text-[22px] leading-7">{ config.title }</h1>
    <p className="font-Nunito-Sans font-normal text-base leading-4 mt-6">{ config.subtitleStep2 }</p>
    <div className="mt-6">
      <p className="text-[#686868] text-[13px]">{ `${config.messageEnrollment}${enrollment}`}</p>
    </div>
    <div className="mt-8">
      <Input data={ inputMailConfig } errorMessage={configControls.errorMessagesFormEgresados.email} hasError={errorControls.email} eventFocus={() => handleTouchedControl("email")} eventKeyPress={(e: CustomEvent) => handleKeyPress(e, "email")} />
    </div>
    <div className="mt-8">
      <Input data={ inputPhoneConfig } errorMessage={configControls.errorMessagesFormEgresados.phone} hasError={errorControls.phone} eventFocus={() => handleTouchedControl("phone")} eventKeyPress={(e: CustomEvent) => handleKeyPress(e, "phone")} />
    </div>
    <div className="mt-8">
      <p className="mb-4">{ config.messageWork }</p>
      <div className="flex gap-6">
        <span>
          Si <input onClick={handleActiveCompany} type="radio" name="work" value="si" />
        </span>
        <span>
          No <input onClick={handleActiveCompany} type="radio" name="work" value="no" />
        </span>
      </div>
      <p className={cn("text-[#e57565] text-xs px-3 mt-4", { "hidden": errorControls.activeCompany  })}>{ configControls.errorMessagesFormEgresados.activeCompany }</p>
    </div>
    <div className={cn({ "hidden": !activeCompany })}>
      <Input data={ inputCompanyConfig } errorMessage={configControls.errorMessagesFormEgresados.company} hasError={errorControls.company && activeCompany} eventFocus={() => handleTouchedControl("company")} eventKeyPress={(e: CustomEvent) => handleKeyPress(e, "company")} />
    </div>
    <div className="flex mt-8">
      <Button dark onClick={handleNext} data={ buttonConfig } />
    </div>
  </section>
}

export default StepTwo