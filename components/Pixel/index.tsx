
import React, { useEffect } from 'react'
import Script from 'next/script'
import Head from 'next/head'
import { useRouter } from 'next/router';
import * as gtag from "@/lib/gtag"
import * as fbq from '@/lib/fb-pixel'
import { ScriptsPixels } from '@/utils/strapi/sections/ScriptPixel';

export default ({script, pixel, name, enabled = true, triggerOnRouteChange}: ScriptsPixels) => {
  const router = useRouter();

  useEffect(() => {
    const handleRouteChange = (url: any) => {
      switch (triggerOnRouteChange) {
        case "gtagPageview":
          gtag.pageview(url);
          break;
          case "fbqPageview":
          fbq.pageview();
          break;
        default:
          break;
      }
    };

    router.events.on("routeChangeComplete", handleRouteChange);

    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router.events]);

  useEffect( () => {
  }, [])
  return(
    <>
      { enabled && !!script && <Script id={name} strategy='afterInteractive' dangerouslySetInnerHTML={{ __html: script }}/>}
        { enabled && !!pixel &&
        <Head>
          <noscript>
            {
              pixel.element && 
                (
                  pixel.element === 'img' && <img height="1" width="1" style={{ display: 'none' }} src={pixel.src}/>
                  ||
                  pixel.element === 'iframe' && <iframe src={pixel.src} height="0" width="0" style={{"display":"none","visibility":"hidden"}}></iframe>
                )
            }
          </noscript>
        </Head>
        }
    </>
  )
}