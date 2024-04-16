import { FC, useEffect, useState } from "react"
import OpenFormInit from "@/forms/fixtures/openform"
import Input from "@/old-components/Input/Input"
import configControls from "@/forms/fixtures/controls"
import { InputInit } from "@/old-components/fixture"
import cn from "classnames";

const PersonalData: FC<any> = ({
  personalData,
  setPersonalData,
  infoControlsTouched,
  setInfoControlsTouched,
  errorControls,
  setErrorControls,
  validateControl,
  compact
}: any) => {

  // const [ config, setConfig ] = useState<any>( stepOneConfig ? {...stepOneConfig} : {...OpenFormInit.stepone });

  // useEffect(() => {
  //   setConfig({ ...config, ...data });
  // }, [data]);

  const handleKeyPress = (e: CustomEvent, control: string) => {
    const { detail: { value } } = e;
    setInfoControlsTouched({ ...infoControlsTouched, [control]: true });
    setPersonalData({ ...personalData, [control]: value });
    setErrorControls({ ...errorControls, [control]: !validateControl(control, value, infoControlsTouched[control]) });
  };

  const handleTouchedControl = (control: string) => {
    setInfoControlsTouched({ ...infoControlsTouched, [control]: true });
    setErrorControls({ ...errorControls, [control]: !validateControl(control, personalData[control], true) && infoControlsTouched[control] });
  }

  const phoneData = {
    ...InputInit,
    iconLeft: "call",
    label: "Número telefónico",
    alphanumeric: false,
    alphabetical: false,
    onlyNumbers: true,
    maxlength: '10',
  };

  return <>

    <div className="mt-2 flex w-p:flex-col w-p:gap-0 gap-6 font-normal">
      <div className="grow">
        <Input errorMessage={configControls.errorMessagesStepOneOpenForm.name} hasError={errorControls.name} eventFocus={() => handleTouchedControl("name")} data={configControls.inputNameOpenFormStepOne} eventKeyPress={(e: CustomEvent) => handleKeyPress(e, "name")} />
      </div>
      <div className="grow">
        <Input errorMessage={configControls.errorMessagesStepOneOpenForm.surname} hasError={errorControls.last_name} eventFocus={() => handleTouchedControl("last_name")} data={configControls.inputSurnameOpenFormStepOne} eventKeyPress={(e: CustomEvent) => handleKeyPress(e, "last_name")} />
      </div>
    </div>
    <div className={cn({ "flex w-p:flex-col  w-p:gap-0 gap-6 font-normal": compact == true })}>
      <div className={cn("mt-2", { "grow": compact == true })}>
        <Input errorMessage={configControls.errorMessagesStepOneOpenForm.phone} hasError={errorControls.phone} eventFocus={() => handleTouchedControl("phone")} data={phoneData} eventKeyPress={(e: CustomEvent) => handleKeyPress(e, "phone")} />
      </div>
      <div className={cn("mt-2", { "grow": compact == true })}>
        <Input errorMessage={configControls.errorMessagesStepOneOpenForm.email} hasError={errorControls.email} eventFocus={() => handleTouchedControl("email")} data={configControls.inputEmailOpenFormStepOne} eventKeyPress={(e: CustomEvent) => handleKeyPress(e, "email")} />
      </div>
    </div>
  </>
}

export default PersonalData