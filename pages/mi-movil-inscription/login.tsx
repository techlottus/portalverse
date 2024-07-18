import React from "react";
import { loginRequest, msalInstance } from "@/utils/authConfig";
import ContentFullLayout from "@/layouts/ContentFull.layout"
import NextPageWithLayout from "@/types/Layout.types"
import { MsalProvider } from "@azure/msal-react";

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
    <button className="bg-surface-900 text-surface-100 font-texts p-4 rounded-md" onClick={() => handleLogin("popup")}>
      Iniciar sesión
    </button>
  );
};

const SignOutButton = () => {

  const handleLogout = (logoutType: any) => {
    if (logoutType === "popup") {
      msalInstance.logoutPopup({
        postLogoutRedirectUri: "/",
        mainWindowRedirectUri: "/",
      });
    } else if (logoutType === "redirect") {
      msalInstance.logoutRedirect({
        postLogoutRedirectUri: "/",
      });
    }
  };

  return (
    <button className="bg-black text-white p-4 rounded-md font-texts" onClick={() => handleLogout("popup")}>
      Cerrar sesión
    </button>
  );
};

const MiMovilLogin: NextPageWithLayout<any> = (props: any) => {

  return (
    <MsalProvider instance={msalInstance}>
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
    </MsalProvider>

  )
}
export default MiMovilLogin