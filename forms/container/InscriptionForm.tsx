import React, { useState } from "react";
import Input from "@/old-components/Input/Input"
import Link from "next/link";
import Image from "@/old-components/Image"
import Container from "@/layouts/Container.layout";
import OptionPill from "@/old-components/OptionPill";
import Button from "@/old-components/Button/Button";
import Checkbox from "@/old-components/Checkbox";

type InscriptionFormData = {

}

const InscriptionForm = (props: InscriptionFormData) => {

  const [residance, setResidance] = useState<boolean>()
  const [noResidance, setNoResidance] = useState<boolean>()
  const [hasCurp, setHasCurp] = useState<boolean>()
  const [noCurp, setNoCurp] = useState<boolean>()
  const [adviser, setAdviser] = useState<boolean>()

  return (

    <Container>
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
                name: 'name',
                type: 'text',
                typeButton: 'classic',
                maxlength: '18',
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
                name: 'name',
                type: 'text',
                typeButton: 'classic',
                maxlength: '18',
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
              <div className="">
                <Input data={{
                  label: 'Apellido paterno',
                  name: 'last_name',
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
              <div className="">
                <Input data={{
                  label: 'Apellido materno',
                  name: 'second_last_name',
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

              <div className="">
                <Input data={{
                  label: 'Correo electrónico',
                  name: 'email',
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
              <div className="">
                <Input data={{
                  label: 'Celular',
                  name: 'phone',
                  type: 'text',
                  typeButton: 'classic',
                  maxlength: '10',
                  onPaste: true,
                  placeholder: '',
                  autocomplete: 'off',
                  disabled: false,
                  alphanumeric: false,
                  alphabetical: false,
                  onlyNumbers: true,
                  upperCase: false,
                  pattern: '',
                }} />
              </div>
              <div className="col-span-2">
                <Input data={{
                  label: '',
                  name: '',
                  type: 'date',
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
              <div className="">
                <Input data={{
                  label: 'Lugar de nacimiento',
                  name: 'birth_entity',
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
              <div className="">
                <Input data={{
                  label: 'Género',
                  name: 'gender',
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
              <div className="hidden">
                <Input data={{
                  label: 'Estado civil',
                  name: 'civil_status',
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
              <div className="hidden">
                <Input data={{
                  label: 'Residencia',
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
    </Container>
  )
};

export { InscriptionForm };