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
  options
}: any) => {

  const [config, setConfig] = useState<any>(stepOneConfig ? { ...stepOneConfig } : { ...OpenFormInit.stepone });
  const [render, setRender] = useState<any>(false);

  const [controlsConfig, setControlsConfig] = useState<OpenFormControls | null>(null);
  const [Options, setOptions] = useState(options);

  useEffect(() => {
    setConfig({ ...config, ...data });
  }, [data]);
  useEffect(() => {
    setOptions(options);
  }, [options]);
  useEffect(() => {
    setRender(!!Options);
  }, [Options]);

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
      
      const option = Options?.campuses.map((option: any) => {
        // console.log(option);
        option.active = option.value === detail

        return option
      })

      // console.log(option);
    }
    if (control === 'modality') {
      
      const option = Options?.modalities.map((option: any) => {
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

  const renderSelects = () => {
    return Options?.modalities?.length > 0 && Options?.campuses?.length > 0
      ? <>
          <div className="flex flex-col">
            <p className="font-texts font-normal text-sm leading-5 text-surface-800 mt-6 capitalize">Modalidad</p>
            <Select
              onClick={(option: CustomEvent) => handleSelect(option, "modality")}
              options={Options.modalities}
              data={{ ...SelectInit, textDefault: `Elige una modalidad`, icon: "school" }}
            />
            <p className={cn("text-error-400 text-xs px-3 mt-4", { "hidden": !errorControls.modality })}>{configControls.errorMessagesStepTwoOpenForm.modality}</p> 

          </div> 
          <div className={cn("flex flex-col", { "hidden": controlsConfig?.campus?.hidden })}>
            <p className="font-texts font-normal text-sm leading-5 text-surface-800 mt-6 capitalize">{campusLabel || config?.campus}</p>
            <Select
              onClick={(option: CustomEvent) => handleSelect(option, "campus")}
              options={Options.campuses}
              data={{ ...SelectInit, textDefault: `Elige un ${campusLabel}`, icon: "apartment" }}
            />
            <p className={cn("text-error-400 text-xs px-3 mt-4", { "hidden": !errorControls.campus })}>{configControls.errorMessagesStepTwoOpenForm.campus}</p> 
          </div>
        </>
      : <></>
  }

  return <>
    <div className="grow mt-6">
      <Input
        eventFocus={() => handleTouchedControl("program")}
        data={configControls.inputProgram}
        eventKeyPress={(e: CustomEvent) => handleKeyPress(e, "program")}
        value={academicData.program}
      />
    </div>
    <div className="grow mt-6">
      <Input
        eventFocus={() => handleTouchedControl("level")}
        data={configControls.inputNameProgramDetail}
        eventKeyPress={(e: CustomEvent) => handleKeyPress(e, "level")}
        value={academicData.level}
      />
    </div>
    {
      render ? renderSelects() : null
    }

  </>
}

export default AcademicData