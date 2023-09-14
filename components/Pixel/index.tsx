
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
            <img
              height="1"
              width="1"
              style={{ display: 'none' }}
              src={pixel}
            />
          </noscript>
        }
      </Head>
    </>
  )
}