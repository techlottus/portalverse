import { FC, useEffect, useState } from "react"
import { useRouter } from "next/router"
import cn from "classnames"
import StepOne from "@/forms/steps/step-one-openform"
import StepTwo from "@/forms/steps/step-two-openform"
import StepThree from "@/forms/steps/step-three-openform"
import { FormConfig } from "@/forms/fixtures/openform"
import Image from "@/old-components/Image"
import Button from "@/old-components/Button/Button"
import { ButtonInit } from "@/old-components/fixture"
import { getTokenForms } from "@/utils/getTokenForms"
import { getEducativeOffer } from "@/utils/getEducativeOffer"
import { saveDataForms } from "@/utils/saveDataForms"

const OpenFormSuperior: FC<any> = ({ classNames, image, pathThankyou, controls, copies, programDefault, levelDefault }: any) => {

  const router = useRouter();
  
  const [ step, setStep ] = useState<number>(1);
  const [ controlsConfig, setControlsConfig ] = useState({ ...FormConfig });
  const [ activeLoader, setActiveLoader ] = useState<boolean>(false);
  const [ errorLoader, setErrorLoader ] = useState<boolean>(false);
  const [ infoForm, setInfoForm ] = useState<any>({
    step1: {},
    step2: {},
    step3: {},
  });
  const [ tokenActive, setTokenActive ] = useState<string>("");
  const [ levelsOffer, setLevelsOffer ] = useState<any>([]);
  const [ filteredPrograms, setFilteredPrograms ] = useState<any>([]);
  const [ filteredCampus, setFilteredCampus ] = useState<any>([]);
  const [ dataPersonal, setDataPersonal ] = useState<any>({});
  const [ idLead, setIdLead ] = useState<string>("");
  const [ levelForm, setLevelForm ] = useState<string>("");
  const [ contacts, setContacts ] = useState<string>("");
  const [ schedulers, setSchedulers ] = useState<string>("");
  const [ programDefaultForm, setProgramDefaultForm ] = useState<any>({});
  const [ returnedStep, setReturnedStep ] = useState<boolean>(false);
  const [ newLineaNegocio, setNewLineaNegocio ] = useState<string>("");
  const [ newModalidad, setNewModalidad ] = useState<string>("");

  /*HOOKS to consume data */
  const { isLoading, isError, token } = getTokenForms();
  const { fetchData: fetchEducativeOffer, filterByLevel, filterByProgram, getDataByProgramEC, data: dataEO, isLoading: isLoadingEO, isError: isErrorEO, sourceData } = getEducativeOffer();
  const { isLoading: isLoadingSD, isError: isErrorSD, data: dataSD, saveData } = saveDataForms();
  /*HOOKS to consume data */

  useEffect(() => {
    if (!!Object.keys(levelsOffer).length) {
      handleLevelSelectedFirstTime(levelForm);
    }
  }, [levelsOffer]);
  
  useEffect(() => {
    if (!!levelDefault) {
      setLevelForm(levelDefault);
    }
  }, [levelDefault]);

  useEffect(() => {
    if (!isLoading && !isError && !!Object.keys(token).length) {
      setTokenActive(`${token.token_type} ${token.access_token}`);
    }
  }, [isLoading, isError, token]);

  useEffect(() => {
    if (!isLoadingEO && !isErrorEO) {
      setLevelsOffer(Object.entries(dataEO).map(([_ , level]: any) => level));
    }
  }, [isLoadingEO, isErrorEO, dataEO]);

  useEffect(() => {
    if (!!Object.keys(tokenActive).length && step === 2 && !returnedStep) {
      handleFetchEducativeOffer(infoForm.step1.modality);
    }
  }, [tokenActive, step, returnedStep]);

  useEffect(() => {
    if (!isLoadingSD && !isErrorSD && !!Object.keys(dataSD).length) {
      setDataPersonal({ ...dataSD });
      if (!idLead) {
        setIdLead(dataSD.id);
      }
      if (!contacts) {
        setContacts(dataSD.medio_de_contacto);
      }
      if (!schedulers) {
        setSchedulers(dataSD.Horario_de_contacto);
      }
      const newStep = step + 1;
      setStep(newStep);
    }
  }, [isLoadingSD, isErrorSD, dataSD]);

  useEffect(() => {
    setActiveLoader(isLoading || isLoadingEO || isLoadingSD)
  }, [isLoading, isLoadingEO, isLoadingSD])
  
  useEffect(() => {
    setErrorLoader(isError || isErrorEO || isErrorSD)
  }, [isError, isErrorEO, isErrorSD])

  useEffect(() => {
    setControlsConfig({ ...controls });
  }, [controls]);

  useEffect(() => {
    if (step === 2){
      setProgramDefaultForm({ upper: programDefault.toUpperCase(), default: programDefault, level: levelDefault });
    }
    if (step === 4 && dataPersonal.Exitoso === "TRUE") {
      router.push(pathThankyou);
    }
  }, [step]);

  const handleFetchEducativeOffer = (modality: string) => {
    setLevelsOffer([]);
    setFilteredPrograms([]);
    setFilteredCampus([]);
    setReturnedStep(false);
    let modalidad = modality;
    let lineaNegocio = `${process.env.NEXT_PUBLIC_LINEA!}`
    if (step === 2 && modality === 'Flex') {
      lineaNegocio = "ULA"
    }
    if (step === 2 && modality === 'Online') {
      lineaNegocio = "UANE,ULA"
    }
    fetchEducativeOffer(process.env.NEXT_PUBLIC_EDUCATIVE_OFFER!, modalidad, lineaNegocio, tokenActive);
    if (!!programDefaultForm.upper) {
      setProgramDefaultForm({ upper: "", default: "", level: levelDefault });
    }
  }

  const handleNextStep = (info: any, step: number) => {
    let modalidad = info.modality;
    let lineaNegocio = `${process.env.NEXT_PUBLIC_LINEA!}`;

    if (step === 1 && modalidad === 'Flex') {
      lineaNegocio = "ULA";
    }

    if (modalidad === 'Flex') {
      modalidad = "Online";
    }
    
    if (step === 2) {
      const programa = getDataByProgramEC(info.program);
      console.log("programa", programa)
      lineaNegocio = programa.lineaNegocio;
      setNewLineaNegocio(lineaNegocio);
      setNewModalidad(modalidad);
    }
    setInfoForm({ ...infoForm, [`step${step}`]: { ...info } });
    if (`step${step}` === 'step1') {
      saveData(`step${step}`, { ...info, modality: modalidad}, tokenActive, "UANE");
    } if (`step${step}` === 'step3') {
      const data = {
        id: idLead,
        nivel: levelForm,
        campus: infoForm.step2.campus,
        programa: infoForm.step2.program,
        modalidad: newModalidad,
        lineaNegocio: newLineaNegocio,
        medioContacto: info.contacto,
        horarioContacto: info.horario
      }
      saveData(`step${step}`, data, tokenActive);
    } else {
      if (!!Object.keys(sourceData).length) {
        const { idPrograma: program, nombreCampus } = sourceData[info.program]?.filter((campus: any) => {
          return campus.idCampus === info.campus;
        })[0];
        setInfoForm({ ...infoForm, 'step2': { ...info, nameProgram: info.program, nombreCampus, program } });
        const newStep = step + 1;
        setStep(newStep);
      }
    }
  }

  useEffect(() => {
    if (!!Object.keys(dataEO).length) {
      handleLevelSelected(programDefaultForm.level);
    }
  }, [dataEO])

  const handleLevelSelected = (level: string) => {
    setFilteredPrograms([]);
    setFilteredCampus([]);
    const programsByLevel = filterByLevel(level);
    setFilteredPrograms([ ...programsByLevel ]);
  }

  const handleLevelSelectedFirstTime = (level: string) => {
    if (!!Object.keys(dataSD).length) {
      const programsByLevel = filterByLevel(level);
      const programa = !!infoForm.step2.program ? infoForm.step2.program : programDefaultForm.upper;
      const existsProgramInList = programsByLevel.filter((program: any) => program.text === programa).length
      if (existsProgramInList > 0) {
        setFilteredPrograms([ ...programsByLevel.map((program: any) => ({ ...program, active: program.text === programa })) ]);
      }
      if (!!Object.keys(sourceData).length) {
        handleProgramSelected(programa);
      }
    }
  }

  const handleProgramSelected = (program: string) => {
    setFilteredCampus([]);
    const campusByProgram = filterByProgram(program);
    if (!!campusByProgram && Array.isArray(campusByProgram)) {
      setFilteredCampus([ ...campusByProgram ]);
    }
  }

  const handleReturnedStep = (step: number) => {
    setReturnedStep(true);
    setStep(step);
  }

  return <section className={cn("p-6 shadow-15 bg-white relative", classNames)}>
    <div className={cn("absolute w-full h-full z-10 flex justify-center items-center left-0 top-0", { "hidden": !activeLoader, "block": activeLoader })}>
      <Image src="/images/loader.gif" alt="loader" classNames={cn("w-10 h-10 top-0 left-0")} />
    </div>
    <div className={cn("bg-white absolute w-full h-full z-10 flex flex-col aspect-2/1 justify-center items-center left-0 top-0", { "hidden": !errorLoader, "block": errorLoader })}>
      <Image src="/images/404.png" alt="error" classNames={cn("w-[50%] h-[50%] top-0 left-0")} />
      <h1>Ha ocurrido un error al procesar tu información</h1>
      <h1>Lamentamos el inconveniente y te pedimos intentarlo de nuevo</h1>
      <Button onClick={() => location.reload()} data={{...ButtonInit, title: "Reintentar" }} />
    </div>
    <StepOne data={ copies.stepone } step={30} classNames={cn({ "hidden": step !== 1 })} image={image} onNext={(info: any) => handleNextStep(info, 1)} />
    <StepTwo levelDefault={programDefaultForm.level} programDefault={programDefaultForm.upper} campus={filteredCampus} programs={filteredPrograms} onChangeProgram={(program: string) => handleProgramSelected(program)} onChangeModality={(modality: string) => handleFetchEducativeOffer(modality)} modality={infoForm.step1.modality} levels={levelsOffer} step={60} classNames={cn({ "hidden": step !== 2 })} onNext={(info: any) => handleNextStep(info, 2)} controls={{...controlsConfig}} />
    <StepThree onReturnStep={(step: number) => handleReturnedStep(step)} contacts={contacts} schedulers={schedulers} onNext={(info: any) => handleNextStep(info, 3)} step={90} data={{ modality: infoForm.step2.modality, program: infoForm.step2.nameProgram, level: levelForm, campus: infoForm.step2.nombreCampus }} classNames={cn({ "hidden": step !== 3 })} />
  </section>
}

export default OpenFormSuperior