import { FC, useEffect, useState } from "react"
import { useRouter } from "next/router";
import cn from "classnames"
import StepOne from "@/forms/steps/step-one-continuouseducation"
import { getTokenForms } from "@/utils/getTokenForms";
import { getEducativeOffer } from "@/utils/getEducativeOffer";
import { saveDataForms } from "@/utils/saveDataForms";
import Image from "@/old-components/Image";
import Button from "@/old-components/Button/Button";
import { ButtonInit } from "@/old-components/fixture";

const businessUnit = process.env.NEXT_PUBLIC_BUSINESS_UNIT;

const EducacionContinuaForm: FC<any> = ({ classNames, copies, image, pathThankyou, defaultProgram }: any) => {

  const router = useRouter();

  const [ tokenActive, setTokenActive ] = useState<string>("");
  const [ levelDefault ] = useState<string>("Educación Continua");
  const [ lineaNegocio ] = useState<string>("UANE");
  const [ activeLoader, setActiveLoader ] = useState<boolean>(false);
  const [ errorLoader, setErrorLoader ] = useState<boolean>(false);
  const [ filteredPrograms, setFilteredPrograms ] = useState<any>([]);
  const [ programDefault, setProgramDefault ] = useState<string>("");


  const { isLoading: isLoadingToken, isError: isErrorToken, token } = getTokenForms();

  const { fetchData: fetchEducativeOffer, filterByLevel, getDataByProgramEC, data: dataEO, isLoading: isLoadingEO, isError: isErrorEO, sourceData } = getEducativeOffer();

  const { isLoading: isLoadingSD, isError: isErrorSD, data: dataSD, saveDataEducacionContinua } = saveDataForms();

  const isLoading = isLoadingToken || isLoadingEO || isLoadingSD;
  const isError = isErrorToken || isErrorEO || isErrorSD;

  const handleFetchEducativeOffer = (modality: string) => {
    fetchEducativeOffer(process.env.NEXT_PUBLIC_EDUCATIVE_OFFER!, modality, `${businessUnit},ULA`, tokenActive);
  }

  useEffect(() => {
    if (!!defaultProgram) {
      setProgramDefault(defaultProgram);
    }
  }, [defaultProgram])

  useEffect(() => {
    if (!isLoading && !isError && !!Object.keys(token).length) {
      setTokenActive(`${token.token_type} ${token.access_token}`);
    }
  }, [isLoading, isError, token]);
  
  useEffect(() => {
    if (!isLoading && !isError && !!Object.keys(dataSD).length) {
      if (dataSD.Exitoso === "TRUE") {
        router.push(pathThankyou)
      }
    }
  }, [isLoadingSD, isErrorSD, dataSD]);

  useEffect(() => {
    if (!!Object.keys(tokenActive).length) {
      handleFetchEducativeOffer("");
    }
  }, [tokenActive]);

  useEffect(() => {
    if (!isLoadingEO && !isErrorEO) {
      if (!!Object.entries(dataEO).filter(([ _, level ]: any) => level.search === levelDefault).length) {
        const filterPrograms = filterByLevel(levelDefault);
        if (filterPrograms.length > 0) {
          setFilteredPrograms([ ...filterPrograms ].map((item: any) => ({ ...item, active: item.value === programDefault.toUpperCase() })))
          return
        }
        setFilteredPrograms([ ...filterPrograms ])
        return
      }
      setFilteredPrograms([]);
    }
  }, [isLoadingEO, isErrorEO, dataEO]);

  useEffect(() => {
    setActiveLoader(isLoading || isLoadingEO || isLoadingSD)
  }, [isLoading, isLoadingEO, isLoadingSD])
  
  useEffect(() => {
    setErrorLoader(isError || isErrorEO || isErrorSD)
  }, [isError, isErrorEO, isErrorSD])

  const handleNext = (info: any) => {
    const infoProgram = getDataByProgramEC(info.program);
    if (!!Object.keys(infoProgram).length) {
      const newInfo = { ...info, programa: infoProgram.idOfertaPrograma, nivel: levelDefault, campus: infoProgram.idCampus, modalidad: infoProgram.modalidad, lineaNegocio: businessUnit, medioContacto: info.contacto, horarioContacto: info.horario }
      saveDataEducacionContinua({ ...newInfo }, tokenActive, infoProgram );
    }
  }

  return (
    <section className={cn("p-6 shadow-15 bg-surface-0 relative", classNames)}>
      <div>
        {
          isLoading
            ? <div className="absolute w-full h-full z-10 flex justify-center items-center left-0 top-0">
                <Image src="/images/loader.gif" alt="loader" classNames={cn("w-10 h-10 top-0 left-0")} />
              </div>
            : null
        }
        {
          isError
            ? <div className="bg-surface-0 w-full h-full p-4 z-10 flex flex-col aspect-2/1 justify-center items-center left-0 top-0">
                <h1 className="font-bold text-10 text-center leading-12 mb-9">
                Lo sentimos
                </h1>
                <div className="w-full max-w-96"> {/* Tailwind's 'max-w-sm' value isn't working for some reason u.u */}
                  <img src="https://assets.staging.bedu.org/UTEG/404_318781b8aa.jpg" className="w-full" alt="error" />
                </div>
                <h2 className="text-surface-600 font-semibold text-5.5 my-6">
                Esta página no está disponible
                </h2>
                <Button
                  dark
                  onClick={() => location.reload()}
                  data={{ ...ButtonInit, title: "Reintentar" }}
                />
              </div>
            : <StepOne data={ copies } step={30} image={image} programs={filteredPrograms} onNext={(info: any) => handleNext(info)}/>
        }
      </div>
    </section>
  )
}

export default EducacionContinuaForm