import { FC, useEffect, useState } from "react"
import { useRouter } from "next/router"
import cn from "classnames"
import StepOne from "@/forms/steps/step-one-bewanted"
import Image from "@/old-components/Image"
import Button from "@/old-components/Button/Button"
import { ButtonInit } from "@/old-components/fixture"
import { RegisterBeWantedAccount } from "@/utils/registerBeWantedAccount"
import { getTokenBeWanted } from "@/utils/getTokenBeWanted"
import errors from "@/multitenant-errors"

const BeWanted: FC<any> = ({ classNames, copies, pathThankyou, pathBeWanted }: any) => {

  const router = useRouter();

  const [ _, setInfoForm ] = useState<any>({});
  const [ tokenActive, setTokenActive ] = useState<string>("");
  const { isLoading: isLoadingRegister, isError: isErrorRegister, data, isSuccess, registerAccount } = RegisterBeWantedAccount();
  const { isLoading: isLoadingToken, isError: isErrorToken, isLogoutSuccess, logoutToken, token } = getTokenBeWanted();

  const isLoading = isLoadingToken || isLoadingRegister;
  const isError = isErrorToken || isErrorRegister;
  const responseStatus = data?.response?.status;

  useEffect(() => {
    setTokenActive(`${token.token_type} ${token.access_token}`);
  }, [token]);
  
  useEffect(() => {
    if (!isErrorToken && !isLoading && isSuccess && !!Object.keys(data).length) {
      logoutToken(tokenActive);
    }
  }, [isErrorToken, isErrorRegister, isSuccess, data])
  
  useEffect(() => {
    if (isSuccess && isLogoutSuccess) {
      router.push(pathThankyou)
    }
  }, [isSuccess, isLogoutSuccess])

  const handleNext = (info: any) => {
    const { name: first_name, surname: last_name, email, password } = info;
    const data = { first_name, last_name, email, password, legal_advice: 1, newsletter_advice: 1, pool_advice: 1, partner_university_id: Number(`${process.env.NEXT_PUBLIC_BE_WANTED_PARTNER_ID}`)};
    setInfoForm({ ...data });
    registerAccount(data, tokenActive);
  }

  return (
    <section className={cn("bg-surface-0 relative desktop:max-w-147 tablet:max-w-147 tablet:mx-auto mobile:w-auto", classNames)}>
      <div className={cn("absolute w-full h-full z-10 flex justify-center items-center left-0 top-0", { "hidden": !isLoading, "block":isLoading })}>
        <Image src="/images/loader.gif" alt="loader" classNames={cn("w-10 h-10 top-0 left-0")} />
      </div>
      {
        isError
          ? isErrorRegister && responseStatus === 409 // user already registered for this job pool
            ? <div className="bg-surface-0 w-full h-full z-10 flex flex-col items-center space-y-6 aspect-2/1">
                <h3 className="font-semibold text-6">Ya te registraste en la Bolsa de Talento</h3>
                <p className="font-normal text-sm">Este correo ya está registrado en la bolsa de talento, si no recuerdas tu contraseña puedes restablecerla en la bolsa de talento de Bewanted y pulsar en la opción que dice: ¿Olvidaste tu contraseña?</p>
                <div className="w-full max-w-96"> {/* Tailwind's 'max-w-sm' value isn't working for some reason u.u */}
                  <img src={errors?.["404"]?.image} className="w-full" alt="error" />
                </div>
                <div className="w-full flex space-x-3 justify-between items-center">
                  <Button dark onClick={() => location.reload()} data={{...ButtonInit, title: "Regresar" }} />
                  <Button dark onClick={() => window.open(pathBeWanted)} data={{...ButtonInit, title: "Visitar Bolsa de talento" }} />
                </div>
              </div>
            : <div className="bg-surface-0 w-full h-full p-4 z-10 flex flex-col aspect-2/1 justify-center items-center">
                <h2 className="font-bold text-10 text-center leading-12 mb-9">
                Lo sentimos
                </h2>
                <div className="w-full max-w-96"> {/* Tailwind's 'max-w-sm' value isn't working for some reason u.u */}
                  <img src={errors?.["404"]?.image} className="w-full" alt="error" />
                </div>
                <p className="text-surface-600 font-semibold text-5.5 my-6">
                Esta página no está disponible
                </p>
                <Button
                  dark
                  onClick={() => location.reload()}
                  data={{ ...ButtonInit, title: "Reintentar" }}
                />
              </div>
          : <StepOne onNext={(info: any) => handleNext(info)} copies={copies} />
      }
    </section>
  )
}

export default BeWanted;