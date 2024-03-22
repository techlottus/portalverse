import { FC, useEffect, useState } from "react"
import OpenFormInit from "@/forms/fixtures/openform"
import configControls from "@/forms/fixtures/controls"
import { InputInit } from "@/old-components/fixture"
import Select from "@/old-components/Select/Select"
import { OpenFormControls } from "@/types/OpenFormControls.types"
import { SelectInit } from "@/old-components/fixture"
import cn from "classnames"
import OptionPill from "@/old-components/OptionPill"
import { SelectOptionConfig } from "@/types/Select.types"
import Input from "@/old-components/Input/Input"

const BUSINESS_UNIT = process.env.NEXT_PUBLIC_BUSINESS_UNIT;
const campusLabel = BUSINESS_UNIT === "UTEG" || BUSINESS_UNIT === "UTC" ? "plantel" : "campus";

const commonLevels = ["Preparatoria", "Licenciatura", "Maestría"];
const defaultLevels = BUSINESS_UNIT === "UTC" ? commonLevels : BUSINESS_UNIT === "ULA" ? [...commonLevels, "Doctorado", "Educación Continua"] : [...commonLevels, "Doctorado"]

const AcademicData: FC<any> = ({
  data,
  config: stepOneConfig,
  infoControlsTouched,
  setInfoControlsTouched,
  errorControls,
  setErrorControls,
  validateControl,
  academicData,
  setAcademicData,
}: any) => {

  const [config, setConfig] = useState<any>(stepOneConfig ? { ...stepOneConfig } : { ...OpenFormInit.stepone });

  const [controlsConfig, setControlsConfig] = useState<OpenFormControls | null>(null);

  useEffect(() => {
    setConfig({ ...config, ...data });
  }, [data]);

  const handleKeyPress = (e: CustomEvent, control: string) => {
    const { detail: { value } } = e;
    setInfoControlsTouched({ ...infoControlsTouched, [control]: true });
    setAcademicData({ ...academicData, [control]: value });
    setErrorControls({ ...errorControls, [control]: !validateControl(control, value, infoControlsTouched[control]) });
  };

  const handleTouchedControl = (control: string) => {
    setInfoControlsTouched({ ...infoControlsTouched, [control]: true });
    setErrorControls({ ...errorControls, [control]: !validateControl(control, academicData[control], true) && infoControlsTouched[control] });
  }

  return <>
    <div className="grow">
      <Input eventFocus={() => handleTouchedControl("program")} data={configControls.inputProgram} eventKeyPress={(e: CustomEvent) => handleKeyPress(e, "program")} />
    </div>
    <div className="grow">
      <Input eventFocus={() => handleTouchedControl("level")} data={configControls.inputNameOpenFormStepOne} eventKeyPress={(e: CustomEvent) => handleKeyPress(e, "level")} />
    </div>
    {/* <div className="flex flex-col">
      <p className="font-texts font-normal text-sm leading-5 text-surface-800 mt-6 capitalize">Modalidad</p>
      <Select onClick={(option: CustomEvent) => handleTouchedControl("modality")} options={[...modalityData]} data={{ ...SelectInit, textDefault: !!academicData.modality ? " " : `Elige un ${modality}`, disabled: !modalityData.length, icon: "school" }} />
    </div> 
    {/* 
    <div className={cn("flex flex-col", { "hidden": controlsConfig?.campus?.hidden })}>
      <p className="font-texts font-normal text-sm leading-5 text-surface-800 mt-6 capitalize">{campusLabel || config?.campus}</p>
      <Select onClick={(option: CustomEvent) => handleTouchedControl("campus")} options={[...dataCampus]} data={{ ...SelectInit, textDefault: !!academicData.campus ? " " : `Elige un ${campusLabel}`, disabled: !dataCampus.length, icon: "apartment" }} />
      <p className={cn("text-error-400 text-xs px-3 mt-4", { "hidden": !errorControls.campus })}>{configControls.errorMessagesStepTwoOpenForm.campus}</p> 
    </div> */}

  </>
}

export default AcademicData