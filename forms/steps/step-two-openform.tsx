import { FC, useEffect, useState } from "react"
import cn from "classnames"
import OpenFormInit from "@/forms/fixtures/openform"
import Select from "@/old-components/Select/Select"
import { SelectInit } from "@/old-components/fixture"
import Button from "@/old-components/Button/Button"
import configControls from "@/forms/fixtures/controls"
import ProgressBar from "@/old-components/ProgressBar/ProgressBar"
import OptionPill from "@/old-components/OptionPill"
import { OpenFormControls } from "@/types/OpenFormControls.types"
import { SelectOptionConfig } from "@/types/Select.types"

const businessUnit = process.env.NEXT_PUBLIC_BUSINESS_UNIT;

const getAvailableModalities = (): Array<SelectOptionConfig> => {
  switch (businessUnit) {
    case "ULA": {
      return [
        {
          value: "Presencial",
          active: false,
          text: "Presencial",
        },
        {
          value: "Online",
          active: false,
          text: "Online",
        },
        {
          value: "Semipresencial",
          active: false,
          text: "Semipresencial",
        },
      ];
    }
    case "UTC": {
      return [
        {
          value: "Presencial",
          active: false,
          text: "Presencial",
        },
        {
          value: "Online",
          active: false,
          text: "A distancia",
        },
        {
          value: "Semipresencial",
          active: false,
          text: "Ejecutiva",
        },
      ];
    }
    // case "UANE": {
    //   return [
    //     {
    //       value: "Presencial",
    //       active: false,
    //       text: "Presencial",
    //     },
    //     {
    //       value: "Online",
    //       active: false,
    //       text: "Online",
    //     },
    //   ];
    // }
    default: { // case "UTEG" and "UANE"
      return [
        {
          value: "Presencial",
          active: false,
          text: "Presencial",
        },
        {
          value: "Online",
          active: false,
          text: "Online",
        },
        {
          value: "Flex",
          active: false,
          text: "Flex",
        },
      ];
    }
  }
};

