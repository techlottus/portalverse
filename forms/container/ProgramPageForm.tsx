import { useEffect, useState } from "react"
import PersonalData from "@/forms/steps/PersonalDataTemplate";
import configControls from "@/forms/fixtures/controls"
import axios from "axios";
import { getTokenForms } from "@/utils/getTokenForms"
import { getEducativeOffer } from "@/utils/getEducativeOffer"
import { setRegisterBot } from "@/utils/saveDataForms"
import { useRouter } from "next/router";
import { env } from "process";
import ProgramPageData from "../steps/ProgramPageData";

const businessUnit = process.env.NEXT_PUBLIC_BUSINESS_UNIT!;

type ProgramPageForm = {
  setStatus: (status: { loading: boolean, error: string, valid: boolean, success: boolean }) => void
  submit: boolean;
  prefilledData: {
    program: string;
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

const ProgramPageForm = (props: ProgramPageForm) => {

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
      case "Flex": return "Semipresencial"; // Applies to "UANE" and "UTEG" offer.
      case "Semipresencial": return "Semipresencial"; // Applies to "ULA" offer.
      default: return "";
    }
  };

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
    if (filterPrograms) {

      const offerByProgram = filterPrograms?.filter((program: any) => {        
        return program.nombrePrograma === prefilledData?.program && program.lineaNegocio === businessUnit
      })[0]

      setselectedProgram(offerByProgram)
      setAcademicData({
        ...academicData,
        'level': offerByProgram?.nivel || "",
        'modality': offerByProgram?.modalidad || "",
        'program': offerByProgram?.idOfertaPrograma || "",
        'campus': offerByProgram?.idCampus || "",
      })
      setAcademicDataTouched({
        ...academicDataTouched,
        'level': !!offerByProgram?.nivel,
        'modality': !!offerByProgram?.modalidad,
        'program': !!offerByProgram?.idOfertaPrograma,
        'campus': !!offerByProgram?.idCampus,
      })
    }
  }, [filterPrograms])

  useEffect(() => {
    Validate()
  }, [personalData, academicData]);

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
    const source = router.asPath;
    const canal = process.env.NEXT_PUBLIC_CANAL;
    const medio = queryParams?.utm_medium;
    const campana = queryParams?.utm_campaign;
    const params = `nombre=${nombre}&apellidoPaterno=${apellidoPaterno}&telefono=${telefono}&email=${email}&lineaNegocio=${lineaNegocio}&modalidad=${modalidad}&nivel=${nivel}&campus=${campus}&programa=${programa}&avisoPrivacidad=true&leadSource=Digital&validaRegistroBoot=${validaRegistroBoot}&source=${source}&canal=${canal}${medio ? `&medio=${medio}` : ""}${campana ? `&campana=${campana}` : ""}`;
    console.log("source: ", source);

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
      compact={true}
    ></PersonalData>
    <ProgramPageData
      programData={academicData}
      setProgramData={setAcademicData}
      infoControlsTouched={academicDataTouched}
      setInfoControlsTouched={setAcademicDataTouched}
      errorControls={academicDataErrors}
      setErrorControls={setAcademicDataErrors}
      validateControl={validateAcademicDataControl}
      options={options}
    ></ProgramPageData>
  </form>
};

export { ProgramPageForm };