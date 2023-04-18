import { useState } from "react"
import axios from "axios"

export const stepsEndpoints: any = {
  step1: process.env.NEXT_PUBLIC_DATOS_PERSONALES,
  step3: process.env.NEXT_PUBLIC_DATOS_COMPLEMENTARIOS
};

const businessUnit = process.env.NEXT_PUBLIC_BUSINESS_UNIT!;

export const saveDataForms = () => {
  const [ isLoading, setIsLoading ] = useState<boolean>(false);
  const [ isError, setIsError ] = useState<boolean>(false);
  const [ data, setData ] = useState<any>({});

  const setRegisterBot = () => {
    const id = "F2D4"
    const caracteres = "ABCDEFGHJKMNPQRTUVWXYZ12346789";
    let random = "";
    for (let i = 0; i < 4; i++){
     random += caracteres.charAt(Math.floor(Math.random() * caracteres.length));
    }  
    let res= random.split("");
    res.splice(Math.floor(Math.random() * res.length), 0, id);
    const lead = res.join("");
   return lead;
  }

  const UTM_MEDIUMS: Array<string> = ["Google", "Facebook"];
  const UTM_CAMPAIGNS: Array<string> = []; // list of possible values pending

  type Modality = "Presencial" | "Online" | "Flex";

  const formatUANEWebToLeadCampus = (modality: Modality) => {
    switch (modality) {
      case "Presencial":
        return null;
      case "Flex":
        return "UANE FLEX";
      case "Online":
        return "VIRTUALIDAD";
      default:
        return null;
    }
  };

  const formatUTEGWebToLeadCampus = (modality: Modality) => {
    switch (modality) {
      case "Presencial":
        return null;
      case "Flex":
        return "UTEG FLEX";
      case "Online":
        return "UTEG ONLINE";
      default:
        return null;
    }
  };

  const formatWebToLeadCampus = (businessUnit: string, modality: Modality) => {
    switch (businessUnit) {
      case "UANE":
        return formatUANEWebToLeadCampus(modality);
      case "UTEG":
        return formatUTEGWebToLeadCampus(modality);
      default:
        return null;
    }
  };

  const saveData = async(step: string, data: any, Authorization: string, linea?: string, queryParams?: Record<string, any>) => {

    const bot = setRegisterBot();

    // Values for Marketing team
    const utmMedium = queryParams?.utm_medium;
    const utmCampaign = queryParams?.utm_campaign;
    const medio = UTM_MEDIUMS.includes(utmMedium) ? utmMedium : null;
    const campana = UTM_CAMPAIGNS.includes(utmCampaign) ? utmCampaign : null;

    const nombre = data.name;
    const apellidos = data.surname;
    const telefono = data.phone;
    const email = data.email;
    const source = `portal${process.env.NEXT_PUBLIC_LINEA}`
    const canal = process.env.NEXT_PUBLIC_CANAL;
    const webtoleadcampus = formatWebToLeadCampus(businessUnit, data?.modality);

    const modality = data?.modality === "Presencial" ? "Presencial" : "Online";
    const modalidad = data?.modalidad === "Presencial" ? "Presencial" : "Online";

    const params = step === 'step1'
      ? `nombre=${nombre}&apellidos=${apellidos}&telefono=${telefono}&email=${email}&lineaNegocio=${linea}&modalidad=${modality}&avisoPrivacidad=true&leadSource=Digital&validaRegistroBoot=${bot}&source=${source}&canal=${canal}${webtoleadcampus ? `&webtoleadcampus=${webtoleadcampus}` : ""}${medio ? `&medio=${medio}` : ""}${campana ? `&campana=${campana}` : ""}`
      : `id=${data.id}&nivel=${data.nivel}&campus=${data.campus}&programa=${data.programa}&modalidad=${modalidad}&lineaNegocio=${data.lineaNegocio}&medioContacto=${data.medioContacto}&horarioContacto=${data.horarioContacto}`

    setIsLoading(true);
    setIsError(false);
    setData({});
    
    await axios.post(`${stepsEndpoints[step]}?${params}`,{},{
      headers: {
        Authorization,
        'Content-Type': 'application/json;charset=UTF-8'
      }
    })
      .then((res: any) => {
        if (res.data.Exitoso === "False") {
          setIsError(true);
          setIsLoading(false);
        } else {
          setData({...res.data});
          setIsError(false);
          setIsLoading(false);
        }
      })
      .catch((err: any) => {
        console.log("err", err)
        setData({});
        setIsLoading(false);
        setIsError(true);
      })
  }

  const saveDataEducacionContinua = async(data: any, Authorization: string, infoProgram: any, linea?: string) => {
    const bot = setRegisterBot();
    const params = `nombre=${data.name}&apellidos=${data.surname}&telefono=${data.phone}&email=${data.email}&lineaNegocio=${!!linea ? linea : data.lineaNegocio}&modalidad=${data.modalidad}&avisoPrivacidad=true&leadSource=Digital&validaRegistroBoot=${bot}&source=landing`;
  
    setIsLoading(true);
    setIsError(false);
    await axios.post(`${stepsEndpoints.step1}?${params}`,{},{
      headers: {
        Authorization,
        'Content-Type': 'application/json;charset=UTF-8'
      }
    })
      .then((res: any) => {
        if (res.data.Exitoso === "False") {
          setIsError(true);
          setIsLoading(false);
        } else {
          const horarioContacto = res.data.Horario_de_contacto.slice(1, -1).split(",")[0]
          const medioContacto = res.data.medio_de_contacto.slice(1, -1).split(",")[0]
          const newData = { ...data, lineaNegocio: infoProgram.lineaNegocio }
          saveData("step3", { ...newData, horarioContacto, medioContacto, id: res.data.id }, Authorization)
          setIsError(false);
          setIsLoading(false);
        }
      })
      .catch((err: any) => {
        console.log("err", err)
        setData({});
        setIsLoading(false);
        setIsError(true);
      })
  }

  return {
    isLoading,
    isError,
    data,
    saveData,
    saveDataEducacionContinua
  }
}