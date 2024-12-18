import { FC, useEffect, useState } from "react"
import OpenFormInit from "@/forms/fixtures/openform"
import configControls from "@/forms/fixtures/controls"
import * as Select from "@/components/lottus-education/Select"
import { SelectInit } from "@/old-components/fixture"
import cn from "classnames"
import Input from "@/components/lottus-education/Input"

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
  options,
  modalities,
  levels,
  campuses
}: any) => {

  const [config, setConfig] = useState<any>(stepOneConfig ? { ...stepOneConfig } : { ...OpenFormInit.stepone });

  const [Options, setOptions] = useState<{campuses: [], modalities: [], levels: []}>({campuses: [], modalities: [], levels: []});

  const [optModalities, setOptModalitites] = useState([])
  const [optCampuses, setOptCampuses] = useState([])
  const [optLevels, setOptLevels] = useState([])

  useEffect(() => {
    setConfig({ ...config, ...data });
  }, [data]);
  useEffect(() => {
    setOptModalitites( modalities);
  }, [modalities]);
  useEffect(() => {
    setOptLevels(levels);
  }, [levels]);
  useEffect(() => {
    setOptCampuses(campuses);
  }, [campuses]);


  const handleKeyPress = (e: any, control: string) => {
    const value = e;    
    setInfoControlsTouched({ ...infoControlsTouched, [control]: true });
    setAcademicData({ ...academicData, [control]: value });
    setErrorControls({ ...errorControls, [control]: !validateControl(control, value, infoControlsTouched[control]) });
  };
  const handleSelect = (e: any, control: string) => {
    
     console.log("handleselect:",e, control)
    // if (control === 'campus') {
      
    //   const option = optCampuses?.map((option: any) => {
    //     option.active = option.value === e

    //     return option
    //   })

    // }
    // if (control === 'modality') {
      
    //   const option = optModalities?.map((option: any) => {
    //     option.active = option.value === e

    //     return option
    //   })
    // }
    // if (control === 'level') {
      
    //   const option = optLevels?.map((option: any) => {
    //     option.active = option.value === e

    //     return option
    //   })
    // }
    
    setInfoControlsTouched({ ...infoControlsTouched, [control]: true });
    setAcademicData({ ...academicData, [control]: e });
    console.log("academic: " ,academicData)

    setErrorControls({ ...errorControls, [control]: !validateControl(control, e, infoControlsTouched[control]) });
  };

  const handleTouchedControl = (control: string) => {
    setInfoControlsTouched({ ...infoControlsTouched, [control]: true });
    setErrorControls({ ...errorControls, [control]: !validateControl(control, academicData[control], true) && infoControlsTouched[control] });
  }
  return <>
    {
      optModalities && <>
        <div className="grow mt-2 hidden">
        <Input
          placeholder= "Programa"
          name = "program"
          onFocus={() => handleTouchedControl("program")}
          onKeyUp={(e: any) => handleKeyPress(e, "program")}
          value={academicData.program}
        />
      </div>
      <div className={cn("flex flex-col mt-3", {'hidden': optModalities?.length > 0 && optModalities?.length < 2 })}>
        {/* <p className="font-texts font-normal text-sm leading-5 text-surface-800 mt-3 mb-2 capitalize">Modalidad</p> */}
      <Select.Root onValueChange={(option:any)=>handleSelect(option, "modality")} value={academicData?.modality}>
        <Select.Trigger >
        <Select.Value placeholder="Elige una modalidad"  />
        </Select.Trigger>
        <Select.Content>
          {optModalities?.map((opt:any,i:number)=>( <Select.Item key={i} value={opt?.value} >{opt?.text}</Select.Item>))}             
        </Select.Content>
      </Select.Root>
        <p className={cn("text-error-400 text-xs px-3 mt-4", { "hidden": !errorControls.modality })}>{configControls.errorMessagesStepTwoOpenForm.modality}</p> 
      </div> 
      <div className={cn("flex flex-col mt-3 ")}>
        {/* <p className="font-texts font-normal text-sm leading-5 text-surface-800 mt-3 mb-2 capitalize">Nivel</p> */}
         <Select.Root onValueChange={(option:any)=>handleSelect(option, "level")} value={academicData?.level}>
        <Select.Trigger  >
        <Select.Value placeholder="Elige un nivel"  />
        </Select.Trigger>
        <Select.Content>
          {optLevels?.map((opt:any,i:number)=>( <Select.Item key={i} value={opt?.value}  >{opt?.text}</Select.Item>))}             
        </Select.Content>
      </Select.Root>
        <p className={cn("text-error-400 text-xs px-3 mt-4", { "hidden": !errorControls.level })}>{configControls.errorMessagesStepTwoOpenForm.level}</p>
      </div> 
      <div className="flex flex-col mt-3">
        {/* <p className="font-texts font-normal text-sm leading-5 text-surface-800 mt-3 mb-2 capitalize">{campusLabel || config?.campus}</p> */}
        <Select.Root onValueChange={(option:any)=>handleSelect(option, "campus")} value={academicData?.campus}>
        <Select.Trigger >
        <Select.Value placeholder={`Elige un ${campusLabel}`}  />
        </Select.Trigger>
        <Select.Content>
          {optCampuses?.map((opt:any,i:number)=>( <Select.Item key={i} value={opt?.value} >{opt?.text}</Select.Item>))}             
        </Select.Content>
      </Select.Root>
        <p className={cn("text-error-400 text-xs px-3 mt-4", { "hidden": !errorControls.campus })}>{configControls.errorMessagesStepTwoOpenForm.campus}</p> 
      </div>
      </>
    }

  </>
}

export default AcademicData