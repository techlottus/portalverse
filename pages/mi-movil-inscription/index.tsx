import React, { useEffect, useState } from "react";
import ContentFullLayout from "@/layouts/ContentFull.layout"
import NextPageWithLayout from "@/types/Layout.types"
import cn from "classnames";
import Button from "@/old-components/Button/Button";
import { msalInstance } from "@/utils/authConfig";
import { useIsAuthenticated } from "@azure/msal-react";
import { useRouter } from "next/router";
import { MiMovilInscriptionForm } from "@/forms/container/MiMovilInscriptionForm";
import axios from "axios";
import { getTokenForms } from "@/utils/getTokenForms";
import Image from "next/image";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SignOutButton = () => {

  const handleLogout = (logoutType: any) => {
    if (logoutType === "popup") {
      msalInstance.logoutPopup({
        postLogoutRedirectUri: "/mi-movil-inscription",
        mainWindowRedirectUri: "/mi-movil-inscription",
      });
    } else if (logoutType === "redirect") {
      msalInstance.logoutRedirect({
        postLogoutRedirectUri: "/mi-movil-inscription",
      });
    }
  };

  return (
    <button className="bg-surface-900 text-surface-100 p-4 rounded-md font-texts" onClick={() => handleLogout("redirect")}>
      Cerrar sesión
    </button>
  );
};

  const getBusinessLineToFetchFrom = (businessLine: string, modality: string) => {
    switch(businessLine) {
      case "UANE": {
        switch(modality) {
          case "Presencial": return "UANE";
          case "Flex": return "ULA";
          case "Online": return "UANE,ULA";
          default: return "UANE"
        }
      }
      case "UTEG": {
        switch(modality) {
          case "Presencial": return "UTEG";
          case "Flex": return "ULA";
          case "Online": return "ULA";
          default: return "UTEG"
        }
      }
      case "ULA": {
        return "ULA"
      }
      case "UTC": {
        switch(modality) {
          case "Presencial": return "UTC";
          case "Semipresencial": return "UTC,ULA";
          case "Online": return "UTC";
          default: return "UTC"
        }
      }
      default: return ""
    }
  }

