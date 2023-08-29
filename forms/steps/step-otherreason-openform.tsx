import { FC, useEffect, useState } from "react"
import { useRouter } from "next/router"
import cn from "classnames"
import ProgressBar from "@/old-components/ProgressBar"
import OpenFormInit from "@/forms/fixtures/openform"
import configControls from "@/forms/fixtures/controls"
import Input from "@/old-components/Input/Input"
import Button from "@/old-components/Button/Button"

const StepOtherReason: FC<any> = ({ classNames, step, pathThankyou }: any) => {

  const router = useRouter();

  const [ progress, setProgress ] = useState<number>(0);
  const [ config ] = useState<any>({ ...OpenFormInit.stepdetails });
  const [ infoControls, setInfoControls ] = useState<any>({
    name: "",
    surname: "",
    phone: "",
    email: "",
    comment: "",
  });
  const [ infoControlsTouched, setInfoControlsTouched ] = useState<any>({
    name: false,
    surname: false,
    phone: false,
    email: false,
    comment: false,
  });
  const [ errorControls, setErrorControls ] = useState<any>({
    name: false,
    surname: false,
    phone: false,
    email: false,
    comment: false,
  });

  useEffect(() => {
    setProgress(step);
  }, [step]);

  const handleKeyPress = (e: CustomEvent, control: string ) => {
    const { detail: { value } } = e;
    setInfoControls({ ...infoControls, [control]: value });
    setErrorControls({ ...errorControls, [control]: validateControl(control, value, infoControlsTouched[control])});
  };

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

  const handleNext = () => {
    setInfoControlsTouched({
      name: true,
      surname: true,
      phone: true,
      email: true,
      comment: true,
    });
    const newValidation = {
      name: validateControl("name", infoControls.name, true),
      surname: validateControl("surname", infoControls.surname, true),
      phone: validateControl("phone", infoControls.phone, true),
      email: validateControl("email", infoControls.email, true),
      comment: validateControl("comment", infoControls.comment, true),
    };
    setErrorControls({ ...newValidation });
    if (validateControls()) {
      router.push(pathThankyou)
    }
  }

  return <section className={cn(classNames)}>
    <h1 className="font-Poppins font-semibold text-[22px] leading-7">{ config.title }</h1>
    <p className="font-Nunito-Sans font-normal text-base leading-4 mt-6">{ config.subtitle }</p>
    <p className="mt-8 mb-6 text-[14px] leading-5 text-[#282828]">{  config.conditions }</p>
    <div className="mb-6">
      <ProgressBar data={{ progress }} />
    </div>
    <div className="mt-6 flex gap-6 w-p:flex-col">
      <div className="grow">
        <Input errorMessage={configControls.errorMessagesStepOneOpenForm.name} hasError={errorControls.name} data={ configControls.inputNameOpenFormStepOne } eventKeyPress={(e: CustomEvent) => handleKeyPress(e, "name")} />
      </div>
      <div className="grow">
        <Input errorMessage={configControls.errorMessagesStepOneOpenForm.surname} hasError={errorControls.surname} data={ configControls.inputSurnameOpenFormStepOne } eventKeyPress={(e: CustomEvent) => handleKeyPress(e, "surname")} />
      </div>
      </div>
      <div className="mt-6">
        <Input errorMessage={configControls.errorMessagesStepOneOpenForm.phone} hasError={errorControls.phone} data={ configControls.inputPhoneOpenFormStepOne } eventKeyPress={(e: CustomEvent) => handleKeyPress(e, "phone")} />
      </div>
      <div className="mt-6">
        <Input errorMessage={configControls.errorMessagesStepOneOpenForm.email} hasError={errorControls.email} data={ configControls.inputEmailOpenFormStepOne } eventKeyPress={(e: CustomEvent) => handleKeyPress(e, "email")} />
      </div> 
      <div className="mt-6">
        <Input errorMessage={configControls.errorMessagesStepOneOpenForm.comment} hasError={errorControls.comment} data={ configControls.inputCommentOpenFormStepOther } eventKeyPress={(e: CustomEvent) => handleKeyPress(e, "comment")} />
      </div> 
    <div className="flex mt-8">
      <Button dark onClick={handleNext} data={ configControls.buttonConfigOpenFormStepOne } />
    </div>
  </section>
}

export default StepOtherReason