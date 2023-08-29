import { FC, useEffect, useState } from "react"
import cn from "classnames"
import OpenFormInit from "@/forms/fixtures/openform"
import ProgressBar from "@/old-components/ProgressBar"
import Button from "@/old-components/Button/Button"
import configControls from "@/forms/fixtures/controls"
import Select from "@/old-components/Select"
import { SelectInit } from "@/old-components/fixture"
import OptionPill from "@/old-components/OptionPill"

const StepThree: FC<any> = ({ classNames, step, data, contacts, schedulers, onNext, onReturnStep }: any) => {

  const [ config, setConfig ] = useState<any>({ ...OpenFormInit.stepthree });
  const [ activePill, setActivePill ] = useState<number>(-1);
  const [ progress, setProgress ] = useState<number>(0);
  const [ infoControls, setInfoControls ] = useState<any>({
    contacto: "",
    horario: ""
  });
  const [ infoControlsTouched, setInfoControlsTouched ] = useState<any>({
    contacto: false,
    horario: false
  });
  const [ errorControls, setErrorControls ] = useState<any>({
    contacto: false,
    horario: false
  });
  const [ dataContacts, setDataContacts ] = useState<Array<any>>([]);
  const [ dataSchedulers, setDataSchedulers ] = useState<Array<any>>([]);

  useEffect(() => {
    setProgress(step);
  }, [step]);
  
  useEffect(() => {
    if (!!contacts) {
      const arrContacts = contacts.slice(1, -1).split(",")
      setDataContacts(arrContacts.map((contact: string) => ({name: contact.trim(), search: contact.trim(), disabled: false})));
    }
  }, [contacts]);
  
  useEffect(() => {
    if (!!schedulers) {
      const arrSchedulers = schedulers.slice(1, -1).split(",")
      setDataSchedulers(arrSchedulers.map((scheduler: string) => ({ active: false, value: scheduler, text: scheduler })));
    }
  }, [schedulers]);

  const handleNext = () => {
    setInfoControlsTouched({
      contacto: true,
      horario: true
    });
    const newValidation = {
      contacto: validateControl(infoControls.contacto, true),
      horario: validateControl(infoControls.horario, true)
    };
    setErrorControls({ ...newValidation });
    if (!!onNext && validateControls()) {
      onNext(infoControls);
    }
  }

  const validateControls = () => !Object.entries(infoControls).map((value: any) => {
    return !!value[1];
  }).includes(false)

  const validateControl = (value: string, touched: boolean) => {
    return touched ? !value : false;
  };

  const handleSelect = (pill: number, status: boolean, value: string) => {
    if (!status) {
      setActivePill(pill);
      setInfoControls({ ...infoControls, contacto: value });
      setInfoControlsTouched((state: any) => ({ ...state, contacto: true }));
      setErrorControls({ ...errorControls, contacto: validateControl(value, infoControlsTouched.contacto) });
    }
  }

  const handleSelectHorario = (option: CustomEvent) => {
    const { detail: horario } = option;
    setInfoControls({ ...infoControls, horario });
    setDataSchedulers(dataSchedulers.map((item: any) => ({ ...item, active: item.value === horario })))
    setInfoControlsTouched((state: any) => ({ ...state, horario: true }));
    setErrorControls({ ...errorControls, horario: validateControl(horario, infoControlsTouched.horario) });
  }

  const handleChangeInfo = () => {
    if (!!onReturnStep) {
      onReturnStep(2)
    }
  }

  return <section className={cn(classNames)}>
    {/* <h1>{ config.title }</h1>
    <div className="mt-6">
      <ProgressBar data={{ progress }} />
    </div>
    <div className="flex mt-6 p-3 border-solid border rounded-lg border-[#9A9A9A]">
      <div className="flex flex-col grow">
        <h2 className="font-Poppins font-semibold text-[18px] leading-[22px] mb-2">{ config.description }</h2>
        <div className="flex">
          <h3 className="font-Nunito-Sans text-sm leading-[17px] font-bold mr-1">{ config.labelModality }</h3>
          <p className="font-Nunito-Sans text-sm leading-[17px] font-normal">{ data.modality }</p>
        </div>
        <div className="flex">
          <h3 className="font-Nunito-Sans text-sm leading-[17px] font-bold mr-1">{ config.labelNivel }</h3>
          <p className="font-Nunito-Sans text-sm leading-[17px] font-normal">{ data.level }</p>
        </div>
        <div className="flex">
          <h3 className="font-Nunito-Sans text-sm leading-[17px] font-bold mr-1">{ config.labelProgram }</h3>
          <p className="font-Nunito-Sans text-sm leading-[17px] font-normal">{ data.program }</p>
        </div>
        <div className="flex">
          <h3 className="font-Nunito-Sans text-sm leading-[17px] font-bold mr-1">{ config.labelCampus }</h3>
          <p className="font-Nunito-Sans text-sm leading-[17px]">{ data.campus }</p>
        </div>
      </div>
      <div className="cursor-pointer" onClick={handleChangeInfo}>
        <span className="material-icons icons">edit_square</span>
      </div>
    </div>
    <form>
      <div className="mt-6 flex flex-col">
        <p className="font-Nunito font-normal text-sm leading-5">{ config.contact }</p>
        <div className="w-full flex justify-start gap-6 flex-wrap mt-1">
          {
            dataContacts.map((level: any, i: number) => <OptionPill onClick={(value: string) => handleSelect(i, level.disabled, value)}  key={`pill-${i}`} data={{...level}} active={i === activePill} />)
          }
          <p className={cn("text-[#e57565] text-xs px-3 mt-4", { "hidden": !errorControls.contacto })}>{ configControls.errorMessagesStepThreeOpenForm.contacto }</p>
        </div>
      </div>
      <div className="mt-6 flex flex-col">
        <p className="font-Nunito font-normal text-sm leading-5">{ config.schedule }</p>
        <Select onClick={(option: CustomEvent) => handleSelectHorario(option)} options={[...dataSchedulers]} data={{ ...SelectInit, textDefault: !!infoControls.horario ? " " : "Horarios disponibles", icon: "schedule" }}  />
        <p className={cn("text-[#e57565] text-xs px-3 mt-4", { "hidden": !errorControls.horario })}>{ configControls.errorMessagesStepThreeOpenForm.horario }</p>
      </div>
    </form> */}
    <div className="mt-6">
      <Button dark onClick={handleNext} data={ configControls.buttonConfigOpenFormStepThree } />
    </div>
  </section>
}

export default StepThree