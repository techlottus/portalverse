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

type optionsProgramsType = {
  value?: string;
  text?: string;
  active?: boolean;
}

const optionsProgramsUTC: optionsProgramsType[] = [
  {
    value: 'Arquitectura + Diseño Gráfico',
    text: 'Arquitectura + Diseño Gráfico',
    active: false
  },
  {
    value: 'Contaduría + Administración',
    text: 'Contaduría + Administración',
    active: false
  },
  {
    value: 'Contaduría + Mercadotecnia',
    text: 'Contaduría + Mercadotecnia',
    active: false
  },
  {
    value: 'Mercadotecnia + Diseño Gráfico',
    text: 'Mercadotecnia + Diseño Gráfico',
    active: false
  },
  {
    value: 'Administración + Mercadotecnia',
    text: 'Administración + Mercadotecnia',
    active: false
  },
  {
    value: 'Derecho + Pedagogía',
    text: 'Derecho + Pedagogía',
    active: false
  },
  {
    value: 'Comercio Internacional + Mercadotecnia',
    text: 'Comercio Internacional + Mercadotecnia',
    active: false
  },
  {
    value: 'Comercio Internacional + Contaduría',
    text: 'Comercio Internacional + Contaduría',
    active: false
  },
  {
    value: 'Administración + Comercio Internacional',
    text: 'Administración + Comercio Internacional',
    active: false
  }
]

const optionsProgramsULA: optionsProgramsType[] = [
  {
    value: 'Administración + Marketing',
    text: 'Administración + Marketing',
    active: false
  },
  {
    value: 'Diseño gráfico + Arquitectura',
    text: 'Diseño gráfico + Arquitectura',
    active: false
  },
  {
    value: 'Dirección de hoteles + Turismo',
    text: 'Dirección de hoteles + Turismo',
    active: false
  }
]

const optionsProgramsUANE: optionsProgramsType[] = [
  {
    value: 'Mercadotecnia + Administración',
    text: 'Mercadotecnia + Administración',
    active: false
  },
  {
    value: 'Contaduría + Administración',
    text: 'Contaduría + Administración',
    active: false
  }
]

const optionsProgramsUTEG: optionsProgramsType[] = [
  {
    value: 'Administración y Liderazgo Empresarial + Mercadotecnia',
    text: 'Administración y Liderazgo Empresarial + Mercadotecnia',
    active: false
  },
  {
    value: 'Administración y Liderazgo Empresarial + Contaduría',
    text: 'Administración y Liderazgo Empresarial + Contaduría',
    active: false
  },
  {
    value: 'Administración y Liderazgo Empresarial + Negocios Internacionales',
    text: 'Administración y Liderazgo Empresarial + Negocios Internacionales',
    active: false
  },
  {
    value: 'Administración y Liderazgo Empresarial + Turismo',
    text: 'Administración y Liderazgo Empresarial + Turismo',
    active: false
  },
  {
    value: 'Contaduría + Mercadotecnia',
    text: 'Contaduría + Mercadotecnia',
    active: false
  },
  {
    value: 'Negocios Internacionales + Contaduría',
    text: 'Negocios Internacionales + Contaduría',
    active: false
  },
  {
    value: 'Negocios Internacionales + Turismo',
    text: 'Negocios Internacionales + Turismo',
    active: false
  },
  {
    value: 'Contaduría + Administración',
    text: 'Contaduría + Administración',
    active: false
  },
  {
    value: 'Ingeniería en Sistemas + Ingeniería Industrial en Producción',
    text: 'Ingeniería en Sistemas + Ingeniería Industrial en Producción',
    active: false
  }
]

const DoubleDegreeData: FC<any> = ({
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
  const [programs, setPrograms] = useState<optionsProgramsType | any>();
  const [Options, setOptions] = useState<{ campuses: [], modalities: [], levels: [] }>({ campuses: [], modalities: [], levels: [] });

  useEffect(() => {
    setConfig({ ...config, ...data });
    if (BUSINESS_UNIT == 'UTC') {
      setPrograms(optionsProgramsUTC)
    }
    if (BUSINESS_UNIT == 'ULA') {
      setPrograms(optionsProgramsULA)
    }
    if (BUSINESS_UNIT == 'UANE') {
      setPrograms(optionsProgramsUANE)
    }
    if (BUSINESS_UNIT == 'UTEG') {
      setPrograms(optionsProgramsUTEG)
    }
  }, [data]);
  useEffect(() => {
    setOptions(options);
  }, [options]);

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

      const option = Options?.campuses?.map((option: any) => {
        // console.log(option);
        option.active = option.value === detail

        return option
      })

      // console.log(option);
    }
    if (control === 'modality') {

      const option = Options?.modalities?.map((option: any) => {
        // console.log(option);
        option.active = option.value === detail

        return option
      })
      // console.log(option);

      // option.active = true
    }
    if (control === 'program') {

      const option = programs?.map((option: any) => {
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
    setInfoControlsTouched(true);
    setErrorControls({ ...errorControls, [control]: !validateControl(control, academicData[control], true) && infoControlsTouched[control] });
  }

  return <>
    <div className="flex w-p:flex-col w-p:gap-0 gap-6 font-normal">
      <div className="grow w-full hidden">
        <Input
          eventFocus={() => handleTouchedControl("level")}
          data={configControls.inputNameProgramDetail}
          eventKeyPress={(e: CustomEvent) => handleKeyPress(e, "level")}
          value={academicData.level}
        />
        <p className={cn("text-error-400 text-xs px-3 mt-4", { "hidden": !errorControls.modality })}>{configControls.errorMessagesStepTwoOpenForm.modality}</p>
      </div>
      <div className="grow w-full my-3">
        <Select
          onClick={(option: CustomEvent) => handleSelect(option, "program")}
          options={programs || []}
          data={{ ...SelectInit, textDefault: `Programa`, icon: "school" }}
        />
        <p className={cn("text-error-400 text-xs px-3 mt-4", { "hidden": !errorControls.modality })}>{configControls.errorMessagesStepTwoOpenForm.modality}</p>
      </div>
    </div>
  </>
}

export { DoubleDegreeData }