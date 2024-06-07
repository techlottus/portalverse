import React, { useEffect, useState } from "react";
import Input from "@/old-components/Input/Input"
import Link from "next/link";
import Container from "@/layouts/Container.layout";
import OptionPill from "@/old-components/OptionPill";
import Button from "@/old-components/Button/Button";
import Checkbox from "@/old-components/Checkbox";
import configControls from "@/forms/fixtures/controls"
import { useForm } from "react-hook-form";
import Select from "@/old-components/Select/Select";

const axios = require('axios');

const businessUnit = process.env.NEXT_PUBLIC_BUSINESS_UNIT!;
const curpEndPoint = process.env.NEXT_PUBLIC_CURP_ID_END_POINT!;

type InscriptionFormData = {

}

const InscriptionForm = (props: InscriptionFormData) => {

  const {
    handleSubmit,
    formState: { errors },
  } = useForm({

  });

  const [residence, setResidence] = useState<boolean>()
  const [noResidence, setNoResidence] = useState<boolean>()
  const [hasCurp, setHasCurp] = useState<boolean>()
  const [noCurp, setNoCurp] = useState<boolean>()
  const [adviser, setAdviser] = useState<boolean>()
  const [submit, setSubmit] = useState<boolean>(false);
  const [isValid, setIsValid] = useState<boolean>(false);
  const [curp, setCurp] = useState<boolean>();
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

  const [personalData, setPersonalData] = useState({
    name: "",
    last_name: "",
    second_last_name: "",
    email: "",
    phone: "",
    birthdate: "",
    gender: ""
  });

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

  useEffect(() => {
    Validate()
  }, [personalData]);

  const onSubmit = handleSubmit(() => {

    axios.post(`https://${businessUnit.toLowerCase() + curpEndPoint}/curp/validate`, {
      curp: curp,
    })
      .then(function (response: any) {
        personalData.name = response?.data?.nombre;
        personalData.last_name = response?.data?.apellidoPaterno;
        personalData.second_last_name = response?.data?.apellidoMaterno;
        personalData.birthdate = response?.data?.fechaNacimiento;
        personalData.gender = response?.data?.sexo;   
      })
      .catch(function (error: any) {
      });
    Validate()
  })

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

  return (

    <Container>
      <div className="grid grid-cols-2 p-6 gap-x-20">
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
                    setCurp(e.detail.value) 
                  }}
                  errorMessage={configControls.errorMessagesInscriptionForm.name}
                />
              </div>
              <p className="font-texts text-surface-500 mb-3">¿No conoces tu CURP? Obtenlo desde <a className="text-primary-500" href="https://www.gob.mx/curp/" target="_blank">aquí</a></p>
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
                    setCurp(e.detail.value) 
                  }}
                  errorMessage={configControls.errorMessagesInscriptionForm.name}
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
              <p className="text-3.5 font-texts font-bold text-sm text-primary-500 mt-3">Atrás</p>
            </Link>
          </div>
        </div>
        <div className="mobile:col-span-2">
          <div className="border border-surface-300 rounded-lg p-4">
            <h3 className="font-headings font-bold text-5.5 leading-6">Diplomado en Análisis de Datos</h3>
            <p className="text-white bg-primary-500 w-23 px-2 py-1 rounded-full text-center my-3">En línea</p>
            <hr className="text-surface-300" />
            <div className="flex justify-between mt-2">
              <p className="font-texts">Opción de pago:</p>
              <p className="text-surface-500 font-texts">3 parcialidades</p>
            </div>
            <div className="flex justify-between my-1">
              <p className="font-texts">Parcialidades:</p>
              <p className="text-surface-500 font-texts">$1,523.00 MXN</p>
            </div>
            <div className="flex justify-between mb-2">
              <p className="font-texts">Costo total:</p>
              <p className="text-surface-500 font-texts">$4,569.00 MXN</p>
            </div>
            <hr className="text-surface-300" />
            <div className="flex justify-between mt-2">
              <p className="font-texts font-bold text-base leading-6">Parcialidad a pagar:</p>
              <p className="text-base font-bold">$1,523.00 MXN</p>
            </div>
          </div>
          {
            residence &&
            <div className="flex flex-col my-6">
            <Button
              dark
              data={{
                type: "primary",
                title: "Inscribirme ahora",
                isExpand: true,
                disabled: false
              }}
              onClick={() => {
                onSubmit()
              }}
            />
          </div>
          }
          {
            noCurp &&
            <div className="flex flex-col my-6">
            <Button
              dark
              data={{
                type: "primary",
                title: "Inscribirme ahora",
                isExpand: true,
                disabled: !isValid
              }}
              onClick={() => {
                onSubmit()
              }}
            />
          </div>
          }
          <div className="flex">
            <p className="text-3.5 leading-5 text-surface-800 font-texts font-normal mr-1">Al llenar tus datos aceptas nuestro</p>
            <Link href="terminos-y-condiciones" passHref target={"_blank"}>
              <p className="text-3.5 font-texts font-normal text-sm text-surface-800 underline">Aviso de Privacidad</p>
            </Link>
          </div>
        </div>
      </div>
    </Container>
  )
};

export { InscriptionForm };