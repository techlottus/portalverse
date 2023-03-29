import { useState } from "react"
import axios from "axios"

const businessUnit = process.env.NEXT_PUBLIC_BUSINESS_UNIT!;

const CAMPUS_LIST: {[key: string]: Array<string>} = {
  "UANE": ["MATAMOROS", "PIEDRAS NEGRAS", "SABINAS", "REYNOSA", "MONTERREY", "SALTILLO", "TORREÓN", "TORREÓN", "MONCLOVA"],
  "UTEG": ["RIO NILO", "LAZARO CARDENAS", "OLIMPICA", "AMERICAS", "CAMPUS", "CAMPUS ZAPOPAN", "TLAJOMULCO", "PEDRO MORENO"]
}

const getCampusList = (businessUnit: string) => {
  return CAMPUS_LIST[businessUnit] || [];
}

export const getEducativeOffer = () => {
  const [ isLoading, setIsLoading ] = useState<boolean>(false);
  const [ isError, setIsError ] = useState<boolean>(false);
  const [ data, setData ] = useState<any>({});
  const [ filterPrograms, setFilterPrograms ] = useState<any>(null);
  const [ _, setAllPrograms ] = useState<Array<any>>([]);
  const [ sourceData, setSourceData ] = useState<any>({});

  const fetchData = async (url: string, modalidad: string, linea: string, Authorization: string) => {

    setIsLoading(true);
    setIsError(false);
    
    await axios.get(
      `${url}`, {
        params: {
          linea
        },
        headers: {
          Authorization,
          'Content-Type': 'application/json;charset=UTF-8'
        }
      }
    )
      .then( (res: any) => {
        const { data: programs } = res;
        let dataPrograms: Array<any> = [];
        if(!!programs && !!programs.length) {
          setAllPrograms([ ...programs ])
          switch(modalidad) {
            case 'Presencial': {
              dataPrograms = programs.reduce((prev: any, item: any) => item.modalidad === "Presencial" ? [...prev, item] : [...prev], [])
              break;
            }
            case 'Online': {
              dataPrograms = programs.reduce((prev: any, item: any) => (item.lineaNegocio === process.env.NEXT_PUBLIC_LINEA && item.modalidad === "Online") || (item.lineaNegocio === "ULA" && (item.nombreCampus === `${process.env.NEXT_PUBLIC_LINEA} ONLINE` && item.modalidad === "Online")) ? [...prev, item] : [...prev], [])
              break;
            }
            case 'Flex': {
              const campusList = getCampusList(businessUnit);
              dataPrograms = programs.reduce((prev: any, item: any) => item.lineaNegocio === "ULA" && item.modalidad === 'Online' && campusList?.includes(item.nombreCampus) ? [...prev, item] : [...prev], [])
              break;
            }
            default: {
              dataPrograms = [ ...programs ]
              break;
            }
          }
          setFilterPrograms([ ...dataPrograms ]);
          const exists = dataPrograms.reduce((prev: any, curr: any) => {
            if(!prev.hasOwnProperty(curr.nivel)) {
              return { ...prev, [curr.nivel]: 1 }
            }
            return { ...prev, [curr.nivel]: prev[curr.nivel]+1 }
          }, {});
          const levelOptions = Object.keys(exists).map((curr: any) => ({ name: curr, search: curr, disabled: false}))
          setData({ ...levelOptions });
          setIsError(false);
        } else {
          setIsError(true);
        }
        setIsLoading(false);
      })
      .catch( (err: any) => {
        console.log("err", err);
        setIsError(true)
        setIsLoading(false);
      })
  }

  const filterByLevel = (level: string) => {
    const sourceData = filterPrograms.reduce((prev: any, { periodo, nombrePrograma, nivel, idOfertaPrograma: idPrograma, idCampus, nombreCampus }: any) => {
      if (nivel === level) {
        if (!prev.hasOwnProperty(nombrePrograma)) {
          return { ...prev, [nombrePrograma]: [{ periodo, nombrePrograma, idPrograma, idCampus, nombreCampus }] }
        }
        return { ...prev, [nombrePrograma]: [ ...prev[nombrePrograma], { periodo, nombrePrograma, idPrograma, idCampus, nombreCampus }] }
      }
      return { ...prev }
    }, {})

    setSourceData({ ...sourceData });

    const dataFiltered = Object.keys(sourceData).map( (value: string) => ({active:false, value, text: value}) )

    return dataFiltered
  }

  const filterByProgram = (program: string) => {
    const selectCampus = sourceData[program]?.reduce((prev: any[], { idCampus: value, nombreCampus: text }: any) => {
      return !prev.filter( (c: any) => c.value === value ).length ? [ ...prev, { active: false, value, text } ] : [ ...prev ]
    }, []);
    return selectCampus;
  }

  const getDataByProgramEC = (program: string, campusId?: string ) => {
    if(campusId) {
      const programInfo = filterPrograms.find((item: any) => item.nombrePrograma === program && item.idCampus === campusId);
      return { ...programInfo }
    } else {
      const programInfo = filterPrograms.filter((item: any) => item.nombrePrograma === program)[0];
      return { ...programInfo }
    }
  }

  return {
    isLoading,
    isError,
    data,
    filterPrograms,
    sourceData,
    fetchData,
    filterByLevel,
    filterByProgram,
    getDataByProgramEC
  } as const
}