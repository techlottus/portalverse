import { FC, useEffect, useState } from "react"
import { useRouter } from "next/router"
import cn from "classnames"
import StepOne from "@/forms/steps/step-one-openform"
import StepTwo from "@/forms/steps/step-two-openform"
import StepThree from "@/forms/steps/step-three-openform"
import { FormConfig } from "@/forms/fixtures/openform"
import { getTokenForms } from "@/utils/getTokenForms"
import { getEducativeOffer } from "@/utils/getEducativeOffer"
import { saveDataForms } from "@/utils/saveDataForms"
import Image from "@/old-components/Image"
import Button from "@/old-components/Button/Button"
import { ButtonInit } from "@/old-components/fixture"

const businessUnit = process.env.NEXT_PUBLIC_BUSINESS_UNIT!;

const formatSalesforceBusinessLine = (businessUnit: string, modality: string) => {
  switch(businessUnit) {
    case "UANE": {
      switch(modality) {
        case "Presencial": return "UANE";
        case "Online": return "UANE";
        case "Flex": return "ULA";
        default: return "UANE";
      }
    }
    case "UTEG": {
      switch(modality) {
        case "Presencial": return "UTEG";
        case "Online": return "ULA";
        case "Flex": return "ULA";
        default: return "UTEG";
      }
    }
    default: return businessUnit;
  }
}

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
    default: return ""
  }
}

