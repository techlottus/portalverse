import { FC, useEffect, useState } from "react"
import cn from "classnames"
import OpenFormInit, { Modalities } from "@/forms/fixtures/openform"
import Select from "@/old-components/Select"
import { SelectInit } from "@/old-components/fixture"
import Button from "@/old-components/Button/Button"
import configControls from "@/forms/fixtures/controls"
import ProgressBar from "@/old-components/ProgressBar"
import OptionPill from "@/old-components/OptionPill"
import { OpenFormControls } from "@/types/OpenFormControls.types"

const StepTwo: FC<any> = ({
  classNames,
  data,
  onNext,
  step,
  controls,
  levels,
  modality,
  onChangeModality,
  onLevelSelected,
  programs,
  onChangeProgram,
  campus,
  programDefault,
  levelDefault
}: any) => {

  const [ config, setConfig ] = useState<any>({ ...OpenFormInit.steptwo });
  const [ controlsConfig, setControlsConfig ] = useState<OpenFormControls | null>(null);
  const [ activePill, setActivePill ] = useState<number>(-1);
  const [ progress, setProgress ] = useState<number>(0);
  const [ infoControls, setInfoControls ] = useState<any>({
    modality: "",
    level: "",
    program: "",
    campus: ""
  });
  const [ infoControlsTouched, setInfoControlsTouched ] = useState<any>({
    modality: false,
    level: false,
    program: false,
    campus: false
  });
  const [ errorControls, setErrorControls ] = useState<any>({
    modality: false,
    level: false,
    program: false,
    campus: false
  });
  const [ dataModalities, setDataModalities ] = useState<Array<any>>([]);
  const [ dataPrograms, setDataPrograms ] = useState<Array<any>>([]);
  const [ dataCampus, setDataCampus ] = useState<Array<any>>([]);
  const [ defaultValues, setDefaultValues ] = useState<any>({});

  useEffect(() => {
    if (!!modality) {
      setDataModalities(Modalities.map((item: any) => ({ ...item, active: item.value === modality })));
      setInfoControls({ ...infoControls, modality, level: !!defaultValues.level ? defaultValues.level : "", program: "", campus: "" });
      setInfoControlsTouched({ ...infoControlsTouched, modality: true });
      return
    }
    setDataModalities([ ...Modalities ]);
  }, [Modalities, modality]);

  useEffect(() => {
    setDataPrograms([ ...programs ]);
  }, [programs])
  
  useEffect(() => {
    if (!!programDefault && !!dataPrograms.length && !infoControls.program) {
      setDefaultValues({ ...defaultValues, program: programDefault });
      onChangeProgram(programDefault);
      setInfoControls({ ...infoControls, program: programDefault });
      setInfoControlsTouched({ ...infoControlsTouched, program: true });
    }
  }, [programDefault, dataPrograms])

  useEffect(() => {
    if (!!levelDefault) {
      setDefaultValues({ ...defaultValues, level: levelDefault });
      setInfoControls({ ...infoControls, level: levelDefault });
      setInfoControlsTouched({ ...infoControlsTouched, level: true });
    }
  }, [levelDefault])
  
  useEffect(() => {
    setDataCampus([ ...campus ]);
  }, [campus])

  useEffect(() => {
    setControlsConfig({...controls});
  }, [controls])

  useEffect(() => {
    setConfig({ ...config, ...data });
  }, [data]);
  
  useEffect(() => {
    setProgress(step);
  }, [step]);

  const handleNext = () => {
    setInfoControlsTouched({
      modality: true,
      level: true,
      program: true,
      campus: true
    });
    const newValidation = {
      modality: validateControl(infoControls.modality, true),
      level: validateControl(infoControls.level, true),
      program: validateControl(infoControls.program, true),
      campus: validateControl(infoControls.campus, true)
    };
    setErrorControls({ ...newValidation });
    if (!!onNext && validateControls()) {
      onNext(infoControls);
    }
  }

  const handleSelect = (pill: number, status: boolean, value: string) => {
    if (!status) {
      setActivePill(pill);
      setInfoControls({ ...infoControls, level: value, program: "", campus: "" });
      onLevelSelected(value);
      setErrorControls({ ...errorControls, level: validateControl(value, infoControlsTouched.level) });
    }
  }

  const handleChangeModality = (option: CustomEvent) => {
    const { detail: modality } = option;
    setInfoControls({ ...infoControls, modality, level: !!defaultValues.level ? defaultValues.level : "", program: "", campus: "" });
    setDataModalities(Modalities.map((item: any) => ({ ...item, active: item.value === modality })));
    onChangeModality(modality);
    setActivePill(-1);
    setErrorControls({ ...errorControls, modality: validateControl(modality, infoControlsTouched.modality) });
  }

  const handleChangeProgram = (option: CustomEvent) => {
    const { detail: program } = option;
    setInfoControls({ ...infoControls, program, campus: "" });
    setDataPrograms(dataPrograms.map((item: any) => ({ ...item, active: item.value === program })));
    onChangeProgram(program);
    setErrorControls((state: any) => ({ ...state, program: validateControl(program, infoControlsTouched.program) }));
  }

  const handleChangeCampus = (option: CustomEvent) => {
    const { detail: campus } = option;
    setInfoControls({ ...infoControls, campus });
    setDataCampus(dataCampus.map((item: any) => ({ ...item, active: item.value === campus })))
    setErrorControls({ ...errorControls, campus: validateControl(campus, infoControlsTouched.campus) });
  }

  const validateControls = () => !Object.entries(infoControls).map((value: any) => {
    return !!value[1];
  }).includes(false)

  const validateControl = (value: string, touched: boolean) => {
    return touched ? !value : false;
  };

  return <section className={cn(classNames)}>
    <h1>{ config.title }</h1>
    <div className="mb-6">
      <ProgressBar data={{ progress }} />
    </div>
    <form>
      <div className={cn("flex flex-col", { "hidden": controlsConfig?.modality?.hidden })}>
        <p className="font-Nunito font-normal text-[14px] leading-5 text-[#282828] mt-6">{ config.modality }</p>
        <Select onClick={(option: CustomEvent) => handleChangeModality(option)} options={[...dataModalities]} data={{ ...SelectInit, textDefault: !!infoControls.modality ? " " : "Elige una modalidad", disabled: !dataModalities.length, icon: "school" }}  />
        <p className={cn("text-[#e57565] text-xs px-3 mt-4", { "hidden": !errorControls.modality })}>{ configControls.errorMessagesStepTwoOpenForm.modality }</p>
      </div>
      <div className={cn("flex flex-col", { "hidden": controlsConfig?.level?.hidden })}>
        <p className="font-Nunito font-normal text-[14px] leading-5 text-[#282828] mt-6 mb-1">{ config.level }</p>
        <div className="w-full flex flex-col mt-1">
          <div className="flex justify-start gap-6 flex-wrap">
            {
              levels.map((level: any, i: number) => <OptionPill onClick={(value: string) => handleSelect(i, level.disabled, value)}  key={`pill-${i}`} data={{...level}} active={i === activePill} />)
            }
          </div>
          <p className={cn("text-[#e57565] text-xs px-3 mt-4", { "hidden": !errorControls.level })}>{ configControls.errorMessagesStepTwoOpenForm.level }</p>
        </div>
      </div>
      <div className={cn("flex flex-col", { "hidden": controlsConfig?.program?.hidden })}>
        <p className="font-Nunito font-normal text-[14px] leading-5 text-[#282828] mt-6">{ config.program }</p>
        <Select onClick={(option: CustomEvent) => handleChangeProgram(option)} options={[...dataPrograms]} data={{ ...SelectInit, textDefault: !!infoControls.program ? " " : "Elige un programa", disabled: !dataPrograms.length, icon: "school" }}  />
        <p className={cn("text-[#e57565] text-xs px-3 mt-4", { "hidden": !errorControls.program })}>{ configControls.errorMessagesStepTwoOpenForm.program }</p>
      </div>
      <div className={cn("flex flex-col", { "hidden": controlsConfig?.campus?.hidden })}>
        <p className="font-Nunito font-normal text-[14px] leading-5 text-[#282828] mt-6">{ config.campus }</p>
        <Select onClick={(option: CustomEvent) => handleChangeCampus(option)} options={[...dataCampus]} data={{ ...SelectInit, textDefault: !!infoControls.campus ? " " : "Elige un campus", disabled: !dataCampus.length, icon: "apartment" }}  />
        <p className={cn("text-[#e57565] text-xs px-3 mt-4", { "hidden": !errorControls.campus })}>{ configControls.errorMessagesStepTwoOpenForm.campus }</p>
      </div>
    </form>
    <div className="mt-6">
      <Button dark onClick={handleNext} data={ configControls.buttonConfigOpenFormStepOne } />
    </div>
  </section>
}

export default StepTwo