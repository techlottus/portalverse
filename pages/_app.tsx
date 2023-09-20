import { useEffect, useState } from "react"
import { useRouter } from "next/router"
import "@/styles/globals.scss"
import { AppPropsWithLayout } from "@/types/Layout.types"
import * as gtag from "@/lib/gtag"
import * as fbq from '@/lib/fb-pixel'
import Pixel from "@/components/Pixel"
import { PixelComponent, ScriptsPixels } from "@/utils/strapi/sections/ScriptPixel"
import { scripts } from "../GeneralConfig"

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const router = useRouter();

  useEffect( () => {
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
        scripts && scripts.map(({name, script, pixel, enabled, triggerOnRouteChange}: PixelComponent, i: number) => <Pixel
          key={i}
          name={name}
          script={script}
          pixel={pixel}
          enabled={enabled}
          triggerOnRouteChange={triggerOnRouteChange}
        ></Pixel>)
      }

      <Component {...pageProps} />
    </>)
}

export default MyApp
