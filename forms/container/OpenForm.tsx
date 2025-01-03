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
import errors from "@/multitenant-errors"

const businessUnit = process.env.NEXT_PUBLIC_BUSINESS_UNIT!;

const getBusinessLineToFetchFrom = (businessLine: string, modality: string) => {
  switch (businessLine) {
    case "UANE": {
      switch (modality) {
        case "Presencial": return "UANE";
        case "Flex": return "UANE,ULA";
        case "Online": return "UANE,ULA";
        default: return "UANE"
      }
    }
    case "UTEG": {
      switch (modality) {
        case "Presencial": return "UTEG";
        case "Flex": return "UTEG,ULA,UANE";
        case "Online": return "ULA";
        default: return "UTEG"
      }
    }
    case "ULA": {
      return "ULA"
    }
    case "UTC": {
      switch (modality) {
        case "Presencial": return "UTC,ULA";
        case "Semipresencial": return "UTC,ULA";
        case "Online": return "UTC";
        default: return "UTC"
      }
    }
    default: return ""
  }
}

const getLeadModality = (
  modality: string // "Presencial" | "Online" | "Flex" | "Semipresencial"
) => {
  switch (modality) {
    case "Presencial": return "Presencial";
    case "Online": return "Online";
    case "Flex": return "Semipresencial"; // Applies to "UANE" and "UTEG" offer.
    case "Semipresencial": return "Semipresencial"; // Applies to "ULA" offer.
    default: return "";
  }
};

