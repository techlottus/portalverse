import React, { useEffect, useState } from "react";
import Input from "@/old-components/Input/Input"
import Link from "next/link";
import Container from "@/layouts/Container.layout";
import OptionPill from "@/old-components/OptionPill";
import Checkbox from "@/old-components/Checkbox";
import configControls from "@/forms/fixtures/controls"
import Select from "@/old-components/Select/Select";
import { getTokenForms } from "@/utils/getTokenForms";

const axios = require('axios');

const businessUnit = process.env.NEXT_PUBLIC_BUSINESS_UNIT!;
const curpEndPoint = process.env.NEXT_PUBLIC_CURP_ID_END_POINT!;

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

  const [isLoading, setIsLoading] = useState(true);
  const [isValid, setIsValid] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [adviser, setAdviser] = useState<boolean>()
  const [curpTouched, setCurpTouched] = useState<boolean>(false)
  const [tokenActive, setTokenActive] = useState<string>("");

  const [optionsGender, setOptionsGender] = useState([{
    value: "male",
    text: "Masculino",
    active: false
  }, {
    value: "female",
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

  const validateCurpControl = (value: string) => {
    return !!value?.match(configControls.patternCurp)
  };

  const validateCurpControls = () => {
    const validity = validateCurpControl(curp)
    return validity;
  }

  const validateCurp = () => {

    const newCurpError = !validateCurpControl(curp)

    setCurpError(newCurpError);

    const isValidCurp = validateCurpControls();

    setIsValidCurp(isValidCurp)
  }

  const validatePersonalDataControl = (control: string, value: string) => {
    if (control === 'email') {
      return !!value.match(configControls.patternEmail)
    }
    if (control === 'phone') {
      return value.trim().length === 10
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
    }

    setPersonalDataErrors({ ...newPersonalDataErrors });

    const isValidPersonalData = validatePersonalDataControls();

    setIsValid(isValidPersonalData)
  }

  const {
    isLoading: isLoadingToken,
    isError: isErrorToken,
    token,
  } = getTokenForms();

  const handleSubmit = async () => {
    setIsLoading(true)
    Validate()
    if (isValid) {
      sendLeadData()
    }
  }

  const sendLeadData = async () => {

    const endpoint = process.env.NEXT_PUBLIC_CAPTACION_PROSPECTO;
    const nombre = personalData?.name;
    const apellidoPaterno = personalData?.last_name;
    const apellidoMaterno = personalData?.second_last_name;
    const email = personalData?.email;
    const telefono = personalData?.phone;
    const fechaNacimiento = personalData?.birthdate;
    const genero = personalData?.gender;

    const params = `nombre=${nombre}&apellidoPaterno=${apellidoPaterno}&apellidoMaterno=${apellidoMaterno}&email=${email}&telefono=${telefono}&fechaNacimiento=${fechaNacimiento}&genero=${genero}`;
  }

  const handleSelect = async ({ detail }: CustomEvent) => {
    const selectedGender = detail;
    const selectOptions = optionsGender?.map(option => {
      return { ...option, active: option?.value === selectedGender }
    })
    setOptionsGender(selectOptions)
    setPersonalDataTouched({ ...personalDataTouched, ["gender"]: true });
    setPersonalData({ ...personalData, ["gender"]: selectedGender });
  };

  const handleKeyPress = (e: CustomEvent, control: string) => {
    const { detail: { value } } = e;
    setPersonalDataTouched({ ...personalDataTouched, [control]: true });
    setPersonalData({ ...personalData, [control]: value });
  };

  const handleTouchedControl = (control: string) => {
    setPersonalDataTouched({ ...personalDataTouched, [control]: true });
  }

  useEffect(() => {
    if (!isLoadingToken && !isErrorToken && !!Object.keys(token).length) {
      setTokenActive(`${token.token_type} ${token.access_token}`);
    }
  }, [isLoadingToken, isErrorToken, token]);

  useEffect(() => {
    setStatus({ loading: isLoading, valid: isValid, success: isSuccess })
  }, [isLoading, isValid, isSuccess]);

  useEffect(() => {
    if (submit) handleSubmit()
  }, [submit]);


  useEffect(() => {
    Validate()
  }, [personalData]);

  useEffect(() => {
    validateCurp()
  }, [curp]);

  return (

    <Container>
      <div className="gap-x-20">
        <div className="mobile:col-span-2 mb-4">
          <div className="flex flex-col gap-6">
            <div>
              <h3 className="font-headings font-bold text-5.5 leading-6 mobile:text-lg">Estás a punto de iniciar tu curso</h3>
              <p className="text-surface-500 font-texts text-base mobile:text-sm mt-1">Te pedimos llenar tus datos como estudiante para inscribirte</p>
            </div>
            <p className="font-headings text-4 font-bold">
              1. ¿Eres mexicano?
            </p>
            <div className="flex gap-3 mb-5">
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
                  setHasCurp(false)
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
            residence && <>
              <div className="">
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
              </div>
              <p className="font-texts font-normal text-surface-500 mb-3">¿No conoces tu CURP? Obtenlo desde <a className="text-primary-500" href="https://www.gob.mx/curp/" target="_blank">aquí</a></p>
            </>
          }
          {
            noResidence && <>
              <div className="flex flex-col gap-6">
                <p className="font-headings text-4 font-bold">
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
          {
            hasCurp && <>
              <div className="">
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
              </div>
              <p className="font-texts text-surface-500 mb-3">¿No conoces tu CURP? Obtenlo desde <a className="text-primary-500" href="https://www.gob.mx/curp/" target="_blank">aquí</a></p></>
          }
          {
            noCurp && <>
              <div className="grid grid-cols-2 gap-x-6 gap-y-3">
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
                    isRequired: true
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
                    isRequired: true
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
                    isRequired: true
                  }}
                    eventKeyPress={(e: CustomEvent) => handleKeyPress(e, "second_last_name")}
                    eventFocus={() => handleTouchedControl("second_last_name")}
                    errorMessage={configControls.errorMessagesInscriptionForm.name}
                    hasError={personalDataErrors.second_last_name}
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
                    label: 'Celular*',
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
                <div className="">
                  <Input data={{
                    placeholder: "",
                    label: '',
                    name: 'birthdate',
                    type: 'date',
                    typeButton: 'classic',
                    onPaste: true,
                    pattern: '',
                    isRequired: true
                  }}
                    eventKeyPress={(e: CustomEvent) => handleKeyPress(e, "birthdate")}
                    eventFocus={() => handleTouchedControl("birthdate")}
                    errorMessage={configControls.errorMessagesInscriptionForm.birthdate}
                    hasError={personalDataErrors.birthdate}
                  />
                </div>
                <div className="mt-[-1em]">
                  <Select options={optionsGender} data={{
                    textDefault: "Género*",
                    disabled: false,
                    icon: " ",
                    isLabel: true,
                    reset: false,
                    zindexOptions: 10,
                    tagOnClickList: 'testOnClickList',
                    tagOnClickOption: 'testOnClickOption',
                  }} onClick={(option: CustomEvent) => handleSelect(option)} />
                </div>
                <div className="col-span-2 flex items-center">
                  <Checkbox data={{
                    name: "adviser",
                    disabled: false,
                    label: "*",
                    selected: false,
                    tagOnCheck: undefined,
                    value: ""
                  }} onCheck={() => {
                    setAdviser(!adviser)
                  }} />
                  <p className="font-texts font-bold">¿Tuviste ayuda de algún asesor? <span className="font-normal text-surface-500">(Opcional)</span></p>
                </div>
                {
                  adviser &&
                  <div className="col-span-2">
                    <Input data={{
                      label: 'Nombre del asesor*',
                      name: 'residence',
                      type: 'text',
                      typeButton: 'classic',
                      maxlength: '',
                      onPaste: true,
                      placeholder: '',
                      autocomplete: 'off',
                      disabled: false,
                      alphanumeric: false,
                      alphabetical: true,
                      onlyNumbers: false,
                      upperCase: false,
                      pattern: '',
                      isRequired: true
                    }} />
                  </div>
                }
              </div>
            </>
          }
          <div className="flex items-end">
            <span className="material-symbols-outlined select-none text-primary-500 text-4.5!">chevron_left</span>
            <Link className="" href="#" passHref target={"_blank"}>
              <p className="text-3.5 font-texts font-bold text-sm text-primary-500 mt-3" onClick={() => history.back()}
              >Atrás</p>
            </Link>
          </div>
        </div>
      </div>
    </Container>
  )
};

export { InscriptionForm };