import { useEffect, useState } from "react"
import * as PersonalData from "@/forms/steps/PersonalData";
import configControls from "@/forms/fixtures/controls"
import axios from "axios";
import { getTokenForms } from "@/utils/getTokenForms"
import { getEducativeOffer } from "@/utils/getEducativeOffer"
import AcademicData from "@/forms/steps/AcademicData";
import { setRegisterBot } from "@/utils/saveDataForms"
import { useRouter } from "next/router";
import { env } from "process";
import cn from "classnames"

const businessUnit = process.env.NEXT_PUBLIC_BUSINESS_UNIT!;


// available modalities for prop modality = "Presencial" | "Online" | "Flex" | "Semipresencial"
const getLeadModality = (modality: string) => {
  switch (modality) {
    case "Presencial": return "Presencial";
    case "Online": return "Online";
    case "Flex": return "Semipresencial"; // Applies to "UANE" and "UTEG" offer.
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
    levels: [{ level: string }];
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
  const [SFlevels, setSFlevels] = useState<any>([]);
  const [SFmodalities, setSFmodalities] = useState<any>([]);
  const [SFcampuses, setSFcampuses] = useState<any>([]);
  const [modalities, setModalities] = useState<any>([]);
  const [campuses, setCampuses] = useState<any>([]);
  const [levels, setLevels] = useState<any>([]);
  const [programsByModality, setProgramsByModality] = useState<any>([])
  const [programsByLevel, setProgramsByLevel] = useState<any>([])

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
    modalityPrograms
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
        return "UTEG,ULA,UANE"
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
    if (modalityPrograms.onsite || modalityPrograms.online || modalityPrograms.flex || modalityPrograms.hybrid) {


      const modPrograms: any = Object.keys(modalityPrograms).reduce((acc, key: string) => {

        acc = {
          ...acc,
          [key]: modalityPrograms[key].filter((program: any) => {
            return program.nombrePrograma === prefilledData.program
          })
        }
        return acc
      }, { onsite: [], online: [], flex: [], hybrid: [] })
      const keyTranslate: any = {
        onsite: 'Presencial',
        online: 'Online',
        flex: 'Flex',
        hybrid: 'Semipresencial',
      }

      const prefilledLevels = prefilledData?.levels?.map(level => level.level)
      const offerByProgram = Object.keys(modPrograms).reduce((acc, key: string) => {

        const programs = !!prefilledLevels && prefilledLevels.length > 0
          ? modPrograms[key]?.filter((program: any) => {
            return prefilledLevels.includes(program.nivel)
          })
          : modPrograms[key]

        acc = {
          ...acc,
          [key]: programs
        }
        return acc
      }, { onsite: [], online: [], flex: [], hybrid: [] })

      const { modalities, hasPrograms } = Object.keys(modPrograms).reduce((acc: any, key: string) => {
        if (modPrograms[key].length > 0) {
          acc.modalities = [...acc.modalities, keyTranslate[key]]
          acc.hasPrograms = true
        } else {
          acc.hasPrograms = acc.hasPrograms || false
        }
        return acc
      }, { modalities: [], hasPrograms: false })

      setSFmodalities(modalities?.map((mod: string) => {
        return {
          value: mod,
          text: mod,
          active: modalities?.length === 1 || mod === academicData.modality
        }
      }))
      if (!hasPrograms) {
        console.log(`no se encontro en SF el programa ${prefilledData.program}`);
        setIsError('404')
      } else {

        setFilteredPrograms(offerByProgram)
      }
    }
  }, [modalityPrograms])

  useEffect(() => {
    if (SFmodalities?.length > 0) {
      setModalities(SFmodalities)
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
      setCampuses(SFcampuses)
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
      setLevels(SFlevels)
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
    if (modalities && modalities[0]) {
      setIsLoading(false)
    }
  }, [modalities])
  useEffect(() => {

    setPersonalData({
      ...personalData,
      'name': prefilledData?.name || "",
      'last_name': prefilledData?.last_name || "",
      'phone': prefilledData?.phone || "",
      'email': prefilledData?.email || "",
    })

  }, [prefilledData])

  useEffect(() => {
    Validate()
  }, [personalData, academicData]);

  useEffect(() => {

    if (!!academicData.modality) {
      setAcademicData({
        ...academicData,
        level: ""
      })
      setSFcampuses([])
      const keyTranslate: any = {
        Presencial: 'onsite',
        Online: 'online',
        Flex: 'flex',
        Semipresencial: 'hybrid',
      }
      const programsByModality = filteredPrograms[keyTranslate[academicData.modality]]
      setProgramsByModality(programsByModality)


    }
  }, [academicData.modality]);

  useEffect(() => {
    const levels = filterByField(programsByModality, 'nivel')
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
  }, [programsByModality])

  useEffect(() => {
    console.log("entro a level")
    if (!!academicData.level) {

      const keyTranslate: any = {
        Presencial: 'onsite',
        Online: 'online',
        Flex: 'flex',
        Semipresencial: 'hybrid',
      }
      console.log("academicData.modality", academicData.modality)
      console.log("programsByModality: ", programsByModality)

      const programsByLevel = programsByModality?.filter((program: any) => {
        console.log("academicData.level:", academicData.level)
        return program.nivel === academicData.level
      })
      setProgramsByLevel(programsByLevel)

    }

  }, [academicData.level]);

  useEffect(()=>{
    console.log("entro a programsbylevel")
    setAcademicData({
      ...academicData,
      campus: ""
    })
    const periods: number[] = programsByLevel?.reduce((acc: any, program: any, index: number, arr: any[]) => {
      if (!acc.includes(program.nombrePeriodo)) {
        acc = [...acc, Number(program.nombrePeriodo)]
      }
      return acc
    }, [])
    const sortedPeriods = periods?.sort((a: any, b: any) => a - b)
    const currentPeriod = sortedPeriods[periods.length - 1]
    const periodPrograms = programsByLevel?.filter((program: any) => {
      return program.nombrePeriodo === String(currentPeriod)
    })
    const camps = filterByField(periodPrograms, 'nombreCampus', ['nombreCampus', 'idCampus'])
    console.log("camps: ", camps)
    setSFcampuses(camps?.map((campus: any) => ({
      value: campus?.idCampus,
      text: campus?.nombreCampus,
      active: camps?.length === 1 || campus.idCampus === academicData.campus
    })))
    console.table(camps)
    console.log(camps[0], camps.length)
    if(camps.length === 1){
    console.log("Seteo ", camps[0].idCampus)
    setAcademicData({
      ...academicData,
      campus: camps[0].idCampus 
    })}

  },[programsByLevel])

  useEffect(() => {
    if (!!academicData.campus) {

      const keyTranslate: any = {
        Presencial: 'onsite',
        Online: 'online',
        Flex: 'flex',
        Semipresencial: 'hybrid',
      }
      const programsByCampus = programsByLevel?.filter((program: any) => {
        return program.idCampus === academicData.campus
      })

      const selectedProgramData = programsByCampus.sort((a: any, b: any) => Number(a.nombrePeriodo) - Number(b.nombrePeriodo))[programsByCampus.length - 1];

      setselectedProgram(selectedProgramData)
    }

  }, [academicData.campus]);

  // useEffect(()=>{
  //   console.log("SFcampuses: ", SFcampuses)
  //   if (SFcampuses?.length === 1) {
  //     console.log(SFcampuses[0])
  //     setAcademicData({
  //       ...academicData,
  //       campus: SFcampuses[0].value
  //     })
  //   }
  // },[SFcampuses])

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

    fetchEducativeOffer(process.env.NEXT_PUBLIC_EDUCATIVE_OFFER!, 'All', businessLineToFetchFrom, tokenActive);
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
    const source = router.asPath;
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
    <PersonalData.Root
      personalData={personalData}
      setPersonalData={setPersonalData}
      infoControlsTouched={personalDataTouched}
      setInfoControlsTouched={setPersonalDataTouched}
      errorControls={personalDataErrors}
      setErrorControls={setPersonalDataErrors}
      validateControl={validatePersonalDataControl}
    >
      <div className="mt-3 flex w-p:flex-col w-p:gap-0 gap-3 font-normal">
        <div className="grow">
          <PersonalData.Name />
        </div>
        <div className="grow mobile:mt-3">
          <PersonalData.SurName />
        </div>
      </div>
      <div>
        <div className={cn("mt-3")}>
          <PersonalData.Phone />
        </div>
        <div className={cn("mt-3")}>
          <PersonalData.Email />
        </div>
      </div>
    </PersonalData.Root>

    <AcademicData
      academicData={academicData}
      setAcademicData={setAcademicData}
      infoControlsTouched={academicDataTouched}
      setInfoControlsTouched={setAcademicDataTouched}
      errorControls={academicDataErrors}
      setErrorControls={setAcademicDataErrors}
      validateControl={validateAcademicDataControl}
      modalities={modalities}
      levels={levels}
      campuses={campuses}
    ></AcademicData>
  </form>
};

export default ProgramDetailForm;