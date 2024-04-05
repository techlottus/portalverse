import { useEffect, useState } from "react"
import PersonalData from "@/forms/steps/PersonalData";
import configControls from "@/forms/fixtures/controls"
import axios from "axios";
import { getTokenForms } from "@/utils/getTokenForms"
import { getEducativeOffer } from "@/utils/getEducativeOffer"
import { FormConfig } from "@/forms/fixtures/openform"
import AcademicData from "@/forms/steps/AcademicData";
import { setRegisterBot } from "@/utils/saveDataForms"
import { useRouter } from "next/router";
import { env } from "process";

const businessUnit = process.env.NEXT_PUBLIC_BUSINESS_UNIT!;


const getLeadModality = (
  modality: string // "Presencial" | "Online" | "Flex" | "Semipresencial"
) => {
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
  // console.log(prefilledData);
  

  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState('');
  const [isValid, setIsValid] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const [controlsConfig, setControlsConfig] = useState({ ...FormConfig });
  const [tokenActive, setTokenActive] = useState<string>("");
  const [levelsOffer, setLevelsOffer] = useState<any>([]);
  const [filteredPrograms, setFilteredPrograms] = useState<any>([]);
  const [filteredCampus, setFilteredCampus] = useState<any>([]);
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

  useEffect(() => {
    setIsLoading(true)
  }, [])
  useEffect(() => {
    if (submit) handleSubmit()
  }, [submit]);

  const {
    fetchData: fetchEducativeOffer,
    filterByLevel,
    filterByProgram,
    data: educativeOfferData,
    isLoading: isLoadingEO,
    isError: isErrorEO,
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
    switch(businessLine) {
      case "UANE": {
        switch(modality) {
          case "Presencial": return "UANE";
          case "Flex": return "ULA";
          case "Online": return "UANE,ULA";
          default: return "UANE"
        }
      }
      case "UTEG": {
        switch(modality) {
          case "Presencial": return "UTEG";
          case "Flex": return "ULA";
          case "Online": return "ULA";
          default: return "UTEG"
        }
      }
      case "ULA": {
        return "ULA"
      }
      case "UTC": {
        switch(modality) {
          case "Presencial": return "UTC";
          case "Semipresencial": return "UTC,ULA";
          case "Online": return "UTC";
          default: return "UTC"
        }
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
    const offerByProgram = filterPrograms?.filter((program: any) => {
      return program.nombrePrograma === prefilledData.program
    })
    // console.log('offerByProgram: ', offerByProgram);
    setFilteredPrograms(offerByProgram)
    // console.log('filterPrograms: ', filterPrograms);
    const mods = filterByField(offerByProgram, 'modalidad')
    // console.log('mods: ', mods);
    setSFmodalities(mods?.map((mod: string) => {
      return  {
        value: mod,
        text: mod,
        active: mods?.length === 1
      }
    }))
    // console.log('SFmodalities: ', SFmodalities);
    const camps = filterByField(offerByProgram,'nombreCampus', ['nombreCampus', 'idCampus'])
    // console.log('camps: ', camps);
    setSFcampuses(camps?.map((campus: any) => ({
      value: campus?.idCampus,
      text: campus?.nombreCampus,
      active: camps?.length === 1
    })))
    // console.log('SFcampuses: ', SFcampuses);
    
  }, [filterPrograms])

  useEffect(() => {
    // console.log('filterPrograms: ', filterPrograms);
    const mods = filterByField(filteredPrograms, 'modalidad')
    // console.log('mods: ', mods);
    setSFmodalities(mods?.map((mod: string) => {
      return  {
        value: mod,
        text: mod,
        active: mods?.length === 1 || mod === academicData.modality
      }
    }))
    // console.log('SFmodalities: ', SFmodalities);
    const camps = filterByField(filteredPrograms,'nombreCampus', ['nombreCampus', 'idCampus'])
    // console.log('camps: ', camps);
    setSFcampuses(camps?.map((campus: any) => ({
      value: campus?.idCampus,
      text: campus?.nombreCampus,
      active: camps?.length === 1 || campus.idCampus === academicData.campus
    })))
    // console.log('SFcampuses: ', SFcampuses);
    
  }, [filteredPrograms])

  useEffect(() => {
    // console.log('SFcampuses: ', SFcampuses);
    if (SFcampuses?.length > 0 && SFmodalities?.length > 0) {
      setOptions({
        modalities: SFmodalities,
        campuses: SFcampuses
      })
    }
      
  }, [SFcampuses, SFmodalities])
  useEffect(() => {
    if (options && (options?.modalities && options?.campuses) && (options?.modalities[0] && options?.campuses[0])) {
      // console.log(options);
      // console.log(options?.modalities);
      // console.log(options?.campuses);
      
      setIsLoading(false)
      setAcademicData({
        ...academicData,
        modality: options?.modalities?.length === 1 ? options?.modalities[0].value : "",
        level: filteredPrograms && filteredPrograms[0] ? filteredPrograms[0]?.nivel : '',
        program: '',
        campus: options?.campuses?.length === 1 ? options?.campuses[0].value : "",
      })
      setAcademicDataTouched({
        ...academicDataTouched,
        modality:  options?.modalities?.length === 1,
        level: filteredPrograms && filteredPrograms[0] && filteredPrograms[0]?.nivel,
        campus:  options?.campuses?.length === 1,
      })
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
    Validate()
  }, [personalData, academicData]);


  useEffect(() => {
    
    if (isLoadingToken) setIsLoading(true)
    if (!isLoadingToken && !isErrorToken && !!Object.keys(token).length) {
      setTokenActive(`${token.token_type} ${token.access_token}`);
    }
  }, [isLoadingToken, isErrorToken, token]);

  useEffect(() => {
    if (!isLoadingEO && !isErrorEO) {
      setLevelsOffer(Object.entries(educativeOfferData).map(([_, level]: any) => level))
    }
  }, [isLoadingEO, isErrorEO, educativeOfferData]);

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
    if (control === "modality") {
      const offerByProgram = filteredPrograms?.filter((program: any) => {
        return program.modalidad === value
      })
      // console.log('offerByProgram: ', offerByProgram);
      setFilteredPrograms(offerByProgram)
    }
    if (control === 'campus') {
      const offerByProgram = filteredPrograms?.filter((program: any) => {
        return program.plantel === value
      })
      // console.log('offerByProgram: ', offerByProgram);
      setFilteredPrograms(offerByProgram)
    }
    return !!value?.trim();
  };

  const validateAcademicDataControls = () => !Object.entries(academicData).map(([key, value]: any) => {
    const validity = validateAcademicDataControl(key, value);
    return validity 
  }).includes(false)

  const handleFetchEducativeOffer = () => {
    setIsLoading(true)
    setFilteredPrograms([]);
    setFilteredCampus([]);
    const businessLineToFetchFrom = getBusinessLineToFetchFrom(businessUnit, '');
    fetchEducativeOffer(process.env.NEXT_PUBLIC_EDUCATIVE_OFFER!, '', businessLineToFetchFrom, tokenActive);
  }


  const sendLeadData = async () => {
    const endpoint = process.env.NEXT_PUBLIC_CAPTACION_PROSPECTO;
  console.log('filteredPrograms: ',  filteredPrograms);
  
    const selectedProgramData = filteredPrograms[0];

    // query params
    const nombre = personalData?.name;
    const apellidoPaterno = personalData?.last_name;
    const telefono = personalData?.phone;
    const email = personalData?.email;
    const lineaNegocio = selectedProgramData?.lineaNegocio || env.NEXT_PUBLIC_BUSINESS_UNIT;
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