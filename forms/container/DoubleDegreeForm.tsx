import { useEffect, useState } from "react"
import PersonalData from "@/forms/steps/PersonalDataTemplate";
import configControls from "@/forms/fixtures/controls"
import axios from "axios";
import { getTokenForms } from "@/utils/getTokenForms"
import { getEducativeOffer } from "@/utils/getEducativeOffer"
import { setRegisterBot } from "@/utils/saveDataForms"
import { useRouter } from "next/router";
import { env } from "process";
import { DoubleDegreeData } from "../steps/DoubleDegreeData";

const businessUnit = process.env.NEXT_PUBLIC_BUSINESS_UNIT!;

type DoubleDegreeForm = {
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

const DoubleDegreeForm = (props: DoubleDegreeForm) => {

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
    level: "Licenciatura",
    program: ""
  });

  const [academicDataTouched, setAcademicDataTouched] = useState({
    level: true,
    program: false
  });

  const [academicDataErrors, setAcademicDataErrors] = useState({
    level: false,
    program: false
  })

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

  useEffect(() => {
    // console.log('tokenActive: ', tokenActive);
    if (!!tokenActive) {
      handleFetchEducativeOffer()
    }

  }, [tokenActive])

  useEffect(() => {
    const offerByProgram = filterPrograms?.filter((program: any) => {
      return program.nombrePrograma === prefilledData?.program
    })
    // console.log('offerByProgram: ', offerByProgram);
    setFilteredPrograms(offerByProgram)

  }, [filterPrograms])

  useEffect(() => {

    if (options && (options?.modalities && options?.campuses && options?.levels) && (options?.modalities[0] && options?.campuses[0] && options?.levels[0])) {
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

  }, [prefilledData])

  useEffect(() => {
    // console.log('academicData: ', academicData);

    Validate()
  }, [personalData, academicData]);

  useEffect(() => {
    if (!!selectedProgram) {
      setAcademicData({ ...academicData, program: selectedProgram?.idOfertaPrograma })
    }
  }, [selectedProgram]);
  useEffect(() => {

    if (isLoadingToken) /* setIsLoading(true) */
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
    /* setIsLoading(true) */
    setFilteredPrograms([]);
    // setFilteredCampus([]);    
  }

  const sendLeadData = async () => {
    const endpoint = process.env.NEXT_PUBLIC_STRAPI_TRACKING_FORMS_ENDPOINT;
    const api_token = process.env.NEXT_PUBLIC_STRAPI_TRACKING_FORMS_API_TOKEN
    const nombre = personalData?.name;
    const apellidoPaterno = personalData?.last_name;
    const telefono = personalData?.phone;
    const email = personalData?.email;
    const lineaNegocio = selectedProgram?.lineaNegocio || env.NEXT_PUBLIC_BUSINESS_UNIT;
    const nivel = academicData?.level;
    const programa = academicData?.program;
    const validaRegistroBoot = setRegisterBot();
    const canal = process.env.NEXT_PUBLIC_CANAL;
    const medio = queryParams?.utm_medium;
    const campana = queryParams?.utm_campaign;
    const source = router.asPath;
    console.log("source: ", source);
    const body: any = {
      data: {
        names: nombre,
        last_names: apellidoPaterno,
        phone: telefono,
        email: email,
        extra_fields: {
          lineaNegocio: lineaNegocio || "",
          nivel: nivel || "",
          programa: programa || "",
          validaRegistroBoot: validaRegistroBoot || "",
          source: source || "",
          canal: canal || "",
          medio: medio || "",
          campana: campana || ""
        },
        form: "Doble titulacion"
      }
    }

    await axios.post(`${endpoint}/general-forms`, body, {
      headers: {
        Authorization: `Bearer ${api_token}`,
        'Content-Type': 'application/json;charset=UTF-8',
      },
    })
      .then((res: any) => {
        if (res?.status == 200) {
          router.push(`/thank-you`);
        } else {
          throw new Error();
        }
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
      level: !validateAcademicDataControl('level', academicData.program) && academicDataTouched.program,
    }

    setAcademicDataErrors({ ...newAcademicDataErrors });
    const isValidPersonalData = validatePersonalDataControls();
    const isValidAcademicData = validateAcademicDataControls();
    setIsValid(isValidPersonalData && isValidAcademicData)
  }

  const handleSubmit = async () => {
    Validate()
    sendLeadData()
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
    <DoubleDegreeData
      academicData={academicData}
      setAcademicData={setAcademicData}
      infoControlsTouched={academicDataTouched}
      setInfoControlsTouched={setAcademicDataTouched}
      errorControls={academicDataErrors}
      setErrorControls={setAcademicDataErrors}
      validateControl={validateAcademicDataControl}
    ></DoubleDegreeData>
  </form>
};

export { DoubleDegreeForm };