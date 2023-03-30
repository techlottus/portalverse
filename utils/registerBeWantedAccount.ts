import { useState } from "react"
import axios from "axios"

export const RegisterBeWantedAccount = () => {
  const [ isLoading, setIsLoading ] = useState<boolean>(false);
  const [ isError, setIsError ] = useState<boolean>(false);
  const [ data, setData ] = useState<any>({});
  const [ isSuccess, setIsSuccess ] = useState<boolean | null>(null);

  const registerAccount = async (data: any, Authorization: string) => {

    setIsLoading(true);
    setIsError(false);
    setIsSuccess(null);

    await axios.post(
      `${process.env.NEXT_PUBLIC_BE_WANTED_CREATE_ACCOUNT}`, { ...data },
      {
        headers: {
          Authorization,
          'Content-Type': 'application/json'
        }
      }
    )
      .then((response) => {
        const { status } = response;
        if (
          status === 201 /* new user created */ ||
          status === 202 /* existing user joined a new job pool  */
        ) {
          setIsSuccess(true);
          setIsError(false);
        }
        setData({ response: { ...response } });
        setIsLoading(false);
      })
      .catch((err) => {
        setData({ response: { ...err?.response } });
        setIsError(true)
        setIsLoading(false);
        setIsSuccess(null)
      })
  }

  return {
    isLoading,
    isError,
    data,
    isSuccess,
    registerAccount
  }
}