const MiMovilInscription: NextPageWithLayout<any> = (props: any) => {

  const [residence, setResidence] = useState<any>('')
  const [noResidence, setNoResidence] = useState<any>('')
  const [hasCurp, setHasCurp] = useState<any>(false)
  const [noCurp, setNoCurp] = useState<any>(true)
  const [isValid, setIsValid] = useState<boolean>(false);
  const [curp, setCurp] = useState<string>('');
  const [submit, setSubmit] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isValidCurp, setIsValidCurp] = useState(false);
  const [curpError, setCurpError] = useState(false);
  const [ program, setProgram ] = useState<any>(null);
  const [ programs, setPrograms ] = useState<any>([]);
  const [tokenActive, setTokenActive] = useState<string>("");


  
  const setStatus = ({ loading, valid, success }: { loading: boolean, valid: boolean, success: boolean }) => {
    setIsVisible(!loading && !error)
    setIsLoading(loading)
    setIsValid(valid)
    setIsSuccess(success)
  }
  const initialData = {
    name: "",
    last_name: "",
    second_last_name: "",
    email: "",
    phone: "",
    birthdate: "",
    gender: "",
    residence: ""
  }

  const [personalData, setPersonalData] = useState(initialData);

  const {
    isLoading: isLoadingToken,
    isError: isErrorToken,
    token,
  } = getTokenForms();


  const isAuthenticated = useIsAuthenticated();
  const router = useRouter()

  useEffect(() => {
    if (!isLoadingToken && !isErrorToken && !!Object.keys(token).length) {
      setTokenActive(`${token.token_type} ${token.access_token}`);
    }
  }, [isLoadingToken, isErrorToken, token]);

  useEffect(() => {
    if (!isAuthenticated) {
        router.push('/mi-movil-inscription/login')
    }
  }, [isAuthenticated])

  useEffect(() => {
    if (tokenActive) {
      handleFetchEducativeOffer('')
    }
  }, [tokenActive])

  const onSubmit = () => {
    const data = {
      ...personalData,
      curp,
      metadata: program
    }
    console.log('data final:',data);
    sendInscriptionData(data)
    
  }


  const handleFetchEducativeOffer = async (modality: string) => {
    setPrograms([]);
    const businessLineToFetchFrom = getBusinessLineToFetchFrom(process.env.NEXT_PUBLIC_BUSINESS_UNIT!, modality);

    setIsLoading(true);
    setError('');

    await axios.get(
      `${process.env.NEXT_PUBLIC_EDUCATIVE_OFFER_MANHATTAN!}`, {
        params: {
          linea: businessLineToFetchFrom,
          campus: 'UTC A TU RITMO'
        },
        headers: {
          'Authorization': tokenActive,
          'Content-Type': 'application/json;charset=UTF-8'
        }
      }
    )
      .then( (res: any) => {
        const { data: programs } = res;

        const periods = programs?.reduce((acc: any, program: any, index: number, arr: any[]) => {
          if (!acc.includes(program.nombrePeriodo)) {
            acc = [...acc, program.nombrePeriodo]
          }
          return acc
        }, [])
        const currentPeriod = periods?.sort((a: any,b: any) => Number(a.nombrePeriodo) - Number(b.nombrePeriodo))[periods.length - 1]

        const periodPrograms = programs?.filter((program: any) => {

          return program.nombrePeriodo === currentPeriod
        })
        

        if(!!periodPrograms && !!periodPrograms.length) {
          setPrograms([ ...periodPrograms ])
          setError('');
        }
        setIsLoading(false);
      })
      .catch( (err: any) => {
        console.log("err", err);
        setError(err)
        setIsLoading(false);
      })
  }

  const sendInscriptionData = async (data: any) => {
    const endpoint = process.env.NEXT_PUBLIC_MI_MOVIL_INSCRIPTION;

    setIsLoading(true);
    const body = {
      "nombre": data.name,
      "apellidoPaterno": data.last_name,
      "apellidoMaterno": data.second_last_name,
      "genero": data.gender,
      "fechaNacimiento": new Date(data.birthdate).toLocaleString('es-MX', { day: "2-digit", month: "2-digit", year: "numeric"}),
      "estadoCivil": "Soltero",
      "telefono": data.phone,
      "celular": data.phone,
      "email": data.email,
      "curp": data.curp,
      "nacionalidad": data.residence,

      "modalidad": data.metadata.modalidad,
      "nivel": data.metadata.nivel,
      "campus": data.metadata.idCampus,
      "programa": data.metadata.idPrograma,
      "lineaNegocio": data.metadata.lineaNegocio,
      "claveCargoBanner": 1007,

      "empresaConvenio": "MI MÓVIL"
    }
    // console.log('body: ', body);

    await axios.post(`${endpoint}`, body,{
      headers: {
        Authorization: tokenActive,
        'Content-Type': 'application/json;charset=UTF-8'
      }
    })
      .then((res: any) => {
        if(res?.data?.Exitoso !== "TRUE") {
          throw new Error(res.data.Error);
        }
        toast.success('¡Registro exitoso! 📬 La inscripción ha sido completada', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          progress: undefined,
          theme: "colored",
        });
        setPersonalData({
          name: "",
          last_name: "",
          second_last_name: "",
          email: "",
          phone: "",
          birthdate: "",
          gender: "",
          residence: ""
        })
        setProgram({})
        setTimeout(() => {
          window.location.reload()
        }, 5000);
      })
      .catch((err: any) => {
        console.log(err);
        
        setIsLoading(false);
        setError(err.message);
        toast.error(err.message, {
          position: "top-right",
          autoClose: 10000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          progress: undefined,
          theme: "colored",
        });
      })
  }

  return (
    <ContentFullLayout>
      <section className="w-full bg-surface-0 z-15 transition-transform shadow-15 flex justify-between">
        <div className="p-6 border-0 border-solid border-surface-200 border-r-2">
          <div className="w-36 h-9 bg-logo bg-cover bg-center mobile:mx-auto"> </div>
        </div>
        <div className="p-3">
          { <SignOutButton/> }
        </div>
      </section>
      <section className="w-full flex justify-center mt-6">
        <ToastContainer
          position="top-right"
          autoClose={5000}
          newestOnTop={true}
          closeOnClick
          pauseOnFocusLoss
          pauseOnHover
          theme="colored"
        />
        <section className="flex flex-col justify-center items-center">
          <Image className="mb-6" width={180} height={41} src="https://bedu-staging-assets.s3.us-west-2.amazonaws.com/UTC/image_9_dccaab79ed.png" alt="logo mimovil" />

          <MiMovilInscriptionForm
            submit={submit}
            setStatus={setStatus}
            residence={residence}
            noResidence={noResidence}
            hasCurp={hasCurp}
            noCurp={noCurp}
            setResidence={setResidence}
            setNoResidence={setNoResidence}
            setHasCurp={setHasCurp}
            setNoCurp={setNoCurp}
            personalData={personalData}
            setPersonalData={setPersonalData}
            curp={curp}
            setCurp={setCurp}
            isValidCurp={isValidCurp}
            setIsValidCurp={setIsValidCurp}
            curpError={curpError}
            setCurpError={setCurpError}
            setProgram={setProgram}
            programs={programs}
          />
          <div className={cn("flex flex-col w-full")}>
            <button
              className={cn({
                "bg-surface-200 text-surface-0 rounded-lg py-3 font-bold text-lg": !isValid || !program,
                "bg-primary-500 text-surface-0 rounded-lg py-3 font-bold text-lg": isValid && !!program, 
              })}
              disabled={!isValid || !program}
              onClick={() => {
                onSubmit()
              }}
            >
              Completar registro
            </button>
          </div>
        </section>
      </section>
    </ContentFullLayout>
  )
}
export default MiMovilInscription