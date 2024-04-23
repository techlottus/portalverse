import { useEffect, useState } from "react"
import PersonalData from "@/forms/steps/PersonalData";
import configControls from "@/forms/fixtures/controls"
import axios from "axios";
import { getTokenForms } from "@/utils/getTokenForms"
import { getEducativeOffer } from "@/utils/getEducativeOffer"
import AcademicData from "@/forms/steps/AcademicData";
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

type ProgramDetailForm = {
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

const ProgramDetailForm = (props: ProgramDetailForm) => {

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
  const [ SFlevels, setSFlevels ] = useState<any>([]);
  const [ SFmodalities, setSFmodalities ] = useState<any>([]);
  const [ SFcampuses, setSFcampuses ] = useState<any>([]);
  const [ options, setOptions ] = useState<any>(null);

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
    // console.log('submit: ', submit);
    
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

  const filterByField = (data:any, filter: any, fields?: string[]) => {
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


  const getBusinessLineToFetchFrom = (businessLine: string, modality: string) => {
    // console.log('businessLine: ', businessLine);
    // console.log('modality: ', modality);
    
    switch(businessLine) {
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
    // console.log('tokenActive: ', tokenActive);
    if (!!tokenActive) {
        handleFetchEducativeOffer()
      }
  }, [tokenActive])

  useEffect(() => {
    // console.log('filterPrograms: ', filterPrograms);
    if (filterPrograms) {
      
      const offerByProgram = filterPrograms?.filter((program: any) => {

        if (businessUnit === 'ULA') {
          // console.log('program.nombreCampus: ', program.nombreCampus);
          // console.log('ulaCampuses.includes(program.nombreCampus): ', ulaCampuses.includes(program.nombreCampus));
          return program.nombrePrograma === prefilledData.program && ulaCampuses.includes(program.nombreCampus)
        } else {
          if (program.lineaNegocio === 'ULA') {
            return businessUnit === 'UTC'
              ? program.nombrePrograma === prefilledData.program && [`Semipresencial`].includes(program.modalidad)
              : program.nombrePrograma === prefilledData.program && program.nombreCampus === `${businessUnit} ONLINE`
          } else {
            return program.nombrePrograma === prefilledData.program
          }
        }
      })
      // console.log('offerByProgram: ', offerByProgram);
      if (!offerByProgram || offerByProgram?.length === 0) {
        console.log(`no se encontro en SF el programa ${prefilledData.program}`);
        setIsError('404')
      } else {

        setFilteredPrograms(offerByProgram)
      }
    }
    // if (!filterPrograms || filterPrograms?.length === 0) {
    // }
    
  }, [filterPrograms])

  useEffect(() => {
    if (filteredPrograms) {
      
      // console.log('filteredPrograms: ', filteredPrograms);
      // const mods = filterByField(filteredPrograms, 'modalidad')
      const programs = filteredPrograms.map((program: any) => {
        return businessUnit !== 'ULA' && program.lineaNegocio === 'ULA' && program.modalidad === 'Online'
          ? {...program, modalidad: 'Flex'}
          : program
      })
      const mods =  filterByField(programs, 'modalidad')
      // console.log('programs: ', programs);
      // console.log('mods: ', mods);
      
      // console.log('mods: ', mods);
      setSFmodalities(mods?.map((mod: string) => {
        return  {
          value: mod,
          text: mod,
          active: mods?.length === 1 || mod === academicData.modality
        }
      }))
      // console.log('SFmodalities: ', SFmodalities);

      
      // console.log('filteredPrograms: ', filteredPrograms);
    }
    
  }, [filteredPrograms])

  useEffect(() => {
    if (SFmodalities?.length > 0) {
      // console.log('SFmodalities: ', SFmodalities);
      // console.log('SFmodalities[0].value: ', SFmodalities[0].value);
      // console.log('options: ', options);
      setOptions({
        ...options,
        modalities: SFmodalities,
      })
      setAcademicData({
        ...academicData,
        modality: SFmodalities?.length === 1 ? SFmodalities[0].value : academicData.modality
      })
      // console.log('SFmodalities?.length === 1: ', SFmodalities?.length === 1);
      // console.log('academicDataTouched: ', academicDataTouched);
      const modality = SFmodalities?.length === 1
      const newAcademicDataTouched = {
        ...academicDataTouched,
        modality
      }
      // console.log('modality: ', modality);
      // console.log('newAcademicDataTouched: ', newAcademicDataTouched);
      setAcademicDataTouched(newAcademicDataTouched)
      // console.log('options: ', options);
      
      const periods = filteredPrograms?.reduce((acc: any, program: any, index: number, arr: any[]) => {
        if (!acc.includes(program.nombrePeriodo)) {
          acc = [...acc, program.nombrePeriodo]
        }
        return acc
      }, [])
       const currentPeriod = periods?.sort((a: any,b: any) => Number(a.nombrePeriodo) - Number(b.nombrePeriodo))[periods.length - 1]
      // console.log('currentPeriod: ', currentPeriod);

      const periodPrograms = filteredPrograms?.filter((program: any) => {
        // console.log('program.nombrePeriodo: ', program.nombrePeriodo);
        // console.log('currentPeriod: ', currentPeriod);
        // console.log('program.nombrePeriodo === currentPeriod: ', program.nombrePeriodo === currentPeriod);

        return program.nombrePeriodo === currentPeriod
      })

      // console.log('periodPrograms: ', periodPrograms);
      const levels = filterByField(periodPrograms,'nivel')
      // console.log('levels: ', levels);
      setSFlevels(levels?.map((level: any) => ({
        value: level,
        text: level,
        active: levels?.length === 1 || level.idCampus === academicData.level
      })))
      // console.log('SFlevels: ', SFlevels);
    }
      
  }, [SFmodalities])

  useEffect(() => {
    if (SFcampuses?.length > 0) {
      // console.log('SFcampuses: ', SFcampuses);
      // console.log('options: ', options);
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
      // console.log('SFlevels: ', SFlevels);
      // console.log('options: ', options);
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
      const periods = filteredPrograms?.reduce((acc: any, program: any, index: number, arr: any[]) => {
        if (!acc.includes(program.nombrePeriodo)) {
          acc = [...acc, program.nombrePeriodo]
        }
        return acc
      }, [])
      const currentPeriod = periods?.sort((a: any,b: any) => Number(a.nombrePeriodo) - Number(b.nombrePeriodo))[periods.length - 1]
      // console.log('currentPeriod: ', currentPeriod);

      const camps = filterByField(filteredPrograms?.filter((program: any) => {
          // console.log('program.nombrePeriodo: ', program.nombrePeriodo);
          // console.log('currentPeriod: ', currentPeriod);
          // console.log('program.nombrePeriodo === currentPeriod: ', program.nombrePeriodo === currentPeriod);

          return program.nombrePeriodo === currentPeriod
        }),'nombreCampus', ['nombreCampus', 'idCampus'])
      // console.log('camps: ', camps);
      setSFcampuses(camps?.map((campus: any) => ({
        value: campus?.idCampus,
        text: campus?.nombreCampus,
        active: camps?.length === 1 || campus.idCampus === academicData.campus
      })))
    }
      
  }, [SFlevels])

  useEffect(() => {
    if (options && (options?.modalities && options?.campuses  && options?.levels) && (options?.modalities[0] && options?.campuses[0] && options?.levels[0])) {
      setIsLoading(false)
      // console.log(options?.modalities);
      // console.log(options?.campuses);
    }
  }, [options])
  useEffect(() => {
    // console.log('prefilledData: ', prefilledData);
    // console.log('options: ', options);

    setPersonalData({
      ...personalData,
      'name':  prefilledData?.name || "",
      'last_name':  prefilledData?.last_name || "",
      'phone':  prefilledData?.phone || "",
      'email':  prefilledData?.email || "",
    })

  }, [prefilledData])

  useEffect(() => {
    // console.log('academicData: ', academicData);
    
    Validate()
  }, [personalData, academicData]);
  useEffect(() => {
    if (!!academicData.modality) {
      // console.log('academicData.modality: ', academicData.modality);
      
      const programsByModality = filteredPrograms?.filter((program: any) => {
        // console.log('program.modalidad: ', program.modalidad);
        // console.log('academicData.modality: ', academicData.modality);
        if (academicData.modality === 'Flex') {
          return program.modalidad === 'Online' && program.lineaNegocio === 'ULA'
        } else {
          return program.modalidad === academicData.modality && program.lineaNegocio === businessUnit
        }
      })
      // setFilteredPrograms(programsByModality)

      const periods = programsByModality?.reduce((acc: any, program: any, index: number, arr: any[]) => {
        if (!acc.includes(program.nombrePeriodo)) {
          acc = [...acc, program.nombrePeriodo]
        }
        return acc
      }, [])
       const currentPeriod = periods?.sort((a: any,b: any) => Number(a.nombrePeriodo) - Number(b.nombrePeriodo))[periods.length - 1]
      // console.log('currentPeriod: ', currentPeriod);

      const periodPrograms = programsByModality?.filter((program: any) => {
        // console.log('program.nombrePeriodo: ', program.nombrePeriodo);
        // console.log('currentPeriod: ', currentPeriod);
        // console.log('program.nombrePeriodo === currentPeriod: ', program.nombrePeriodo === currentPeriod);

        return program.nombrePeriodo === currentPeriod
      })

      // console.log('periodPrograms: ', periodPrograms);
      const levels = filterByField(periodPrograms,'nivel')
      // console.log('levels: ', levels);
      setSFlevels(levels?.map((level: any) => ({
        value: level,
        text: level,
        active: levels?.length === 1 || level.idCampus === academicData.level
      })))
    }
  }, [academicData.modality]);
  useEffect(() => {
    if (!!academicData.campus) {
  
      const programsByCampus = filteredPrograms?.filter((program: any) => {
        return program.idCampus === academicData.campus
      })
      
      const selectedProgramData = programsByCampus.sort((a: any,b: any) => Number(a.nombrePeriodo) - Number(b.nombrePeriodo))[programsByCampus.length - 1];

      setselectedProgram(selectedProgramData)
    }

  }, [academicData.campus]);
  useEffect(() => {
    if (!!academicData.level) {
      const programsByLevel = filteredPrograms?.filter((program: any) => {
          return program.nivel === academicData.level
      })
      // console.log('programsByLevel: ', programsByLevel);

      const periods = programsByLevel?.reduce((acc: any, program: any, index: number, arr: any[]) => {
        if (!acc.includes(program.nombrePeriodo)) {
          acc = [...acc, program.nombrePeriodo]
        }
        return acc
      }, [])
      const currentPeriod = periods?.sort((a: any,b: any) => Number(a.nombrePeriodo) - Number(b.nombrePeriodo))[periods.length - 1]
      // console.log('currentPeriod: ', currentPeriod);

      const camps = filterByField(programsByLevel?.filter((program: any) => {
          // console.log('program.nombrePeriodo: ', program.nombrePeriodo);
          // console.log('currentPeriod: ', currentPeriod);
          // console.log('program.nombrePeriodo === currentPeriod: ', program.nombrePeriodo === currentPeriod);

          return program.nombrePeriodo === currentPeriod
        }),'nombreCampus', ['nombreCampus', 'idCampus'])
      // console.log('camps: ', camps);
      setSFcampuses(camps?.map((campus: any) => ({
        value: campus?.idCampus,
        text: campus?.nombreCampus,
        active: camps?.length === 1 || campus.idCampus === academicData.campus
      })))
    }

  }, [academicData.level]);

  useEffect(() => {
    if (!!selectedProgram) {
      setAcademicData({...academicData, program: selectedProgram?.idOfertaPrograma})
    }
  }, [selectedProgram]);
  useEffect(() => {
    
    // if (isLoadingToken) setIsLoading(true)
    if (!isLoadingToken && !isErrorToken && !!Object.keys(token).length) {
      setTokenActive(`${token.token_type} ${token.access_token}`);
    }
  }, [isLoadingToken, isErrorToken, token]);

  useEffect(() => {
    // console.log('isLoading: ', isLoading);
    // console.log('isError : ', isError );
    
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
    const businessLineToFetchFrom = getBusinessLineToFetchFrom(businessUnit, academicData.modality)
    
    fetchEducativeOffer(process.env.NEXT_PUBLIC_EDUCATIVE_OFFER!, '', businessLineToFetchFrom, tokenActive);
  }


  const sendLeadData = async () => {
    const endpoint = process.env.NEXT_PUBLIC_CAPTACION_PROSPECTO;
    // console.log('filteredPrograms: ',  filteredPrograms);
    
    // console.log('selectedProgram: ',  selectedProgram);

    // query params
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

    // console.log("queryParams: ", queryParams);

    const params = `nombre=${nombre}&apellidoPaterno=${apellidoPaterno}&telefono=${telefono}&email=${email}&lineaNegocio=${lineaNegocio}&modalidad=${modalidad}&nivel=${nivel}&campus=${campus}&programa=${programa}&avisoPrivacidad=true&leadSource=Digital&validaRegistroBoot=${validaRegistroBoot}&source=${source}&canal=${canal}${medio ? `&medio=${medio}` : ""}${campana ? `&campana=${campana}` : ""}`;

    // console.log("params: ", params)

    setIsLoading(true);

    await axios.post(`${endpoint}?${params}`,{},{
      headers: {
        Authorization: tokenActive,
        'Content-Type': 'application/json;charset=UTF-8'
      }
    })
      .then((res: any) => {
        // console.log(res);
        
        if(res?.data?.Exitoso !== "TRUE") {
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
      program: !validateAcademicDataControl( 'program', academicData.program) && academicDataTouched.program,
      level: !validateAcademicDataControl( 'level', academicData.level) && academicDataTouched.level,
      campus: !validateAcademicDataControl( 'campus', academicData.campus) && academicDataTouched.campus,
      modality: !validateAcademicDataControl( 'modality', academicData.modality) && academicDataTouched.modality
    }

    setAcademicDataErrors({ ...newAcademicDataErrors });

    const isValidPersonalData = validatePersonalDataControls();
    const isValidAcademicData = validateAcademicDataControls();

    // console.log('isValidPersonalData: ', isValidPersonalData);
    // console.log('isValidAcademicData: ', isValidAcademicData);

    setIsValid(isValidPersonalData && isValidAcademicData)
    // console.log('isValid: ', isValid);
  }

  const handleSubmit = async () => {
    setIsLoading(true)
    Validate()
    // console.log('isValid: ', isValid);
    // console.log('!isError: ', !isError);
    // console.log('isValid && !isError: ', isValid && !isError);
    
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
    <AcademicData
      academicData={academicData}
      setAcademicData={setAcademicData}
      infoControlsTouched={academicDataTouched}
      setInfoControlsTouched={setAcademicDataTouched}
      errorControls={academicDataErrors}
      setErrorControls={setAcademicDataErrors}
      validateControl={validateAcademicDataControl}
      options={options}
    ></AcademicData>
  </form>
};

export default ProgramDetailForm;