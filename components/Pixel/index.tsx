
import React, { useEffect } from "react";
import Script from "next/script";
import Head from "next/head";
import { useRouter } from "next/router";
import * as gtag from "@/lib/gtag";
import * as fbq from "@/lib/fb-pixel";
import type { ScriptsPixels } from "@/utils/strapi/sections/ScriptPixel";

const Pixel = (props: ScriptsPixels) => {
  const router = useRouter();
  const {
    script,
    pixel,
    src,
    async,
    name,
    enabled = true,
    triggerOnRouteChange,
    crossorigin = false,
    integrity = null,
    strategy = "afterInteractive"
  } = props;

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

  return (
    <>
      {enabled && !!pixel &&
        <noscript>
          {
            !!pixel.element &&
            (
              pixel.element === 'img' && <img height="1" width="1" style={{ display: 'none' }} src={pixel.src} />
              ||
              pixel.element === 'iframe' && <iframe src={pixel.src} height="0" width="0" style={{ "display": "none", "visibility": "hidden" }}></iframe>
            )
          }
        </noscript>
      }
      {
        enabled && (!!src && !script) &&
        <Script
          id={name}
          src={src}
          async={async}
          crossOrigin={String(crossorigin)}
          strategy={strategy}
          //@ts-ignore
          integrity={integrity}
        />
      }
      {
        enabled && (!!script && !src) &&
        <Script
          id={name}
          async={async}
          crossOrigin={String(crossorigin)}
          dangerouslySetInnerHTML={{ __html: script }}
          strategy={strategy}
          //@ts-ignore
          integrity={integrity}
        />
      }
      {
        enabled && (!!script && !!src) &&
        <Script
          id={name}
          src={src}
          async={async}
          crossOrigin={String(crossorigin)}
          dangerouslySetInnerHTML={{ __html: script }}
          strategy={strategy}
          //@ts-ignore
          integrity={integrity}
        />
      }
    </>
  )
};

export default Pixel;