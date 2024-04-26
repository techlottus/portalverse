import { useEffect, useState } from "react"
import PersonalData from "@/forms/steps/PersonalData";
import configControls from "@/forms/fixtures/controls"
import axios from "axios";
import { getTokenForms } from "@/utils/getTokenForms"
import { getEducativeOffer } from "@/utils/getEducativeOffer"
import ScheduleVisitData from "@/forms/steps/ScheduleVisitData";
import { setRegisterBot } from "@/utils/saveDataForms"
import { useRouter } from "next/router";
import { env } from "process";

const businessUnit = process.env.NEXT_PUBLIC_BUSINESS_UNIT!;

// available modalities for prop modality = "Presencial" | "Online" | "Flex" | "Semipresencial"
const getLeadModality = (modality: string) => {
  switch (modality) {
    case "Presencial": return "Presencial";
    case "Online": return "Online";
    case "Flex": return "Online"; // Applies to "UANE" and "UTEG" offer.
    case "Semipresencial": return "Semipresencial"; // Applies to "ULA" offer.
    default: return "";
  }
};

type ScheduleVisitForm = {
  setStatus: (status: { loading: boolean, error: string, valid: boolean, success: boolean }) => void
  submit: boolean;
  prefilledData: {
    name?: string;
    last_name?: string;
    phone?: string;
    email?: string;
    modality?: string;
    campus?: string;
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

const ScheduleVisitForm = (props: ScheduleVisitForm) => {

  const router = useRouter();
  const queryParams = router?.query;
  const { setStatus, submit, prefilledData } = props

  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState('');
  const [isValid, setIsValid] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const [selectedProgram, setselectedProgram] = useState<any>();
  const [tokenActive, setTokenActive] = useState<string>("");
  const [filteredPrograms, setFilteredPrograms] = useState<any>([]);
  const [SFlevels, setSFlevels] = useState<any>([]);
  const [SFmodalities, setSFmodalities] = useState<any>([]);
  const [SFcampuses, setSFcampuses] = useState<any>([]);
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
  const ulaCampuses = [
    'ONLINE',
    'CUAUTITLÁN IZCALLI',
    'CUERNAVACA',
    'FLORIDA',
    'NORTE',
    'VALLE',
  ]
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
      console.log(filterPrograms, "FilterPrograms")
      const offerByCampus = filterPrograms?.filter((program: any) => {
        return program.idCampus === prefilledData.campus
      })
      if (!offerByCampus || offerByCampus?.length === 0) {
        console.log(`no se encontro en SF el programa ${prefilledData.campus}`);
        setIsError('404')
      } else {
        setFilteredPrograms(offerByCampus)
      }
    }
  }, [filterPrograms])

  useEffect(() => {
    if (filteredPrograms) {
      console.log(filteredPrograms, "Filtered Programs")
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

      const periodPrograms = programs?.filter((program: any) => {

        return program.nombrePeriodo === currentPeriod
      })

      const levels = filterByField(periodPrograms, 'nivel')
      if (levels?.length === 1) {
        setAcademicData({
          ...academicData,
          level: levels[0]
        })
      }

      setSFlevels(levels?.map((level: any) => ({
        value: level,
        text: level,
        active: levels?.length === 1 || level.idCampus === academicData.level
      })))
    }

  }, [filteredPrograms])

  useEffect(() => {
    if (SFmodalities?.length > 0) {
      setOptions({
        ...options,
        modalities: SFmodalities,
      })
      setAcademicData({
        ...academicData,
        modality: SFmodalities?.length === 1 ? SFmodalities[0].value : academicData.modality
      })
      const modality = SFmodalities?.length === 1
      const newAcademicDataTouched = {
        ...academicDataTouched,
        modality
      }
      setAcademicDataTouched(newAcademicDataTouched)
    }

  }, [SFmodalities])

  useEffect(() => {
    if (SFcampuses?.length > 0) {
      setOptions({
        ...options,
        campuses: SFcampuses
      })
      setAcademicDataTouched({
        ...academicDataTouched,
        campus: SFcampuses?.length === 1 || academicDataTouched.campus
      })
      setAcademicData({
        ...academicData,
        campus: SFcampuses?.length === 1 ? SFcampuses[0].value : academicData.campus
      })
    }

  }, [SFcampuses])

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
    if (options && (options?.levels) && (options?.levels[0])) {
      setIsLoading(false)
    }
  }, [options])

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
      campus: prefilledData.campus || ""
    })

  }, [prefilledData])

  useEffect(() => {
    Validate()
  }, [personalData, academicData]);

  useEffect(() => {
    if (!!academicData.modality) {
      setSFcampuses([])
      setAcademicData({
        ...academicData,
        level: ''
      })
      const programsByModality = filteredPrograms?.filter((program: any) => {
        if (academicData.modality === 'Flex') {
          return program.modalidad === 'Online' && program.lineaNegocio === 'ULA'
        } else {
          return program.modalidad === academicData.modality
        }
      })
    }
  }, [academicData.modality]);

  useEffect(() => {
    if (!!academicData.campus) {

      const programsByCampus = filteredPrograms?.filter((program: any) => {
        return program.idCampus === academicData.campus
      })

      const selectedProgramData = programsByCampus.sort((a: any, b: any) => Number(a.nombrePeriodo) - Number(b.nombrePeriodo))[programsByCampus.length - 1];

      setselectedProgram(selectedProgramData)
    }

  }, [academicData.campus]);


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
      const currentPeriod = periods?.sort((a: any, b: any) => Number(a.nombrePeriodo) - Number(b.nombrePeriodo))[periods.length - 1]
      const periodPrograms = programsByLevel?.filter((program: any) => {

        return program.nombrePeriodo === currentPeriod
      })
      const camps = filterByField(periodPrograms, 'nombreCampus', ['nombreCampus', 'idCampus'])

      setSFcampuses(camps?.map((campus: any) => ({
        value: campus?.idCampus,
        text: campus?.nombreCampus,
        active: camps?.length === 1 || campus.idCampus === academicData.campus
      })))
    }

  }, [academicData.level]);

  useEffect(() => {
    if (!!selectedProgram) {
      setAcademicData({ ...academicData, program: selectedProgram?.idOfertaPrograma })
    }
  }, [selectedProgram]);

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
    setIsLoading(true)
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

    setIsLoading(true);

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
    <ScheduleVisitData
      scheduleVisitData={academicData}
      setScheduleVisitData={setAcademicData}
      infoControlsTouched={academicDataTouched}
      setInfoControlsTouched={setAcademicDataTouched}
      errorControls={academicDataErrors}
      setErrorControls={setAcademicDataErrors}
      validateControl={validateAcademicDataControl}
      options={options}
    ></ScheduleVisitData>
  </form>
};

export default ScheduleVisitForm;