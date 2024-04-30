import { useEffect, useState } from "react"
import PersonalData from "@/forms/steps/PersonalData";
import configControls from "@/forms/fixtures/controls"
import axios from "axios";
import { getTokenForms } from "@/utils/getTokenForms"
import { getEducativeOffer } from "@/utils/getEducativeOffer"
import { setRegisterBot } from "@/utils/saveDataForms"
import { useRouter } from "next/router";
import { env } from "process";
import AcreditatData from "../steps/AcreditatData";

const businessUnit = process.env.NEXT_PUBLIC_BUSINESS_UNIT!;

type AcreditatForm = {
  setStatus: (status: { loading: boolean, error: string, valid: boolean, success: boolean }) => void
  submit: boolean;
  prefilledData: {
    name?: string;
    last_name?: string;
    phone?: string;
    email?: string;
    level: string;
    program: string;
    modality?: string;
  };
  options: {
    modalities: {
      value: string,
      text: string,
      active: boolean
    }[];
    campuses: {
      value: string,
      text: string,
      active: boolean
    }[];
  }
  controls?: any;
}

const AcreditatForm = (props: AcreditatForm) => {

  const router = useRouter();
  const queryParams = router?.query;
  const { setStatus, submit, prefilledData } = props

  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState('');
  const [isValid, setIsValid] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const [selectedProgram, setselectedProgram] = useState<any>();
  const [tokenActive, setTokenActive] = useState<string>("");
  const [filteredPrograms, setFilteredPrograms] = useState<any>([]);
  const [SFlevels, setSFlevels] = useState<any>([]);
  const [SFprograms, setSFprograms] = useState<any>([]);
  const [options, setOptions] = useState<any>(null);

  const [personalData, setPersonalData] = useState({
    name: "",
    last_name: "",
    phone: "",
    email: "",
  });

  const [personalDataTouched, setPersonalDataTouched] = useState<{ [key: string]: boolean }>({
    name: false,
    last_name: false,
    phone: false,
    email: false,
  })

  const [personalDataErrors, setPersonalDataErrors] = useState({
    name: false,
    last_name: false,
    phone: false,
    email: false,
  })

  const [academicData, setAcademicData] = useState({
    modality: "",
    level: "",
    program: "",
    campus: "",
  });

  const [academicDataTouched, setAcademicDataTouched] = useState({
    modality: false,
    level: false,
    program: false,
    campus: false
  });

  const [academicDataErrors, setAcademicDataErrors] = useState({
    modality: false,
    level: false,
    program: false,
    campus: false
  })

  useEffect(() => {
    if (submit) handleSubmit()
  }, [submit]);

  const {
    fetchData: fetchEducativeOffer,
    filterPrograms
  } = getEducativeOffer();

  const {
    isLoading: isLoadingToken,
    isError: isErrorToken,
    token,
  } = getTokenForms();

  const getLeadModality = (modality: string) => {
    switch (modality) {
      case "Presencial": return "Presencial";
      case "Online": return "Online";
      case "Flex": return "Online"; // Applies to "UANE" and "UTEG" offer.
      case "Semipresencial": return "Semipresencial"; // Applies to "ULA" offer.
      default: return "";
    }
  };

  const filterByField = (data: any, filter: any, fields?: string[]) => {
    return data?.reduce((acc: any[], curr: any) => {
      if (!fields) {
        if (!acc.includes(curr[filter])) {
          acc = [...acc, curr[filter]]
        }
      } else {
        const fieldsResult = fields.reduce((fieldacc: any, field: any) => {
          if (!Object.keys(fieldacc).includes(curr[filter])) {
            fieldacc[field] = curr[field]
          }
          return fieldacc
        }, {});
        acc = [...acc, fieldsResult]
      }
      return acc

    }, [])
  }

  const getBusinessLineToFetchFrom = (businessLine: string) => {

    switch (businessLine) {
      case "UANE": {
        return "UANE,ULA"
      }
      case "UTEG": {
        return "UTEG,ULA"
      }
      case "ULA": {
        return "ULA"
      }
      case "UTC": {
        return "UTC,ULA"
      }
      default: return ""
    }
  }

  useEffect(() => {
    if (!!tokenActive) {
      handleFetchEducativeOffer()
    }
  }, [tokenActive])

  useEffect(() => {
    if (filterPrograms) {
      const offerByProgram = filterPrograms?.filter((program: any) => {
        return program.nombrePrograma === prefilledData.program
      })
      console.log("prefilledData", prefilledData)
      console.log("offerbyProgram", offerByProgram)
      setFilteredPrograms(offerByProgram)
      /* const offerByCampus = filterPrograms?.filter((program: any) => {
        return program.idCampus === prefilledData.
      })
      if (!offerByCampus || offerByCampus?.length === 0) {
        setIsError('404')
      } else {
        
      }*/
    }
  }, [filterPrograms])

  useEffect(() => {
    if (filteredPrograms) {
      const programs = filteredPrograms.map((program: any) => {
        return businessUnit !== 'ULA' && program.lineaNegocio === 'ULA' && program.modalidad === 'Online'
          ? { ...program, modalidad: 'Flex' }
          : program
      })

      const periods = programs?.reduce((acc: any, program: any, index: number, arr: any[]) => {
        if (!acc.includes(program.nombrePeriodo)) {
          acc = [...acc, program.nombrePeriodo]
        }
        return acc
      }, [])
      const currentPeriod = periods?.sort((a: any, b: any) => Number(a.nombrePeriodo) - Number(b.nombrePeriodo))[periods.length - 1]
      const periodPrograms = programs/* ?.filter((program: any) => {
        return program.nombrePeriodo === currentPeriod
      }) */

      const levels = filterByField(periodPrograms, 'nivel')

      setAcademicData({
        ...academicData,
        level: levels?.length === 1 ? levels[0] : academicData.level,
        /* campus: prefilledData?.campus, */
        modality: "Presencial"
      })

      setAcademicDataTouched({
        ...academicDataTouched,
        level: levels?.length === 1,
        /* campus: !!prefilledData?.campus, */
        modality: true
      })

      setSFlevels(levels?.map((level: any) => ({
        value: level,
        text: level,
        active: levels?.length === 1 || level.idCampus === academicData.level
      })))

    }
  }, [filteredPrograms])

  useEffect(() => {
    if (SFlevels?.length > 0) {
      setOptions({
        ...options,
        levels: SFlevels
      })
      setAcademicData({
        ...academicData,
        level: SFlevels?.length === 1 ? SFlevels[0].value : academicData.level
      })
      setAcademicDataTouched({
        ...academicDataTouched,
        level: SFlevels?.length === 1 || academicDataTouched.level
      })
    }
  }, [SFlevels])

  useEffect(() => {
    if (SFprograms?.length > 0) {
      setOptions({
        ...options,
        programs: SFprograms
      })
      setAcademicData({
        ...academicData,
        program: SFprograms?.length === 1 ? SFprograms[0].value : academicData.program
      })
      setAcademicDataTouched({
        ...academicDataTouched,
        program: SFprograms?.length === 1 || academicDataTouched.program
      })
    }

  }, [SFprograms])

  useEffect(() => {
    /* if (options && (options?.levels) && (options?.levels[0])) {
      setIsLoading(false)
    } */
  }, [options])

  useEffect(() => {
    if (!!academicData.program) {

      const selectedProgramData = filteredPrograms?.filter((program: any) => {
        return program.idOfertaPrograma === academicData.program
      })
      setselectedProgram(selectedProgramData[0])
    }

  }, [academicData.program]);

  useEffect(() => {
    setPersonalData({
      ...personalData,
      'name': prefilledData?.name || "",
      'last_name': prefilledData?.last_name || "",
      'phone': prefilledData?.phone || "",
      'email': prefilledData?.email || "",
    })
    setAcademicData({
      ...academicData,
      /* campus: prefilledData?.campus || "" */
    })

  }, [prefilledData])

  useEffect(() => {
    Validate()
  }, [personalData, academicData]);

  useEffect(() => {

    if (!!academicData.level) {
      const programsByLevel = filteredPrograms?.filter((program: any) => {
        return program.nivel === academicData.level
      })
      const periods = programsByLevel?.reduce((acc: any, program: any, index: number, arr: any[]) => {
        if (!acc.includes(program.nombrePeriodo)) {
          acc = [...acc, program.nombrePeriodo]
        }
        return acc
      }, [])
      const sortedPeriods = periods?.sort((a: any, b: any) => {
        return Number(a) - Number(b)
      })
      const currentPeriod = sortedPeriods[sortedPeriods.length - 1]
      const periodPrograms = programsByLevel?.filter((program: any) => {
        return program.nombrePeriodo === currentPeriod
      })

      const programs = filterByField(periodPrograms, 'nombrePrograma', ['nombrePrograma', 'idOfertaPrograma'])
      const orderPrograms = programs.sort((a: any, b: any) => {
        if (a.nombrePrograma < b.nombrePrograma) {
          return -1;
        }
        if (a.nombrePrograma > b.nombrePrograma) {
          return 1;
        }
        return 0;
      })
      setSFprograms(orderPrograms?.map((program: any) => ({
        value: program?.idOfertaPrograma,
        text: program?.nombrePrograma,
        active: orderPrograms?.length === 1 || program.idOfertaPrograma === academicData.program
      })))
    }

  }, [academicData.level]);

  useEffect(() => {
    if (!isLoadingToken && !isErrorToken && !!Object.keys(token).length) {
      setTokenActive(`${token.token_type} ${token.access_token}`);
    }
  }, [isLoadingToken, isErrorToken, token]);

  useEffect(() => {
    setStatus({ loading: isLoading, error: isError, valid: isValid, success: isSuccess })
  }, [isLoading, isError, isValid, isSuccess]);

  const validatePersonalDataControl = (control: string, value: string) => {
    if (control === 'email') {
      return !!value.match(configControls.patternEmail)
    }
    if (control === 'phone') {
      return value.trim().length === 10
    }
    return !!value.trim()
  };

  const validatePersonalDataControls = () => !Object.entries(personalData).map(([key, value]: any) => {
    const validity = validatePersonalDataControl(key, value)
    return validity
  }).includes(false)

  const validateAcademicDataControl = (control: string, value: string) => {
    return !!value?.trim();
  };

  const validateAcademicDataControls = () => !Object.entries(academicData).map(([key, value]: any) => {
    const validity = validateAcademicDataControl(key, value);
    return validity
  }).includes(false)

  const handleFetchEducativeOffer = () => {
    setIsLoading(false)
    setFilteredPrograms([]);
    const businessLineToFetchFrom = getBusinessLineToFetchFrom(businessUnit)

    fetchEducativeOffer(process.env.NEXT_PUBLIC_EDUCATIVE_OFFER!, '', businessLineToFetchFrom, tokenActive);
  }

  const sendLeadData = async () => {
    const endpoint = process.env.NEXT_PUBLIC_CAPTACION_PROSPECTO;

    const nombre = personalData?.name;
    const apellidoPaterno = personalData?.last_name;
    const telefono = personalData?.phone;
    const email = personalData?.email;
    const lineaNegocio = selectedProgram?.lineaNegocio || env.NEXT_PUBLIC_BUSINESS_UNIT;
    const modalidad = getLeadModality(academicData?.modality);
    const nivel = academicData?.level;
    const campus = academicData?.campus;
    const programa = academicData?.program;
    const validaRegistroBoot = setRegisterBot();
    const source = `portal${businessUnit}`;
    const canal = process.env.NEXT_PUBLIC_CANAL;
    const medio = queryParams?.utm_medium;
    const campana = queryParams?.utm_campaign;
    const params = `nombre=${nombre}&apellidoPaterno=${apellidoPaterno}&telefono=${telefono}&email=${email}&lineaNegocio=${lineaNegocio}&modalidad=${modalidad}&nivel=${nivel}&campus=${campus}&programa=${programa}&avisoPrivacidad=true&leadSource=Digital&validaRegistroBoot=${validaRegistroBoot}&source=${source}&canal=${canal}${medio ? `&medio=${medio}` : ""}${campana ? `&campana=${campana}` : ""}`;

    setIsLoading(false);

    await axios.post(`${endpoint}?${params}`, {}, {
      headers: {
        Authorization: tokenActive,
        'Content-Type': 'application/json;charset=UTF-8'
      }
    })
      .then((res: any) => {
        if (res?.data?.Exitoso !== "TRUE") {
          throw new Error();
        }
        router.push(`/thank-you`);
      })
      .catch((err: any) => {
        setIsLoading(false);
        setIsError(err.message);
      })
  }

  const Validate = () => {
    const newPersonalDataErrors = {
      name: !validatePersonalDataControl("name", personalData.name) && personalDataTouched.name,
      last_name: !validatePersonalDataControl("last_name", personalData.last_name) && personalDataTouched.last_name,
      phone: !validatePersonalDataControl("phone", personalData.phone) && personalDataTouched.phone,
      email: !validatePersonalDataControl("email", personalData.email) && personalDataTouched.email,
    }

    setPersonalDataErrors({ ...newPersonalDataErrors });

    const newAcademicDataErrors = {
      program: !validateAcademicDataControl('program', academicData.program) && academicDataTouched.program,
      level: !validateAcademicDataControl('level', academicData.level) && academicDataTouched.level,
      campus: !validateAcademicDataControl('campus', academicData.campus) && academicDataTouched.campus,
      modality: !validateAcademicDataControl('modality', academicData.modality) && academicDataTouched.modality
    }

    setAcademicDataErrors({ ...newAcademicDataErrors });
    const isValidPersonalData = validatePersonalDataControls();
    const isValidAcademicData = validateAcademicDataControls();
    setIsValid(isValidPersonalData && isValidAcademicData)
  }

  const handleSubmit = async () => {
    setIsLoading(true)
    Validate()
    if (isValid && !isError) {
      sendLeadData()
    }
  }

  return <form>
    <PersonalData
      personalData={personalData}
      setPersonalData={setPersonalData}
      infoControlsTouched={personalDataTouched}
      setInfoControlsTouched={setPersonalDataTouched}
      errorControls={personalDataErrors}
      setErrorControls={setPersonalDataErrors}
      validateControl={validatePersonalDataControl}
    ></PersonalData>
    {/* <AcreditatData
      scheduleVisitData={academicData}
      setScheduleVisitData={setAcademicData}
      infoControlsTouched={academicDataTouched}
      setInfoControlsTouched={setAcademicDataTouched}
      errorControls={academicDataErrors}
      setErrorControls={setAcademicDataErrors}
      validateControl={validateAcademicDataControl}
      options={options}
    ></AcreditatData> */}
  </form>
};

export { AcreditatForm };