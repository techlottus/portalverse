import { FC, useEffect, useState } from "react"
import cn from "classnames"
import OpenFormInit from "@/forms/fixtures/openform"
import configControls from "@/forms/fixtures/controls"
import { OpenFormControls } from "@/types/OpenFormControls.types"
import { SelectOptionConfig } from "@/types/Select.types"
import Radio from "@/components/lottus-education/Radio"
import * as Select from "@/components/lottus-education/Select"
import * as Field from "@/components/lottus-education/Field"

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

  const [config, setConfig] = useState<any>({ ...OpenFormInit.steptwo });
  const [controlsConfig, setControlsConfig] = useState<OpenFormControls | null>(null);
  const [activeLevelPill, setActiveLevelPill] = useState<number>(-1);
  const [activeModalityPill, setActiveModalityPill] = useState<number>(-1);

  const [dataModalities, setDataModalities] = useState<Array<any>>([]);
  const [dataPrograms, setDataPrograms] = useState<Array<any>>([]);
  const [dataCampus, setDataCampus] = useState<Array<any>>([]);
  const [defaultValues, setDefaultValues] = useState<any>({});

  useEffect(() => {
    setDataModalities(getAvailableModalities());
  }, [])

  useEffect(() => {
    setDataPrograms([...programs]);
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
    setDataCampus([...campus]);
  }, [campus])

  useEffect(() => {
    setControlsConfig({ ...controls });
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

  const handleChangeProgram = (option: any) => {
    setAcademicData({ ...academicData, program: option, campus: "" });
    setDataPrograms(dataPrograms.map((item: any) => ({ ...item, active: item.value === option })));
    onChangeProgram(option);
    setErrorControls((state: any) => ({ ...state, program: validateControl(option, infoControlsTouched.program) }));
  }

  const handleChangeCampus = (option: any) => {
    setAcademicData({ ...academicData, campus:option });
    setDataCampus(dataCampus.map((item: any) => ({ ...item, active: item.value === option })))
    setErrorControls({ ...errorControls, campus: validateControl(option, infoControlsTouched.campus) });
  }

  const validateControl = (value: string, touched: boolean) => {
    return touched ? !value : false;
  };
  const handleTouchedControl = (control: string) => {
    setInfoControlsTouched({ ...infoControlsTouched, [control]: true });
    const isValid = validateControl(academicData[control], true);
    setErrorControls({
      ...errorControls,
      [control]: !isValid && infoControlsTouched[control],
    });
  };

  const BUSINESS_UNIT = process.env.NEXT_PUBLIC_BUSINESS_UNIT;
  const campusLabel = BUSINESS_UNIT === "UTEG" || BUSINESS_UNIT === "UTC" ? "plantel" : "campus";

  const commonLevels = ["Preparatoria", "Licenciatura", "Maestría"];
  const defaultLevels = BUSINESS_UNIT === "UTC" ? commonLevels : BUSINESS_UNIT === "ULA" ? [...commonLevels, "Doctorado", "Educación Continua"] : [...commonLevels, "Doctorado"]

  return <section className={cn(classNames)}>
    <div className={cn("flex flex-col", { "hidden": controlsConfig?.modality?.hidden })}>
      <p className="font-texts font-normal text-sm leading-5 text-surface-800 mt-6 mb-2">{config.modality}</p>
        <Field.Root hasError={errorControls.modality}>
      <div className="flex justify-start gap-4 flex-wrap">
        {
          dataModalities?.map((modalityData, i) => {
            return (
              <Radio
                name={modalityData?.text}
                disabled={false}
                hasError={false}
                value={modalityData?.value}
                checked={i === activeModalityPill}
                onChange={() => {
                  const modality = modalityData?.value;
                  setAcademicData({ ...academicData, modality, level: "", program: "", campus: "" });
                  setDataModalities(dataModalities?.map((item: any) => ({ ...item, active: item.value === modality })));
                  onChangeModality(modality);
                  setActiveModalityPill(i);
                  setActiveLevelPill(-1)
                  setErrorControls({ ...errorControls, modality: validateControl(modality, infoControlsTouched.modality) });
                }}
                key={`pill-${i}`}>
                {modalityData?.text}
              </Radio>

            );
          })
        }
      </div>
        {errorControls.modality && <Field.Helper className="">{configControls.errorMessagesStepTwoOpenForm.modality}</Field.Helper>}
        </Field.Root>
      {/* <p className={cn("text-error-400 font-normal font-texts text-xs mt-2", { "hidden": !errorControls.modality })}>{configControls.errorMessagesStepTwoOpenForm.modality}</p> */}
    </div>
    <div className={cn("flex flex-col", { "hidden": controlsConfig?.level?.hidden })}>
      <p className="font-texts font-normal text-3.5 leading-5 text-surface-800 mt-6 mb-1">{config.level}</p>
      <div className="w-full flex flex-col mt-1">
        <Field.Root hasError={errorControls.level}>
        <div className="flex justify-start gap-4 flex-wrap">
          {
            levels?.length < 1
              ? defaultLevels?.map((level, i) => (
                <Radio
                  name={level}
                  disabled={true}
                  hasError={false}
                  value={level}
                  checked={false}
                  key={`pill-${i}`}>
                  {level}
                </Radio>
              ))
              : levels?.map((level: any, i: number) => (
                <Radio
                  onChange={(value: any) => handleSelect(i, level.disabled, value.target.value)}
                  name={level.name}
                  disabled={!!isLoading}
                  hasError={false}
                  value={level.name}
                  checked={i === activeLevelPill}
                  key={`pill-${i}`}>
                  {level.name}
                </Radio>
              ))
          }
        </div>
          {errorControls.level && <Field.Helper className="">{configControls.errorMessagesStepTwoOpenForm.level}</Field.Helper>}
          </Field.Root>
        {/* <p className={cn("text-error-500 font-normal font-texts text-xs mt-2", { "hidden": !errorControls.level })}>{configControls.errorMessagesStepTwoOpenForm.level}</p> */}
      </div>
    </div>
    <div className={cn("flex flex-col", { "hidden": controlsConfig?.program?.hidden })}>
      <p className="font-texts font-normal text-sm leading-5 text-surface-800 mt-6">{config.program}</p>
      <Field.Root hasError={errorControls.program}>
      <Select.Root
        disabled={!dataPrograms.length}
        onValueChange={(option: any) => handleChangeProgram(option)}
        value={academicData.program}>
        <Select.Trigger
          value={academicData.program}
          hasError={errorControls["program"]}
          isValid={!!academicData.program?.trim()}>
          <Select.Value placeholder={"Elige un programa"} />
        </Select.Trigger>
        <Select.Content>
          {dataPrograms?.map((opt: any, i: number) => (
            <Select.Item
              onClick={() => handleTouchedControl("program")}
              key={i}
              value={opt?.value} >
              {opt?.text}
            </Select.Item>
          ))
          }
        </Select.Content>
      </Select.Root>
      {errorControls.program && <Field.Helper className="">{configControls.errorMessagesStepTwoOpenForm.program}</Field.Helper>}
          </Field.Root>
      {/* <p className={cn("text-error-400 font-normal font-texts text-xs mt-2", { "hidden": !errorControls.program })}>{configControls.errorMessagesStepTwoOpenForm.program}</p> */}
    </div>
    <div className={cn("flex flex-col", { "hidden": controlsConfig?.campus?.hidden })}>
      <p className="font-texts font-normal text-sm leading-5 text-surface-800 mt-6 capitalize">{campusLabel || config?.campus}</p>
      <Field.Root hasError={errorControls.campus}>
      <Select.Root
        disabled={!dataCampus.length}
        onValueChange={(option: any) => handleChangeCampus(option)}
        value={academicData.campus}>
        <Select.Trigger
          value={academicData.campus}
          hasError={errorControls.campus}
          isValid={!!academicData.campus?.trim()}>
          <Select.Value placeholder={!!academicData.campus ? " " : `Elige un ${campusLabel}`} />
        </Select.Trigger>
        <Select.Content>
          {dataCampus?.map((opt: any, i: number) => (
            <Select.Item
              onClick={() => handleTouchedControl("campus")}
              key={i}
              value={opt?.value} >
              {opt?.text}
            </Select.Item>
          ))
          }
        </Select.Content>
      </Select.Root>
      {errorControls.campus && <Field.Helper className="">{configControls.errorMessagesStepTwoOpenForm.campus}</Field.Helper>}
      </Field.Root>
      {/* <p className={cn("text-error-400 font-normal font-texts text-xs mt-2", { "hidden": !errorControls.campus })}>{configControls.errorMessagesStepTwoOpenForm.campus}</p> */}
    </div>
  </section>
}

export default StepTwo