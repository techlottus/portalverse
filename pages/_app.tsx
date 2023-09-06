import { useEffect, useState } from "react"
import Script from "next/script"
import { useRouter } from "next/router"
import Head from 'next/head'
import "@/styles/globals.scss"
import { AppPropsWithLayout } from "@/types/Layout.types"
import * as gtag from "@/lib/gtag"

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const router = useRouter();

  useEffect(() => {
    const handleRouteChange = (url: any) => {
    gtag.pageview(url);
  };

  router.events.on("routeChangeComplete", handleRouteChange);

  return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router.events]);

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
      <Script id='google-tag-manager'
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{
        __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
        new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
        j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
        'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
        })(window,document,'script','dataLayer','GTM-5ZVRHTS');`,
      }}/>
      <Script id='meta-pixel'
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '481987629436592', {
              page_path: window.location.pathname,
            });
          `,
      }}/>
      {/* // // Meta Pixel Code (noscript) */}
      {/* <noscript>
        <img height="1" width="1" style={{"display":"none","visibility":"hidden"}} src="https://www.facebook.com/tr?id=481987629436592&amp;ev=PageView&amp;noscript=1"/>
      </noscript> */}
      {/* // //End Meta Pixel Code (noscript) */}
      {/* // // Google Tag Manager (noscript) */}
      <noscript>
        <iframe src="https://www.googletagmanager.com/ns.html?id=GTM-5ZVRHTS" height="0" width="0" style={{"display":"none","visibility":"hidden"}}></iframe>
      </noscript>
      {/* // // End Google Tag Manager (noscript) */}

      <Component {...pageProps} />
    </>)
}

export default MyApp
