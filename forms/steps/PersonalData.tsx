import { FC, useEffect, useState } from "react"
import OpenFormInit from "@/forms/fixtures/openform"
import Input from "@/old-components/Input/Input"
import configControls from "@/forms/fixtures/controls"
import { InputInit } from "@/old-components/fixture"


const PersonalData: FC<any> = ({
  data,
  config: stepOneConfig,
  personalData,
  setPersonalData,
  infoControlsTouched,
  setInfoControlsTouched,
  errorControls,
  setErrorControls
}: any) => {

  const [ config, setConfig ] = useState<any>( stepOneConfig ? {...stepOneConfig} : {...OpenFormInit.stepone });

  useEffect(() => {
    setConfig({ ...config, ...data });
  }, [data]);

  const handleKeyPress = (e: CustomEvent, control: string ) => {
    const { detail: { value } } = e;
    setPersonalData({ ...personalData, [control]: value });
    setErrorControls({ ...errorControls, [control]: validateControl(control, value, infoControlsTouched[control])});
  };

  

  const validateControl = (control: string, value: string, touched: boolean) => {
    if (control === 'email') {
      return touched ? !value.match(configControls.patternEmail) : false;
    }
    if (control === 'phone') {
      return touched ? !(value.trim() && value.trim().length === 10) : false;
    }
    return touched ? !value.trim() : false;
  };

  const handleTouchedControl = (control: string) => {
    setInfoControlsTouched({ ...infoControlsTouched, [control]: true });
    setErrorControls({ ...errorControls, [control]: validateControl(control, personalData[control], infoControlsTouched[control])});
  }

  const phoneData = {
    ...InputInit,
    iconLeft: "call",
    label: "Número telefónico",
    alphanumeric: false,
    alphabetical: false,
    onlyNumbers: true,
    maxlength: '10',
    test: "phone",
    name: "phone",
  };
  return <>
    <div className="mt-6 flex w-p:flex-col gap-6 font-normal">
      <div className="grow">
        <Input errorMessage={configControls.errorMessagesStepOneOpenForm.name} hasError={errorControls.name} eventFocus={() => handleTouchedControl("name")} data={ configControls.inputNameOpenFormStepOne } eventKeyPress={(e: CustomEvent) => handleKeyPress(e, "name")} />
      </div>
      <div  className="grow">
        <Input errorMessage={configControls.errorMessagesStepOneOpenForm.surname} hasError={errorControls.surname} eventFocus={() => handleTouchedControl("surname")} data={ configControls.inputSurnameOpenFormStepOne } eventKeyPress={(e: CustomEvent) => handleKeyPress(e, "surname")} />
      </div>
    </div>
    <div className="mt-6">
      <Input errorMessage={configControls.errorMessagesStepOneOpenForm.phone} hasError={errorControls.phone} eventFocus={() => handleTouchedControl("phone")} data={ phoneData } eventKeyPress={(e: CustomEvent) => handleKeyPress(e, "phone")} />
    </div>
    <div className="mt-6">
      <Input errorMessage={configControls.errorMessagesStepOneOpenForm.email} hasError={errorControls.email} eventFocus={() => handleTouchedControl("email")} data={ configControls.inputEmailOpenFormStepOne } eventKeyPress={(e: CustomEvent) => handleKeyPress(e, "email")} />
    </div>
  </>
}

export default PersonalData