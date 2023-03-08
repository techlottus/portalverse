import { useState } from "react"
import axios from "axios"

export const RegisterBeWantedAccount = () => {
  const [ isLoading, setIsLoading ] = useState<boolean>(false);
  const [ isError, setIsError ] = useState<boolean>(false);
  const [ data, setData ] = useState<any>({});
  const [ userCreated, setUserCreated ] = useState<boolean | null>(null);

  const registerAccount = async (data: any, Authorization: string) => {

    console.log("data---", data)
    console.log("Authorization---", Authorization)

    setIsLoading(true);
    setIsError(false);
    setUserCreated(null)
    await axios.post(
      `${process.env.NEXT_PUBLIC_BE_WANTED_CREATE_ACCOUNT}`, { ...data },
      {
        headers: {
          Authorization,
          'Content-Type': 'application/json'
        }
      }
    )
      .then( (res: any) => {
        const { status, data }= res;
        console.log("data----status", data);
        if (status === 201) {
          setUserCreated(true)
          setIsError(false)
        }

        if (status === 202) {
          setUserCreated(false)
          setIsError(true)
        }
        console.log("data----", data);
        setData({response: {...res}});
        setIsLoading(false);
      })
      .catch( (err: any) => {
        console.log("err", err);
        setIsError(true)
        setIsLoading(false);
        setUserCreated(null)
      })
  }

  return {
    isLoading,
    isError,
    data,
    userCreated,
    registerAccount
  }
}