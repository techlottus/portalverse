import { FC, useEffect, useState } from "react"
import OpenFormInit from "@/forms/fixtures/openform"
import configControls from "@/forms/fixtures/controls"
import Input from "@/old-components/Input/Input"

const ProgramPageData: FC<any> = ({
  data,
  config: stepOneConfig,
  infoControlsTouched,
  setInfoControlsTouched,
  errorControls,
  setErrorControls,
  validateControl,
  programData,
  setProgramData,
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
    setProgramData({ ...programData, [control]: value });
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
    setProgramData({ ...programData, [control]: detail });
    setErrorControls({ ...errorControls, [control]: !validateControl(control, detail, infoControlsTouched[control]) });
  };

  const handleTouchedControl = (control: string) => {
    setInfoControlsTouched({ ...infoControlsTouched, [control]: true });
    setErrorControls({ ...errorControls, [control]: !validateControl(control, programData[control], true) && infoControlsTouched[control] });
  }

  return <>
    <div className="grow mt-2 hidden">
      <Input
        eventFocus={() => handleTouchedControl("modality")}
        data={configControls.inputProgram}
        eventKeyPress={(e: CustomEvent) => handleKeyPress(e, "modality")}
        value={programData?.modality}
      />
    </div>
    <div className="grow mt-2 hidden">
      <Input
        eventFocus={() => handleTouchedControl("program")}
        data={configControls.inputProgram}
        eventKeyPress={(e: CustomEvent) => handleKeyPress(e, "program")}
        value={programData?.program}
      />
    </div>
    <div className="grow mt-2 hidden">
      <Input
        eventFocus={() => handleTouchedControl("level")}
        data={configControls.inputProgram}
        eventKeyPress={(e: CustomEvent) => handleKeyPress(e, "level")}
        value={programData?.level}
      />
    </div>
  </>
}

export default ProgramPageData