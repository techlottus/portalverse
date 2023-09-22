import { FC, KeyboardEventHandler, useEffect, useState } from "react"
import OpenFormInit from "@/forms/fixtures/openform"
import Input from "@/old-components/Input/Input"
import configControls from "@/forms/fixtures/controls"
import Select from "@/old-components/Select/Select"
import { SelectConfig } from "@/types/Select.types"
import cn from "classnames"
import { SelectInit } from "@/old-components/fixture"


type SelectOptions ={ value: string, text: string, active: boolean }
const DentalAppointment: FC<any> = ({
  data,
  config: stepOneConfig,
  appointmentData,
  setAppointmentData,
  infoControlsTouched,
  setInfoControlsTouched,
  errorControls,
  setErrorControls
}: any) => {
  let selectOptions : SelectOptions[] = [
    {value:'campus 1', text: 'campus 1', active: false},
    {value:'campus 2', text: 'campus 2', active: false},
    {value:'campus 3', text: 'campus 3', active: false},
  ]

  const [ dataCampus, setDataCampus ] = useState<Array<any>>([]);

  const [ config, setConfig ] = useState<any>( stepOneConfig ? {...stepOneConfig} : {...OpenFormInit.stepone });
  useEffect(() => {
    setDataCampus([ ...selectOptions ]);
  }, [])
  useEffect(() => {
    setConfig({ ...config, ...data });
  }, [data]);

  const handleKeyPress = (e: any, control: string ) => {
    console.log(e);
    
    const value = e.target.value
    // // const { detail: { value } } = e;
    setAppointmentData({ ...appointmentData, [control]: value });
    setErrorControls({ ...errorControls, [control]: validateControl(control, value, infoControlsTouched[control])});
  };

  const validateControl = (control: string, value: string, touched: boolean) => {
    return touched ? !!value : false;
  };

  const handleTouchedControl = (control: string) => {
    setInfoControlsTouched({ ...infoControlsTouched, [control]: true });
    setErrorControls({ ...errorControls, [control]: validateControl(control, appointmentData.campus, infoControlsTouched[control])});
  }
  const handleChangeCampus = (option: CustomEvent) => {
    const { detail: campus } = option;
    setAppointmentData({ ...appointmentData, campus });
    setDataCampus(dataCampus.map((item: any) => ({ ...item, active: item.value === campus })))
    setErrorControls({ ...errorControls, campus: validateControl("campus", appointmentData["campus"], infoControlsTouched.campus) });
  }
  const selectData: SelectConfig = {
    textDefault:  !!appointmentData.campus ? "¿A qué clínica te gustaría acudir?" : "Elige un campus",
    disabled: false,
    icon: 'domain',
    zindexOptions: 10,
    reset: false,
    isLabel: false
  }

  return <>
    <div className="mt-6">
      <Select options={[...dataCampus]} data={selectData} onClick={(option: CustomEvent) => handleChangeCampus(option)} ></Select>

      <p className={cn("text-error-400 text-xs px-3 mt-4", { "hidden": !errorControls.campus })}>Selecciona un campus para continuar</p>
    </div>
    <div className="mt-6">
      <textarea
        className="mt-6 rounded-t-lg border border-surface-300 border-solid w-full focus:outline-none font-medium font-texts p-4 placeholder-surface-900 border-b border-b-surface-500"
        placeholder="Agrega el motivo de tu consulta"
        maxLength={100} name=""
        id=""
        cols={30}
        rows={4}
        onFocus={() => handleTouchedControl("comments")}
        onKeyUp={(event: any) => {handleKeyPress(event , "comments")}}
      ></textarea>
      <p className="text-surface-500 font-normal text-sm">{appointmentData.comments.length}/100</p>
      
      {/* <Input  data={ {...configControls.inputEmailOpenFormStepOne, label:"Agrega el motivo de tu consulta", iconLeft:''} }  /> */}
      {/* <Input errorMessage={configControls.errorMessagesStepOneOpenForm.email} hasError={errorControls.email} eventFocus={() => handleTouchedControl("email")} data={ configControls.inputEmailOpenFormStepOne } eventKeyPress={(e: CustomEvent) => handleKeyPress(e, "email")} /> */}
    </div>
  </>
}

export default DentalAppointment