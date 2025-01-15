import React, { FC, createContext, useContext, useState } from "react"
import Input from "@/components/lottus-education/Input"
import configControls from "@/forms/fixtures/controls"
import * as Field from "@/components/lottus-education/Field"
import PersonalData from "../steps/PersonalDataTemplate";
import { error } from "console";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import * as Select from '@/components/lottus-education/Select';
import cn from "classnames"

/**
 * Contexto para manejar los datos personales.
 * Proporciona acceso a las funciones y estados relacionados con los datos personales en un formulario.
 */

const PersonalDataContext = createContext<any>(null);

/**
 * Hook personalizado para acceder al contexto de datos personales.
 * Lanza un error si el componente no está envuelto dentro de `<PersonalData.Root>`.
 * 
 * @throws {Error} Si se usa fuera de `<PersonalData.Root>`.
 */

const usePersonalDataContext = () => {
  const context = useContext(PersonalDataContext);
  if (context === undefined) {
    throw new Error(
      'This component must be used within a <PersonalData.Root> component'
    );
  }
  return context;
};

/** *********************************** Types *********************************
 *  Propiedades del componente `<PersonalData.Root>`.
 */
type PersonalDataState = {
  name: string;
  last_name: string;
  second_last_name?: string;
  birthdate?: string;
  gender?: string;
  phone: string;
  email: string;
};
type ValidationState = {
  [key: string]: boolean;
};
interface PersonaDataTypes {
  personalData: PersonalDataState;
  setPersonalData: React.Dispatch<React.SetStateAction<PersonalDataState>>;
  infoControlsTouched: ValidationState;
  setInfoControlsTouched: React.Dispatch<React.SetStateAction<ValidationState>>;
  errorControls: ValidationState;
  setErrorControls: React.Dispatch<React.SetStateAction<ValidationState>>;
  validateControl: (control: string, value: string) => boolean;
  children?: React.ReactNode;
}

/**
 * Componente principal que proporciona el contexto de datos personales.
 * 
 * @param {PersonalDataProps} props Propiedades del componente.
 * @returns {JSX.Element} Proveedor del contexto con los elementos hijos.
 */

const Root: FC<any> = ({
  personalData,
  setPersonalData,
  infoControlsTouched,
  setInfoControlsTouched,
  errorControls,
  setErrorControls,
  validateControl,
  children
}: PersonaDataTypes) => {

  const handleKeyPress = (value: any, control: string) => {
    setInfoControlsTouched({ ...infoControlsTouched, [control]: true });
    setPersonalData({ ...personalData, [control]: value });
    setErrorControls({ ...errorControls, [control]: !validateControl(control, value) });
    setPersonalDataValid({ ...personalDataValid, [control]: validateControl(control, value) && infoControlsTouched[control] });
  };

  const handleTouchedControl = (control: string, value: string) => {
    setInfoControlsTouched({ ...infoControlsTouched, [control]: true });
    setErrorControls({ ...errorControls, [control]: !validateControl(control, value) && infoControlsTouched[control] });
    setPersonalDataValid({ ...personalDataValid, [control]: validateControl(control, value) && infoControlsTouched[control] });
  }

  const [personalDataValid, setPersonalDataValid] = useState({
    name: false,
    last_name: false,
    second_last_name: false,
    birthdate: false,
    gender: false,
    phone: false,
    email: false,
  })


  const contextValue = {
    personalData,
    setPersonalData,
    infoControlsTouched,
    setInfoControlsTouched,
    errorControls,
    setErrorControls,
    validateControl,
    handleKeyPress,
    handleTouchedControl,
    personalDataValid,
    setPersonalDataValid
  };

  return (

    <PersonalDataContext.Provider value={contextValue}>
      {children}
    </PersonalDataContext.Provider>
  )

}
Root.displayName = 'PersonalData';

/**
 * Componente para el campo de nombre.
 * 
 * @param {string} className Clases CSS adicionales para el componente.
 * @returns {JSX.Element} Input configurado para el nombre.
 */

