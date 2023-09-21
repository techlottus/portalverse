import { FC, useEffect, useState } from "react"
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

  const handleKeyPress = (e: CustomEvent, control: string ) => {
    const { detail: { value } } = e;
    setAppointmentData({ ...appointmentData, [control]: value });
    setErrorControls({ ...errorControls, [control]: validateControl(control, value, infoControlsTouched[control])});
  };

  const handleOptionSelected = (option: SelectOptions) => {
    console.log(option);
    
    setAppointmentData({ ...appointmentData, "campus": option.value });

  }

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
    textDefault:  !!appointmentData.campus ? " " : "Elige un campus",
    disabled: false,
    icon: '',
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
      
      <Input eventFocus={() => handleTouchedControl("comments")} data={ {...configControls.inputEmailOpenFormStepOne, label:"comentarios", icon:'comment'} } eventKeyPress={(e: CustomEvent) => handleKeyPress(e, "comments")} />
      {/* <Input errorMessage={configControls.errorMessagesStepOneOpenForm.email} hasError={errorControls.email} eventFocus={() => handleTouchedControl("email")} data={ configControls.inputEmailOpenFormStepOne } eventKeyPress={(e: CustomEvent) => handleKeyPress(e, "email")} /> */}
    </div>
  </>
}

export default DentalAppointment