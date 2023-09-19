import { useEffect, useState } from "react"
import { useRouter } from "next/router"
import cn from "classnames"
import StepOne from "@/forms/steps/step-one-openform"
import StepTwo from "@/forms/steps/step-two-openform"
import { FormConfig } from "@/forms/fixtures/openform"
import { getTokenForms } from "@/utils/getTokenForms"
import { getEducativeOffer } from "@/utils/getEducativeOffer"
import { setRegisterBot } from "@/utils/saveDataForms"
import Image from "@/old-components/Image"
import Button from "@/old-components/Button/Button"
import { ButtonInit } from "@/old-components/fixture"
import configControls from "@/forms/fixtures/controls"
import axios from "axios"
import errors from "../../multitenant-errors"

const businessUnit = process.env.NEXT_PUBLIC_BUSINESS_UNIT!;

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
    default: return ""
  }
}

type OpenFormConfig = {
  title: string;
  subtitle: string;
  conditions: string;
  privacyLink: { link: string; label: string };
};

type OpenForm = {
  classNames?: string;
  image: {
    src: string;
    alt: string;
  }
  pathThankyou: string;
  controls?: any;
  data?: any;
  currentStep?: any;
  config?: OpenFormConfig
}

const OpenForm = ({ config, classNames, image, pathThankyou, controls, data }: OpenForm) => {

  const router = useRouter();
  const queryParams = router?.query;

  const [ controlsConfig, setControlsConfig ] = useState({ ...FormConfig });
  const [ tokenActive, setTokenActive ] = useState<string>("");
  const [ levelsOffer, setLevelsOffer ] = useState<any>([]);
  const [ filteredPrograms, setFilteredPrograms ] = useState<any>([]);
  const [ filteredCampus, setFilteredCampus ] = useState<any>([]);

  const [personalData, setPersonalData] = useState({
    name: "",
    surname: "",
    phone: "",
    email: "",
  });

  const [personalDataTouched, setPersonalDataTouched] = useState({
    name: false,
    surname: false,
    phone: false,
    email: false,
  })

  const [personalDataErrors, setPersonalDataErrors] = useState({
    name: false,
    surname: false,
    phone: false,
    email: false,
  })

  const [academicData, setAcademicData] = useState({
    modality: "",
    level: "",
    program: "",
    campus: ""
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

  const {
    isLoading: isLoadingToken,
    isError: isErrorToken,
    token,
  } = getTokenForms();

  useEffect(() => {
    if (!isLoadingToken && !isErrorToken && !!Object.keys(token).length) {
      setTokenActive(`${token.token_type} ${token.access_token}`);
    }
  }, [isLoadingToken, isErrorToken, token]);

  const {
    fetchData: fetchEducativeOffer,
    filterByLevel,
    filterByProgram,
    getDataByProgramEC,
    data: educativeOfferData,
    isLoading: isLoadingEO,
    isError: isErrorEO,
    sourceData,
  } = getEducativeOffer();

  const handleFetchEducativeOffer = (modality: string) => {
    setFilteredPrograms([]);
    setFilteredCampus([]);
    const businessLineToFetchFrom = getBusinessLineToFetchFrom(businessUnit, modality);
    fetchEducativeOffer(process.env.NEXT_PUBLIC_EDUCATIVE_OFFER!, modality, businessLineToFetchFrom, tokenActive);
  }

  useEffect(() => {
    if (!isLoadingEO && !isErrorEO) {
      setLevelsOffer(Object.entries(educativeOfferData).map(([_ , level]: any) => level))
    }
  }, [isLoadingEO, isErrorEO, educativeOfferData]);

  useEffect(() => {
    setControlsConfig({ ...controls });
  }, [controls]);

  const handleLevelSelected = (level: string) => {
    setFilteredPrograms([]);
    setFilteredCampus([]);
    const programsByLevel = filterByLevel(level);
    setFilteredPrograms([ ...programsByLevel ]);
  }

  const handleProgramSelected = (program: string) => {
    setFilteredCampus([]);
    const campusByProgram = filterByProgram(program);
    setFilteredCampus([ ...campusByProgram ]);
  }


  /**
   * Input Validations
   */
  const validatePersonalDataControl = (control: string, value: string, touched: boolean) => {
    if (control === 'email') {
      return touched ? !value.match(configControls.patternEmail) : false;
    }
    if (control === 'phone') {
      return touched ? !(value.trim() && value.trim().length === 10) : false;
    }
    return touched ? !value.trim() : false;
  };

  const validateAcademicDataControl = (value: string, touched: boolean) => {
    return touched ? !value : false;
  };

  const validatePersonalDataControls = () => !Object.entries(personalData).map((value: any) => {
    if(value[0] === 'email') {
      return !!value[1].match(configControls.patternEmail) ? !!value[1].match(configControls.patternEmail).length : true
    }
    if(value[0] === 'phone') {
      return value[1].trim().length === 10
    }
    return !!value[1].trim();
  }).includes(false)

  const validateAcademicDataControls = () => !Object.entries(academicData).map((value: any) => {
    return !!value[1];
  }).includes(false)

  
  /**
   * Form Submission
   */
  const [isLoadingLead, setIsLoadingLead] = useState(false);
  const [isErrorLead, setIsErrorLead] = useState(false);

  const sendLeadData = async () => {
    const endpoint = process.env.NEXT_PUBLIC_CAPTACION_PROSPECTO;

    const selectedProgramData = getDataByProgramEC(academicData?.program, academicData?.campus);

    // query params
    const nombre = personalData?.name;
    const apellidoPaterno = personalData?.surname;
    const telefono = personalData?.phone;
    const email = personalData?.email;
    const lineaNegocio = selectedProgramData?.lineaNegocio || "";
    const modalidad = academicData?.modality === "Presencial" ? "Presencial" : "Online";
    const nivel = academicData?.level;
    const campus = academicData?.campus;
    const { idPrograma: programa } = sourceData?.[academicData?.program]?.filter((campus: any) => {
      return campus.idCampus === academicData?.campus;
    })[0];
    const validaRegistroBoot = setRegisterBot();
    const source = `portal${businessUnit}`;
    const canal = process.env.NEXT_PUBLIC_CANAL;
    const medio = queryParams?.utm_medium;
    const campana = queryParams?.utm_campaign;

    const params = `nombre=${nombre}&apellidoPaterno=${apellidoPaterno}&telefono=${telefono}&email=${email}&lineaNegocio=${lineaNegocio}&modalidad=${modalidad}&nivel=${nivel}&campus=${campus}&programa=${programa}&avisoPrivacidad=true&leadSource=Digital&validaRegistroBoot=${validaRegistroBoot}&source=${source}&canal=${canal}${medio ? `&medio=${medio}` : ""}${campana ? `&campana=${campana}` : ""}`;

    setIsLoadingLead(true);

    await axios.post(`${endpoint}?${params}`,{},{
      headers: {
        Authorization: tokenActive,
        'Content-Type': 'application/json;charset=UTF-8'
      }
    })
      .then((res: any) => {
        if(res?.data?.Exitoso !== "TRUE") {
          throw new Error();
        }
        router.push(pathThankyou);
      })
      .catch((err: any) => {
        setIsLoadingLead(false);
        setIsErrorLead(true);
      })
  }

  const handleSubmit = async () => {
    setPersonalDataTouched({
      name: true,
      surname: true,
      phone: true,
      email: true,
    });

    setAcademicDataTouched({
      modality: true,
      level: true,
      program: true,
      campus: true
    });

    const newPersonalDataValidation = {
      name: validatePersonalDataControl("name", personalData.name, true),
      surname: validatePersonalDataControl("surname", personalData.surname, true),
      phone: validatePersonalDataControl("phone", personalData.phone, true),
      email: validatePersonalDataControl("email", personalData.email, true),
    }

    const newAcademicDataValidation = {
      modality: validateAcademicDataControl(academicData.modality, true),
      level: validateAcademicDataControl(academicData.level, true),
      program: validateAcademicDataControl(academicData.program, true),
      campus: validateAcademicDataControl(academicData.campus, true)
    };

    setPersonalDataErrors({ ...newPersonalDataValidation });
    setAcademicDataErrors({ ...newAcademicDataValidation });

    const isValidPersonalData = validatePersonalDataControls();
    const isValidAcademicData = validateAcademicDataControls();

    if(!isValidPersonalData || !isValidAcademicData) return;

    sendLeadData();
  }

  const isLoading = isLoadingToken || isLoadingEO || isLoadingLead;
  const isError = isErrorToken || isErrorEO || isErrorLead;

  return (
    <section className={cn("p-6 shadow-15 bg-surface-0 relative", classNames)}>
      <div>
        {
          isLoading
            ? <div className="absolute w-full h-full z-10 flex justify-center items-center left-0 top-0">
                <Image src="/images/loader.gif" alt="loader" classNames={cn("w-10 h-10 top-0 left-0")} />
              </div>
            : null
        }
        {
          isError
            ? <div className="bg-surface-0 w-full h-full p-4 z-10 flex flex-col aspect-2/1 justify-center items-center left-0 top-0">
                <h1 className="font-bold text-10 text-center leading-12 mb-9">
                Lo sentimos
                </h1>
                <div className="w-full max-w-96"> {/* Tailwind's 'max-w-sm' value isn't working for some reason u.u */}
                  <img src={errors["404"].image} className="w-full" alt="error" />
                </div>
                <h2 className="text-surface-600 font-semibold text-5.5 my-6">
                Esta página no está disponible
                </h2>
                <Button
                  dark
                  onClick={() => location.reload()}
                  data={{ ...ButtonInit, title: "Reintentar" }}
                />
              </div>
            : <>
                <StepOne
                  personalData={personalData}
                  setPersonalData={setPersonalData}
                  config={config}
                  data={data}
                  step={30}
                  image={image}
                  infoControlsTouched={personalDataTouched}
                  setInfoControlsTouched={setPersonalDataTouched}
                  errorControls={personalDataErrors}
                  setErrorControls={setPersonalDataErrors}
                />
                <StepTwo
                  isLoading={isLoading}
                  academicData={academicData}
                  setAcademicData={setAcademicData}
                  campus={filteredCampus}
                  programs={filteredPrograms}
                  onChangeProgram={(program: string) =>
                    handleProgramSelected(program)
                  }
                  onLevelSelected={(level: string) => handleLevelSelected(level)}
                  onChangeModality={(modality: string) =>
                    handleFetchEducativeOffer(modality)
                  }
                  levels={levelsOffer}
                  step={60}
                  controls={{ ...controlsConfig }}
                  infoControlsTouched={academicDataTouched}
                  setInfoControlsTouched={setAcademicDataTouched}
                  errorControls={academicDataErrors}
                  setErrorControls={setAcademicDataErrors}
                />
                <div className="mt-6">
                  <Button dark onClick={handleSubmit} data={ configControls.buttonConfigOpenFormStepThree } />
                </div>
              </>
        }
      </div>
    </section>
  )
};

export default OpenForm;