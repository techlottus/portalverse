import React, {  FC, createContext, useContext } from "react"
import Input from "@/components/lottus-education/Input"
import configControls from "@/forms/fixtures/controls"

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
 * TODO Propiedades del componente `<PersonalData.Root>`.
 */


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
}: any) => {

  const handleKeyPress = (e: any, control: string) => {
    const value = e.target.value;
    setInfoControlsTouched({ ...infoControlsTouched, [control]: true });
    setPersonalData({ ...personalData, [control]: value });
    setErrorControls({ ...errorControls, [control]: !validateControl(control, value, infoControlsTouched[control]) });
  };

  const handleTouchedControl = (control: string) => {
    setInfoControlsTouched({ ...infoControlsTouched, [control]: true });
    setErrorControls({ ...errorControls, [control]: !validateControl(control, personalData[control], true) && infoControlsTouched[control] });
  }

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
  const { handleKeyPress, handleTouchedControl, personalData, errorControls } = usePersonalDataContext();
  return (
  <Input
    className={className}
    ref = {ref}
    placeholder="Nombre(s)"
    icon="person"
    name="name"
    errorMessage={configControls.errorMessagesStepOneOpenForm.name}
    hasError={errorControls.name}
    onFocus={() => handleTouchedControl("name")}
    onKeyUp={(e: any) => handleKeyPress(e, "name")}
    onChange={(e: any) => handleKeyPress(e, "name")} />
  )
})
Name.displayName = "PersonalDataName"

/**
 * Componente para el campo de apellidos.
 * Similar a Name, pero ajustado para apellidos.
 */

const SurName = React.forwardRef<any>(({className=""}:{className?:string},ref) => {
  const { handleKeyPress, handleTouchedControl, personalData, errorControls } = usePersonalDataContext();
  return (
  <Input
    className={className}
    ref = {ref}
    placeholder="Apellidos"
    icon="person"
    name="surname"
    errorMessage={configControls.errorMessagesStepOneOpenForm.surname}
    hasError={errorControls.last_name}
    onFocus={() => handleTouchedControl("last_name")}
    onKeyUp={(e: any) => handleKeyPress(e, "last_name")} />

)})
SurName.displayName = "PersonalDataSurname"

/**
 * Componente para el campo de teléfono.
 * Incluye un límite de caracteres (10 dígitos).
 */

const Phone = React.forwardRef<any>(({className=""}:{className?:string},ref) => {
  const { handleKeyPress, handleTouchedControl, personalData, errorControls } = usePersonalDataContext();
  return (
  <Input
    className={className}
    ref = {ref}
    placeholder="Celular"
    icon="call"
    name="phone"
    maxLength={10}
    errorMessage={configControls.errorMessagesStepOneOpenForm.phone}
    hasError={errorControls.phone}
    onFocus={() => handleTouchedControl("phone")}
    onKeyUp={(e: any) => handleKeyPress(e, "phone")} />
)})
Phone.displayName = "PersonalDataPhone"

/**
 * Componente para el campo de correo electrónico.
 */
 
const Email = React.forwardRef<any>(({className=""}:{className?:string},ref) => {
  const { handleKeyPress, handleTouchedControl, personalData, errorControls } = usePersonalDataContext();
  return (
  <Input
    className={className}
    ref = {ref}
    placeholder="Correo Electrónico"
    icon="mail"
    name="mail"
    errorMessage={configControls.errorMessagesStepOneOpenForm.email}
    hasError={errorControls.email}
    onFocus={() => handleTouchedControl("email")}
    onKeyUp={(e: any) => handleKeyPress(e, "email")} />

)})
Email.displayName = "PersonalDataEmail"

export { Root, PersonalDataContext , Name, SurName, Phone, Email }