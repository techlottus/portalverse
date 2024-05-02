import { FC, useEffect, useState } from "react"
import OpenFormInit from "@/forms/fixtures/openform"
import configControls from "@/forms/fixtures/controls"
import Select from "@/old-components/Select/Select"
import { SelectInit } from "@/old-components/fixture"
import cn from "classnames"
import Input from "@/old-components/Input/Input"

const ScheduleVisitData: FC<any> = ({
  data,
  config: stepOneConfig,
  infoControlsTouched,
  setInfoControlsTouched,
  errorControls,
  setErrorControls,
  validateControl,
  scheduleVisitData,
  setScheduleVisitData,
  options
}: any) => {

  const [config, setConfig] = useState<any>(stepOneConfig ? { ...stepOneConfig } : { ...OpenFormInit.stepone });

  const [Options, setOptions] = useState<{ programs: [], modalities: [], levels: [] }>({ programs: [], modalities: [], levels: [] });

  useEffect(() => {
    setConfig({ ...config, ...data });
  }, [data]);
  useEffect(() => {
    setOptions(options);
  }, [options]);

  const handleKeyPress = (e: CustomEvent, control: string) => {
    const { detail: { value } } = e;
    setInfoControlsTouched({ ...infoControlsTouched, [control]: true });
    setScheduleVisitData({ ...scheduleVisitData, [control]: value });
    setErrorControls({ ...errorControls, [control]: !validateControl(control, value, infoControlsTouched[control]) });
  };

  const handleSelect = (e: CustomEvent, control: string) => {
    const { detail } = e;
    if (control === 'program') {
      const option = Options?.programs?.map((option: any) => {
        option.active = option.value === detail
        return option
      })
    }
    if (control === 'modality') {
      const option = Options?.modalities?.map((option: any) => {
        option.active = option.value === detail
        return option
      })
    }
    if (control === 'level') {
      const option = Options?.levels?.map((option: any) => {
        option.active = option.value === detail

        return option
      })
    }

    setInfoControlsTouched({ ...infoControlsTouched, [control]: true });
    setScheduleVisitData({ ...scheduleVisitData, [control]: detail });
    setErrorControls({ ...errorControls, [control]: !validateControl(control, detail, infoControlsTouched[control]) });
  };

  const handleTouchedControl = (control: string) => {
    setInfoControlsTouched({ ...infoControlsTouched, [control]: true });
    setErrorControls({ ...errorControls, [control]: !validateControl(control, scheduleVisitData[control], true) && infoControlsTouched[control] });
  }

  return <>
    <div className="grow mt-2 hidden">
      <Input
        eventFocus={() => handleTouchedControl("modality")}
        data={configControls.inputProgram}
        eventKeyPress={(e: CustomEvent) => handleKeyPress(e, "modality")}
        value={scheduleVisitData?.modality}
      />
    </div>
    <div className={cn("flex flex-col", { '': Options?.levels?.length > 0 && Options?.levels?.length < 2 })}>
      <p className="font-texts font-normal text-sm leading-5 text-surface-800 mt-2 capitalize">Nivel</p>
      <Select
        onClick={(option: CustomEvent) => handleSelect(option, "level")}
        options={Options?.levels || []}
        data={{ ...SelectInit, textDefault: ` `, icon: " " }}
      />
      <p className={cn("text-error-400 text-xs px-3 mt-4", { "hidden": !errorControls.level })}>{configControls.errorMessagesStepTwoOpenForm.level}</p>
    </div>
    <div className="grow mt-2 hidden">
      <Input
        eventFocus={() => handleTouchedControl("campus")}
        data={configControls.inputProgram}
        eventKeyPress={(e: CustomEvent) => handleKeyPress(e, "campus")}
        value={scheduleVisitData?.campus}
      />
    </div>
    <div className="flex flex-col">
      <p className="font-texts font-normal text-sm leading-5 text-surface-800 mt-2 capitalize">Programa</p>
      <Select
        onClick={(option: CustomEvent) => handleSelect(option, "program")}
        options={Options?.programs || []}
        data={{ ...SelectInit, textDefault: ` `, icon: " ", disabled: !scheduleVisitData.level }}
      />
      <p className={cn("text-error-400 text-xs px-3 mt-4", { "hidden": !errorControls.campus })}>{configControls.errorMessagesStepTwoOpenForm.campus}</p>
    </div>
  </>
}

export default ScheduleVisitData