import { FC, useEffect, useState } from "react"
import cn from "classnames"
import OpenFormInit from "@/forms/fixtures/openform"
import Image from "@/old-components/Image"
import Input from "@/old-components/Input/Input"
import configControls from "@/forms/fixtures/controls"
import Select from "@/old-components/Select"
import Button from "@/old-components/Button/Button"
import { SelectInit } from "@/old-components/fixture"


const StepOne: FC<any> = ({ classNames, data, image, onNext, programs }: any) => {

  const [ config, setConfig ] = useState<any>({ ...OpenFormInit.steponecontinuoscontrols });
  const [ infoControls, setInfoControls ] = useState<any>({
    name: "",
    surname: "",
    phone: "",
    email: "",
    program: "",
    contacto: "contact",
    horario: "schedule"
  });
  const [ infoControlsTouched, setInfoControlsTouched ] = useState<any>({
    name: false,
    surname: false,
    phone: false,
    email: false,
    program: false,
    contacto: true,
    horario: true
  });
  const [ errorControls, setErrorControls ] = useState<any>({
    name: false,
    surname: false,
    phone: false,
    email: false,
    program: false,
    contacto: true,
    horario: true
  });
  const [ dataPrograms, setDataPrograms ] = useState<Array<any>>([])

  useEffect(() => {
    setConfig({ ...config, ...data });
  }, [data]);

  useEffect(() => {
    setDataPrograms([ ...programs ]);
    const activeProgram = programs.filter((program: any) => program.active)
    if (!!activeProgram.length) {
      setInfoControls({ ...infoControls, "program": activeProgram[0].value });
      setInfoControlsTouched({ ...infoControlsTouched, "program": true })
      setErrorControls({ ...errorControls, "program": validateControl("program", activeProgram[0].value, infoControlsTouched["program"])});
    }
  }, [programs]);

  const handleKeyPress = (e: CustomEvent, control: string ) => {
    const { detail: { value } } = e;
    setInfoControls({ ...infoControls, [control]: value });
    setErrorControls({ ...errorControls, [control]: validateControl(control, value, infoControlsTouched[control])});
  };

  const handleNext = () => {
    if (!!onNext) {
      setInfoControlsTouched({
        name: true,
        surname: true,
        phone: true,
        email: true,
        program: true,
        contacto: true,
        horario: true
      });
      const newValidation = {
        name: validateControl("name", infoControls.name, true),
        surname: validateControl("surname", infoControls.surname, true),
        phone: validateControl("phone", infoControls.phone, true),
        email: validateControl("email", infoControls.email, true),
        program: validateControl("program", infoControls.program, true),
      };
      setErrorControls({ ...newValidation });
      if (validateControls()) {
        onNext(infoControls);
      }
    }
  }

  const handleOptionSelected = (option: CustomEvent) => {
    const { detail: program } = option;
    setInfoControlsTouched({ ...infoControlsTouched, modality: true });
    setInfoControls({ ...infoControls, program });
    setDataPrograms( state => state.map((item: any) => ({ ...item, active: item.value === program })) );
    setErrorControls({ ...errorControls, modality: validateControl("modality", program, infoControlsTouched[program])});
  }

  const validateControls = () => !Object.entries(infoControls).map((value: any) => {
    if(value[0] === 'email') {
      return !!value[1].match(configControls.patternEmail) ? !!value[1].match(configControls.patternEmail).length : true
    }
    if(value[0] === 'phone') {
      return value[1].trim().length === 10
    }
    return !!value[1].trim();
  }).includes(false)

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
    setErrorControls({ ...errorControls, [control]: validateControl(control, infoControls[control], infoControlsTouched[control])});
  }

  return <section className={cn(classNames)}>
  <div className="flex gap-6">
    <div className="flex flex-col gap-6">
      <h1 className="font-Nunito-Sans font-bold text-5 leading-6">{ config.title }</h1>
      <p className="font-Nunito font-normal text-[14px] leading-4">{ config.subtitle }</p>
    </div>
    <div className={"aspect-1/1 w-t:hidden w-p:hidden"} >
      <Image classNamesImg="rounded-full" classNames="w-[112px] h-[112px]" src={image.src} alt={image.alt} />
    </div>
  </div>
  <p className="mt-8 mb-6 text-[14px] leading-5 text-[#282828 mb-6">{  config.conditions }</p>
  <div className="mt-6 flex w-p:flex-col gap-6">
    <div className="grow">
      <Input errorMessage={configControls.errorMessagesStepOneOpenFormContinuous.name} hasError={errorControls.name} eventFocus={() => handleTouchedControl("name")} data={ configControls.inputNameOpenFormStepOne } eventKeyPress={(e: CustomEvent) => handleKeyPress(e, "name")} />
    </div>
    <div  className="grow">
      <Input errorMessage={configControls.errorMessagesStepOneOpenFormContinuous.surname} hasError={errorControls.surname} eventFocus={() => handleTouchedControl("surname")} data={ configControls.inputSurnameOpenFormStepOne } eventKeyPress={(e: CustomEvent) => handleKeyPress(e, "surname")} />
    </div>
  </div>
  <div className="mt-6">
    <Input errorMessage={configControls.errorMessagesStepOneOpenFormContinuous.phone} hasError={errorControls.phone} eventFocus={() => handleTouchedControl("phone")} data={ configControls.inputPhoneOpenFormStepOne } eventKeyPress={(e: CustomEvent) => handleKeyPress(e, "phone")} />
  </div>
  <div className="mt-6">
    <Input errorMessage={configControls.errorMessagesStepOneOpenFormContinuous.email} hasError={errorControls.email} eventFocus={() => handleTouchedControl("email")} data={ configControls.inputEmailOpenFormStepOne } eventKeyPress={(e: CustomEvent) => handleKeyPress(e, "email")} />
  </div>
  <div className="mt-6">
    <p className="font-Nunito font-normal text-[14px] leading-5">{ config.programs }</p>
    <Select onClick={(option: CustomEvent) => handleOptionSelected(option)} options={dataPrograms} data={{ ...SelectInit, textDefault: !!infoControls.program ? "  " : "Elige un programa", disabled: !dataPrograms.length }}  />
    <p className={cn("text-[#e57565] text-xs px-3 mt-4", { "hidden": !errorControls.program })}>{ configControls.errorMessagesStepOneOpenFormContinuous.program }</p>
  </div>
  <div className="mt-6">
    <Button dark onClick={handleNext} data={ configControls.buttonConfigOpenFormStepOne } />
  </div>
</section>
}

export default StepOne