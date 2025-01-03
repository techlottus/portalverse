import React, {  FC, createContext, useContext, useState } from "react"
import Input from "@/components/lottus-education/Input"
import configControls from "@/forms/fixtures/controls"
import * as Field from "@/components/lottus-education/Field"

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
    phone: string;
    email: string;
  };
type ValidationState = {
    [key: string]: boolean;
  };
interface PersonaDataTypes {
  personalData : PersonalDataState;
  setPersonalData : React.Dispatch<React.SetStateAction<PersonalDataState>>;
  infoControlsTouched : ValidationState;
  setInfoControlsTouched : React.Dispatch<React.SetStateAction<ValidationState>>;
  errorControls : ValidationState;
  setErrorControls : React.Dispatch<React.SetStateAction<ValidationState>>;
  validateControl : (control: string, value: string)=> boolean;
  children ?: React.ReactNode;
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

  const handleTouchedControl = (control: string, value:string) => {
    setInfoControlsTouched({ ...infoControlsTouched, [control]: true });
    setErrorControls({ ...errorControls, [control]: !validateControl(control, value) && infoControlsTouched[control] });
    setPersonalDataValid({ ...personalDataValid, [control]: validateControl(control, value) && infoControlsTouched[control] });
  }

  const [personalDataValid, setPersonalDataValid] = useState({
    name: false,
    last_name: false,
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

const Name = React.forwardRef<any>(({className=""}:{className?:string},ref) => {
  const { handleKeyPress, handleTouchedControl, personalDataValid, errorControls } = usePersonalDataContext();

  return (
    <Field.Root hasError={errorControls.name}>
  <Input
    isValid = {personalDataValid.name}
    className={className}
    ref = {ref}
    placeholder="Nombre(s)"
    name="name"
    id="name"
    required
    errorMessage={configControls.errorMessagesStepOneOpenForm.name}
    hasError={errorControls.name}
    onFocus={(e:any) => handleTouchedControl("name",e.target.value)}
    onKeyUp={(e: any) => handleKeyPress(e.target.value, "name")}
    onChange={(e: any) => {
      handleKeyPress(e.target.value, "name")
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

const SurName = React.forwardRef<any>(({className=""}:{className?:string},ref) => {
  const { handleKeyPress, handleTouchedControl, personalDataValid, errorControls } = usePersonalDataContext();
  return (
    <Field.Root hasError={errorControls.last_name}>
  <Input
    isValid = {personalDataValid.last_name}
    className={className}
    ref = {ref}
    placeholder="Apellidos"
    name="surname"
    id="surname"
    required
    errorMessage={configControls.errorMessagesStepOneOpenForm.surname}
    hasError={errorControls.last_name}
    onFocus={(e:any) => handleTouchedControl("last_name",e.target.value)}
    onKeyUp={(e: any) => handleKeyPress(e.target.value, "last_name")}
    onChange={(e: any) => handleKeyPress(e.target.value, "last_name")}
    onBlur={(e: any) => handleKeyPress(e.target.value, "last_name")}
     />
     {errorControls.last_name && <Field.Helper>{configControls.errorMessagesStepOneOpenForm.surname}</Field.Helper>}
</Field.Root>
)})
SurName.displayName = "PersonalDataSurname"

/**
 * Componente para el campo de teléfono.
 * Incluye un límite de caracteres (10 dígitos).
 */

const Phone = React.forwardRef<any>(({className=""}:{className?:string},ref) => {
  const { handleKeyPress, handleTouchedControl, personalDataValid, errorControls } = usePersonalDataContext();
  const [phone, setPhone] = useState("")
  const handleInputChange = (e:any) => {
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
    isValid = {personalDataValid.phone}
    className={className}
    ref = {ref}
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
    onChange={(e: any) =>{ 
      handleInputChange(e)
      handleKeyPress(phone, "phone")}} 
    onBlur={(e: any) => handleKeyPress(phone, "phone")} 
    />
    {errorControls.phone && <Field.Helper>{configControls.errorMessagesStepOneOpenForm.phone}</Field.Helper>}
  </Field.Root>
  
)})
Phone.displayName = "PersonalDataPhone"

/**
 * Componente para el campo de correo electrónico.
 */
 
const Email = React.forwardRef<any>(({className=""}:{className?:string},ref) => {
  const { handleKeyPress, handleTouchedControl, errorControls, personalDataValid } = usePersonalDataContext();
  return (
    <Field.Root hasError={errorControls.email}>
  <Input
    isValid = {personalDataValid.email}
    className={className}
    ref = {ref}
    placeholder="Correo Electrónico"
    name="mail"
    id="mail"
    required
    errorMessage={configControls.errorMessagesStepOneOpenForm.email}
    hasError={errorControls.email}
    onFocus={(e:any) => handleTouchedControl("email", e.target.value)}
    onKeyUp={(e: any) => handleKeyPress(e.target.value, "email")} 
    onChange={(e: any) => handleKeyPress(e.target.value, "email")}
    onBlur={(e: any) => handleKeyPress(e.target.value, "email")}/>
    {errorControls.email && <Field.Helper>{configControls.errorMessagesStepOneOpenForm.email}</Field.Helper>}
    </Field.Root>

)})
Email.displayName = "PersonalDataEmail"

export { Root, PersonalDataContext , Name, SurName, Phone, Email }