import React, { useEffect, useState } from "react";
import Input from "@/old-components/Input/Input"
import Container from "@/layouts/Container.layout";
import OptionPill from "@/old-components/OptionPill";
import configControls from "@/forms/fixtures/controls"
import Select from "@/old-components/Select/Select";
import { SelectInit } from "@/old-components/fixture"

import cn from "classnames";

import Image from "@/old-components/Image"
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const axios = require('axios');

type MiMovilInscriptionFormData = {
  setStatus: (status: { loading: boolean, valid: boolean, success: boolean }) => void
  submit: boolean;
  residence: any;
  noResidence: any;
  hasCurp: any;
  noCurp: any;
  setResidence: any;
  setNoResidence: any;
  setHasCurp: any;
  setNoCurp: any;
  personalData: any;
  setPersonalData: any;
  curp: any;
  setCurp: any;
  isValidCurp: any;
  setIsValidCurp: any;
  curpError: any;
  setCurpError: any;
  setProgram: any;
  programs: any[]
}

const MiMovilInscriptionForm = (props: MiMovilInscriptionFormData) => {

  const {
    setStatus,
    submit,
    residence,
    noResidence,
    hasCurp,
    noCurp,
    setResidence,
    setNoResidence,
    setHasCurp,
    setNoCurp,
    personalData,
    setPersonalData,
    curp,
    setCurp,
    isValidCurp,
    setIsValidCurp,
    curpError,
    setCurpError,
    setProgram,
    programs
  } = props

  const [isLoading, setIsLoading] = useState(true);
  const [isValid, setIsValid] = useState(false);
  const [isSuccess, setIsSuccess] = useState(true);
  const [curpTouched, setCurpTouched] = useState<boolean>(false)

  const [optionsGender, setOptionsGender] = useState(
    [
      {
        value: "Hombre",
        text: "Masculino",
        active: false
      }, {
        value: "Mujer",
        text: "Femenino",
        active: false
      }, {
        value: "other",
        text: "Otro",
        active: false
      }
    ]
  );
  const [ selectData, setSelectData ] = useState<any>();

  useEffect(() => {
    const values = programs.map(program => {
      return {
        value: program.nombrePrograma,
        text: program.nombrePrograma,
        active: false
      }
    }) 
    setSelectData(values)
  }, [programs])


  const [personalDataTouched, setPersonalDataTouched] = useState<{ [key: string]: boolean }>({
    name: false,
    last_name: false,
    second_last_name: false,
    email: false,
    phone: false,
    birthdate: false,
    gender: false,
    adviser:false
  })

  const [personalDataErrors, setPersonalDataErrors] = useState({
    name: false,
    last_name: false,
    second_last_name: false,
    email: false,
    phone: false,
    birthdate: false,
    gender: false
  })

  const validateCurpControl = () => {
    return !!curp?.match(configControls.patternCurp)
  };

  useEffect(() => {
    if (!isValidCurp) {
      setPersonalData({
        name: "",
        last_name: "",
        second_last_name: "",
        email: "",
        phone: "",
        birthdate: "",
        gender: "",
        residence: "",
        adviser:""
      })
    }

  }, [isValidCurp])

  const validateCurp = () => {

    const newCurpError = !validateCurpControl() && curpTouched

    setCurpError(newCurpError);

    const isValidCurp = validateCurpControl();

    if (isValidCurp) {
      setIsLoading(true)
      axios.post(`${process.env.NEXT_PUBLIC_PAYMENT_WEBHOOK}/curp/validate`, {
        curp
      }).then(function (response: any) {
        if (response.data.errorMessage) {
          setCurpError(true)
          setIsSuccess(false)
          setPersonalData({
            name: "",
            last_name: "",
            second_last_name: "",
            email: "",
            phone: "",
            birthdate: "",
            gender: "",
            residence: "",
            adviser:""
          })

        }
        if (response.data.curp) {
          const rawBirthdate = response?.data?.fechaNacimiento.split('/')
          const date = `${[rawBirthdate[2], rawBirthdate[1], rawBirthdate[0]]. join('-')}T00:00:00-06:00`
          const birthdate = new Date(date)
          
          setPersonalData({
            ...personalData,
            name: response?.data?.nombre,
            last_name: response?.data?.apellidoPaterno,
            second_last_name: response?.data?.apellidoMaterno,
            birthdate: birthdate,
            gender: response?.data?.sexo,
          })
          setIsSuccess(true)
          setIsValidCurp(true)
          setIsLoading(false)
        }
      }).catch((err: any) => { console.log("Error en el curp: ", err) })

    }
    else {
      setPersonalData({
        name: "",
        last_name: "",
        second_last_name: "",
        email: "",
        phone: "",
        birthdate: "",
        gender: "",
        residence: "",
        adviser:""
      })
      setIsLoading(false)

    }


  }

  const validatePersonalDataControl = (control: string, value: string) => {
    if (control === 'email') {
      return !!value.match(configControls.patternEmail)
    }
    if (control === 'phone') {
      return value.trim().length === 10
    }
    if (control === 'birthdate') {
      return  !!value && !!(new Date(value))
    }
    return !!value?.trim()
  };


  const validatePersonalDataControls = () => !Object.entries(personalData).map(([key, value]: any) => {
    const validity = validatePersonalDataControl(key, value)
    return validity
  }).includes(false)

  const Validate = () => {
    const newPersonalDataErrors = {
      name: !validatePersonalDataControl("name", personalData.name) && personalDataTouched.name,
      last_name: !validatePersonalDataControl("last_name", personalData.last_name) && personalDataTouched.last_name,
      second_last_name: !validatePersonalDataControl("second_last_name", personalData.second_last_name) && personalDataTouched.second_last_name,
      phone: !validatePersonalDataControl("phone", personalData.phone) && personalDataTouched.phone,
      email: !validatePersonalDataControl("email", personalData.email) && personalDataTouched.email,
      birthdate: !validatePersonalDataControl("birthdate", personalData.birthdate) && personalDataTouched.birthdate,
      gender: !validatePersonalDataControl("gender", personalData.gender) && personalDataTouched.gender,
      adviser: !validatePersonalDataControl("adviser", personalData.adviser) && personalDataTouched.adviser,
    }

    setPersonalDataErrors({ ...newPersonalDataErrors });

    const isValidPersonalData = validatePersonalDataControls();
    setIsValid(isValidPersonalData)


  }

  const handleSelect = async ({ detail }: CustomEvent) => {
    const selectedGender = detail;
    const selectOptions = optionsGender?.map(option => {
      return { ...option, active: option?.value === selectedGender }
    })
    setOptionsGender(selectOptions)
    setPersonalDataTouched({ ...personalDataTouched, ["gender"]: true });
    setPersonalData({ ...personalData, ["gender"]: selectedGender, ["residence"]: residence ? "Nacional" : "Extranjero" });
  };

  const handleKeyPress = (e: CustomEvent, control: string) => {
    const { detail: { value } } = e;
      setPersonalDataTouched({ ...personalDataTouched, [control]: true });
      setPersonalData({ ...personalData, [control]: value, ["residence"]: residence ? "Nacional" : "Extranjero", ["adviser"]:value });
  };

  const handleDateChange = (value: Date | null, control: string) => {
    if (value) {
      const date = new Date(value)
      const newdate = date.toLocaleString('es-MX', { day: "2-digit", month: "2-digit", year: "numeric"})
      
      setPersonalDataTouched({ ...personalDataTouched, [control]: true });
      setPersonalData({ ...personalData, [control]: date});
    }
    
  };

  const handleTouchedControl = (control: string) => {
    setPersonalDataTouched({ ...personalDataTouched, [control]: true });
  }



  useEffect(() => {
    setStatus({ loading: isLoading, valid: isValid, success: isSuccess })
  }, [isLoading, isValid, isSuccess]);


  useEffect(() => {
    Validate()
  }, [personalData]);

  useEffect(() => {
    setIsLoading(true)
    validateCurp()

  }, [curp]);

  const handleSelectOption = async ({ detail }: CustomEvent) => {
    const programData = programs.filter(program => program.nombrePrograma === detail)[0]
    const options = programs.map(program => {	
      return { value: program.nombrePrograma, text: program.nombrePrograma, active: program.nombrePrograma === detail }
    });
    setSelectData(options)
    // console.log('programData: ', programData);
    setProgram(programData)
    
  }


  const formCurp = <div >
    <div className="grid grid-cols-2 gap-x-6 ">
      <div className="col-span-2">
        <Input value={personalData?.name} data={{
          label: 'Nombre(s)*',
          name: 'name',
          type: 'text',
          typeButton: 'classic',
          maxlength: '',
          onPaste: true,
          alphabetical: true,
          pattern: '',
          isRequired: true,
          disabled: hasCurp && !!personalData.name && isValidCurp
        }}
          eventKeyPress={(e: CustomEvent) => handleKeyPress(e, "name")}
          eventFocus={() => handleTouchedControl("name")}
          errorMessage={configControls.errorMessagesInscriptionForm.name}
          hasError={personalDataErrors.name}
        />
      </div>
      <div className="">
        <Input value={personalData?.last_name} data={{
          label: 'Apellido paterno*',
          name: 'last_name',
          type: 'text',
          typeButton: 'classic',
          maxlength: '',
          onPaste: true,
          alphabetical: true,
          pattern: '',
          isRequired: true,
          disabled: hasCurp && !!personalData.last_name && isValidCurp
        }}
          eventKeyPress={(e: CustomEvent) => handleKeyPress(e, "last_name")}
          eventFocus={() => handleTouchedControl("last_name")}
          errorMessage={configControls.errorMessagesInscriptionForm.surname}
          hasError={personalDataErrors.last_name}
        />
      </div>
      <div className="">
        <Input value={personalData?.second_last_name} data={{
          label: 'Apellido materno',
          name: 'second_last_name',
          type: 'text',
          typeButton: 'classic',
          maxlength: '',
          onPaste: true,
          alphabetical: true,
          pattern: '',
          isRequired: true,
          disabled: hasCurp && !!personalData.second_last_name && isValidCurp
        }}
          eventKeyPress={(e: CustomEvent) => handleKeyPress(e, "second_last_name")}
          eventFocus={() => handleTouchedControl("second_last_name")}
          errorMessage={configControls.errorMessagesInscriptionForm.name}
          hasError={personalDataErrors.second_last_name}
        />
      </div>
      <div className="">
        <DatePicker
          className={cn("w-full h-full pl-3 pr-13 py-3 rounded-t-lg border-b border-surface-400 outline-none bg-surface-100 placeholder:text-surface-500", {
            "border-error-500": personalDataErrors.birthdate,
            "text-surface-400": hasCurp && !!personalData.birthdate && isValidCurp,
          })}
          selected={personalData.birthdate}
          onChange={(date) => handleDateChange(date, "birthdate")}
          onFocus={() => handleTouchedControl("birthdate")}
          placeholderText="Fecha de Nacimiento*"
          dateFormat={'dd/MM/yy'}
          disabled={hasCurp && !!personalData.birthdate && isValidCurp}
        />
        { personalDataErrors.birthdate && <p className="text-error-500 font-texts text-xs ml-2 mt-4">{configControls.errorMessagesInscriptionForm.birthdate}</p>}
      </div>
      <div >
        <Input value={personalData?.gender} data={{
          label: 'Género',
          name: 'gender',
          type: 'text',
          typeButton: 'classic',
          maxlength: '',
          onPaste: true,
          alphanumeric: false,
          pattern: '',
          isRequired: true,
          disabled: hasCurp && !!personalData.gender && isValidCurp
        }}
          eventKeyPress={(e: CustomEvent) => handleKeyPress(e, "gender")}
          eventFocus={() => handleTouchedControl("gender")}
          errorMessage={configControls.errorMessagesInscriptionForm.gender}
          hasError={personalDataErrors.gender}
        />
      </div>
      <div className="">
        <Input data={{
          label: 'Correo electrónico*',
          name: 'email',
          type: 'text',
          typeButton: 'classic',
          maxlength: '',
          onPaste: true,
          alphanumeric: false,
          pattern: '',
          isRequired: true
        }}
          eventKeyPress={(e: CustomEvent) => handleKeyPress(e, "email")}
          eventFocus={() => handleTouchedControl("email")}
          errorMessage={configControls.errorMessagesInscriptionForm.email}
          hasError={personalDataErrors.email}
        />
      </div>
      <div className="">
        <Input data={{
          label: 'Celular Mi movil*',
          name: 'phone',
          type: 'text',
          typeButton: 'classic',
          maxlength: '10',
          onPaste: true,
          onlyNumbers: true,
          pattern: '',
          isRequired: true
        }}
          eventKeyPress={(e: CustomEvent) => handleKeyPress(e, "phone")}
          eventFocus={() => handleTouchedControl("phone")}
          errorMessage={configControls.errorMessagesInscriptionForm.phone}
          hasError={personalDataErrors.phone}
        />
      </div>
      <div className="col-span-2 flex items-center">
        <Select classname="w-full" onClick={(option: CustomEvent) => handleSelectOption(option)} data={{...SelectInit, textDefault: "Programa Educativo"}} options={selectData} flagHeight={true}/>

      </div>
    </div>
  </div>
  const formEmpty = <div >
    <div className="grid grid-cols-2 gap-x-3 gap-y-1">
      <div className="col-span-2">
        <Input data={{
          label: 'Nombre(s)*',
          name: 'name',
          type: 'text',
          typeButton: 'classic',
          maxlength: '',
          onPaste: true,
          alphabetical: true,
          pattern: '',
          isRequired: true,
          disabled: hasCurp && !!personalData.name
        }}
          eventKeyPress={(e: CustomEvent) => handleKeyPress(e, "name")}
          eventFocus={() => handleTouchedControl("name")}
          errorMessage={configControls.errorMessagesInscriptionForm.name}
          hasError={personalDataErrors.name}
        />
      </div>
      <div className="">
        <Input data={{
          label: 'Apellido paterno*',
          name: 'last_name',
          type: 'text',
          typeButton: 'classic',
          maxlength: '',
          onPaste: true,
          alphabetical: true,
          pattern: '',
          isRequired: true,

        }}
          eventKeyPress={(e: CustomEvent) => handleKeyPress(e, "last_name")}
          eventFocus={() => handleTouchedControl("last_name")}
          errorMessage={configControls.errorMessagesInscriptionForm.surname}
          hasError={personalDataErrors.last_name}
        />
      </div>
      <div className="">
        <Input data={{
          label: 'Apellido materno',
          name: 'second_last_name',
          type: 'text',
          typeButton: 'classic',
          maxlength: '',
          onPaste: true,
          alphabetical: true,
          pattern: '',
          isRequired: true,
        }}
          eventKeyPress={(e: CustomEvent) => handleKeyPress(e, "second_last_name")}
          eventFocus={() => handleTouchedControl("second_last_name")}
          errorMessage={configControls.errorMessagesInscriptionForm.name}
          hasError={personalDataErrors.second_last_name}
        />
      </div>
      <div className="">
       
        <DatePicker
          className={cn("w-full h-full pl-3 pr-13 py-3 rounded-t-lg border-b border-surface-400 outline-none bg-surface-100 placeholder:text-surface-500", {
            "border-error-500": personalDataErrors.birthdate,
          })}
          selected={personalData.birthdate}
          onChange={(date) => handleDateChange(date, "birthdate")}
          onFocus={() => handleTouchedControl("birthdate")}
          placeholderText="Fecha de Nacimiento*"
          dateFormat={'dd/MM/yy'}
        />
        { personalDataErrors.birthdate && <p className="text-error-500 font-texts text-xs ml-2 mt-4">{configControls.errorMessagesInscriptionForm.birthdate}</p>}
      </div>
      <div >
        <div className="mt-[-1em]"> <Select options={optionsGender} data={{
          textDefault: "Género*",
          disabled: false,
          icon: " ",
          isLabel: true,
          reset: false,
          zindexOptions: 0,
          tagOnClickList: 'testOnClickList',
          tagOnClickOption: 'testOnClickOption',
        }} onClick={(option: CustomEvent) => handleSelect(option)} /></div>
      </div>
      <div className="">
        <Input data={{
          label: 'Correo electrónico*',
          name: 'email',
          type: 'text',
          typeButton: 'classic',
          maxlength: '',
          onPaste: true,
          alphanumeric: false,
          pattern: '',
          isRequired: true
        }}
          eventKeyPress={(e: CustomEvent) => handleKeyPress(e, "email")}
          eventFocus={() => handleTouchedControl("email")}
          errorMessage={configControls.errorMessagesInscriptionForm.email}
          hasError={personalDataErrors.email}
        />
      </div>
      <div className="">
        <Input data={{
          label: 'Celular Mi movil*',
          name: 'phone',
          type: 'text',
          typeButton: 'classic',
          maxlength: '10',
          onPaste: true,
          onlyNumbers: true,
          pattern: '',
          isRequired: true
        }}
          eventKeyPress={(e: CustomEvent) => handleKeyPress(e, "phone")}
          eventFocus={() => handleTouchedControl("phone")}
          errorMessage={configControls.errorMessagesInscriptionForm.phone}
          hasError={personalDataErrors.phone}
        />
      </div>
      <div className="col-span-2 flex items-center">
        <Select classname="w-full" onClick={(option: CustomEvent) => handleSelectOption(option)} data={{...SelectInit, textDefault: "Programa Educativo"}} options={selectData} flagHeight={true}/>
      </div>
    </div>
  </div>

  return (
    <Container>
      <div className="gap-x-10">
        <div className="mobile:col-span-2 mb-4">
          <div className="flex flex-col gap-2">
            <div>
              <h3 className="font-headings font-bold text-3xl text-surface-900  mobile:text-lg text-center">Registra un nuevo alumno</h3>
              <p className="text-surface-500 font-texts text-base mt-3  text-center">Te pedimos llenar los datos del estudiante para generar su inscripción</p>
            </div>
            <div>
              <p className="font-texts text-base font-bold text-surface-950">
                1. ¿Es mexicano? <span className="text-error-500">*</span>
              </p>
              <div className="flex space-x-3 my-3">
                <OptionPill
                  data={{
                    name: "Si",
                    search: "",
                    disabled: false
                  }}
                  active={residence === true}
                  onClick={() => {
                    setResidence(true)
                    setNoResidence(false)
                    setHasCurp(true)
                    setNoCurp(false)
                  }}
                />
                <p className="mt-2"></p>
                <OptionPill data={{
                  name: "No",
                  search: "",
                  disabled: false
                }} active={noResidence === true} onClick={() => {
                  setResidence(false)
                  setNoResidence(true)
                }}
                />
              </div>
            </div>
          </div>
          {
            noResidence && <>
              <div className="flex flex-col gap-3">
                <p className="font-headings text-4 font-bold">
                  2. ¿Tiene CURP?
                </p>
                <div className="flex gap-1 mb-5">
                  <OptionPill
                    data={{
                      name: "Si",
                      search: "",
                      disabled: false
                    }}
                    active={hasCurp === true}
                    onClick={() => {
                      setHasCurp(true)
                      setNoCurp(false)
                    }}
                  />
                  <p className="mt-2"></p>
                  <OptionPill data={{
                    name: "No",
                    search: "",
                    disabled: false
                  }}
                    active={noCurp === true}
                    onClick={() => {
                      setHasCurp(false)
                      setNoCurp(true)
                    }}
                  />
                </div>
              </div>
            </>
          }
          <div className={cn({ ["hidden"]: noCurp })}>
            <Input data={{
              label: 'CURP*',
              name: 'curp',
              type: 'text',
              typeButton: 'classic',
              maxlength: '18',
              onPaste: true,
              autocomplete: 'off',
              alphanumeric: true,
              pattern: '',
              isRequired: true,
              upperCase: true
            }}
              eventKeyPress={(e: CustomEvent) => {
                const { detail: { value } } = e;
                setCurpTouched(true);
                setCurp(value);
              }}
              errorMessage={configControls.errorMessagesInscriptionForm.curp}
              eventFocus={() => setCurpTouched(true)}
              hasError={curpError}
            />
            <p className="font-texts font-normal text-surface-500 mb-3">¿No conoces su CURP? Obtenlo desde <a className="text-primary-500" href="https://www.gob.mx/curp/" target="_blank">aquí</a></p>
          </div>

          
            {
              isLoading
                ? <section className={cn("p-6 shadow-15 bg-surface-0 relative")}><div className="absolute w-full h-full z-10 flex justify-center items-center left-0 top-0 bg-surface-0">
                  <Image src="/images/loader.gif" alt="loader" classNames={cn("w-10 h-10 top-0 left-0")} />
                </div></section>
                : null
            }  
          {!isLoading && isValidCurp && formCurp}
          {!isLoading && curp && !isValidCurp && formEmpty}
          {
            noCurp && noResidence && !isValidCurp && formEmpty
          }
        </div>
      </div>
    </Container>
  )
};

export { MiMovilInscriptionForm };