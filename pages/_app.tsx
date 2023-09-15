import { useEffect, useState } from "react"
import { useRouter } from "next/router"
import "@/styles/globals.scss"
import { AppPropsWithLayout } from "@/types/Layout.types"
import * as gtag from "@/lib/gtag"
import * as fbq from '@/lib/fb-pixel'
import Pixel from "@/components/Pixel"
import { getGeneralConfigData } from "@/utils/getGeneralConfigData"
import { ScriptsPixels } from "@/utils/strapi/sections/ScriptPixel"

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const router = useRouter();
  const [scripts, setScripts] = useState<any>();
  useEffect(() => {
    const handleRouteChange = (url: any) => {
      gtag.pageview(url);
      fbq.pageview();
    };

    router.events.on("routeChangeComplete", handleRouteChange);

    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router.events]);

  useEffect( () => {
    const getConfigData = async () => {
      const generalConfig = await getGeneralConfigData();
      const scripts = generalConfig?.generalConfig?.data?.attributes?.scriptsPixels || [];
      setScripts(scripts)
    }
   getConfigData()
  }, [])
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
        scripts && scripts.map(({name, script, pixel}: ScriptsPixels, i: number) => <Pixel
        key={i}
        name={name}
        script={script}
        pixel={{src: pixel?.src, element: pixel.element}}
      ></Pixel>)
      }
    

      <Component {...pageProps} />
    </>)
}

export default MyApp
