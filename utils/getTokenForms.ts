import { useEffect, useState } from "react"
import axios from "axios"

export const getTokenForms = () => {
  const [ isLoading, setIsLoading ] = useState<boolean>(false);
  const [ isError, setIsError ] = useState<boolean>(false);
  const [ token, setToken ] = useState<any>({});
  const [ isValidateData, setIsValidateData ] = useState<boolean>(false);
  
  const fetchData= async () => {
    const params = `client_id=${process.env.NEXT_PUBLIC_CLIENT_ID!}&client_secret=${process.env.NEXT_PUBLIC_CLIENT_SECRET!}&username=${process.env.NEXT_PUBLIC_USERNAME!}&password=${process.env.NEXT_PUBLIC_PASSWORD!}&grant_type=${process.env.NEXT_PUBLIC_GRANT_TYPE!}`;

    setIsLoading(true);
    setIsError(false);
    await axios.post(`${process.env.NEXT_PUBLIC_TOKEN!}?${params}`)
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

  const validateData = () => setIsValidateData(!!process.env.NEXT_PUBLIC_TOKEN && !!process.env.NEXT_PUBLIC_CLIENT_ID && !!process.env.NEXT_PUBLIC_CLIENT_SECRET && !!process.env.NEXT_PUBLIC_USERNAME && !!process.env.NEXT_PUBLIC_PASSWORD && !!process.env.NEXT_PUBLIC_GRANT_TYPE);

  useEffect(() => {
    if(isValidateData) {
      fetchData();
    }
  }, [isValidateData]);

  useEffect(() => {
    validateData();
  }, [])

  return {
    isLoading,
    isError,
    token
  } as const
}