import { Html, Head, Main, NextScript } from "next/document"
import { favicon } from "multitenant-images"
import links  from "fontlinks"

export default function Document() {
  return (
    <Html lang="es">
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        <link rel="icon" href={favicon} crossOrigin="true" />
        { links.map((value: any, i: number) => <link key={i} href={value} rel="stylesheet"></link>) }
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0" />
      </Head>
      <body>
        
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}