const OpenForm: FC<any> = ({ classNames, image, pathThankyou, controls, data, currentStep }: any) => {

  const router = useRouter();
  const queryParams = router?.query;

  const [ step, setStep ] = useState<number>(1);
  const [ controlsConfig, setControlsConfig ] = useState({ ...FormConfig });
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
  const [ contacts, setContacts ] = useState<string>("");
  const [ schedulers, setSchedulers ] = useState<string>("");
  const [ returnedStep, setReturnedStep ] = useState<boolean>(false);


  const {
    isLoading: isLoadingToken,
    isError: isErrorToken,
    token,
  } = getTokenForms();

  const {
    fetchData: fetchEducativeOffer,
    filterByLevel,
    filterByProgram,
    getDataByProgramEC,
    data: educativeOfferData,
    isLoading: isLoadingEO,
    isError: isErrorEO,
    sourceData,
  } = getEducativeOffer();


  const {
    isLoading: isLoadingSD,
    isError: isErrorSD,
    data: dataSD,
    saveData,
  } = saveDataForms();

  const isLoading = isLoadingToken || isLoadingEO || isLoadingSD;
  const isError = isErrorToken || isErrorEO || isErrorSD;

  const handleFetchEducativeOffer = (modality: string) => {
    setLevelsOffer([]);
    setFilteredPrograms([]);
    setFilteredCampus([]);
    const businessLineToFetchFrom = getBusinessLineToFetchFrom(businessUnit, modality);
    fetchEducativeOffer(process.env.NEXT_PUBLIC_EDUCATIVE_OFFER!, modality, businessLineToFetchFrom, tokenActive);
  }

  useEffect(() => {
    if (!isLoadingToken && !isErrorToken && !!Object.keys(token).length) {
      setTokenActive(`${token.token_type} ${token.access_token}`);
    }
  }, [isLoadingToken, isErrorToken, token]);

  useEffect(() => {
    if (!isLoadingEO && !isErrorEO) {
      setLevelsOffer(Object.entries(educativeOfferData).map(([_ , level]: any) => level))
    }
  }, [isLoadingEO, isErrorEO, educativeOfferData]);

  useEffect(() => {
    if (!isLoadingEO && !isErrorEO && !!Object.keys(dataSD).length) {
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
    if (!!Object.keys(tokenActive).length && step === 2 && !returnedStep) {
      handleFetchEducativeOffer(infoForm.step1.modality);
    }
  }, [tokenActive, step]);
  
  useEffect(() => {
    if (step === 4 && dataPersonal.Exitoso === "TRUE") {
      router.push(pathThankyou);
    }
  }, [step]);

  useEffect(() => {
    setControlsConfig({ ...controls });
  }, [controls]);

  const handleNextStep = (info: any, step: number) => {

    setInfoForm({ ...infoForm, [`step${step}`]: { ...info } });

    if (`step${step}` === 'step1') {
      const linea = formatSalesforceBusinessLine(businessUnit, info.modality)
      saveData(`step${step}`, { ...info }, tokenActive, linea, queryParams);
    }

    if (`step${step}` === 'step3') {
      const selectedProgramData = getDataByProgramEC(infoForm.step2.nameProgram, infoForm.step2.campusId);

      const data = {
        id: idLead,
        nivel: infoForm.step2.level,
        campus: infoForm.step2.campus,
        programa: infoForm.step2.program,
        modalidad: infoForm.step2.modality,
        lineaNegocio: selectedProgramData?.lineaNegocio || "",
        medioContacto: info.contacto,
        horarioContacto: info.horario
      }
      saveData(`step${step}`, data, tokenActive);
    } else {
      if (!!Object.keys(sourceData).length) {
        const { idPrograma: program, nombreCampus } = sourceData[info.program]?.filter((campus: any) => {
          return campus.idCampus === info.campus;
        })[0];
        setInfoForm({ ...infoForm, 'step2': { ...info, nameProgram: info.program, nombreCampus, campusId: info.campus, program } });
        const newStep = step + 1;
        setStep(newStep);
      }
    }
  }

  const handleLevelSelected = (level: string) => {
    setFilteredPrograms([]);
    setFilteredCampus([]);
    const programsByLevel = filterByLevel(level);
    setFilteredPrograms([ ...programsByLevel ]);
  }

  const handleProgramSelected = (program: string) => {
    setFilteredCampus([]);
    const campusByProgram = filterByProgram(program);
    setFilteredCampus([ ...campusByProgram ]);
  }

  const handleReturnedStep = (step: number) => {
    setReturnedStep(true);
    setStep(step);
  }

  return (
    <section className={cn("p-6 shadow-15 bg-white relative", classNames)}>
      {
        isLoading
          ? <div className="absolute w-full h-full z-10 flex justify-center items-center left-0 top-0">
              <Image src="/images/loader.gif" alt="loader" classNames={cn("w-10 h-10 top-0 left-0")} />
            </div>
          : null
      }
      {
        isError
          ? <div className="bg-white w-full h-full p-4 z-10 flex flex-col aspect-2/1 justify-center items-center left-0 top-0">
              <h1 className="font-bold text-10 text-center leading-12 mb-9">
                ¡Me lleva la ...! no encuentro la página...
              </h1>
              <div className="w-full max-w-[24rem]"> {/* Tailwind's 'max-w-sm' value isn't working for some reason u.u */}
                <img src="/images/404-B.jpg" className="w-full" alt="error" />
              </div>
              <h2 className="text-UNI-066 font-semibold text-5.5 my-6">
                No importa, siempre puedes regresar a inicio
              </h2>
              <Button
                dark
                onClick={() => location.reload()}
                data={{ ...ButtonInit, title: "Reintentar" }}
              />
            </div>
          : <>
              <StepOne
                data={data}
                step={30}
                classNames={cn({ hidden: step !== 1 })}
                image={image}
                onNext={(info: any) => handleNextStep(info, 1)}
              />
              <StepTwo
                campus={filteredCampus}
                programs={filteredPrograms}
                onChangeProgram={(program: string) =>
                  handleProgramSelected(program)
                }
                onLevelSelected={(level: string) => handleLevelSelected(level)}
                onChangeModality={(modality: string) =>
                  handleFetchEducativeOffer(modality)
                }
                modality={infoForm.step1.modality}
                levels={levelsOffer}
                step={60}
                classNames={cn({ hidden: step !== 2 })}
                onNext={(info: any) => handleNextStep(info, 2)}
                controls={{ ...controlsConfig }}
              />
              <StepThree
                onReturnStep={(step: number) => handleReturnedStep(step)}
                contacts={contacts}
                schedulers={schedulers}
                onNext={(info: any) => handleNextStep(info, 3)}
                step={90}
                data={{
                  modality: infoForm.step2.modality,
                  program: infoForm.step2.nameProgram,
                  level: infoForm.step2.level,
                  campus: infoForm.step2.nombreCampus,
                }}
                classNames={cn({ hidden: step !== 3 })}
              />
            </>
      }
    </section>
  )
};

export default OpenForm;