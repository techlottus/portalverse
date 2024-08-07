import { FC, useEffect, useState } from "react"
import OpenFormInit from "@/forms/fixtures/openform"
import configControls from "@/forms/fixtures/controls"
import Select from "@/old-components/Select/Select"
import { SelectInit } from "@/old-components/fixture"
import cn from "classnames"
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


  const handleKeyPress = (e: CustomEvent, control: string) => {
    const { detail: { value } } = e;
    
    // console.log('value: ', value);
    // console.log('errorControls: ', errorControls);
    // console.log(`errorControls[${control}]: `, errorControls[control]);
    
    setInfoControlsTouched({ ...infoControlsTouched, [control]: true });
    setAcademicData({ ...academicData, [control]: value });
    setErrorControls({ ...errorControls, [control]: !validateControl(control, value, infoControlsTouched[control]) });
  };
  const handleSelect = (e: CustomEvent, control: string) => {
    // console.log('e: ', e);
    const { detail } = e;
    // console.log('detail: ', detail);
    if (control === 'campus') {
      
      const option = optCampuses?.map((option: any) => {
        // console.log(option);
        option.active = option.value === detail

        return option
      })

      // console.log(option);
    }
    if (control === 'modality') {
      
      const option = optModalities?.map((option: any) => {
        // console.log(option);
        option.active = option.value === detail

        return option
      })
      // console.log(option);
      
      // option.active = true
    }
    if (control === 'level') {
      
      const option = optLevels?.map((option: any) => {
        // console.log(option);
        option.active = option.value === detail

        return option
      })
      // console.log(option);
      
      // option.active = true
    }
    // console.log('errorControls: ', errorControls);
    // console.log(`errorControls[${control}]: `, errorControls[control]);
    
    setInfoControlsTouched({ ...infoControlsTouched, [control]: true });
    setAcademicData({ ...academicData, [control]: detail });
    setErrorControls({ ...errorControls, [control]: !validateControl(control, detail, infoControlsTouched[control]) });
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
          eventFocus={() => handleTouchedControl("program")}
          data={configControls.inputProgram}
          eventKeyPress={(e: CustomEvent) => handleKeyPress(e, "program")}
          value={academicData.program}
        />
      </div>
      <div className={cn("flex flex-col", {'hidden': optModalities?.length > 0 && optModalities?.length < 2 })}>
        <p className="font-texts font-normal text-sm leading-5 text-surface-800 mt-2 capitalize">Modalidad</p>
        <Select
          onClick={(option: CustomEvent) => handleSelect(option, "modality")}
          options={optModalities || []}
          data={{ ...SelectInit, textDefault: `Elige una modalidad`, icon: "school" }}
        />
        <p className={cn("text-error-400 text-xs px-3 mt-4", { "hidden": !errorControls.modality })}>{configControls.errorMessagesStepTwoOpenForm.modality}</p> 
      </div> 
      <div className={cn("flex flex-col", {'hidden': optLevels?.length > 0 && optLevels?.length < 2 })}>
        <p className="font-texts font-normal text-sm leading-5 text-surface-800 mt-2 capitalize">Nivel</p>
        <Select
          onClick={(option: CustomEvent) => handleSelect(option, "level")}
          options={optLevels || []}
          data={{ ...SelectInit, textDefault: `Elige un nivel`, icon: "", disabled: !academicData.modality }}
        />
        <p className={cn("text-error-400 text-xs px-3 mt-4", { "hidden": !errorControls.level })}>{configControls.errorMessagesStepTwoOpenForm.level}</p>
      </div> 
      <div className="flex flex-col">
        <p className="font-texts font-normal text-sm leading-5 text-surface-800 mt-2 capitalize">{campusLabel || config?.campus}</p>
        <Select
          onClick={(option: CustomEvent) => handleSelect(option, "campus")}
          options={optCampuses || []}
          data={{ ...SelectInit, textDefault: `Elige un ${campusLabel}`, icon: "apartment", disabled: !academicData.level && !academicData.modality }}
        />
        <p className={cn("text-error-400 text-xs px-3 mt-4", { "hidden": !errorControls.campus })}>{configControls.errorMessagesStepTwoOpenForm.campus}</p> 
      </div>
      </>
    }

  </>
}

export default AcademicData