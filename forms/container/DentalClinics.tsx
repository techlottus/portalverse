import { useEffect, useState } from "react"
import { useRouter } from "next/router"
import cn from "classnames"
import { FormConfig } from "@/forms/fixtures/openform"
import { getTokenForms } from "@/utils/getTokenForms"
import Image from "@/old-components/Image"
import Button from "@/old-components/Button/Button"
import configControls from "@/forms/fixtures/controls"
import PersonalData from "../steps/PersonalData"
import WebError from "@/components/sections/WebError"
import DentalAppointment from "../steps/DentalAppointment"

type OpenFormConfig = {
  title: string;
  subtitle: string;
  conditions: string;
  privacyLink: { link: string; label: string };
};

type DentalClinics = {
  classNames?: string;
  pathThankyou?: string;
  controls?: any;
  data?: any;
  config?: OpenFormConfig
  button: {
    label: string 	
    variant: string 	
    size: string 	
    iconName: string 	
    CTA: string 
  }
}

const DentalClinics = ({ config, classNames, controls, data, button }: DentalClinics) => {

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

  const [appointmentData, setAppointmentData] = useState({
    comments: "",
    campus: ""
  });

  const [appointmentDataTouched, setAppointmentDataTouched] = useState({
    comments: false,
    campus: false
  });

  const [appointmentDataErrors, setAppointmentDataErrors] = useState({
    comments: false,
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


  useEffect(() => {
    setControlsConfig({ ...controls });
  }, [controls]);



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

  const validateAppointmentDataControl = (value: string, touched: boolean) => {
    return touched ? !!value : false;
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

  const validateAppointmentDataControls = () => !Object.entries(appointmentData).map((value: any) => {
    return !!value[1];
  }).includes(false)

  
  /**
   * Form Submission
   */
  // const [isLoadingLead, setIsLoadingLead] = useState(false);
  // const [isErrorLead, setIsErrorLead] = useState(false);

  // const sendLeadData = async () => {
  //   const endpoint = process.env.NEXT_PUBLIC_CAPTACION_PROSPECTO;

  //   const selectedProgramData = getDataByProgramEC(appointmentData?.program, appointmentData?.campus);

  //   // query params
  //   const nombre = personalData?.name;
  //   const apellidoPaterno = personalData?.surname;
  //   const telefono = personalData?.phone;
  //   const email = personalData?.email;
  //   const lineaNegocio = selectedProgramData?.lineaNegocio || "";
  //   const modalidad = appointmentData?.modality === "Presencial" ? "Presencial" : "Online";
  //   const nivel = appointmentData?.level;
  //   const campus = appointmentData?.campus;
  //   const { idPrograma: programa } = sourceData?.[appointmentData?.program]?.filter((campus: any) => {
  //     return campus.idCampus === appointmentData?.campus;
  //   })[0];
  //   const validaRegistroBoot = setRegisterBot();
  //   const source = `portal${businessUnit}`;
  //   const canal = process.env.NEXT_PUBLIC_CANAL;
  //   const medio = queryParams?.utm_medium;
  //   const campana = queryParams?.utm_campaign;

  //   const params = `nombre=${nombre}&apellidoPaterno=${apellidoPaterno}&telefono=${telefono}&email=${email}&lineaNegocio=${lineaNegocio}&modalidad=${modalidad}&nivel=${nivel}&campus=${campus}&programa=${programa}&avisoPrivacidad=true&leadSource=Digital&validaRegistroBoot=${validaRegistroBoot}&source=${source}&canal=${canal}${medio ? `&medio=${medio}` : ""}${campana ? `&campana=${campana}` : ""}`;

  //   setIsLoadingLead(true);

  //   await axios.post(`${endpoint}?${params}`,{},{
  //     headers: {
  //       Authorization: tokenActive,
  //       'Content-Type': 'application/json;charset=UTF-8'
  //     }
  //   })
  //     .then((res: any) => {
  //       if(res?.data?.Exitoso !== "TRUE") {
  //         throw new Error();
  //       }
  //       router.push(pathThankyou);
  //     })
  //     .catch((err: any) => {
  //       setIsLoadingLead(false);
  //       setIsErrorLead(true);
  //     })
  // }

  const handleSubmit = async () => {
    setPersonalDataTouched({
      name: true,
      surname: true,
      phone: true,
      email: true,
    });

    const newPersonalDataValidation = {
      name: validatePersonalDataControl("name", personalData.name, true),
      surname: validatePersonalDataControl("surname", personalData.surname, true),
      phone: validatePersonalDataControl("phone", personalData.phone, true),
      email: validatePersonalDataControl("email", personalData.email, true),
    }

    setPersonalDataErrors({ ...newPersonalDataValidation });

    const isValidPersonalData = validatePersonalDataControls();
    setAppointmentDataTouched({
      campus: true,
      comments: true
    });

    const newAppointmentDataValidation = {
      campus: validateAppointmentDataControl("campus", true),
      comments: validateAppointmentDataControl("comments", true)
    }

    setAppointmentDataErrors({ ...newAppointmentDataValidation });

    const isValidAppointmentData = validateAppointmentDataControls();

    debugger
    if(!isValidPersonalData || !isValidAppointmentData) return;
    // dispatch post to service
  }

  const isLoading = isLoadingToken
  const isError = isErrorToken

  return (
    <div>
      {
        isLoading
          ? <div className="absolute w-full h-full z-10 flex justify-center items-center left-0 top-0">
              <Image src="/images/loader.gif" alt="loader" classNames={cn("w-10 h-10 top-0 left-0")} />
            </div>
          : null
      }
      {
        // isError
        false
          ? <WebError></WebError>
          : <>
              <PersonalData
                personalData={personalData}
                setPersonalData={setPersonalData}
                config={config}
                data={data}
                infoControlsTouched={personalDataTouched}
                setInfoControlsTouched={setPersonalDataTouched}
                errorControls={personalDataErrors}
                setErrorControls={setPersonalDataErrors}
              ></PersonalData>
              <DentalAppointment
                  appointmentData={appointmentData}
                  setAppointmentData={setAppointmentData}
                  config={config}
                  data={data}
                  infoControlsTouched={appointmentDataTouched}
                  setInfoControlsTouched={setAppointmentDataTouched}
                  errorControls={appointmentDataErrors}
                  setErrorControls={setAppointmentDataErrors}
              ></DentalAppointment>

              <div className="mt-6">
                {/* <Button dark onClick={handleSubmit} data={ configControls.buttonConfigOpenFormStepThree } /> */}
                <Button darkOutlined={button.variant === "outlined_negative"} dark={button.variant === "primary"}
                  data={{
                    title: button?.label,
                    type: button?.variant,
                    icon: button?.iconName,
                    isExpand: false,
                  }}
                  onClick={() => handleSubmit}
                />
              </div>
            </>
      }
    </div>
  )
};

export default DentalClinics;