type OpenFormConfig = {
  title: string;
  subtitle: string;
  conditions: string;
  privacyLink: { link: string; label: string };
  image?: { src: string; alt: string };
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

const Loader = () => (<div className="absolute w-full h-full z-10 flex justify-center items-center left-0 top-0">
  <Image src="/images/loader.gif" alt="loader" classNames={cn("w-10 h-10 top-0 left-0")} />
</div>)

const ErrorLayOut = () => (
  <div className="bg-surface-0 w-full h-full p-4 z-10 flex flex-col aspect-2/1 justify-center items-center left-0 top-0">
    <h3 className="font-bold text-10 text-center leading-12 mb-9">
      Lo sentimos
    </h3>
    <div className="w-full max-w-96"> {/* Tailwind's 'max-w-sm' value isn't working for some reason u.u */}
      <img src={errors?.["404"]?.image} className="w-full" alt="error" />
    </div>
    <h3 className="text-surface-600 font-semibold text-5.5 my-6">
      Esta página no está disponible
    </h3>
    <Button
      dark
      onClick={() => location.reload()}
      data={{ ...ButtonInit, title: "Reintentar" }}
    />
  </div>
)

const OpenForm = ({ config, classNames, pathThankyou, controls, data }: OpenForm) => {

  const router = useRouter();
  const queryParams = router?.query;

  const [controlsConfig, setControlsConfig] = useState({ ...FormConfig });
  const [tokenActive, setTokenActive] = useState<string>("");
  const [levelsOffer, setLevelsOffer] = useState<any>([]);
  const [filteredPrograms, setFilteredPrograms] = useState<any>([]);
  const [filteredCampus, setFilteredCampus] = useState<any>([]);

  const [personalData, setPersonalData] = useState({
    name: "",
    last_name: "",
    phone: "",
    email: "",
  });


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
      setLevelsOffer(Object.entries(educativeOfferData).map(([_, level]: any) => level))
    }
  }, [isLoadingEO, isErrorEO, educativeOfferData]);

  useEffect(() => {
    setControlsConfig({ ...controls });
  }, [controls]);

  const handleLevelSelected = (level: string) => {
    setFilteredPrograms([]);
    setFilteredCampus([]);
    const programsByLevel = filterByLevel(level);
    setFilteredPrograms([
      ...programsByLevel?.sort((a, b) => // sort programs alphabetically
        a?.text < b?.text ? -1 : a?.text > b?.text ? 1 : 0
      ),
    ]);
  }

  const handleProgramSelected = (program: string) => {
    setFilteredCampus([]);
    const campusByProgram = filterByProgram(program);
    setFilteredCampus([...campusByProgram]);
  }

  const validateAcademicDataControl = (value: string, touched: boolean) => {
    return touched ? !value : false;
  };

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
    const apellidoPaterno = personalData?.last_name;
    const telefono = personalData?.phone;
    const email = personalData?.email;
    const lineaNegocio = selectedProgramData?.lineaNegocio || "";
    const modalidad = getLeadModality(academicData?.modality);
    const nivel = academicData?.level;
    const campus = academicData?.campus;
    const { idPrograma: programa } = sourceData?.[academicData?.program]?.filter((campus: any) => {
      return campus.idCampus === academicData?.campus;
    })[0];
    const validaRegistroBoot = setRegisterBot();
    const source = router.asPath;
    const canal = process.env.NEXT_PUBLIC_CANAL;
    const medio = queryParams?.utm_medium;
    const campana = queryParams?.utm_campaign;

    console.log("queryParams: ", queryParams);
    console.log("source: ", source);


    const params = `nombre=${nombre}&apellidoPaterno=${apellidoPaterno}&telefono=${telefono}&email=${email}&lineaNegocio=${lineaNegocio}&modalidad=${modalidad}&nivel=${nivel}&campus=${campus}&programa=${programa}&avisoPrivacidad=true&leadSource=Digital&validaRegistroBoot=${validaRegistroBoot}&source=${source}&canal=${canal}${medio ? `&medio=${medio}` : ""}${campana ? `&campana=${campana}` : ""}`;

    console.log("params: ", params)

    setIsLoadingLead(true);

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
        router.push(pathThankyou);
      })
      .catch((err: any) => {
        setIsLoadingLead(false);
        setIsErrorLead(true);
      })
  }

  const handleSubmit = async () => {
    setAcademicDataTouched({
      modality: true,
      level: true,
      program: true,
      campus: true
    });

    const newAcademicDataValidation = {
      modality: validateAcademicDataControl(academicData.modality, true),
      level: validateAcademicDataControl(academicData.level, true),
      program: validateAcademicDataControl(academicData.program, true),
      campus: validateAcademicDataControl(academicData.campus, true)
    };
    const newPersonalDataValidation = {
      name: !validatePersonalDataControl("name", personalData.name),
      last_name: !validatePersonalDataControl("surname", personalData.last_name),
      phone: !validatePersonalDataControl("phone", personalData.phone),
      email: !validatePersonalDataControl("email", personalData.email),
    }

    setAcademicDataErrors({ ...newAcademicDataValidation });
    setPersonalDataErrors({...newPersonalDataValidation})
    console.log("personaldataerrors: ", personalDataErrors)

    const isValidPersonalData = validatePersonalDataControls();
    const isValidAcademicData = validateAcademicDataControls();

    if (!isValidPersonalData || !isValidAcademicData) return console.log("No ", isValidPersonalData, isValidAcademicData);

    sendLeadData();
  }

  const isLoading = isLoadingToken || isLoadingEO || isLoadingLead;
  const isError = isErrorToken || isErrorEO || isErrorLead;

  return (
    <section className={cn("p-6 shadow-15 bg-surface-0 relative rounded-lg", classNames)}>
      <div>
        {
          isLoading && <Loader />
        }
        {
          isError
            ? <ErrorLayOut/>
            : <>
              <StepOne
                personalData={personalData}
                setPersonalData={setPersonalData}
                config={config}
                data={data}
                step={30}
                personalDataErrors = {personalDataErrors}
                setPersonalDataErrors = {setPersonalDataErrors}
                personalDataTouched = {personalDataTouched}
                setPersonalDataTouched = {setPersonalDataTouched}
                validatePersonalDataControls={validatePersonalDataControls()}
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
              <div className="mt-4">
                <Button dark onClick={handleSubmit} data={configControls.buttonConfigOpenFormStepThree} />
              </div>
            </>
        }
      </div>
    </section>
  )
};

export default OpenForm;