const Name = React.forwardRef<any,{ className?: string, disabled?: boolean }>(({ className = "", disabled }: { className?: string, disabled?: boolean }, ref) => {
  const { handleKeyPress, handleTouchedControl, personalDataValid, errorControls, personalData } = usePersonalDataContext();
  return (
    <Field.Root hasError={errorControls.name}>
      <Input
        isValid={personalDataValid?.name}
        className={className}
        ref={ref}
        placeholder="Nombre(s)"
        disabled={disabled}
        name="name"
        id="name"
        value={personalData?.name}
        required
        errorMessage={configControls.errorMessagesStepOneOpenForm.name}
        hasError={errorControls.name}
        onFocus={(e: any) => handleTouchedControl("name", e.target.value)}
        onKeyUp={(e: any) => handleKeyPress(e.target.value, "name")}
        onChange={(e: any) => {
          handleKeyPress(e.target.value, "name")
          handleTouchedControl(e.target.value, "name")
        }}
        onBlur={(e: any) => handleKeyPress(e.target.value, "name")}
      />
      {errorControls.name && <Field.Helper>{configControls.errorMessagesStepOneOpenForm.name}</Field.Helper>}
    </Field.Root>
  )
})
Name.displayName = "PersonalDataName"

/**
 * Componente para el campo de apellidos.
 * Similar a Name, pero ajustado para apellidos.
 */

const SurName = React.forwardRef<any, { disabled?: boolean, className?: string,last_name_2?: boolean, placeholder?: string}>(({ className = "", last_name_2 = false, placeholder = "Apellidos", disabled }: { disabled?: boolean, className?: string, last_name_2?: boolean, placeholder?: string }, ref) => {
  const { handleKeyPress, handleTouchedControl, personalDataValid, errorControls, personalData } = usePersonalDataContext();
  const control = !last_name_2 ? "last_name" : "second_last_name"
  const name = !last_name_2 ? "surname" : "second_last_name"
  const errorControl = !last_name_2 ? errorControls.last_name : errorControls.second_last_name
  const errorMessage = !last_name_2 ? configControls.errorMessagesStepOneOpenForm.surname : "Ingrese su apellido materno"
  return (
    <Field.Root hasError={!last_name_2 ? errorControls.last_name : errorControls.second_last_name}>
      <Input
        isValid={!last_name_2 ? personalDataValid.last_name : personalDataValid.second_last_name}
        className={className}
        ref={ref}
        placeholder={placeholder}
        name={name}
        id={name}
        value={!last_name_2 ? personalData?.last_name : personalData?.second_last_name}
        required
        disabled={disabled}
        hasError={!last_name_2 ? errorControls.last_name : errorControls.second_last_name}
        onFocus={(e: any) => handleTouchedControl(control, e.target.value)}
        onKeyUp={(e: any) => handleKeyPress(e.target.value, control)}
        onChange={(e: any) => {
          handleKeyPress(e.target.value, control)
          handleTouchedControl(e.target.value, control)
        }}
        onBlur={(e: any) => {
          handleKeyPress(e.target.value, control)
          handleTouchedControl(e.target.value, control)
        }}
      />
      {errorControl && <Field.Helper>{errorMessage}</Field.Helper>}
    </Field.Root>
  )
})
SurName.displayName = "PersonalDataSurname"

/**
 * Componente para el campo de Fecha de nacimiento.
 */
const Birthdate = React.forwardRef<any,{ disabled?: boolean, className?: string }>(({ className = "", disabled }: { disabled?: boolean, className?: string }, ref) => {
  const { handleKeyPress, handleTouchedControl, personalDataValid, errorControls, personalData } = usePersonalDataContext();

  return (
    <Field.Root hasError={errorControls.birthdate}>
      <DatePicker
        className={cn("w-full pl-3 pr-13 py-3 rounded border overflow-hidden border-surface-400 outline-none bg-surface-50 transition-colors h-10 placeholder:text-surface-500 text-surface-500 placeholder:font-texts font-texts font-normal", {
          "border-error-500": errorControls.birthdate,
          "text-surface-100 border-surface-100": disabled,
        })}
        selected={personalData.birthdate}
        onChange={(date) => handleKeyPress(date, "birthdate")}
        onFocus={() => handleTouchedControl("birthdate")}
        placeholderText="Fecha de Nacimiento*"
        dateFormat={'dd/MM/yy'}
        disabled={disabled}
      />
      {errorControls.birthdate && <Field.Helper>Seleccione una fecha de nacimiento</Field.Helper>}
    </Field.Root>
  )
})
Birthdate.displayName = "PersonalDataBirthdate"

