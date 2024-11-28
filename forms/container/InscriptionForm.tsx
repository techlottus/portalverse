import React, { useEffect, useState } from "react";
import Input from "@/components/lottus-education/Input"
import OptionPill from "@/old-components/OptionPill";
import Checkbox from "@/old-components/Checkbox";
import configControls from "@/forms/fixtures/controls"
import Select from "@/old-components/Select/Select";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import cn from "classnames";
import * as Field from "@/components/lottus-education/Field";
import Button from "@/old-components/Button/Button"


const axios = require('axios');

type InscriptionFormData = {
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
}

const InscriptionForm = (props: InscriptionFormData) => {

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
    setCurpError
  } = props


  const [isLoading, setIsLoading] = useState(false);
  const [isValid, setIsValid] = useState(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [adviser, setAdviser] = useState<boolean>()
  const [curpTouched, setCurpTouched] = useState<boolean>(false)
  const [curpErrorMesage, setcurpErrorMesage] = useState<string>("")

  const [optionsGender, setOptionsGender] = useState([{
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
  }]);

  const [personalDataTouched, setPersonalDataTouched] = useState<{ [key: string]: boolean }>({
    name: false,
    last_name: false,
    second_last_name: false,
    email: false,
    phone: false,
    birthdate: false,
    gender: false,
    adviser: false
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
      setcurpErrorMesage("No fue posible validar los datos. Continua manualmente.")
      setPersonalData({
        name: "",
        last_name: "",
        second_last_name: "",
        email: "",
        phone: "",
        birthdate: "",
        gender: "",
        residence: "",
        adviser: ""
      })
    }

  }, [isValidCurp])

  const validateCurp = () => {

    const newCurpError = !validateCurpControl() && curpTouched

    setCurpError(newCurpError);
    setcurpErrorMesage(newCurpError ? "Ingresa un curp válido" : "")

    const isValidCurp = validateCurpControl();

    if (isValidCurp) {
      setIsLoading(true)
      axios.post(`${process.env.NEXT_PUBLIC_PAYMENT_WEBHOOK}/curp/validate`, {
        timeout: 20000,
        curp
      }).then(function (response: any) {
        if (response.data.errorMessage && !response.data.curp) {
          setCurpError(true)
          setIsLoading(false)
          setcurpErrorMesage("No fue posible validar los datos. Continua manualmente.")
          setIsSuccess(false)
          setPersonalData({
            name: "",
            last_name: "",
            second_last_name: "",
            email: "",
            phone: "",
            birthdate: "",
            gender: "",
            residence: "", adviser: ""
          })

        }
        if (response.data.curp) {
          const rawBirthdate = response?.data?.fechaNacimiento.split('/')
          const date = `${[rawBirthdate[2], rawBirthdate[1], rawBirthdate[0]].join('-')}T00:00:00-06:00`
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
      }).catch((err: any) => {
        console.log("Error en el curp: ", err)
        setIsLoading(false)
        setCurpError(true)
        setcurpErrorMesage("No fue posible validar los datos. Continua manualmente.")
      })
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
        adviser: ""
      })
      setIsLoading(false)
      setcurpErrorMesage("Ingresa un curp válido")

    }
  }
  const handleDateChange = (value: Date | null, control: string) => {
    if (value) {
      const date = new Date(value)
      // console.log(date);
      const newdate = date.toLocaleString('es-MX', { day: "2-digit", month: "2-digit", year: "numeric" })
      // console.log(newdate);

      setPersonalDataTouched({ ...personalDataTouched, [control]: true });
      setPersonalData({ ...personalData, [control]: date });
    }

  };

  const validatePersonalDataControl = (control: string, value: string) => {
    if (control === 'email') {
      return !!value.match(configControls.patternEmail)
    }
    if (control === 'phone') {
      return /^\d{10}$/.test(value)
    }
    if (control === 'birthdate') {
      return !!value && !!(new Date(value))
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

  const handleSelect = async ({ detail }: any) => {
    const selectedGender = detail;
    const selectOptions = optionsGender?.map(option => {
      return { ...option, active: option?.value === selectedGender }
    })
    setOptionsGender(selectOptions)
    setPersonalDataTouched({ ...personalDataTouched, ["gender"]: true });
    setPersonalData({ ...personalData, ["gender"]: selectedGender, ["residence"]: residence ? "Nacional" : "Extranjero" });
  };

  const handleKeyPress = (e: any, control: string) => {
    setPersonalDataTouched({ ...personalDataTouched, [control]: true });
    setPersonalData({ ...personalData, [control]: e.target.value, ["residence"]: residence ? "Nacional" : "Extranjero", ["adviser"]: e.target.value });
  };

  const handleTouchedControl = (control: string) => {
    setPersonalDataTouched({ ...personalDataTouched, [control]: true });
  }
  const handleChangeCurp = (e:any) => {
    const value = e.target.value.toUpperCase(); 
    const regex = /^[A-Z0-9]*$/; 
    if (regex.test(value) && value.length <= 18) {
        setCurp(value);
    }
};
  useEffect(() => {
    setStatus({ loading: isLoading, valid: isValid, success: isSuccess })
  }, [isLoading, isValid, isSuccess]);


  useEffect(() => {
    // console.log(personalData)
    Validate()
  }, [personalData]);

  const handleValidateCurp = () => {
    setIsLoading(true)
    validateCurp()
  }

  const formCurp = <form className="mobile:mb-3" >
    <h3 className="text-surface-950 font-bold font-texts text-base mb-3">Datos del alumno</h3>
    <div className="grid grid-cols-2 gap-x-6 gap-y-3">
      {/* <div className="">
        <p className="font-heading font-bold text-md">Datos de estudiante</p>
      </div> */}
      <div className="col-span-2">
        <Field.Root hasError={personalDataErrors.name}>
          <Input value={personalData.name}
            placeholder='Nombre(s)'
            type='text'
            pattern=''
            required={true}
            disabled={hasCurp && !!personalData.name && isValidCurp}
            onKeyDown={(e: any) => handleKeyPress(e, "name")}
            onFocus={() => handleTouchedControl("name")}
            hasError={personalDataErrors.name}
            autoComplete="on"
          />
          <Field.Helper className={cn({ ['hidden']: !personalDataErrors.name })}>{configControls.errorMessagesInscriptionForm.name}</Field.Helper>
        </Field.Root>

      </div>
      <div className="mobile:col-span-2">
        <Field.Root hasError={personalDataErrors.last_name}>
          <Input value={personalData?.last_name}
            placeholder='Apellido paterno'
            name='last_name'
            type='text'
            pattern=''
            required={true}
            disabled={hasCurp && !!personalData.last_name && isValidCurp}
            onKeyDown={(e: any) => handleKeyPress(e, "last_name")}
            onFocus={() => handleTouchedControl("last_name")}
            hasError={personalDataErrors.last_name}
          />
          <Field.Helper className={cn({ ['hidden']: !personalDataErrors.last_name })}>{configControls.errorMessagesInscriptionForm.surname}</Field.Helper>
        </Field.Root>
      </div>
      <div className="mobile:col-span-2">
        <Field.Root hasError={personalDataErrors.second_last_name}>
          <Input value={personalData?.second_last_name}
            placeholder='Apellido materno'
            name='second_last_name'
            type='text'
            pattern=''
            required={true}
            disabled={hasCurp && !!personalData.second_last_name && isValidCurp}
            onKeyDown={(e: any) => handleKeyPress(e, "second_last_name")}
            onFocus={() => handleTouchedControl("second_last_name")}
            hasError={personalDataErrors.second_last_name}
          />
          <Field.Helper className={cn({ ['hidden']: !personalDataErrors.second_last_name })}>{configControls.errorMessagesInscriptionForm.name}</Field.Helper>
        </Field.Root>
      </div>
      <div className="mobile:col-span-2 mobile:w-full">
        <DatePicker
          className={cn("w-full pl-3 pr-13 py-3 z-10 rounded border overflow-hidden border-surface-400 outline-none  transition-colors h-10 placeholder:text-surface-500 text-surface-500 placeholder:font-texts font-texts font-normal", {
            "border-error-500": personalDataErrors.birthdate,
            "text-surface-100 bg-surface-50 !border-surface-100": hasCurp && !!personalData.birthdate && isValidCurp,
          })}
          selected={personalData.birthdate}
          onChange={(date) => handleDateChange(date, "birthdate")}
          onFocus={() => handleTouchedControl("birthdate")}
          placeholderText="Fecha de Nacimiento*"
          dateFormat={'dd/MM/yy'}
          disabled={hasCurp && !!personalData.birthdate && isValidCurp}
        />
        {personalDataErrors.birthdate && <p className="text-error-500 font-texts text-xs ml-2 mt-4">{configControls.errorMessagesInscriptionForm.birthdate}</p>}
      </div>
      <div className="mobile:col-span-2">
        <Field.Root hasError={personalDataErrors.gender}>
          <Input value={personalData?.gender}
            placeholder='Género'
            name='gender'
            type='text'
            pattern=''
            required={true}
            disabled={hasCurp && !!personalData.gender && isValidCurp}
            onKeyDown={(e: any) => handleKeyPress(e, "gender")}
            onFocus={() => handleTouchedControl("gender")}
            hasError={personalDataErrors.gender}
          />
          <Field.Helper className={cn({ ['hidden']: !personalDataErrors.gender })}>{configControls.errorMessagesInscriptionForm.gender}</Field.Helper>
        </Field.Root>
      </div>
      <div className="mobile:col-span-2">
        <Field.Root hasError={personalDataErrors.email}>
          <Input
            name="email"
            placeholder='Correo electrónico'
            type='text'
            required={true}
            autoComplete="on"
            isValid={/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(personalData.email)}
            onKeyDown={(e: any) => handleKeyPress(e, "email")}
            onInput={(e: any) => handleKeyPress(e, "email")}
            onFocus={() => handleTouchedControl("email")}
            onChange={(e) => handleKeyPress(e, "email")}
            hasError={personalDataErrors.email}
          />
          <Field.Helper className={cn({ ['hidden']: !personalDataErrors.email })}>{configControls.errorMessagesInscriptionForm.email}</Field.Helper>
        </Field.Root>
      </div>
      <div className="mobile:col-span-2">
        <Field.Root hasError={personalDataErrors.phone}>
          <Input
            placeholder='Celular'
            name='phone'
            type='text'
            maxLength={10}
            pattern='^\d{10}$'
            required={true}
            isValid={/^\d{10}$/.test(personalData.phone) }
            autoComplete="on"
            onKeyDown={(e: any) => handleKeyPress(e, "phone")}
            onFocus={() => handleTouchedControl("phone")}
            onInput={(e: any) => handleKeyPress(e, "phone")}
            onChange={(e) => handleKeyPress(e, "phone")}
            errorMessage={configControls.errorMessagesInscriptionForm.phone}
            hasError={personalDataErrors.phone}
          />
          <Field.Helper className={cn({ ['hidden']: !personalDataErrors.phone })}>{configControls.errorMessagesInscriptionForm.phone}</Field.Helper>
        </Field.Root>
      </div>
      <div className="col-span-2 flex items-center">
        <Checkbox data={{
          name: "adviser",
          disabled: false,
          selected: false,
          tagOnCheck: undefined,
          value: ""
        }} onCheck={() => {
          setAdviser(!adviser)
        }} />
        <p className="font-texts font-normal text-base text-surface-950 ml-2">¿Recibiste ayuda de un asesor? (opcional)</p>
      </div>
      {adviser && <div className="col-span-2">
        <Input
          placeholder='Nombre del asesor'
          name='residence'
          type='text'
          disabled={false}
          required={true}
          onKeyDown={(e: any) => handleKeyPress(e, "adviser")}
          onFocus={() => handleTouchedControl("adviser")}
        />
      </div>}

    </div>
  </form>
  const formEmpty = <div className="mobile:mb-3">
    <h3 className="text-surface-950 font-bold font-texts text-base mb-3">Completa los datos del alumno manualmente</h3>
    <div className="grid grid-cols-2 gap-x-6 gap-y-3">
      <div className="col-span-2">
        <Field.Root hasError={personalDataErrors.name}>
          <Input
            placeholder='Nombre(s)'
            name='name'
            type='text'
            pattern=''
            required={true}
            disabled={false}
            autoComplete="on"
            onKeyDown={(e: any) => handleKeyPress(e, "name")}
            onInput={(e: any) => handleKeyPress(e, "name")}
            onChange={(e) => handleKeyPress(e, "name")}
            onFocus={() => handleTouchedControl("name")}
            hasError={personalDataErrors.name}
          />
          <Field.Helper className={cn({ ['hidden']: !personalDataErrors.name })}>{configControls.errorMessagesInscriptionForm.name}</Field.Helper>
        </Field.Root>

      </div>
      <div className="mobile:col-span-2">
        <Field.Root hasError={personalDataErrors.last_name}>
          <Input
            placeholder='Apellido paterno'
            name='last_name'
            type='text'
            required={true}
            onKeyDown={(e: any) => handleKeyPress(e, "last_name")}
            onInput={(e: any) => handleKeyPress(e, "last_name")}
            onFocus={() => handleTouchedControl("last_name")}
            onChange={(e) => handleKeyPress(e, "last_name")}
            errorMessage={configControls.errorMessagesInscriptionForm.surname}
            hasError={personalDataErrors.last_name}
          />
          <Field.Helper className={cn({ ['hidden']: !personalDataErrors.last_name })}>{configControls.errorMessagesInscriptionForm.surname}</Field.Helper>
        </Field.Root>
      </div>
      <div className="mobile:col-span-2">
        <Field.Root hasError={personalDataErrors.second_last_name}>
          <Input
            placeholder='Apellido materno'
            name='second_last_name'
            type='text'
            required={true}
            onKeyDown={(e: any) => handleKeyPress(e, "second_last_name")}
            onInput={(e: any) => handleKeyPress(e, "second_last_name")}
            onFocus={() => handleTouchedControl("second_last_name")}
            onChange={(e) => handleKeyPress(e, "second_last_name")}
            errorMessage={configControls.errorMessagesInscriptionForm.name}
            hasError={personalDataErrors.second_last_name}
          />
          <Field.Helper className={cn({ ['hidden']: !personalDataErrors.second_last_name })}>{configControls.errorMessagesInscriptionForm.name}</Field.Helper>
        </Field.Root>
      </div>
      <div className="mobile:w-full mobile:col-span-2">
        <DatePicker
          className={cn("w-full pl-3 pr-13 py-3 rounded border overflow-hidden border-surface-400 outline-none bg-surface-50 transition-colors h-10 placeholder:text-surface-500 text-surface-500 placeholder:font-texts font-texts font-normal", {
            "border-error-500": personalDataErrors.birthdate,
            "text-surface-100 border-surface-100": hasCurp && !!personalData.birthdate && isValidCurp,
          })}
          selected={personalData.birthdate}
          onChange={(date) => handleDateChange(date, "birthdate")}
          onFocus={() => handleTouchedControl("birthdate")}
          placeholderText="Fecha de Nacimiento*"
          dateFormat={'dd/MM/yy'}
          disabled={hasCurp && !!personalData.birthdate && isValidCurp}
        />
        {personalDataErrors.birthdate && <p className="text-error-500 font-texts text-xs ml-2 mt-4">{configControls.errorMessagesInscriptionForm.birthdate}</p>}
      </div>
      <div className="mobile:w-full mobile:col-span-2 ">
        <div className=""> <Select options={optionsGender} data={{
          textDefault: "Género",
          disabled: false,
          icon: " ",
          isLabel: false,
          reset: false,
          zindexOptions: 0,
          tagOnClickList: 'testOnClickList',
          tagOnClickOption: 'testOnClickOption',
        }} onClick={(option: any) => handleSelect(option)} /></div>
      </div>
      <div className="mobile:col-span-2">
        <Field.Root hasError={personalDataErrors.email}>
          <Input
            placeholder='Correo electrónico'
            name='email'
            type='text'
            required={true}
            onKeyDown={(e: any) => handleKeyPress(e, "email")}
            onInput={(e: any) => handleKeyPress(e, "email")}
            onFocus={() => handleTouchedControl("email")}
            onChange={(e) => handleKeyPress(e, "email")}
            errorMessage={configControls.errorMessagesInscriptionForm.email}
            hasError={personalDataErrors.email}
          />
          <Field.Helper className={cn({ ['hidden']: !personalDataErrors.email })}>{configControls.errorMessagesInscriptionForm.email}</Field.Helper>
        </Field.Root>
      </div>
      <div className="mobile:col-span-2">
        <Field.Root hasError={personalDataErrors.phone}>
          <Input
            placeholder='Celular'
            name='phone'
            type='text'
            pattern='[0-9]*'
            required={true}
            maxLength={10}
            onKeyDown={(e: any) => handleKeyPress(e, "phone")}
            onInput={(e: any) => handleKeyPress(e, "phone")}
            onChange={(e) => handleKeyPress(e, "phone")}
            onFocus={() => handleTouchedControl("phone")}
            errorMessage={configControls.errorMessagesInscriptionForm.phone}
            hasError={personalDataErrors.phone}
          />
          <Field.Helper className={cn({ ['hidden']: !personalDataErrors.phone })}>{configControls.errorMessagesInscriptionForm.phone}</Field.Helper>
        </Field.Root>
      </div>
      <div className="col-span-2 flex items-center">
        <Checkbox data={{
          name: "adviser",
          disabled: false,
          selected: false,
          tagOnCheck: undefined,
          value: ""
        }} onCheck={() => {
          setAdviser(!adviser)
        }} />
        <p className="font-texts font-normal text-base tablet:text-surface-950 ml-2">¿Recibiste ayuda de un asesor? (opcional)</p>
      </div>
     {adviser && <div className="col-span-2">
        <Input
          placeholder='Nombre del asesor'
          name='residence'
          type='text'
          disabled={false}
          required={true}
          onKeyDown={(e: any) => handleKeyPress(e, "adviser")}
          onFocus={() => handleTouchedControl("adviser")}
        />
      </div>}

    </div>
  </div>

  return (
    <div className="gap-x-20">
      <div className="mobile:col-span-2 desktop:col-span-3 desktop:mb-4">
        <div className="flex flex-col space-y-3">
          {/* <div>
              <h3 className="font-headings font-bold text-3xl text-surface-900  mobile:text-lg">Completa los datos del alumno</h3>
              <p className="text-surface-500 font-texts text-base mt-3 font-normal">Proporcione los datos del estudiante a inscribir. La información de acceso se enviará a su correo electrónico.</p>
            </div> */}
          <p className="font-texts text-base font-bold text-surface-950">
            1. ¿Eres mexicano? <span className="text-error-500">*</span>
          </p>
          <div className="flex space-x-2 desktop:mb-6">
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

        {
          noResidence && <>
            <div className="flex flex-col gap-3 mt-3">
              <p className="font-headings text-base font-bold">
                2. ¿Tienes CURP?
              </p>
              <div className="flex gap-3 mb-5">
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
          <div className="flex space-x-4 mobile:space-x-2 mobile:items-start mt-3">
            <div className="flex-grow mobile:items-center">
             <Field.Root hasError={curpError}>
              <Input
                isValid={isValidCurp}
                value={curp}
                placeholder='CURP'
                name='curp'
                type='text'
                maxLength={18}
                autoCapitalize="on"
                autoComplete='on'
                required={true}
                style={{ textTransform: "uppercase" }}
                onKeyUp={(e: any) => {
                  setCurpTouched(true);
                  handleChangeCurp(e)
                }}
                onChange={(e: any) => {
                  setCurpTouched(true);
                  handleChangeCurp(e)
                }}

                errorMessage={curpErrorMesage}
                onFocus={() => setCurpTouched(true)}
                hasError={curpError}
              />
             </Field.Root>
              
            </div>

            {isLoading && !isSuccess ?
              <button className="cursor-pointer py-2 px-3 h-11 rounded bg-info-50 align-middle ">
                <span className="material-symbols-outlined animate-spin text-info-300 text-2xl align-middle">progress_activity</span>
              </button>
              : curpError && !isLoading && !isSuccess ?
                <button className="cursor-pointer py-2 px-3 h-11 rounded bg-primary-500 active:bg-primary-600 active:border-primary-600 align-middle" onClick={() => {
                  handleValidateCurp()
                }}><span className="material-symbols-outlined text-surface-100 text-2xl align-middle">refresh</span></button>
                : isSuccess ?
                  <button className="cursor-pointer py-2 px-3 h-11 rounded bg-success-0 align-middle">
                    <span className="material-symbols-outlined text-success-500 text-2xl align-middle">check</span>
                  </button>
                  :
                  <div>
                    <div className="mobile:hidden"><Button
                      dark
                      data={{
                        id: "validateButton",
                        type: 'primary',
                        title: "Validar",
                        size: 'small',
                        disabled: isSuccess,
                      }}
                      onClick={() => {
                        handleValidateCurp()
                      }}
                    /></div>
                    <button disabled={isSuccess} className={cn('desktop:hidden tablet:hidden rounded py-2 px-3 h-11', {
                      ['bg-primary-300']: !curpTouched,
                      ['bg-primary-500']: curpTouched,
                    })}
                      onClick={() => {
                        handleValidateCurp()
                      }}
                    ><span className="material-symbols-outlined text-surface-0 text-2xl align-middle ">arrow_forward</span></button>
                  </div>
            }
          </div>

          <p className="font-texts font-normal text-surface-500 mobile:text-xs mb-3">¿No conoces tu CURP? Obtenlo desde <a className="text-primary-500" href="https://www.gob.mx/curp/" target="_blank">aquí</a></p>
        </div>

        {/* {
              isLoading?
                
                // ? <section className={cn("p-6 shadow-15 bg-surface-0 relative")}><div className="absolute w-full h-full z-10 flex justify-center items-center left-0 top-0 bg-surface-0">
                //   <Image src="/images/loader.gif" alt="loader" classNames={cn("w-10 h-10 top-0 left-0")} />
                // </div></section>
                : null
            }   */}
        {isSuccess && (hasCurp || residence) && formCurp}
        {!isSuccess && curpError && !isLoading && (hasCurp || residence) && formEmpty}
        {
          noCurp && noResidence && formEmpty
        }
      </div>
    </div>
  )
};

export { InscriptionForm };