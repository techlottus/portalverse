import React, { FC, createContext, useContext, useEffect, useState } from "react"
import configControls from "@/forms/fixtures/controls"
import * as Select from "@/components/lottus-education/Select"
import * as Field from "@/components/lottus-education/Field"
import cn from "classnames"

/**
 * Contexto para manejar los datos personales.
 * Proporciona acceso a las funciones y estados relacionados con los datos personales en un formulario.
 */

const AcademicDataContext = createContext<any>(null);

/**
 * Hook personalizado para acceder al contexto de datos academicos.
 * Lanza un error si el componente no está envuelto dentro de `<AcademicData.Root>`.
 * 
 * @throws {Error} Si se usa fuera de `<AcademicData.Root>`.
 */

const useAcademicDataContext = () => {
  const context = useContext(AcademicDataContext);
  if (context === undefined) {
    throw new Error(
      'This component must be used within a <AcademicData.Root> component'
    );
  }
  return context;
};

/** *********************************** Types *********************************
 *  Propiedades del componente `<AcademicData.Root>`.
 */
interface AcademicDataProps {
  infoControlsTouched: Record<string, boolean>;
  setInfoControlsTouched: React.Dispatch<React.SetStateAction<any>>;
  errorControls: Record<string, boolean>;
  setErrorControls: React.Dispatch<React.SetStateAction<any>>;
  validateControl: (control: string, value: any, touched: boolean) => boolean;
  academicData: Record<string, any>;
  setAcademicData: React.Dispatch<React.SetStateAction<any>>;
  modalities: Array<{ value: string; text: string; active?: boolean }>;
  levels: Array<{ value: string; text: string; active?: boolean }>;
  campuses: Array<{ value: string; text: string; active?: boolean }>;
  children?: React.ReactNode;
}

/**
 * Componente principal que proporciona el contexto de datos academicos.
 * 
 * @param {AcademicDataProps} props Propiedades del componente.
 * @returns {JSX.Element} Proveedor del contexto con los elementos hijos.
 */

const Root: FC<AcademicDataProps> = ({
  infoControlsTouched,
  setInfoControlsTouched,
  errorControls,
  setErrorControls,
  validateControl,
  academicData,
  setAcademicData,
  modalities,
  levels,
  campuses,
  children
}: AcademicDataProps) => {

  const [options, setOptions] = useState({
    modality: modalities,
    level:levels,
    campus:campuses,
  });

  useEffect(() => {
    setOptions({...{modality:modalities, level:levels ,campus:campuses}});
  }, [modalities, levels, campuses]);

  const handleSelect = (value: string, control: string) => {
    setOptions((prev: any) => ({
      ...prev,
      [control]: prev[control]?.map((option: any) => ({
        ...option,
        active: option.value === value,
      })),
    }));

    if (value !== academicData[control]) {
      setAcademicData({ ...academicData, [control]: value });
    }
  };

  const handleTouchedControl = (control: string) => {
    setInfoControlsTouched({ ...infoControlsTouched, [control]: true });
    const isValid = validateControl(control, academicData[control], true);
    setErrorControls({
      ...errorControls,
      [control]: !isValid && infoControlsTouched[control],
    });
  };
  const contextValue = {
    academicData,
    setAcademicData,
    infoControlsTouched,
    setInfoControlsTouched,
    errorControls,
    setErrorControls,
    validateControl,
    handleSelect,
    handleTouchedControl,
    options,
    modalities,
    levels,
    campuses
  };
  return (

    <AcademicDataContext.Provider value={contextValue}>
      {children}
    </AcademicDataContext.Provider>
  )

}
Root.displayName = 'AcademicData';


/**
 * Componente para opciones de datos academicos en forma de selects .
 * 
 * recibe control: ( "modality" | "level" | "campus"), placeholder: " ", isDisabled (boolean opcional)
 * @returns {JSX.Element} Input configurado para el nombre.
 */

const Item = React.forwardRef(({ control, placeholder, isDisabled = false }: { control: "modality" | "level" | "campus", placeholder: string, isDisabled?: boolean }, ref) => {
  const { academicData,
    errorControls,
    validateControl,
    handleSelect,
    handleTouchedControl,
    options,
    modalities } = useAcademicDataContext();
  return <Field.Root hasError={errorControls[control]}>
    {
      modalities?.length > 0 &&
      <div className={cn("flex flex-col mt-3", { 'hidden': options.modalities?.length > 0 && options.modalities?.length < 2 })}>
        <Select.Root 
          disabled = {isDisabled}
          onValueChange={(value: string) => handleSelect(value, control)}
          value={academicData[control]}>
          <Select.Trigger
            value={academicData[control]}
            hasError={errorControls[control]}
            isValid={validateControl(control, academicData[control], true)}>
            <Select.Value placeholder={placeholder} />
          </Select.Trigger>
          <Select.Content>
            {options[control]?.map((opt: any, i: number) => (
              <Select.Item
                onClick={() => handleTouchedControl(control)}
                key={i}
                value={opt?.value} >
                {opt?.text}
              </Select.Item>
            ))
            }
          </Select.Content>
        </Select.Root>
         {errorControls[control] && <Field.Helper className="mt-2">{configControls.errorMessagesStepTwoOpenForm[control]}</Field.Helper>}
      </div> }
      </Field.Root>
})

Item.displayName = "AcademicDataItem"

export { Root, Item }