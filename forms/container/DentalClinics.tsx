import { useEffect, useState } from "react"
import configControls from "@/forms/fixtures/controls"
import PersonalData from "../steps/PersonalData"
import DentalAppointment from "../steps/DentalAppointment"
import axios from "axios"

type OpenFormConfig = {
  title: string;
  subtitle: string;
  conditions: string;
  privacyLink: { link: string; label: string };
};

type DentalClinics = {
  status: (status:{ loading: boolean, error: boolean, valid: boolean}) => void
  submit: boolean
  classNames?: string;
  pathThankyou?: string;
  controls?: any;
  data?: any;
  config?: OpenFormConfig
}

const DentalClinics = (props: DentalClinics) => {
  
  const { config, classNames, controls, data, status, submit } = props

  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isValid, setIsValid] = useState(false);

  const [ controlsConfig, setControlsConfig ] = useState({ campus: {hidden: false} });


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

  useEffect(() => {
    setControlsConfig({ ...controls });
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
    }, 5000);
    setTimeout(() => {
      setIsError(true)
    }, 10000);

  }, [controls]);
 
  useEffect(() => {
    if (submit) {
      handleSubmit()
    }
  }, [submit]);
 
  useEffect(() => {
    setIsValid(validateAppointmentDataControls() && validatePersonalDataControls())
  }, [personalDataErrors, appointmentDataErrors]);
  useEffect(() => {
    status({loading: isLoading, error: isError, valid: isValid })
  }, [isLoading, isError, isValid]);


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

  const sendData = async () => {
    const endpoint = process.env.NEXT_PUBLIC_CAPTACION_PROSPECTO || '';
    setIsLoading(true);

    await axios.post(endpoint,{},{
      
    })
      .then((res: any) => {
        if(res?.data?.Exitoso !== "TRUE") {
          throw new Error();
        }
      })
      .catch((err: any) => {
        setIsLoading(false);
        setIsError(true);
      })
  }
  const Validate = ( ) => {
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
    setIsValid(isValidAppointmentData && isValidPersonalData)
  }

  const handleSubmit = async () => {
    // Validate()
    if (isValid) {
      // dispatch post to service
      // sendData()
    }
  }

  return (
     <form>
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
    </form>
      
  )
};

export default DentalClinics;