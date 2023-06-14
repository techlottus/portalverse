import { FC, useEffect, useState } from "react"
import cn from "classnames"
import OpenFormInit, { Modalities } from "@/forms/fixtures/openform"
import Image from "@/old-components/Image"
import ProgressBar from "@/old-components/ProgressBar"
import Input from "@/old-components/Input/Input"
import configControls from "@/forms/fixtures/controls"
import Select from "@/old-components/Select"
import Button from "@/old-components/Button/Button"
import { SelectInit } from "@/old-components/fixture"
import Link from "next/link"

const StepOne: FC<any> = ({ classNames, data, image, onNext, step, config: stepOneConfig }: any) => {

  const [ config, setConfig ] = useState<any>( stepOneConfig ? {...stepOneConfig} : {...OpenFormInit.stepone });
  const [ progress, setProgress ] = useState<number>(0);
  const [ infoControls, setInfoControls ] = useState<any>({
    name: "",
    surname: "",
    phone: "",
    email: "",
    modality: "",
  });
  const [ infoControlsTouched, setInfoControlsTouched ] = useState<any>({
    name: false,
    surname: false,
    phone: false,
    email: false,
    modality: false,
  });
  const [ errorControls, setErrorControls ] = useState<any>({
    name: false,
    surname: false,
    phone: false,
    email: false,
    modality: false,
  });
  const [ dataModalities, setDataModalities ] = useState<Array<any>>([])

  useEffect(() => {
    setConfig({ ...config, ...data });
  }, [data]);

  useEffect(() => {
    setDataModalities([ ...Modalities ]);
  }, [Modalities]);
  
  useEffect(() => {
    setProgress(step);
  }, [step]);

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
        modality: true,
      });
      const newValidation = {
        name: validateControl("name", infoControls.name, true),
        surname: validateControl("surname", infoControls.surname, true),
        phone: validateControl("phone", infoControls.phone, true),
        email: validateControl("email", infoControls.email, true),
        modality: validateControl("modality", infoControls.modality, true),
      };
      setErrorControls({ ...newValidation });
      if (validateControls()) {
        onNext(infoControls);
      }
    }
  }

  const handleOptionSelected = (option: CustomEvent) => {
    const { detail: modality } = option;
    setInfoControlsTouched({ ...infoControlsTouched, modality: true });
    setInfoControls({ ...infoControls, modality });
    setDataModalities( state => state.map((item: any) => ({ ...item, active: item.value === modality })) );
    setErrorControls({ ...errorControls, modality: validateControl("modality", modality, infoControlsTouched[modality])});
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
        <p className="font-Nunito-Sans font-normal text-[14px] leading-4">{ config.subtitle }</p>
      </div>
      <div className="w-p:hidden">
        <Image classNamesImg="w-full h-full object-cover" classNames="w-[112px] h-[112px] rounded-full overflow-hidden" src={image.src} alt={image.alt} />
      </div>
    </div>
    <div className="flex align-middle items-center mt-8 mb-6">
      <p className="text-[14px] leading-5 text-[#282828] font-Nunito-Sans font-normal mr-1">{ config.conditions }</p>
      <Link href={config.privacyLink.link} passHref target={"_blank"}>
        <p className="text-[14px] font-Nunito font-normal text-sm text-[#282828] underline">{config.privacyLink.label}</p>
      </Link>
    </div>
    <div className="mb-6">
      <ProgressBar data={{ progress }} />
    </div>
    <form>
      <div className="mt-6 flex w-p:flex-col gap-6">
        <div className="grow">
          <Input errorMessage={configControls.errorMessagesStepOneOpenForm.name} hasError={errorControls.name} eventFocus={() => handleTouchedControl("name")} data={ configControls.inputNameOpenFormStepOne } eventKeyPress={(e: CustomEvent) => handleKeyPress(e, "name")} />
        </div>
        <div  className="grow">
          <Input errorMessage={configControls.errorMessagesStepOneOpenForm.surname} hasError={errorControls.surname} eventFocus={() => handleTouchedControl("surname")} data={ configControls.inputSurnameOpenFormStepOne } eventKeyPress={(e: CustomEvent) => handleKeyPress(e, "surname")} />
        </div>
      </div>
      <div className="mt-6">
        <Input errorMessage={configControls.errorMessagesStepOneOpenForm.phone} hasError={errorControls.phone} eventFocus={() => handleTouchedControl("phone")} data={ configControls.inputPhoneOpenFormStepOne } eventKeyPress={(e: CustomEvent) => handleKeyPress(e, "phone")} />
      </div>
      <div className="mt-6">
        <Input errorMessage={configControls.errorMessagesStepOneOpenForm.email} hasError={errorControls.email} eventFocus={() => handleTouchedControl("email")} data={ configControls.inputEmailOpenFormStepOne } eventKeyPress={(e: CustomEvent) => handleKeyPress(e, "email")} />
      </div>
      <div className="mt-6">
        <p className="font-Nunito-Sans font-normal text-[14px] leading-5">{ config.modality }</p>
        <Select onClick={(option: CustomEvent) => handleOptionSelected(option)} options={[...dataModalities]} data={{ ...SelectInit, textDefault: !!infoControls.modality ? " " : "Elige una modalidad", icon: "school" }}  />
        <p className={cn("text-[#e57565] text-xs px-3 mt-4", { "hidden": !errorControls.modality })}>{ configControls.errorMessagesStepOneOpenForm.modality }</p>
      </div>
    </form>
    <div className="mt-6">
      <Button dark onClick={handleNext} data={ configControls.buttonConfigOpenFormStepOne } />
    </div>
  </section>
}

export default StepOne