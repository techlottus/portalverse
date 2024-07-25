import React, { useEffect } from "react";
import { loginRequest, msalInstance } from "@/utils/authConfig";
import ContentFullLayout from "@/layouts/ContentFull.layout"
import NextPageWithLayout from "@/types/Layout.types"
import { useIsAuthenticated } from "@azure/msal-react";
import { useRouter } from "next/router";
import Image from "next/image";


/**
 * Renders a drop down button with child buttons for logging in with a popup or redirect
 * Note the [useMsal] package 
 */

const SignInButton = () => {

  const handleLogin = (loginType: any) => {
    if (loginType === "popup") {
      msalInstance.loginPopup(loginRequest).catch((e: any) => {
        console.log(e);
      });
    } else if (loginType === "redirect") {
      msalInstance.loginRedirect(loginRequest).catch((e: any) => {
        console.log(e);
      });
    }
  };
  return (
    <button className="bg-primary-500 text-surface-100 font-texts p-4 rounded-md font-bold px-8" onClick={() => handleLogin("redirect")}>
      Iniciar sesión
    </button>
  );
};


const MiMovilLogin: NextPageWithLayout<any> = (props: any) => {
  const isAuthenticated = useIsAuthenticated();
  const router = useRouter()

  useEffect(() => {
    if (isAuthenticated) {
        router.push('/mi-movil-inscription')
    }
  }, [isAuthenticated]);

  return (
      <section className="w-full flex h-full items-center justify-between overflow-hidden">
        <section className="flex w-1/2 bg-[url('https://bedu-staging-assets.s3.us-west-2.amazonaws.com/UTC/Frame_195_9eabdd4fcd.png')] bg-cover bg-center h-screen">
        </section>
        <section className="w-1/2 flex justify-center">
          <section className="h-full flex flex-col items-center justify-center gap-2">
            <Image width={180} height={41} src="https://bedu-staging-assets.s3.us-west-2.amazonaws.com/UTC/image_9_dccaab79ed.png" alt="logo mimovil" />
            <h1 className="font-headings text-2xl font-bold mt-6">Accede al formulario</h1>
            <p className="font-texts mb-6">Utiliza el correo y contraseña de administrador para acceder</p>
            <SignInButton />
          </section>
        </section> 
      </section>

  )
}
export default MiMovilLogin