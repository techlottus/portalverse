import { useEffect, useState } from "react"
import configControls from "@/forms/fixtures/controls"
import PersonalData from "../steps/PersonalData"
import DentalAppointment from "../steps/DentalAppointment"
import axios from "axios";

type OpenFormConfig = {
  title: string;
  subtitle: string;
  conditions: string;
  privacyLink: { link: string; label: string };
};

type DentalClinics = {
  setStatus: (status:{ loading: boolean, error: string, valid: boolean, success: boolean }) => void
  submit: boolean
  data?: any;
  config?: OpenFormConfig
}

const DentalClinics = (props: DentalClinics) => {
  
  const { config, data, setStatus, submit } = props

  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState('');
  const [isValid, setIsValid] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);


  const [personalData, setPersonalData] = useState({
    name: "",
    last_name: "",
    phone: "",
    email: "",
  });

  const [personalDataTouched, setPersonalDataTouched] = useState<{[key:string]: boolean}>({
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

  const [appointmentData, setAppointmentData] = useState({
    reason: "",
    campus: ""
  });

  const [appointmentDataTouched, setAppointmentDataTouched] = useState<{[key:string]: boolean}>({
    reason: false,
    campus: false
  });

  const [appointmentDataErrors, setAppointmentDataErrors] = useState({
    reason: false,
    campus: false
  })

  useEffect(() => {
  }, []);
 
  useEffect(() => {
    if (submit) handleSubmit()
  }, [submit]);
 
  useEffect(() => {
    Validate()
  }, [personalData, appointmentData]);
  useEffect(() => {    
    setStatus({loading: isLoading, error: isError, valid: isValid, success: isSuccess })
  }, [isLoading, isError, isValid, isSuccess]);


  /**
   * Input Validations
   */
  const validatePersonalDataControl = (control: string, value: string) => {
    if (control === 'email') {
      return !!value.match(configControls.patternEmail)
    }
    if (control === 'phone') {
      return value.trim().length === 10
    }
    return !!value.trim()
  };

  const validateAppointmentDataControl = (value: string) => {
    return  !!value.trim()
    
  };

  const validatePersonalDataControls = () => !Object.entries(personalData).map(([key, value]: any) => {
    const validity = validatePersonalDataControl(key, value)
    return validity
  }).includes(false)
  
  const validateAppointmentDataControls = () => !Object.entries(appointmentData).map(([key, value]: any) => {
    const validity = validateAppointmentDataControl(value)
    return validity
  }).includes(false)

  
  /**
   * Form Submission
   */

  const sendData = async () => {
    const endpoint = process.env.NEXT_PUBLIC_DENTAL_CLINIC_FORM_URL || '';
    const token = process.env.NEXT_PUBLIC_DENTAL_CLINIC_FORM_TOKEN || '';
    setIsLoading(true);    

    await axios.post(endpoint,{
      "nombre": personalData?.name?.trim(),
      "apellidos": personalData?.last_name?.trim(),
      "telefono": personalData?.phone?.trim(),
      "correo": personalData?.email?.trim(),
      "clinica": appointmentData?.campus?.trim(),
      "descripcion": appointmentData?.reason?.trim(),
    },{
      headers: {
        'x-token': token
      }
    })
      .then((res: any) => {
        setIsLoading(false)
        setIsSuccess(true)
      })
      .catch((err: any) => {
        setIsLoading(false);
        setIsError(`${err.response.status}`);
      })
  }
  const Validate = ( ) => {
    const newPersonalDataErrors = {
      name: !validatePersonalDataControl("name", personalData.name) && personalDataTouched.name,
      last_name: !validatePersonalDataControl("last_name", personalData.last_name) && personalDataTouched.last_name,
      phone: !validatePersonalDataControl("phone", personalData.phone) && personalDataTouched.phone,
      email: !validatePersonalDataControl("email", personalData.email) && personalDataTouched.email,
    }

    setPersonalDataErrors({ ...newPersonalDataErrors });

    const isValidPersonalData = validatePersonalDataControls();

    const newAppointmentDataErrors = {
      campus: !validateAppointmentDataControl(appointmentData["campus"]) && appointmentDataTouched.campus,
      reason: !validateAppointmentDataControl(appointmentData["reason"]) && appointmentDataTouched.reason
    }

    setAppointmentDataErrors({ ...newAppointmentDataErrors });

    const isValidAppointmentData = validateAppointmentDataControls();
    setIsValid(isValidAppointmentData && isValidPersonalData)
  }

  const handleSubmit = async () => {
    Validate()
    if (isValid && !isError) {
      sendData()
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
        validateControl={validatePersonalDataControl}
      ></PersonalData>
      <DentalAppointment
          appointmentData={appointmentData}
          setAppointmentData={setAppointmentData}
          config={config}
          data={data}
          validateControl={validateAppointmentDataControl}
          infoControlsTouched={appointmentDataTouched}
          setInfoControlsTouched={setAppointmentDataTouched}
          errorControls={appointmentDataErrors}
          setErrorControls={setAppointmentDataErrors}
      ></DentalAppointment>
    </form>
  )
};

export default DentalClinics;