const StepTwo: FC<any> = ({
  classNames,
  data,
  controls,
  levels,
  modality,
  onChangeModality,
  onLevelSelected,
  programs,
  onChangeProgram,
  campus,
  programDefault,
  levelDefault,
  academicData,
  setAcademicData,
  isLoading,
  infoControlsTouched,
  setInfoControlsTouched,
  errorControls,
  setErrorControls
}: any) => {

  const [ config, setConfig ] = useState<any>({ ...OpenFormInit.steptwo });
  const [ controlsConfig, setControlsConfig ] = useState<OpenFormControls | null>(null);
  const [ activeLevelPill, setActiveLevelPill ] = useState<number>(-1);
  const [ activeModalityPill, setActiveModalityPill ] = useState<number>(-1);

  const [ dataModalities, setDataModalities ] = useState<Array<any>>([]);
  const [ dataPrograms, setDataPrograms ] = useState<Array<any>>([]);
  const [ dataCampus, setDataCampus ] = useState<Array<any>>([]);
  const [ defaultValues, setDefaultValues ] = useState<any>({});

  useEffect(() => {
    setDataModalities(getAvailableModalities());
  }, [])

  useEffect(() => {
    setDataPrograms([ ...programs ]);
  }, [programs])
  
  useEffect(() => {
    if (!!programDefault && !!dataPrograms.length && !academicData.program) {
      setDefaultValues({ ...defaultValues, program: programDefault });
      onChangeProgram(programDefault);
      setAcademicData({ ...academicData, program: programDefault });
      setInfoControlsTouched({ ...infoControlsTouched, program: true });
    }
  }, [programDefault, dataPrograms])

  useEffect(() => {
    if (!!levelDefault) {
      setDefaultValues({ ...defaultValues, level: levelDefault });
      setAcademicData({ ...academicData, level: levelDefault });
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

  const handleSelect = (pill: number, status: boolean, value: string) => {
    if (!status) {
      setActiveLevelPill(pill);
      setAcademicData({ ...academicData, level: value, program: "", campus: "" });
      onLevelSelected(value);
      setErrorControls({ ...errorControls, level: validateControl(value, infoControlsTouched.level) });
    }
  }

  const handleChangeProgram = (option: CustomEvent) => {
    const { detail: program } = option;
    setAcademicData({ ...academicData, program, campus: "" });
    setDataPrograms(dataPrograms.map((item: any) => ({ ...item, active: item.value === program })));
    onChangeProgram(program);
    setErrorControls((state: any) => ({ ...state, program: validateControl(program, infoControlsTouched.program) }));
  }

  const handleChangeCampus = (option: CustomEvent) => {
    const { detail: campus } = option;
    setAcademicData({ ...academicData, campus });
    setDataCampus(dataCampus.map((item: any) => ({ ...item, active: item.value === campus })))
    setErrorControls({ ...errorControls, campus: validateControl(campus, infoControlsTouched.campus) });
  }

  const validateControl = (value: string, touched: boolean) => {
    return touched ? !value : false;
  };

  const BUSINESS_UNIT = process.env.NEXT_PUBLIC_BUSINESS_UNIT;
  const campusLabel = BUSINESS_UNIT === "UTEG" || BUSINESS_UNIT === "UTC" ? "plantel" : "campus";

  const commonLevels = ["Preparatoria", "Licenciatura", "Maestría"];
  const defaultLevels = BUSINESS_UNIT === "UTC" ? commonLevels : BUSINESS_UNIT === "ULA" ? [...commonLevels, "Doctorado", "Educación Continua"] : [...commonLevels, "Doctorado"]

  return <section className={cn(classNames)}>
      <div className={cn("flex flex-col", { "hidden": controlsConfig?.modality?.hidden })}>
        <p className="font-texts font-normal text-sm leading-5 text-surface-800 mt-6 mb-2">{ config.modality }</p>
          <div className="flex justify-start gap-6 flex-wrap">
            {
              dataModalities?.map((modalityData, i) => {
                return (
                  <OptionPill
                    onClick={() => {
                      const modality = modalityData?.value;
                      console.log('modality: ', modality);
                      
                      setAcademicData({ ...academicData, modality, level: "", program: "", campus: "" });
                      setDataModalities(dataModalities?.map((item: any) => ({ ...item, active: item.value === modality })));
                      onChangeModality(modality);
                      setActiveModalityPill(i);
                      setActiveLevelPill(-1)
                      setErrorControls({ ...errorControls, modality: validateControl(modality, infoControlsTouched.modality) });
                    }}
                    key={`pill-${i}`}
                    data={{ name: modalityData?.text, search: "", disabled: false }}
                    active={i === activeModalityPill}
                  />
                );
              })
            }
          </div>
        <p className={cn("text-error-400  text-xs px-3 mt-4", { "hidden": !errorControls.modality })}>{ configControls.errorMessagesStepTwoOpenForm.modality }</p>
      </div>
      <div className={cn("flex flex-col", { "hidden": controlsConfig?.level?.hidden })}>
        <p className="font-texts font-normal text-3.5 leading-5 text-surface-800 mt-6 mb-1">{ config.level }</p>
        <div className="w-full flex flex-col mt-1">
          <div className="flex justify-start gap-6 flex-wrap">
            {
              levels?.length < 1
                ? defaultLevels?.map((level, i) => (
                    <OptionPill
                      onClick={() => {}}
                      key={`pill-${i}`}
                      data={{ name: level, search: "", disabled: true }}
                      active={false}
                    />
                  ))
                : levels?.map((level: any, i: number) => (
                    <OptionPill
                      onClick={(value: string) => handleSelect(i, level.disabled, value)}
                      key={`pill-${i}`}
                      data={{ ...level, disabled: !!isLoading }}
                      active={i === activeLevelPill}
                    />
                  ))
            }
          </div>
          <p className={cn("text-error-500 text-xs px-3 mt-4", { "hidden": !errorControls.level })}>{ configControls.errorMessagesStepTwoOpenForm.level }</p>
        </div>
      </div>
      <div className={cn("flex flex-col", { "hidden": controlsConfig?.program?.hidden })}>
        <p className="font-texts font-normal text-sm leading-5 text-surface-800 mt-6">{ config.program }</p>
        <Select onClick={(option: CustomEvent) => handleChangeProgram(option)} options={[...dataPrograms]} data={{ ...SelectInit, textDefault: !!academicData.program ? " " : "Elige un programa", disabled: !dataPrograms.length, icon: "school" }}  />
        <p className={cn("text-error-400 text-xs px-3 mt-4", { "hidden": !errorControls.program })}>{ configControls.errorMessagesStepTwoOpenForm.program }</p>
      </div>
      <div className={cn("flex flex-col", { "hidden": controlsConfig?.campus?.hidden })}>
        <p className="font-texts font-normal text-sm leading-5 text-surface-800 mt-6 capitalize">{ campusLabel || config?.campus }</p>
        <Select onClick={(option: CustomEvent) => handleChangeCampus(option)} options={[...dataCampus]} data={{ ...SelectInit, textDefault: !!academicData.campus ? " " : `Elige un ${campusLabel}`, disabled: !dataCampus.length, icon: "apartment" }}  />
        <p className={cn("text-error-400 text-xs px-3 mt-4", { "hidden": !errorControls.campus })}>{ configControls.errorMessagesStepTwoOpenForm.campus }</p>
      </div>
  </section>
}

export default StepTwo