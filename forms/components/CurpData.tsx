import React, { useEffect, useState } from 'react'
import * as Field from "@/components/lottus-education/Field";
import Input from "@/components/lottus-education/Input"
import cn from "classnames"

type CurpDataType = {
  personalData: any;
  setPersonalData: any;
  personalDataTouched: any;
  setPersonalDataTouched:any;
  curp: any;
  setCurp: any;
  isValidCurp: any;
  setIsValidCurp: any;
  curpError: any;
  setCurpError: any;
}


const CurpData = (props: CurpDataType) => {
  const {
    personalData,
    setPersonalData,
    personalDataTouched,
    setPersonalDataTouched,
    curp,
    setCurp,
    isValidCurp,
    setIsValidCurp,
    curpError,
    setCurpError
  } = props

  const [isLoading, setIsLoading] = useState(false);
  const [isValid, setIsValid] = useState(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [curpTouched, setCurpTouched] = useState<boolean>(false)
  const [curpErrorMesage, setcurpErrorMesage] = useState<string>("")

  const patternCurp = /^([A-Z][AEIOUX][A-Z]{2}\d{2}(?:0[1-9]|1[0-2])(?:0[1-9]|[12]\d|3[01])[HM](?:AS|B[CS]|C[CLMSH]|D[FG]|G[TR]|HG|JC|M[CNS]|N[ETL]|OC|PL|Q[TR]|S[PLR]|T[CSL]|VZ|YN|ZS)[B-DF-HJ-NP-TV-Z]{3}[A-Z\d])(\d)$/;

  const validateCurpControl = () => {
    return !!curp?.match(patternCurp)
  };

  useEffect(() => {
    if (!isValidCurp) {
      setcurpErrorMesage("No fue posible validar los datos. Continua manualmente.")
      resetPersonalData()
    }
  }, [isValidCurp])



  const validateCurp = async () => {
    const curpValid = validateCurpControl();
    const errorMessage = curpValid ? "" : "Ingresa un curp válido";

    setCurpError(!curpValid);
    setcurpErrorMesage(errorMessage);

    if (!curpValid) {
      resetPersonalData();
      setIsLoading(false);
      return;
    }

    setIsLoading(true);

    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 20000); // Timeout de 20 segundos

      const response = await fetch(`${process.env.NEXT_PUBLIC_PAYMENT_WEBHOOK}/curp/validate`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ curp }),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      const {
        errorMessage: apiErrorMessage,
        curp: apiCurp,
        fechaNacimiento,
        nombre,
        apellidoPaterno,
        apellidoMaterno,
        sexo,
      } = data;

      if (apiErrorMessage || !apiCurp) {
        handleValidationError("No fue posible validar los datos. Continua manualmente.");
        return;
      }

      const birthdate = parseBirthdate(fechaNacimiento);
      setPersonalData({
        ...personalData,
        curp: curp,
        name: nombre,
        last_name: apellidoPaterno ,
        second_last_name: apellidoMaterno ,
        birthdate,
        gender: sexo,
      });
      setPersonalDataTouched({...personalDataTouched,
        name: true,
        last_name: true,
        secons_last_name:true,
        birthdate:true,
        gender: true,
      })

      setIsSuccess(true);
      setIsValidCurp(true);
    } catch (err) {
      console.error("Error en el curp: ", err);
      handleValidationError("No fue posible validar los datos. Continua manualmente.");
    } finally {
      setIsLoading(false);
    }

  };

  const resetPersonalData = () => {
    setPersonalData({
      name: "",
      last_name: "",
      second_last_name: "",
      email: "",
      phone: "",
      birthdate: "",
      gender: "",
      residence: "",
      adviser: "",
    });
  };

  const handleValidationError = (message: string) => {
    setCurpError(true);
    setcurpErrorMesage(message);
    setIsSuccess(false);
    resetPersonalData();
  };

  const parseBirthdate = (fechaNacimiento: string) => {
    const [day, month, year] = fechaNacimiento.split("/");
    return new Date(`${year}-${month}-${day}T00:00:00-06:00`);
  };

  const handleChangeCurp = (e: any) => {
    const value = e.target.value.toUpperCase();
    const regex = /^[A-Z0-9]*$/;
    if (regex.test(value) && value.length <= 18) {
      setCurp(value);
    }
  }

  const handleValidateCurp = () => {
    setIsLoading(true)
    validateCurp()
  }

  const ButtonLoading = () => (
    <button className="cursor-pointer py-2 px-4 rounded bg-info-50 align-middle justify-center h-10 w-20 flex ">
      <span className="material-symbols-outlined animate-spin text-info-300 text-2xl align-middle">progress_activity</span>
    </button>
  )

  const ButtonRefresh = () => (
    <button className="cursor-pointer py-2 px-4 h-10 flex justify-center w-20 rounded bg-primary-500 active:bg-primary-600 active:border-primary-600 align-middle" onClick={() => {
      handleValidateCurp()
    }}><span className="material-symbols-outlined text-surface-100 text-2xl align-middle">refresh</span></button>
  )

  const ButtonCheck = () => (
    <button className="cursor-pointer py-2 px-3 h-10 w-20 rounded bg-success-0 align-middle">
      <span className="material-symbols-outlined text-success-500 text-2xl align-middle">check</span>
    </button>
  )

  const ButtonValidate = () => (
    <>
      <button className={cn("cursor-pointer py-3 px-4 h-10 w-20 rounded bg-primary-400 align-middle mobile:hidden font-texts text-surface-100 flex font-bold text-sm",
        {
          ['bg-primary-300']: !curpTouched,
          ['bg-primary-500']: curpTouched,
        }
      )}
        onClick={() => {
          handleValidateCurp()
        }}>
        Validar
      </button>
      <button disabled={isSuccess} className={cn('desktop:hidden tablet:hidden rounded py-2 px-3 h-10', {
        ['bg-primary-300']: !curpTouched,
        ['bg-primary-500']: curpTouched,
      })}
        onClick={() => {
          handleValidateCurp()
        }}
      ><span className="material-symbols-outlined text-surface-0 text-2xl align-middle ">arrow_forward</span></button>
    </>)

  return (
    <div className='flex gap-3 w-full'>
      <Field.Root hasError={curpError} className='w-full'>
      <Input
        isValid={isValidCurp}
        value={curp}
        placeholder='CURP'
        name='curp'
        type='text'
        maxLength={18}
        autoCapitalize="on"
        autoComplete='on'
        required={true}
        style={{ textTransform: "uppercase" }}
        onKeyUp={(e: any) => {
          setCurpTouched(true);
          handleChangeCurp(e)
        }}
        onChange={(e: any) => {
          setCurpTouched(true);
          handleChangeCurp(e)
        }}

        errorMessage={curpErrorMesage}
        onFocus={() => setCurpTouched(true)}
        hasError={curpError}
      />
    </Field.Root>
    {
      isLoading && !isSuccess ? <ButtonLoading/>
     :
      curpError && !isLoading && !isSuccess ? <ButtonRefresh/>
   :
      isSuccess ? <ButtonCheck/>
      : <ButtonValidate/>
    }

    </div>
    
  )
}

export default CurpData;
