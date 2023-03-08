import { useEffect, useState } from "react"
import axios from "axios"

export const getTokenSIUANE = () => {
  const [ isLoading, setIsLoading ] = useState<boolean>(false);
  const [ isError, setIsError ] = useState<boolean>(false);
  const [ token, setToken ] = useState<string | null>(null);

  const getToken = async() => {
    setIsLoading(true);
    setIsError(false);
    setToken(null);
    await axios.get(`${process.env.NEXT_PUBLIC_SIUANE_EGRESADOS_ENDPOINT!}${process.env.NEXT_PUBLIC_SIUANE_EGRESADOS_ENDPOINT_TOKEN!}`, {
      params: {
        Usuario: `${process.env.NEXT_PUBLIC_SIUANE_EGRESADOS_USERNAME}`,
        Contrasena: `${process.env.NEXT_PUBLIC_SIUANE_EGRESADOS_PASSWORD}`
      }
    })
      .then( (res: any) => {
        console.log("res", res)
        const [ data ] = res.data;
        const { token } = data;
        setToken(token);
        setIsError(false);
        setIsLoading(false);
      })
      .catch( (err: any) => {
        setToken(null);
        setIsError(true)
        setIsLoading(false);
      })
  }

  useEffect(() => {
    getToken();
  }, [])

  return {
    isLoading,
    isError,
    token
  } as const

}