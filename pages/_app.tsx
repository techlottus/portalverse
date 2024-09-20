import { useEffect } from "react"
import { useRouter } from "next/router"
import "@/styles/globals.scss"
import { AppPropsWithLayout } from "@/types/Layout.types"

import { MsalProvider } from "@azure/msal-react";
import { msalInstance } from "@/utils/authConfig";



function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const router = useRouter();

  useEffect(() => {
    // we need import elements with commonJS
    if (typeof window !== 'undefined') {
      require("@lottus23/lottus-elements-uane/elements")
    }
  }, [])

  // Use the layout defined at the page level, if available
  const getLayout = Component.getLayout ?? ((page) => page)

  return getLayout(
    <>
   
      <MsalProvider instance={msalInstance}>
        <Component {...pageProps} />
      </MsalProvider>
      
    

    </>)
}

export default MyApp
