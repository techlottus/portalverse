import { FC, useEffect, useState } from "react"
import OpenFormInit from "@/forms/fixtures/openform"
import Select from "@/old-components/Select/Select"
import { SelectConfig } from "@/types/Select.types"
import cn from "classnames"


type SelectOptions ={ value: string, text: string, active: boolean }
const DentalAppointment: FC<any> = ({
  appointmentData,
  setAppointmentData,
  infoControlsTouched,
  setInfoControlsTouched,
  errorControls,
  setErrorControls,
  validateControl
}: any) => {
  let selectOptions : SelectOptions[] = [
    {value:'valle', text: 'Valle', active: appointmentData.campus === 'valle'},
    {value:'norte', text: 'Norte', active: appointmentData.campus === 'norte'},
    {value:'cuernavaca', text: 'Cuernavaca', active: appointmentData.campus === 'cuernavaca'},
  ]

  const [ dataCampus, setDataCampus ] = useState<Array<any>>([]);

  useEffect(() => {
    setDataCampus([ ...selectOptions ]);
  }, [appointmentData.campus])

  const BUSINESS_UNIT = process.env.NEXT_PUBLIC_BUSINESS_UNIT;
  const campusLabel = BUSINESS_UNIT === "UTEG" || BUSINESS_UNIT === "UTC" ? "plantel" : "campus";

  const handleKeyPress = (e: any, control: string ) => {

    const value = e.target.value
    setAppointmentData({ ...appointmentData, [control]: value });
    setErrorControls({ ...errorControls, [control]: !validateControl(value) && infoControlsTouched.reason});
  };

  const handleTouchedControl = (control: string) => {
    setInfoControlsTouched({ ...infoControlsTouched, [control]: true });
    setErrorControls({ ...errorControls, [control]: !validateControl(appointmentData[control]) && infoControlsTouched.reason});
  }
  const handleChangeCampus = (option: CustomEvent) => {
    const { detail: campus } = option;
    setInfoControlsTouched({ ...infoControlsTouched, campus: true });
    setAppointmentData({ ...appointmentData, campus });
    setDataCampus(dataCampus.map((item: any) => ({ ...item, active: item.value === campus })))
    setErrorControls({ ...errorControls, campus: !validateControl(appointmentData["campus"]) && infoControlsTouched.reason});
  }
  const selectData: SelectConfig = {
    textDefault:  !!appointmentData.campus ? "¿A qué clínica te gustaría acudir?" : `Elige un ${campusLabel}`,
    disabled: false,
    icon: 'domain',
    zindexOptions: 10,
    reset: false,
    isLabel: false
  }

  return <>
    <div className="mt-6">
      <Select options={[...dataCampus]} data={selectData} onClick={(option: CustomEvent) => handleChangeCampus(option)} ></Select>

      <p className={cn("text-error-400 text-xs px-3 mt-4", { "hidden": !errorControls.campus })}>Selecciona un {campusLabel} para continuar</p>
    </div>
    <div className="mt-6">
      <textarea
        className={cn("mt-6 rounded-t-lg border border-surface-300 border-solid w-full focus:outline-none font-medium font-texts p-4 border-b focus:placeholder-primary-500 focus:border-b-primary-500",{"border-b-error-500 placeholder-error-500" : errorControls.reason, " border-b-surface-500 placeholder-surface-900" : !errorControls.reason } )}
        placeholder="Agrega el motivo de tu consulta"
        maxLength={100} name=""
        id=""
        cols={30}
        rows={4}
        onBlur={() => handleTouchedControl("reason")}
        onKeyUp={(event: any) => { handleKeyPress(event , "reason"); }}
        onBlurCapture={() => handleTouchedControl("reason")}
        onClick={() => handleTouchedControl("reason")}
      ></textarea>
      <p className="text-surface-500 font-normal text-sm">{appointmentData.reason.length}/100</p>
      <p className={cn("text-error-400 text-xs px-3 mt-4", { "hidden": !errorControls.reason })}>Agrega un motivo de tu cita</p>
      
      </div>
  </>
}

export default DentalAppointment