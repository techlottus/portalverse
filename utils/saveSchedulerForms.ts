import { useState } from "react"
import axios from "axios"

export const saveSchedulerForms = () => {
  const [ isLoading, setIsLoading ] = useState<boolean>(false);
  const [ isError, setIsError ] = useState<boolean>(false);
  const [ data, setData ] = useState<any>({});

  const fetchData = (Authorization: string, horarioContacto: string, medioContacto: string, id: string) => {
    setIsLoading(true);
    setIsError(false);
    axios.post(
      `${process.env.NEXT_PUBLIC_DATOS_COMPLEMENTARIOS!}`, {}, {
        params: {
          horarioContacto,
          medioContacto,
          id
        },
        headers: {
          Authorization,
          'Content-Type': 'aplication/json;charset=UTF-8'
        }
      }
    )
      .then( (res: any) => {
        setData(true);
        setIsError(false);
        setIsLoading(false);
      })
      .catch( (err: any) => {
        console.log("err", err);
        setIsError(true)
        setIsLoading(false);
        setData(false);
      })
  }
  
  return {
    isLoading,
    isError,
    data,
    fetchData
  } as const
}
