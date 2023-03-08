import { useEffect, useState } from "react"
import axios from "axios"

export const getTokenBeWanted = () => {
  const [ isLoading, setIsLoading ] = useState<boolean>(false);
  const [ isError, setIsError ] = useState<boolean>(false);
  const [ token, setToken ] = useState<any>({});
  const [ isLogoutSuccess, setIsLogoutSuccess ] = useState<boolean>(false);

  const getToken = async () => {
    setIsLoading(true);
    setIsError(false);
    setIsLogoutSuccess(false);
    await axios.post(`${process.env.NEXT_PUBLIC_BE_WANTED_TOKEN_LOGIN!}`,
      {
        email: `${process.env.NEXT_PUBLIC_BE_WANTED_USERNAME!}`,
        password: `${process.env.NEXT_PUBLIC_BE_WANTED_PASSWORD!}`
      },
      {
        headers: {
          "Content-Type": "application/json"
        }
      })
      .then( (res: any) => {
        const { data: { access_token, token_type } } = res;
        setToken({ access_token, token_type });
        setIsError(false);
        setIsLoading(false);
      })
      .catch( (err: any) => {
        setToken({});
        setIsError(true)
        setIsLoading(false);
      })
  }

  const logoutToken = async(Authorization: string) => {
    setIsLoading(true);
    setIsError(false);
    await axios.post(`${process.env.NEXT_PUBLIC_BE_WANTED_TOKEN_LOGOUT!}`,
      {},
      {
        headers: {
          Authorization
        }
      })
      .then( (res: any) => {
        console.log("LOGOUT COMPLETO")
        setIsLoading(false);
        setIsError(false);
        setIsLogoutSuccess(true);
      })
      .catch( (err: any) => {
        setToken({});
        setIsLogoutSuccess(false);
        setIsError(true)
        setIsLoading(false);
      })
  }

  useEffect(() => {
    if (!Object.keys(token).length) {
      getToken()
    }
  }, []);

  return {
    isLoading,
    isError,
    isLogoutSuccess,
    token,
    logoutToken,
  } as const

}