/**
 * Componente para el campo de teléfono.
 * Incluye un límite de caracteres (10 dígitos).
 */

const Gender = React.forwardRef<any, { className?: string, disabled?:boolean }>(({ className = "", disabled }: { className?: string, disabled?:boolean }, ref) => {
  const { handleKeyPress, handleTouchedControl, personalDataValid, errorControls, personalData , setPersonalData} = usePersonalDataContext();

  return (
    <Field.Root hasError={errorControls.phone}>
      <Select.Root value={personalData?.gender} disabled={disabled} onValueChange={(value) => handleKeyPress(value,"gender")}>
        <Select.Trigger  value={personalData?.gender} hasError={errorControls["gender"]}
          isValid={!!personalData.gender?.trim()}>
          <Select.Value placeholder="Género" />
        </Select.Trigger>
        <Select.Content>
          <Select.Item onSelect={(value) => handleKeyPress(value,"gender")} value="HOMBRE" >Masculino</Select.Item>
          <Select.Item onSelect={(value) => handleKeyPress(value,"gender")} value="MUJER" >Femenino</Select.Item>
          <Select.Item onSelect={(value) => handleKeyPress(value,"gender")} value="other" >Otro</Select.Item>
        </Select.Content>
      </Select.Root>
      {errorControls.gender && <Field.Helper>Selecciona un género</Field.Helper>}
    </Field.Root>

  )
})
Gender.displayName = "PersonalDataGender"
/**
 * Componente para el campo de teléfono.
 * Incluye un límite de caracteres (10 dígitos).
 */

const Phone = React.forwardRef<any>(({ className = "" }: { className?: string }, ref) => {
  const { handleKeyPress, handleTouchedControl, personalDataValid, errorControls, personalData } = usePersonalDataContext();
  const [phone, setPhone] = useState("")
  const handleInputChange = (e: any) => {
    // Remover caracteres no numéricos
    let value = e.target.value.replace(/[^0-9+]/g, '');
    if (value.startsWith('+')) {
      value = value.slice(3);
    }
    value = value.replace(/\D/g, '').slice(0, 10);
    setPhone(value);
  };
  return (
    <Field.Root hasError={errorControls.phone}>
      <Input
        isValid={personalDataValid.phone}
        className={className}
        ref={ref}
        placeholder="Celular"
        value={phone}
        name="phone"
        id="phone"
        required
        maxLength={13}
        errorMessage={configControls.errorMessagesStepOneOpenForm.phone}
        hasError={errorControls.phone}
        onFocus={() => handleTouchedControl("phone", phone)}
        onKeyUp={() => handleKeyPress(phone, "phone")}
        onChange={(e: any) => {
          handleInputChange(e)
          handleKeyPress(phone, "phone")
        }}
        onBlur={(e: any) => handleKeyPress(phone, "phone")}
      />
      {errorControls.phone && <Field.Helper>{configControls.errorMessagesStepOneOpenForm.phone}</Field.Helper>}
    </Field.Root>

  )
})
Phone.displayName = "PersonalDataPhone"

/**
 * Componente para el campo de correo electrónico.
 */

const Email = React.forwardRef<any>(({ className = "" }: { className?: string }, ref) => {
  const { handleKeyPress, handleTouchedControl, errorControls, personalDataValid } = usePersonalDataContext();
  return (
    <Field.Root hasError={errorControls.email}>
      <Input
        isValid={personalDataValid.email}
        className={className}
        ref={ref}
        placeholder="Correo Electrónico"
        name="mail"
        id="mail"
        required
        errorMessage={configControls.errorMessagesStepOneOpenForm.email}
        hasError={errorControls.email}
        onFocus={(e: any) => handleTouchedControl("email", e.target.value)}
        onKeyUp={(e: any) => handleKeyPress(e.target.value, "email")}
        onChange={(e: any) => {
          handleKeyPress(e.target.value, "email")
          handleTouchedControl(e.target.value, "email")
        }}
        onBlur={(e: any) => {
          handleKeyPress(e.target.value, "email")
          handleTouchedControl(e.target.value, "email")
        }} />
      {errorControls.email && <Field.Helper>{configControls.errorMessagesStepOneOpenForm.email}</Field.Helper>}
    </Field.Root>

  )
})
Email.displayName = "PersonalDataEmail"

export { Root, PersonalDataContext, Name, SurName, Phone, Email, Birthdate, Gender }