import { useEffect, useState } from "react"
import Script from "next/script"
import { useRouter } from "next/router"
import Head from 'next/head'
import "@/styles/globals.scss"
import { AppPropsWithLayout } from "@/types/Layout.types"
import * as gtag from "@/lib/gtag"
import Pixel from "@/components/Pixel"

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
      <Pixel 
        ID="google-tag-manager"
        script={`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
        new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
        j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
        'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
        })(window,document,'script','dataLayer','GTM-5ZVRHTS');`}
        pixel="https://www.googletagmanager.com/ns.html?id=GTM-5ZVRHTS"
        image={false}
      ></Pixel>
      <Pixel
        ID="meta-pixel"
        script={`!function(f,b,e,v,n,t,s)
          {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
          n.callMethod.apply(n,arguments):n.queue.push(arguments)};
          if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
          n.queue=[];t=b.createElement(e);t.async=!0;
          t.src=v;s=b.getElementsByTagName(e)[0];
          s.parentNode.insertBefore(t,s)}(window, document,'script',
          'https://connect.facebook.net/en_US/fbevents.js');
          fbq('init', 481987629436592);
          fbq('track', 'PageView');`}
        pixel="https://www.facebook.com/tr?id=481987629436592&ev=PageView&noscript=1"
        image={true}
        ></Pixel>


      <Component {...pageProps} />
    </>)
}

export default MyApp
