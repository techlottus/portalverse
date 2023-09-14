
import React from 'react'
import Head  from 'next/head'
import Script from 'next/script'

export default ({script, pixel, ID}: { script?: string, pixel?: string, ID?: string }) => {
  return(
    <>
      { !!script && <Script id={ID} strategy='afterInteractive' dangerouslySetInnerHTML={{ __html: script }}/>}
      <Head>
        { !!pixel &&
          <noscript>
            <iframe src={pixel} height="0" width="0" style={{"display":"none","visibility":"hidden"}}></iframe>
      
          </noscript>
        }
      </Head>
    </>
  )
}