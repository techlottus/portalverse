import { useEffect } from "react"
import { useRouter } from "next/router"
import "@/styles/globals.scss"
import { AppPropsWithLayout } from "@/types/Layout.types"
import Pixel from "@/components/Pixel"
import { ScriptsPixels } from "@/utils/strapi/sections/ScriptPixel"
import { scripts } from "@/general-config"
import { sendWhatsapp } from "@/general-config"
import { MsalProvider } from "@azure/msal-react";
import { msalInstance } from "@/utils/authConfig";


import WhatsappButton from "@/components/WhatsappButton"

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
      {
        scripts && scripts?.map((props: ScriptsPixels, i: number) => {
          return (
            <Pixel
              key={i}
              {...props}
            />
          )
        })
      }
      <MsalProvider instance={msalInstance}>

        <Component {...pageProps} />
      </MsalProvider>
      
      {
        pageProps?.program?.attributes?.price_list
        ? null 
        : (sendWhatsapp && !sendWhatsapp?.hidden) && <WhatsappButton phone={sendWhatsapp?.phone}></WhatsappButton>
      }

    </>)
}

export default MyApp
