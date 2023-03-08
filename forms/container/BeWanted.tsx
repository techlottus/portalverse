import { FC, useEffect, useState } from "react"
import { useRouter } from "next/router"
import cn from "classnames"
import StepOne from "@/forms/steps/step-one-bewanted"
import Image from "@/old-components/Image"
import Button from "@/old-components/Button/Button"
import { ButtonInit } from "@/old-components/fixture"
import { RegisterBeWantedAccount } from "@/utils/registerBeWantedAccount"
import { getTokenBeWanted } from "@/utils/getTokenBeWanted"

const BeWanted: FC<any> = ({ classNames, copies, pathThankyou, pathBeWanted }: any) => {

  const router = useRouter();

  const [ activeLoader, setActiveLoader ] = useState<boolean>(false);
  const [ errorLoader, setErrorLoader ] = useState<boolean>(false);
  const [ _, setInfoForm ] = useState<any>({});
  const [ tokenActive, setTokenActive ] = useState<string>("");

  const { isLoading: isLoadingWanted, isError: isErrorWanted, data, userCreated, registerAccount } = RegisterBeWantedAccount();
  const { isLoading, isError, isLogoutSuccess, logoutToken, token } = getTokenBeWanted();

  useEffect(() => {
    setTokenActive(`${token.token_type} ${token.access_token}`);
  }, [token]);

  useEffect(() => {
    setActiveLoader(isLoading || isLoadingWanted)
  }, [isLoading, isLoadingWanted])
  
  useEffect(() => {
    setErrorLoader(isError || isErrorWanted || userCreated === false)
    if (!isError && !isLoading && userCreated && !!Object.keys(data).length) {
      logoutToken(tokenActive);
    }
  }, [isError, isErrorWanted, userCreated, data])
  
  useEffect(() => {
    if (!isError && !isLoading && userCreated && !!Object.keys(data).length && isLogoutSuccess) {
      router.push(pathThankyou)
    }
  }, [isError, isErrorWanted, userCreated, data, isLogoutSuccess])



  const handleNext = (info: any) => {
    const { name: first_name, surname: last_name, email, password } = info;
    const data = { first_name, last_name, email, password, legal_advice: 1, newsletter_advice: 1, pool_advice: 1, partner_university_id: Number(`${process.env.NEXT_PUBLIC_BE_WANTED_PARTNER_ID_UANE}`)};
    setInfoForm({ ...data });
    registerAccount(data, tokenActive);
  }

  return <section className={cn("p-6 shadow-15 bg-white relative w-d:max-w-[588px] w-t:max-w-[588px] w-t:mx-auto w-p:w-auto", classNames)}>
    <div className={cn("absolute w-full h-full z-10 flex justify-center items-center left-0 top-0", { "hidden": !activeLoader, "block": activeLoader })}>
      <Image src="/images/loader.gif" alt="loader" classNames={cn("w-10 h-10 top-0 left-0")} />
    </div>
    <div className={cn("bg-white absolute w-full h-full z-10 flex flex-col aspect-2/1 justify-center items-center left-0 top-0  p-6", { "hidden": !errorLoader, "block": errorLoader })}>
      <h1>Ya te registraste en la Bolsa de talento</h1>
      <h1>Este correo ya está registrado en la bolsa de talento, si no recuerdas tu contraseña puedes reestablecerla en la bolsa de talento de Bewanted y pulsar en la opción que dice: ¿Olvidaste tu contraseña?</h1>
      <Image src="/images/404.png" alt="error" classNames={cn("w-[347px] h-[270px]")} />
    
      <div className="w-full flex justify-between">
        <Button onClick={() => location.reload()} data={{...ButtonInit, title: "Reintentar" }} />
        <Button onClick={() => window.open(pathBeWanted)} data={{...ButtonInit, title: "Visitar Bolsa de talento" }} />
      </div>
    </div>
    <StepOne onNext={(info: any) => handleNext(info)} copies={copies} />
  </section>
}

export default BeWanted