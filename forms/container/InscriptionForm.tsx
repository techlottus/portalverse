import React, { useState } from "react";
import Input from "@/old-components/Input/Input"
import Link from "next/link";
import Image from "@/old-components/Image"
import Container from "@/layouts/Container.layout";
import OptionPill from "@/old-components/OptionPill";
import Button from "@/old-components/Button/Button";

type InscriptionFormData = {

}

const InscriptionForm = (props: InscriptionFormData) => {

  const [residance, setResidance] = useState<boolean>()

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
                }}
              />
              <p className="mt-2"></p>
              <OptionPill data={{
                name: "No",
                search: "",
                disabled: false
              }} active={residance === false} onClick={() => {
                setResidance(false)
              }}
              />
            </div>
          </div>
          <div className="w-p:hidden">
            <Image classNamesImg="w-full h-full object-cover" classNames="w-28 h-28 rounded-full overflow-hidden" src="" alt="" />
          </div>
        </div>
        {
          residance
            ? <>
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
              <p className="font-texts text-surface-500">¿No conoces tu CURP? Obtenlo desde <a className="text-primary-500" href="https://www.gob.mx/curp/" target="_blank">aquí</a></p>
            </>
            : <>
              <div className="grid grid-cols-2 gap-x-6 gap-y-3">
                <div className="">
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
                    label: 'Teléfono',
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
                <div className="">
                  <Input data={{
                    label: 'Correo',
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
                <div className="">
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
                <div className="">
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
                <div className="">
                </div>
              </div>
            </>

        }
        <div className="flex flex-col mb-6">
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