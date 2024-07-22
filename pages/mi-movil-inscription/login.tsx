import React, { useEffect } from "react";
import { loginRequest, msalInstance } from "@/utils/authConfig";
import ContentFullLayout from "@/layouts/ContentFull.layout"
import NextPageWithLayout from "@/types/Layout.types"
import { useIsAuthenticated } from "@azure/msal-react";
import { useRouter } from "next/router";


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
    <button className="bg-surface-900 text-surface-100 font-texts p-4 rounded-md" onClick={() => handleLogin("redirect")}>
      Iniciar sesión
    </button>
  );
};


const MiMovilLogin: NextPageWithLayout<any> = (props: any) => {
  const isAuthenticated = useIsAuthenticated();
  const router = useRouter()

  useEffect(() => {
    if (isAuthenticated) {
        // go to an authenticated-only place
        router.push('/mi-movil-inscription')
    }
  }, [isAuthenticated]);
  
  return (
      <ContentFullLayout>
        <section className="w-full bg-surface-0 z-15 transition-transform shadow-15 flex justify-between">
          <div className="p-6 border-0 border-solid border-surface-200 border-r-2">
            <div className="w-36 h-9 bg-logo bg-cover bg-center mobile:mx-auto"> </div>
          </div>
          <div className="p-3">
            <SignInButton />
          </div>
        </section>
      </ContentFullLayout>

  )
}
export default MiMovilLogin