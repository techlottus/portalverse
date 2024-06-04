import React, { useEffect, useState } from "react";
import Input from "@/old-components/Input/Input"
import Link from "next/link";
import Image from "@/old-components/Image"
import Container from "@/layouts/Container.layout";
import OptionPill from "@/old-components/OptionPill";
import Button from "@/old-components/Button/Button";
import Checkbox from "@/old-components/Checkbox";
import configControls from "@/forms/fixtures/controls"
import { useForm } from "react-hook-form";


type InscriptionFormData = {

}

const InscriptionForm = (props: InscriptionFormData) => {


  const {
    handleSubmit,
    formState: { errors },
  } = useForm({

  });

  const [residance, setResidance] = useState<boolean>()
  const [noResidance, setNoResidance] = useState<boolean>()
  const [hasCurp, setHasCurp] = useState<boolean>()
  const [noCurp, setNoCurp] = useState<boolean>()
  const [adviser, setAdviser] = useState<boolean>()
  const [submit, setSubmit] = useState(false);
  const [isValid, setIsValid] = useState(false);

  const [personalData, setPersonalData] = useState({
    name: "",
    last_name: "",
    second_last_name: "",
    email: "",
    phone: "",
    birthdate: "",
    birth_entity: "",
    gender: "",
    residence: "",
    curp: "",
  });

  const [personalDataTouched, setPersonalDataTouched] = useState<{ [key: string]: boolean }>({
    name: false,
    last_name: false,
    second_last_name: false,
    email: false,
    phone: false,
    birthdate: false,
    birth_entity: false,
    gender: false,
    residence: false,
    curp: false,
  })

  const [personalDataErrors, setPersonalDataErrors] = useState({
    name: false,
    last_name: false,
    second_last_name: false,
    email: false,
    phone: false,
    birthdate: false,
    birth_entity: false,
    gender: false,
    residence: false,
    curp: false,
  })

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

  const Validate = () => {
    const newPersonalDataErrors = {
      name: !validatePersonalDataControl("name", personalData.name) && personalDataTouched.name,
      last_name: !validatePersonalDataControl("last_name", personalData.last_name) && personalDataTouched.last_name,
      phone: !validatePersonalDataControl("phone", personalData.phone) && personalDataTouched.phone,
      email: !validatePersonalDataControl("email", personalData.email) && personalDataTouched.email,
      second_last_name: !validatePersonalDataControl("second_last_name", personalData.second_last_name) && personalDataTouched.second_last_name,
      birthdate: !validatePersonalDataControl("birthdate", personalData.birthdate) && personalDataTouched.birthdate,
      birth_entity: !validatePersonalDataControl("birth_entity", personalData.birth_entity) && personalDataTouched.birth_entity,
      gender: !validatePersonalDataControl("gender", personalData.gender) && personalDataTouched.gender,
      residence: !validatePersonalDataControl("residence", personalData.residence) && personalDataTouched.residence,
      curp: !validatePersonalDataControl("curp", personalData.curp) && personalDataTouched.curp,
    }

    setPersonalDataErrors({ ...newPersonalDataErrors });

    const isValidPersonalData = validatePersonalDataControls();

    setIsValid(isValidPersonalData)
  }

  const onSubmit = handleSubmit(() => {
    console.log(personalData)

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
    const lugarNacimiento = personalData?.birth_entity;
    const genero = personalData?.gender;
    const residence = personalData?.residence;
    const curp = personalData?.curp;

    const params = `nombre=${nombre}&apellidoPaterno=${apellidoPaterno}&apellidoMaterno=${apellidoMaterno}&email=${email}&telefono=${telefono}&fechaNacimiento=${fechaNacimiento}&lugarNacimiento=${lugarNacimiento}&genero=${genero}&residence=${residence}&curp=${curp}`;
    console.log("params", params)
  }

  const handleKeyPress = (e: CustomEvent, control: string) => {
    const { detail: { value } } = e;
    setPersonalDataTouched({ ...personalDataTouched, [control]: true });
    setPersonalData({ ...personalData, [control]: value });
  };

  const handleTouchedControl = (control: string) => {
    setPersonalDataTouched({ ...personalDataTouched, [control]: true });
  }

  const axios = require('axios');

  return (

    <Container>
      <div className="grid grid-cols-2 p-6 gap-6">
        <div className="p-7 shadow-15 rounded-lg">
          <div className="flex gap-6">
            <div className="flex flex-col gap-6">
              <h1 className="font-texts font-bold text-5.5 leading-6">Inicia tu inscripción ahora</h1>
              <p className="font-texts text-4 font-bold">
                1. ¿Eres mexicano?
              </p>
              <div className="flex gap-3 mb-5">
                <OptionPill
                  data={{
                    name: "Si",
                    search: "",
                    disabled: false
                  }}
                  active={residance === true}
                  onClick={() => {
                    setResidance(true)
                    setNoResidance(false)
                    setHasCurp(false)
                    setNoCurp(false)
                  }}
                />
                <p className="mt-2"></p>
                <OptionPill data={{
                  name: "No",
                  search: "",
                  disabled: false
                }} active={noResidance === true} onClick={() => {
                  setResidance(false)
                  setNoResidance(true)
                }}
                />
              </div>
            </div>
            <div className="w-p:hidden">
              <Image classNamesImg="w-full h-full object-cover" classNames="w-28 h-28 rounded-full overflow-hidden" src="" alt="" />
            </div>
          </div>
          {
            residance && <>
              <div className="">
                <Input data={{
                  label: 'CURP',
                  name: 'curp',
                  type: 'text',
                  typeButton: 'classic',
                  maxlength: '18',
                  onPaste: true,
                  autocomplete: 'off',
                  alphanumeric: true,
                  pattern: '',
                }}
                  eventKeyPress={(e: CustomEvent) => handleKeyPress(e, "curp")}
                  eventFocus={() => handleTouchedControl("curp")}
                  errorMessage={configControls.errorMessagesStepOneOpenForm.name}
                  hasError={personalDataErrors.curp}
                />
              </div>
              <p className="font-texts text-surface-500 mb-3">¿No conoces tu CURP? Obtenlo desde <a className="text-primary-500" href="https://www.gob.mx/curp/" target="_blank">aquí</a></p>
            </>
          }
          {
            noResidance && <>
              <div className="flex flex-col gap-6">
                <p className="font-texts text-4 font-bold">
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
                  label: 'CURP',
                  name: 'curp',
                  type: 'text',
                  typeButton: 'classic',
                  maxlength: '18',
                  onPaste: true,
                  alphanumeric: true,
                  pattern: '',
                }}
                  eventKeyPress={(e: CustomEvent) => handleKeyPress(e, "curp")}
                  eventFocus={() => handleTouchedControl("curp")}
                  errorMessage={configControls.errorMessagesStepOneOpenForm.name}
                  hasError={personalDataErrors.curp}
                />
              </div>
              <p className="font-texts text-surface-500 mb-3">¿No conoces tu CURP? Obtenlo desde <a className="text-primary-500" href="https://www.gob.mx/curp/" target="_blank">aquí</a></p></>
          }
          {
            noCurp && <>
              <div className="grid grid-cols-2 gap-x-6 gap-y-3">
                <div className="col-span-2">
                  <Input data={{
                    label: 'Nombre(s)',
                    name: 'name',
                    type: 'text',
                    typeButton: 'classic',
                    maxlength: '',
                    onPaste: true,
                    alphabetical: true,
                    pattern: '',
                  }}
                    eventKeyPress={(e: CustomEvent) => handleKeyPress(e, "name")}
                    eventFocus={() => handleTouchedControl("name")}
                    errorMessage={configControls.errorMessagesStepOneOpenForm.name}
                    hasError={personalDataErrors.name}
                  />
                </div>
                <div className="">
                  <Input data={{
                    label: 'Apellido paterno',
                    name: 'last_name',
                    type: 'text',
                    typeButton: 'classic',
                    maxlength: '',
                    onPaste: true,
                    alphabetical: true,
                    pattern: '',
                  }}
                    eventKeyPress={(e: CustomEvent) => handleKeyPress(e, "last_name")}
                    eventFocus={() => handleTouchedControl("last_name")}
                    errorMessage={configControls.errorMessagesStepOneOpenForm.name}
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
                  }}
                    eventKeyPress={(e: CustomEvent) => handleKeyPress(e, "second_last_name")}
                    eventFocus={() => handleTouchedControl("second_last_name")}
                    errorMessage={configControls.errorMessagesStepOneOpenForm.name}
                    hasError={personalDataErrors.second_last_name}
                  />
                </div>

                <div className="">
                  <Input data={{
                    label: 'Correo electrónico',
                    name: 'email',
                    type: 'text',
                    typeButton: 'classic',
                    maxlength: '',
                    onPaste: true,
                    alphanumeric: false,
                    pattern: '',
                  }}
                    eventKeyPress={(e: CustomEvent) => handleKeyPress(e, "email")}
                    eventFocus={() => handleTouchedControl("email")}
                    errorMessage={configControls.errorMessagesStepOneOpenForm.name}
                    hasError={personalDataErrors.email}
                  />
                </div>
                <div className="">
                  <Input data={{
                    label: 'Celular',
                    name: 'phone',
                    type: 'text',
                    typeButton: 'classic',
                    maxlength: '10',
                    onPaste: true,
                    onlyNumbers: true,
                    pattern: '',
                  }}
                    eventKeyPress={(e: CustomEvent) => handleKeyPress(e, "phone")}
                    eventFocus={() => handleTouchedControl("phone")}
                    errorMessage={configControls.errorMessagesStepOneOpenForm.name}
                    hasError={personalDataErrors.phone}
                  />
                </div>
                <div className="col-span-2">
                  <Input data={{
                    label: '',
                    name: 'birthdate',
                    type: 'date',
                    typeButton: 'classic',
                    maxlength: '',
                    onPaste: true,
                    alphabetical: true,
                    pattern: '',
                  }}
                    eventKeyPress={(e: CustomEvent) => handleKeyPress(e, "birthdate")}
                    eventFocus={() => handleTouchedControl("birthdate")}
                    errorMessage={configControls.errorMessagesStepOneOpenForm.name}
                    hasError={personalDataErrors.birthdate}
                  />
                </div>
                <div className="">
                  <Input data={{
                    label: 'Lugar de nacimiento',
                    name: 'birth_entity',
                    type: 'text',
                    typeButton: 'classic',
                    maxlength: '',
                    onPaste: true,
                    alphabetical: true,
                    pattern: '',
                  }}
                    eventKeyPress={(e: CustomEvent) => handleKeyPress(e, "birth_entity")}
                    eventFocus={() => handleTouchedControl("birth_entity")}
                    errorMessage={configControls.errorMessagesStepOneOpenForm.name}
                    hasError={personalDataErrors.birth_entity}
                  />
                </div>
                <div className="">
                  <Input data={{
                    label: 'Género',
                    name: 'gender',
                    type: 'text',
                    typeButton: 'classic',
                    maxlength: '',
                    onPaste: true,
                    alphabetical: true,
                    pattern: '',
                  }}
                    eventKeyPress={(e: CustomEvent) => handleKeyPress(e, "gender")}
                    eventFocus={() => handleTouchedControl("gender")}
                    errorMessage={configControls.errorMessagesStepOneOpenForm.name}
                    hasError={personalDataErrors.gender}
                  />
                </div>
                {/* <div className="hidden">
                <Input data={{
                  label: 'Estado civil',
                  name: 'civil_status',
                  type: 'text',
                  typeButton: 'classic',
                  maxlength: '',
                  onPaste: true,
                  alphabetical: true,
                  pattern: '',
                }}
                  eventKeyPress={(e: CustomEvent) => handleKeyPress(e, "civil_status")}
                  eventFocus={() => handleTouchedControl("civil_status")}
                  errorMessage={configControls.errorMessagesStepOneOpenForm.name} 
                  hasError={personalDataErrors.civil_status}
                />
              </div> */}
                <div className="hidden">
                  <Input data={{
                    label: 'Residencia',
                    name: 'residence',
                    type: 'text',
                    typeButton: 'classic',
                    maxlength: '',
                    onPaste: true,
                    alphabetical: true,
                    pattern: '',
                  }}
                    eventKeyPress={(e: CustomEvent) => handleKeyPress(e, "residence")}
                    eventFocus={() => handleTouchedControl("residence")}
                    errorMessage={configControls.errorMessagesStepOneOpenForm.name}
                    hasError={personalDataErrors.residence}
                  />
                </div>
                <div className="flex items-center">
                  <Checkbox data={{
                    name: "adviser",
                    disabled: false,
                    label: "",
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
                      label: 'Nombre del asesor',
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
                    }} />
                  </div>
                }
              </div>
            </>
          }
          <div className="flex flex-col mb-6 mt-2">
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
          <div className="flex">
            <p className="text-3.5 leading-5 text-surface-800 font-texts font-normal mr-1">Al llenar tus datos aceptas nuestro</p>
            <Link href="#" passHref target={"_blank"}>
              <p className="text-3.5 font-texts font-normal text-sm text-surface-800 underline">Aviso de Privacidad</p>
            </Link>
          </div>
        </div>
        <div>
          <div className="border border-surface-300 rounded-lg p-4">
            <h3 className="font-texts font-bold text-5.5 leading-6">Diplomado en Análisis de Datos</h3>
            <p className="text-white bg-primary-500 w-23 px-2 py-1 rounded-full text-center my-3">En línea</p>
            <hr className="text-surface-300" />
            <div className="flex justify-between mt-2">
              <p>Opción de pago:</p>
              <p className="text-surface-500">3 parcialidades</p>
            </div>
            <div className="flex justify-between my-1">
              <p>Parcialidades:</p>
              <p className="text-surface-500">$1,523.00 MXN</p>
            </div>
            <div className="flex justify-between mb-2">
              <p>Costo total:</p>
              <p className="text-surface-500">$4,569.00 MXN</p>
            </div>
            <hr className="text-surface-300" />
            <div className="flex justify-between mt-2">
              <p className="font-texts font-bold text-base leading-6">Parcialidad a pagar:</p>
              <p className="text-base font-bold">$1,523.00 MXN</p>
            </div>
          </div>
        </div>
      </div>
    </Container>
  )
};

export { InscriptionForm };