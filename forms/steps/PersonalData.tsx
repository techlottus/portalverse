import React, { Children, FC, useEffect, useState, createContext, useContext } from "react"

import Input from "@/components/lottus-education/Input"
import configControls from "@/forms/fixtures/controls"

const PersonalDataContext = createContext<any>(null); 

const Root: FC<any> = ({
  personalData,
  setPersonalData,
  infoControlsTouched,
  setInfoControlsTouched,
  errorControls,
  setErrorControls,
  validateControl,
  compact,
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
    compact,
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

const Name: FC<any> = React.forwardRef<any>(({className=""}:{className?:string},ref) => {
  const { handleKeyPress, handleTouchedControl, personalData, errorControls } = useContext(PersonalDataContext);
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

const SurName: FC<any> = React.forwardRef<any>(({className=""}:{className?:string},ref) => {
  const { handleKeyPress, handleTouchedControl, personalData, errorControls } = useContext(PersonalDataContext);
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

const Phone: FC<any> = React.forwardRef<any>(({className=""}:{className?:string},ref) => {
  const { handleKeyPress, handleTouchedControl, personalData, errorControls } = useContext(PersonalDataContext);
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

const Email: FC<any> = React.forwardRef<any>(({className=""}:{className?:string},ref) => {
  const { handleKeyPress, handleTouchedControl, personalData, errorControls } = useContext(PersonalDataContext);
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