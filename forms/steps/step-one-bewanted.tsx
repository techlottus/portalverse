import { useState } from "react"
import Button from "@/old-components/Button/Button"
import Input from "@/old-components/Input/Input"
import configControls from "@/forms/fixtures/controls"

const StepOne = ( { onNext, copies }: any ) => {

  const [ infoControls, setInfoControls ] = useState<any>({
    name: "",
    surname: "",
    phone: "",
    email: "",
    password: "",
  });
  const [ infoControlsTouched, setInfoControlsTouched ] = useState<any>({
    name: false,
    surname: false,
    phone: false,
    email: false,
    password: false,
  });
  const [ errorControls, setErrorControls ] = useState<any>({
    name: false,
    surname: false,
    phone: false,
    email: false,
    password: false,
  });

  const validateControls = () => !Object.entries(infoControls).map((value: any) => {
    if(value[0] === 'email') {
      return !!value[1].match(configControls.patternEmail) ? !!value[1].match(configControls.patternEmail).length : false
    }
    if(value[0] === 'phone') {
      return value[1].length === 10
    }
    if(value[0] === 'password') {
      return value[1]?.length >= 8
    }
    return !!value[1];
  }).includes(false)

  const validateControl = (control: string, value: string, touched: boolean) => {
    if (control === 'email') {
      return touched ? !value.match(configControls.patternEmail) : false;
    }
    if (control === 'phone') {
      return touched ? !(value && value.length === 10) : false;
    }
    if (control === 'password') {
      return touched ? !value || value?.length < 8 : false;
    }
    return touched ? !value : false;
  };

  const handleTouchedControl = (control: string) => {
    setInfoControlsTouched({ ...infoControlsTouched, [control]: true });
    setErrorControls({ ...errorControls, [control]: validateControl(control, infoControls[control], infoControlsTouched[control])});
  }

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
        password: true,
      });
      const newValidation = {
        name: validateControl("name", infoControls.name, true),
        surname: validateControl("surname", infoControls.surname, true),
        phone: validateControl("phone", infoControls.phone, true),
        email: validateControl("email", infoControls.email, true),
        password: validateControl("password", infoControls.password, true),
      };
      setErrorControls({ ...newValidation });
      if (validateControls()) {
        onNext(infoControls);
      }
    }
  }

  return <section>
    <h1 className="font-Poppins font-semibold text-[22px] leading-7 mb-6">{ copies.title }</h1>
    <p className="font-Nunito font-normal text-sm leading-[17.5px]">{ copies.description }</p>
    <form>
      <div className="mt-6 flex w-p:flex-col gap-6">
        <div className="grow">
          <Input errorMessage={configControls.errorMessagesBeWantedForm.name} hasError={errorControls.name} eventFocus={() => handleTouchedControl("name")} data={ configControls.inputNameOpenFormStepOne } eventKeyPress={(e: CustomEvent) => handleKeyPress(e, "name")} />
        </div>
        <div  className="grow">
          <Input errorMessage={configControls.errorMessagesBeWantedForm.surname} hasError={errorControls.surname} eventFocus={() => handleTouchedControl("surname")} data={ configControls.inputSurnameOpenFormStepOne } eventKeyPress={(e: CustomEvent) => handleKeyPress(e, "surname")} />
        </div>
      </div>
      <div className="mt-6">
        <Input errorMessage={configControls.errorMessagesBeWantedForm.phone} hasError={errorControls.phone} eventFocus={() => handleTouchedControl("phone")} data={ configControls.inputPhoneOpenFormStepOne } eventKeyPress={(e: CustomEvent) => handleKeyPress(e, "phone")} />
      </div>
      <div className="mt-6">
        <Input errorMessage={configControls.errorMessagesBeWantedForm.email} hasError={errorControls.email} eventFocus={() => handleTouchedControl("email")} data={ configControls.inputEmailOpenFormStepOne } eventKeyPress={(e: CustomEvent) => handleKeyPress(e, "email")} />
      </div>
      <div className="mt-6">
        <Input
          errorMessage={
            !infoControls?.password
              ? configControls?.errorMessagesBeWantedForm?.password?.required
              : configControls.errorMessagesBeWantedForm?.password?.minLength
          }
          hasError={errorControls.password}
          eventFocus={() => handleTouchedControl("password")}
          data={ configControls.inputPasswordOpenFormStepOne }
          eventKeyPress={(e: CustomEvent) => handleKeyPress(e, "password")}
        />
      </div>
    </form>
    <div className="mt-6">
      <Button dark onClick={handleNext} data={ {...configControls.buttonConfigOpenFormStepOne, disabled: !validateControls() }} />
    </div>
  </section>
}

export default StepOne